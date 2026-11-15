-- Cancellazione automatica alla scadenza (retention_until, 12 mesi): richiesta, assegnazioni, note, eventi,
-- allegati (cascata) e file nel bucket lead-uploads, più i file orfani. Approvata dal proprietario il 2026-11-15.
--
-- Perché un'Edge Function: lo Storage di Supabase vieta di cancellare i file con SQL (trigger protect_objects_delete)
-- e una DELETE su storage.objects lascerebbe il file nel bucket. Il flusso è:
--   pg_cron (ogni giorno 03:15 UTC) → pg_net → Edge Function purge-expired-leads
--   → public.purge_begin  (elenca i file da togliere: richieste scadute + orfani)
--   → Storage API remove  (toglie i file davvero)
--   → public.purge_finish (cancella solo le richieste scadute senza più file e registra i numeri)
-- Idempotente: ogni esecuzione ricalcola cosa è scaduto; ciò che resta viene ripreso la volta dopo.
-- Il log (private.purge_runs) contiene solo date, numeri e un codice d'errore: nessun dato personale.

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Log delle esecuzioni, senza dati personali
create table if not exists private.purge_runs (
  id                  bigint generated always as identity primary key,
  started_at          timestamptz not null default now(),
  finished_at         timestamptz,
  status              text not null default 'running' check (status in ('running', 'ok', 'partial', 'error')),
  leads_expired       integer not null default 0,
  leads_deleted       integer not null default 0,
  files_planned       integer not null default 0,
  orphan_files        integer not null default 0,
  files_deleted       integer not null default 0,
  files_remaining     integer,
  rate_limits_deleted integer not null default 0,
  error_code          text check (error_code ~ '^[a-z_]{1,60}$')
);
alter table private.purge_runs enable row level security;
revoke all on private.purge_runs from public, anon, authenticated;

-- Segreto condiviso tra il job e la funzione, generato qui e conservato solo in Vault
do $$
begin
  if not exists (select 1 from vault.secrets where name = 'purge_cron_secret') then
    perform vault.create_secret(encode(extensions.gen_random_bytes(32), 'hex'), 'purge_cron_secret',
                                'Segreto del job di cancellazione automatica (pg_cron → Edge Function)');
  end if;
end;
$$;

create or replace function private.verify_purge_secret(p_secret text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(length(p_secret), 0) >= 32 and exists (
    select 1 from vault.decrypted_secrets s where s.name = 'purge_cron_secret' and s.decrypted_secret = p_secret
  );
$$;

-- File da togliere: quelli delle richieste scadute e quelli senza più una richiesta (orfani)
create or replace function private.purge_candidate_files()
returns table (name text, orphan boolean)
language sql
stable
security definer
set search_path = ''
as $$
  select o.name,
         not exists (select 1 from public.leads l where l.id::text = split_part(o.name, '/', 1)) as orphan
    from storage.objects o
   where o.bucket_id = 'lead-uploads'
     and (
       not exists (select 1 from public.leads l where l.id::text = split_part(o.name, '/', 1))
       or exists (select 1 from public.leads l
                   where l.id::text = split_part(o.name, '/', 1) and l.retention_until < current_date)
     );
$$;

create or replace function public.purge_begin(p_secret text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_run     bigint;
  v_files   text[];
  v_orphans integer;
  v_expired integer;
  v_rate    integer;
begin
  if not private.verify_purge_secret(p_secret) then
    raise exception 'unauthorized' using errcode = '42501';
  end if;

  -- Esecuzioni rimaste a metà: chiuse come errore dopo 30 minuti
  update private.purge_runs set status = 'error', error_code = 'timeout', finished_at = now()
   where status = 'running' and started_at < now() - interval '30 minutes';
  if exists (select 1 from private.purge_runs where status = 'running') then
    return jsonb_build_object('ok', true, 'skipped', true);
  end if;

  insert into private.purge_runs default values returning id into v_run;

  select count(*) into v_expired from public.leads where retention_until < current_date;

  select coalesce(array_agg(c.name), '{}'), count(*) filter (where c.orphan)
    into v_files, v_orphans
    from (select * from private.purge_candidate_files() limit 1000) c;

  -- Hash IP del limite di frequenza: 48 ore, come dice l'informativa
  delete from private.rate_limits where window_start < now() - interval '48 hours';
  get diagnostics v_rate = row_count;

  -- Il log stesso non serve oltre 24 mesi
  delete from private.purge_runs where started_at < now() - interval '24 months';

  update private.purge_runs
     set leads_expired = v_expired, files_planned = coalesce(array_length(v_files, 1), 0),
         orphan_files = v_orphans, rate_limits_deleted = v_rate
   where id = v_run;

  return jsonb_build_object('ok', true, 'run_id', v_run, 'files', to_jsonb(v_files));
end;
$$;

create or replace function public.purge_finish(p_secret text, p_run_id bigint, p_files_deleted integer, p_error text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_deleted   integer;
  v_remaining integer;
  v_error     text := case when p_error ~ '^[a-z_]{1,60}$' then p_error end;
  v_status    text;
begin
  if not private.verify_purge_secret(p_secret) then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  if not exists (select 1 from private.purge_runs where id = p_run_id and status = 'running') then
    return jsonb_build_object('ok', false, 'error', 'run_not_running');
  end if;

  -- Solo richieste scadute che non hanno più file: le altre restano per la prossima esecuzione.
  -- Assegnazioni, note, eventi e righe degli allegati seguono per cascata.
  delete from public.leads l
   where l.retention_until < current_date
     and not exists (select 1 from storage.objects o
                      where o.bucket_id = 'lead-uploads' and split_part(o.name, '/', 1) = l.id::text);
  get diagnostics v_deleted = row_count;

  select count(*) into v_remaining from private.purge_candidate_files();

  v_status := case when v_error is null and v_remaining = 0 then 'ok' else 'partial' end;

  update private.purge_runs
     set finished_at = now(), status = v_status, leads_deleted = v_deleted,
         files_deleted = greatest(coalesce(p_files_deleted, 0), 0), files_remaining = v_remaining,
         error_code = coalesce(v_error, case when v_remaining > 0 then 'files_remaining' end)
   where id = p_run_id;

  return jsonb_build_object('ok', true, 'status', v_status, 'leads_deleted', v_deleted,
                            'files_deleted', greatest(coalesce(p_files_deleted, 0), 0), 'files_remaining', v_remaining);
end;
$$;

revoke execute on function private.verify_purge_secret(text) from public, anon, authenticated;
revoke execute on function private.purge_candidate_files() from public, anon, authenticated;
revoke execute on function public.purge_begin(text) from public, anon, authenticated;
revoke execute on function public.purge_finish(text, bigint, integer, text) from public, anon, authenticated;
grant execute on function public.purge_begin(text) to service_role;
grant execute on function public.purge_finish(text, bigint, integer, text) to service_role;

-- La vecchia funzione cancellava le righe ma lasciava le foto nel bucket
drop function if exists private.purge_expired_leads();

-- Job giornaliero (riprogrammare con lo stesso nome lo aggiorna)
select cron.schedule(
  'purge-expired-leads',
  '15 3 * * *',
  $job$
  select net.http_post(
    url := 'https://etqifeyzwpetpqtluwfs.supabase.co/functions/v1/purge-expired-leads',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-purge-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'purge_cron_secret')
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 60000
  );
  $job$
);
