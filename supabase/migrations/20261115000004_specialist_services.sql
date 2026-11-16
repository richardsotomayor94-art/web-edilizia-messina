-- Servizi specialistici (2026-11-15): «Restauro, pulizia e recupero» e «Sabbiatura e pulizia specialistica».
-- Aggiuntiva e reversibile: nuove righe nel catalogo, una colonna facoltativa e submit_lead che la salva.
--
-- Ogni richiesta finisce in una sottocategoria, così ogni impresa dichiara (partners.services) solo i lavori
-- che accetta e suggest_partners continua a funzionare senza modifiche. restauro-valutazione raccoglie le
-- richieste da classificare a mano. Lo stato «in preparazione» è nel sito (src/config/specialist.ts).
--
-- Per tornare indietro: alter table public.leads drop column details; delete from public.services where slug in (...)
-- (solo se nessuna richiesta le usa) e ripristinare submit_lead dalla migrazione 20261113000002.

insert into public.services (slug, name, has_landing, sort) values
  ('restauro-funerario', 'Restauro: tombe, lapidi e monumenti funerari', true, 200),
  ('restauro-pietra', 'Restauro: marmo e pietra', true, 210),
  ('restauro-legno', 'Restauro: porte, mobili e legno', true, 220),
  ('restauro-decorativo', 'Restauro: elementi decorativi e architettonici', true, 230),
  ('restauro-valutazione', 'Restauro: valutazione generale', true, 240),
  ('sabbiatura', 'Sabbiatura e pulizia specialistica', true, 300)
on conflict (slug) do nothing;

-- Dettagli dei servizi specialistici (oggetto, materiale, intervento, dimensioni, trasporto, cimitero):
-- solo un oggetto JSON piccolo; nessun dato personale oltre a quelli già presenti nella richiesta.
alter table public.leads add column if not exists details jsonb;
alter table public.leads drop constraint if exists leads_details_check;
alter table public.leads add constraint leads_details_check
  check (details is null or (jsonb_typeof(details) = 'object' and pg_column_size(details) <= 2000));

create or replace function public.submit_lead(p_secret text, p_lead jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_dup uuid;
  v_status text := 'new';
  v_spam integer := coalesce((p_lead ->> 'spam_score')::integer, 0);
  v_reasons text[] := coalesce(array(select jsonb_array_elements_text(p_lead -> 'spam_reasons')), '{}');
  v_files integer := least(greatest(coalesce((p_lead ->> 'attachments_expected')::integer, 0), 0), 5);
  v_token text;
  v_ip text := nullif(p_lead ->> 'ip_hash', '');
begin
  if not private.verify_ingest_secret(p_secret) then
    raise exception 'unauthorized' using errcode = '42501';
  end if;

  -- Rate limit per IP (hash) e globale
  if v_ip is not null and not private.hit_rate_limit('lead:' || v_ip, 5, 3600) then
    return jsonb_build_object('ok', false, 'error', 'rate_limited');
  end if;
  if not private.hit_rate_limit('lead:global', 300, 3600) then
    return jsonb_build_object('ok', false, 'error', 'rate_limited');
  end if;

  -- Due invii simultanei dello stesso telefono per lo stesso servizio si mettono in fila:
  -- il secondo vede il primo e viene segnato come duplicato invece di creare un secondo lead "new".
  perform pg_advisory_xact_lock(hashtextextended(coalesce(p_lead ->> 'phone', '') || '|' || coalesce(p_lead ->> 'service', ''), 0));

  -- Duplicati: stesso telefono + stesso servizio negli ultimi 3 giorni
  select l.id into v_dup
    from public.leads l
   where l.phone = p_lead ->> 'phone'
     and l.service = p_lead ->> 'service'
     and l.created_at > now() - interval '3 days'
     and l.status <> 'duplicate'
   order by l.created_at desc
   limit 1;

  if v_dup is not null then
    v_status := 'duplicate';
    v_reasons := array_append(v_reasons, 'duplicate_phone_service_72h');
  elsif v_spam >= 60 then
    v_status := 'invalid';
  end if;

  if v_files > 0 then
    v_token := encode(extensions.gen_random_bytes(24), 'hex');
  end if;

  insert into public.leads (
    source, utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid,
    landing_page, referrer, form_page,
    service, property_type, square_meters, timeline, budget_range, description, details,
    city, postal_code, zone, area_slug,
    name, phone, whatsapp, email, preferred_contact,
    consent_privacy, privacy_version, consent_marketing, consent_marketing_at,
    status, lead_score, lead_tier, spam_score, spam_reasons, duplicate_of,
    ip_hash, user_agent, form_duration_ms,
    upload_token_hash, upload_expires_at
  ) values (
    nullif(p_lead ->> 'source', ''),
    nullif(p_lead ->> 'utm_source', ''), nullif(p_lead ->> 'utm_medium', ''),
    nullif(p_lead ->> 'utm_campaign', ''), nullif(p_lead ->> 'utm_content', ''),
    nullif(p_lead ->> 'utm_term', ''), nullif(p_lead ->> 'gclid', ''),
    nullif(p_lead ->> 'landing_page', ''), nullif(p_lead ->> 'referrer', ''), nullif(p_lead ->> 'form_page', ''),
    p_lead ->> 'service', p_lead ->> 'property_type', p_lead ->> 'square_meters', p_lead ->> 'timeline',
    nullif(p_lead ->> 'budget_range', ''), nullif(p_lead ->> 'description', ''),
    case when jsonb_typeof(p_lead -> 'details') = 'object' then p_lead -> 'details' end,
    p_lead ->> 'city', nullif(p_lead ->> 'postal_code', ''), nullif(p_lead ->> 'zone', ''),
    (select a.slug from public.service_areas a where a.slug = p_lead ->> 'area_slug'),
    p_lead ->> 'name', p_lead ->> 'phone', nullif(p_lead ->> 'whatsapp', ''), nullif(p_lead ->> 'email', ''),
    coalesce(nullif(p_lead ->> 'preferred_contact', ''), 'phone'),
    (p_lead ->> 'consent_privacy')::boolean, p_lead ->> 'privacy_version',
    coalesce((p_lead ->> 'consent_marketing')::boolean, false),
    case when coalesce((p_lead ->> 'consent_marketing')::boolean, false) then now() end,
    v_status, (p_lead ->> 'lead_score')::integer, nullif(p_lead ->> 'lead_tier', ''),
    least(greatest(v_spam, 0), 100), v_reasons, v_dup,
    v_ip, left(p_lead ->> 'user_agent', 300), (p_lead ->> 'form_duration_ms')::integer,
    case when v_token is not null then encode(extensions.digest(v_token, 'sha256'), 'hex') end,
    case when v_token is not null then now() + interval '30 minutes' end
  )
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id, 'status', v_status, 'upload_token', v_token);
end;
$$;
