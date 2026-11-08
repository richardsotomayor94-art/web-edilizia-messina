-- =====================================================================
-- MessinaCasa360 — Lead-generation CRM (MVP)
-- Migration 20261108000001
--
-- Principi:
--  * NESSUN accesso pubblico (anon) diretto alle tabelle: niente SELECT,
--    INSERT, UPDATE o DELETE. RLS attiva ovunque.
--  * Le richieste entrano SOLO tramite RPC SECURITY DEFINER che richiedono
--    un segreto noto soltanto al server Next.js (LEAD_INGEST_SECRET).
--  * Gli amministratori (tabella admin_users) leggono/gestiscono via RLS
--    con sessione Supabase Auth.
--  * PII minimizzate: IP salvato solo come hash salato.
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

-- Schema privato: NON esposto dall'API REST (solo public/graphql_public).
create schema if not exists private;
revoke all on schema private from public;

-- ---------------------------------------------------------------------
-- Configurazione privata (segreto di ingestione)
-- ---------------------------------------------------------------------
create table private.app_config (
  key   text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
comment on table private.app_config is
  'Configurazione privata. lead_ingest_secret_hash = sha256 hex del segreto LEAD_INGEST_SECRET del server. Mai salvare il segreto in chiaro.';

create or replace function private.verify_ingest_secret(p_secret text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from private.app_config c
    where c.key = 'lead_ingest_secret_hash'
      and p_secret is not null
      and length(p_secret) >= 32
      and c.value = encode(extensions.digest(p_secret, 'sha256'), 'hex')
  );
$$;

-- ---------------------------------------------------------------------
-- Rate limiting (finestra fissa) — chiavi già hashate dal server
-- ---------------------------------------------------------------------
create table private.rate_limits (
  key          text        not null,
  window_start timestamptz not null,
  hits         integer     not null default 0,
  primary key (key, window_start)
);

create or replace function private.hit_rate_limit(p_key text, p_max integer, p_window_seconds integer)
returns boolean  -- true = consentito, false = limite superato
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_window timestamptz := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);
  v_hits integer;
begin
  insert into private.rate_limits as r (key, window_start, hits)
  values (p_key, v_window, 1)
  on conflict (key, window_start) do update set hits = r.hits + 1
  returning r.hits into v_hits;

  -- pulizia opportunistica
  if random() < 0.02 then
    delete from private.rate_limits where window_start < now() - interval '2 days';
  end if;

  return v_hits <= p_max;
end;
$$;

-- ---------------------------------------------------------------------
-- Cataloghi
-- ---------------------------------------------------------------------
create table public.services (
  slug        text primary key check (slug ~ '^[a-z0-9-]{2,60}$'),
  name        text not null,
  has_landing boolean not null default false,
  active      boolean not null default true,
  sort        integer not null default 100
);

create table public.service_areas (
  slug        text primary key check (slug ~ '^[a-z0-9-]{2,80}$'),
  name        text not null,
  kind        text not null check (kind in ('comune', 'quartiere', 'zona')),
  parent_slug text references public.service_areas (slug),
  province    text not null default 'ME',
  verified    boolean not null default false, -- copertura confermata dal proprietario
  active      boolean not null default true
);
comment on column public.service_areas.verified is
  'TRUE solo quando il proprietario conferma partner attivi nella zona. Solo le zone verificate possono finire in areaServed / contenuti pubblici.';

-- ---------------------------------------------------------------------
-- Partner (imprese / artigiani)
-- ---------------------------------------------------------------------
create table public.partners (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  business_name    text not null check (length(business_name) between 2 and 160),
  contact_name     text check (length(contact_name) <= 120),
  phone            text check (length(phone) <= 30),
  email            text check (length(email) <= 254),
  vat_number       text check (length(vat_number) <= 20),
  services         text[] not null default '{}',
  areas            text[] not null default '{}',
  active           boolean not null default false,
  verified_at      timestamptz, -- data verifica documentale (visura, DURC, assicurazione...)
  verification_notes text,
  max_leads_day    integer check (max_leads_day is null or max_leads_day between 0 and 1000),
  exclusive_area   boolean not null default false,
  -- Modelli di monetizzazione (nessun pagamento implementato nell'MVP)
  billing_model    text check (billing_model in ('per_lead', 'commission', 'exclusive_fee', 'asset_rent', 'none')),
  lead_price       numeric(10, 2) check (lead_price is null or lead_price >= 0),
  commission_rate  numeric(5, 4) check (commission_rate is null or (commission_rate >= 0 and commission_rate <= 1)),
  monthly_fee      numeric(10, 2) check (monthly_fee is null or monthly_fee >= 0),
  contract_signed_at timestamptz,
  notes            text
);
create index partners_services_gin on public.partners using gin (services);
create index partners_areas_gin on public.partners using gin (areas);

-- Candidature partner dal sito (/diventa-partner/)
create table public.partner_applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  business_name text not null check (length(business_name) between 2 and 160),
  contact_name  text not null check (length(contact_name) between 2 and 120),
  phone         text not null check (length(phone) between 6 and 30),
  email         text check (length(email) <= 254),
  vat_number    text check (length(vat_number) <= 20),
  services      text[] not null default '{}',
  areas_text    text check (length(areas_text) <= 500),
  message       text check (length(message) <= 2000),
  consent_privacy boolean not null check (consent_privacy),
  privacy_version text not null,
  status        text not null default 'new' check (status in ('new', 'contacted', 'approved', 'rejected')),
  ip_hash       text
);

-- ---------------------------------------------------------------------
-- Lead
-- ---------------------------------------------------------------------
create table public.leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  -- Attribuzione
  source           text check (source in ('organic', 'paid', 'social', 'referral', 'email', 'direct', 'ai', 'other')),
  utm_source       text check (length(utm_source) <= 120),
  utm_medium       text check (length(utm_medium) <= 120),
  utm_campaign     text check (length(utm_campaign) <= 160),
  utm_content      text check (length(utm_content) <= 160),
  utm_term         text check (length(utm_term) <= 160),
  gclid            text check (length(gclid) <= 255),
  landing_page     text check (length(landing_page) <= 500),
  referrer         text check (length(referrer) <= 500),
  form_page        text check (length(form_page) <= 500),

  -- Qualificazione
  service          text not null references public.services (slug),
  property_type    text not null check (property_type in ('appartamento', 'villa', 'casa_indipendente', 'negozio', 'ufficio', 'condominio', 'altro')),
  square_meters    text not null check (square_meters in ('lt50', '50_100', '100_150', 'gt150', 'unknown')),
  timeline         text not null check (timeline in ('info', 'quotes', 'soon', 'urgent')),
  budget_range     text check (budget_range in ('lt5k', '5k_15k', '15k_30k', '30k_60k', 'gt60k', 'undisclosed')),
  description      text check (length(description) <= 2000),

  -- Luogo
  city             text not null check (length(city) between 2 and 80),
  postal_code      text check (postal_code ~ '^[0-9]{5}$'),
  zone             text check (length(zone) <= 120),
  area_slug        text references public.service_areas (slug),

  -- Contatto (PII)
  name             text not null check (length(name) between 2 and 120),
  phone            text not null check (phone ~ '^\+[0-9]{8,15}$'),
  whatsapp         text check (whatsapp ~ '^\+[0-9]{8,15}$'),
  email            text check (length(email) <= 254),
  preferred_contact text not null default 'phone' check (preferred_contact in ('phone', 'whatsapp', 'email')),

  -- Consensi (prova)
  consent_privacy      boolean not null check (consent_privacy),
  consent_privacy_at   timestamptz not null default now(),
  privacy_version      text not null,
  consent_marketing    boolean not null default false,
  consent_marketing_at timestamptz,

  -- Pipeline
  status           text not null default 'new' check (status in ('new', 'qualified', 'assigned', 'contacted', 'appointment', 'quote_sent', 'won', 'lost', 'invalid', 'duplicate')),
  lost_reason      text check (length(lost_reason) <= 500),
  lead_score       integer check (lead_score between 0 and 100),
  lead_tier        text check (lead_tier in ('hot', 'warm', 'cold')),
  spam_score       integer not null default 0 check (spam_score between 0 and 100),
  spam_reasons     text[] not null default '{}',
  duplicate_of     uuid references public.leads (id) on delete set null,
  assigned_partner_id uuid references public.partners (id) on delete set null,
  assigned_at      timestamptz,

  -- Valore economico (per dimostrare il valore dell'asset)
  job_value        numeric(12, 2) check (job_value is null or job_value >= 0),  -- valore lavoro concluso (dichiarato dal partner)
  revenue          numeric(12, 2) check (revenue is null or revenue >= 0),      -- ricavo della piattaforma su questo lead

  -- Tecnico / anti-abuso
  ip_hash          text check (length(ip_hash) <= 128),
  user_agent       text check (length(user_agent) <= 300),
  form_duration_ms integer,
  attachments_count integer not null default 0 check (attachments_count between 0 and 10),
  upload_token_hash text,
  upload_expires_at timestamptz,

  -- Retention (GDPR) — default 24 mesi, da validare con il legale
  retention_until  date not null default ((now() + interval '24 months')::date)
);
create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);
create index leads_service_idx on public.leads (service);
create index leads_phone_created_idx on public.leads (phone, created_at desc);
create index leads_partner_idx on public.leads (assigned_partner_id);

create table public.lead_events (
  id          bigint generated always as identity primary key,
  lead_id     uuid not null references public.leads (id) on delete cascade,
  created_at  timestamptz not null default now(),
  type        text not null check (type in ('created', 'status_changed', 'assigned', 'note', 'attachment', 'notification', 'partner_response')),
  from_status text,
  to_status   text,
  actor       uuid, -- auth.users.id (null = sistema)
  payload     jsonb not null default '{}'::jsonb
);
create index lead_events_lead_idx on public.lead_events (lead_id, created_at);

create table public.lead_assignments (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references public.leads (id) on delete cascade,
  partner_id    uuid not null references public.partners (id) on delete restrict,
  assigned_at   timestamptz not null default now(),
  assigned_by   uuid default auth.uid(),
  status        text not null default 'offered' check (status in ('offered', 'accepted', 'rejected', 'expired', 'cancelled')),
  responded_at  timestamptz,
  price_charged numeric(10, 2) check (price_charged is null or price_charged >= 0),
  commission_amount numeric(12, 2) check (commission_amount is null or commission_amount >= 0),
  outcome       text check (outcome in ('won', 'lost', 'pending')),
  notes         text check (length(notes) <= 2000),
  unique (lead_id, partner_id)
);
create index lead_assignments_partner_idx on public.lead_assignments (partner_id, assigned_at desc);

create table public.lead_notes (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads (id) on delete cascade,
  created_at timestamptz not null default now(),
  author     uuid default auth.uid(),
  body       text not null check (length(body) between 1 and 4000)
);
create index lead_notes_lead_idx on public.lead_notes (lead_id, created_at);

create table public.lead_attachments (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads (id) on delete cascade,
  created_at timestamptz not null default now(),
  path       text not null unique,
  mime_type  text not null,
  size_bytes integer not null check (size_bytes > 0 and size_bytes <= 10485760)
);
create index lead_attachments_lead_idx on public.lead_attachments (lead_id);

-- ---------------------------------------------------------------------
-- Admin
-- ---------------------------------------------------------------------
create table public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  role       text not null default 'admin' check (role in ('admin', 'viewer'))
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admin_users a where a.user_id = auth.uid() and a.role = 'admin');
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admin_users a where a.user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------
-- Trigger: updated_at, log eventi, assegnazioni
-- ---------------------------------------------------------------------
create or replace function private.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger leads_touch before update on public.leads
  for each row execute function private.touch_updated_at();
create trigger partners_touch before update on public.partners
  for each row execute function private.touch_updated_at();

create or replace function private.log_lead_status()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    insert into public.lead_events (lead_id, type, to_status, actor, payload)
    values (new.id, 'created', new.status, auth.uid(),
            jsonb_build_object('service', new.service, 'tier', new.lead_tier, 'source', new.source));
  elsif new.status is distinct from old.status then
    insert into public.lead_events (lead_id, type, from_status, to_status, actor)
    values (new.id, 'status_changed', old.status, new.status, auth.uid());
  end if;
  return new;
end;
$$;

create trigger leads_log_status after insert or update of status on public.leads
  for each row execute function private.log_lead_status();

create or replace function private.on_assignment()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  update public.leads
     set assigned_partner_id = new.partner_id,
         assigned_at = new.assigned_at,
         status = case when status in ('new', 'qualified') then 'assigned' else status end
   where id = new.lead_id;
  insert into public.lead_events (lead_id, type, actor, payload)
  values (new.lead_id, 'assigned', auth.uid(), jsonb_build_object('partner_id', new.partner_id));
  return new;
end;
$$;

create trigger lead_assignments_after_insert after insert on public.lead_assignments
  for each row execute function private.on_assignment();

create or replace function private.on_note()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.lead_events (lead_id, type, actor) values (new.lead_id, 'note', auth.uid());
  return new;
end;
$$;
create trigger lead_notes_after_insert after insert on public.lead_notes
  for each row execute function private.on_note();

-- ---------------------------------------------------------------------
-- RPC di ingestione (chiamate SOLO dal server con il segreto)
-- ---------------------------------------------------------------------
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
    service, property_type, square_meters, timeline, budget_range, description,
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

-- Registra gli allegati caricati (verifica che esistano davvero nello storage)
create or replace function public.register_lead_attachments(p_secret text, p_lead_id uuid, p_token text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if not private.verify_ingest_secret(p_secret) then
    raise exception 'unauthorized' using errcode = '42501';
  end if;

  if not exists (
    select 1 from public.leads l
     where l.id = p_lead_id
       and l.upload_token_hash = encode(extensions.digest(p_token, 'sha256'), 'hex')
       and l.upload_expires_at > now() - interval '10 minutes'
  ) then
    return jsonb_build_object('ok', false, 'error', 'invalid_token');
  end if;

  insert into public.lead_attachments (lead_id, path, mime_type, size_bytes)
  select p_lead_id, o.name,
         coalesce(o.metadata ->> 'mimetype', 'application/octet-stream'),
         coalesce((o.metadata ->> 'size')::integer, 1)
    from storage.objects o
   where o.bucket_id = 'lead-uploads'
     and o.name like p_lead_id::text || '/' || p_token || '/%'
  on conflict (path) do nothing;

  select count(*) into v_count from public.lead_attachments where lead_id = p_lead_id;

  update public.leads set attachments_count = least(v_count, 10) where id = p_lead_id;
  insert into public.lead_events (lead_id, type, payload)
  values (p_lead_id, 'attachment', jsonb_build_object('count', v_count));

  return jsonb_build_object('ok', true, 'count', v_count);
end;
$$;

create or replace function public.submit_partner_application(p_secret text, p_app jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_ip text := nullif(p_app ->> 'ip_hash', '');
begin
  if not private.verify_ingest_secret(p_secret) then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  if v_ip is not null and not private.hit_rate_limit('partner:' || v_ip, 3, 3600) then
    return jsonb_build_object('ok', false, 'error', 'rate_limited');
  end if;

  insert into public.partner_applications (
    business_name, contact_name, phone, email, vat_number, services, areas_text, message,
    consent_privacy, privacy_version, ip_hash
  ) values (
    p_app ->> 'business_name', p_app ->> 'contact_name', p_app ->> 'phone',
    nullif(p_app ->> 'email', ''), nullif(p_app ->> 'vat_number', ''),
    coalesce(array(select jsonb_array_elements_text(p_app -> 'services')), '{}'),
    nullif(p_app ->> 'areas_text', ''), nullif(p_app ->> 'message', ''),
    (p_app ->> 'consent_privacy')::boolean, p_app ->> 'privacy_version', v_ip
  ) returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

-- ---------------------------------------------------------------------
-- Routing: partner suggeriti per un lead (servizio + zona + capacità)
-- ---------------------------------------------------------------------
create or replace function public.suggest_partners(p_lead_id uuid)
returns table (partner_id uuid, business_name text, exclusive_area boolean, leads_today bigint, max_leads_day integer, match_area boolean)
language sql
stable
security invoker
set search_path = ''
as $$
  with l as (select * from public.leads where id = p_lead_id)
  select p.id, p.business_name, p.exclusive_area,
         (select count(*) from public.lead_assignments a
           where a.partner_id = p.id and a.assigned_at > date_trunc('day', now())) as leads_today,
         p.max_leads_day,
         (l.area_slug is not null and l.area_slug = any (p.areas)) as match_area
    from public.partners p, l
   where p.active
     and l.service = any (p.services)
     and (p.max_leads_day is null or
          (select count(*) from public.lead_assignments a
            where a.partner_id = p.id and a.assigned_at > date_trunc('day', now())) < p.max_leads_day)
   order by (l.area_slug is not null and l.area_slug = any (p.areas)) desc,
            p.exclusive_area desc,
            p.business_name;
$$;

-- ---------------------------------------------------------------------
-- Dashboard (asset value) — viste con security_invoker (rispettano RLS)
-- ---------------------------------------------------------------------
create or replace view public.v_lead_daily with (security_invoker = true) as
select date_trunc('day', created_at)::date as day,
       coalesce(source, 'unknown') as source,
       service,
       city,
       coalesce(landing_page, '') as landing_page,
       count(*) as leads,
       count(*) filter (where status not in ('invalid', 'duplicate')) as valid_leads,
       count(*) filter (where status in ('qualified', 'assigned', 'contacted', 'appointment', 'quote_sent', 'won')) as qualified_leads,
       count(*) filter (where assigned_partner_id is not null) as assigned_leads,
       count(*) filter (where status = 'won') as won_leads,
       coalesce(sum(revenue), 0) as revenue,
       coalesce(sum(job_value) filter (where status = 'won'), 0) as job_value
  from public.leads
 group by 1, 2, 3, 4, 5;

-- ---------------------------------------------------------------------
-- Retention GDPR (da schedulare con pg_cron dopo validazione legale)
-- ---------------------------------------------------------------------
create or replace function private.purge_expired_leads()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare v_n integer;
begin
  delete from public.leads where retention_until < current_date;
  get diagnostics v_n = row_count;
  return v_n;
end;
$$;

-- ---------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------
alter table public.services enable row level security;
alter table public.service_areas enable row level security;
alter table public.partners enable row level security;
alter table public.partner_applications enable row level security;
alter table public.leads enable row level security;
alter table public.lead_events enable row level security;
alter table public.lead_assignments enable row level security;
alter table public.lead_notes enable row level security;
alter table public.lead_attachments enable row level security;
alter table public.admin_users enable row level security;
alter table private.app_config enable row level security;
alter table private.rate_limits enable row level security;

-- Cataloghi: lettura pubblica innocua (nessuna PII); scrittura solo admin
create policy services_read on public.services for select to anon, authenticated using (active);
create policy services_admin on public.services for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy areas_read on public.service_areas for select to anon, authenticated using (active);
create policy areas_admin on public.service_areas for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Dati sensibili: SOLO staff/admin autenticati. Nessuna policy per anon.
create policy leads_staff_read on public.leads for select to authenticated using (public.is_staff());
create policy leads_admin_update on public.leads for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy leads_admin_delete on public.leads for delete to authenticated using (public.is_admin());

create policy events_staff_read on public.lead_events for select to authenticated using (public.is_staff());

create policy partners_staff_read on public.partners for select to authenticated using (public.is_staff());
create policy partners_admin_write on public.partners for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy apps_staff_read on public.partner_applications for select to authenticated using (public.is_staff());
create policy apps_admin_update on public.partner_applications for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy apps_admin_delete on public.partner_applications for delete to authenticated using (public.is_admin());

create policy assignments_staff_read on public.lead_assignments for select to authenticated using (public.is_staff());
create policy assignments_admin_write on public.lead_assignments for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy notes_staff_read on public.lead_notes for select to authenticated using (public.is_staff());
create policy notes_admin_insert on public.lead_notes for insert to authenticated with check (public.is_admin());

create policy attachments_staff_read on public.lead_attachments for select to authenticated using (public.is_staff());

create policy admin_users_self on public.admin_users for select to authenticated using (user_id = auth.uid());

-- ---------------------------------------------------------------------
-- Privilegi (difesa in profondità oltre a RLS)
-- ---------------------------------------------------------------------
revoke all on all tables in schema public from anon;
grant select on public.services, public.service_areas to anon;
revoke insert, update, delete, truncate, references, trigger on all tables in schema public from authenticated;
grant select on all tables in schema public to authenticated;
grant update on public.leads, public.partner_applications to authenticated;
grant insert, update, delete on public.partners, public.lead_assignments, public.services, public.service_areas to authenticated;
grant delete on public.leads, public.partner_applications to authenticated;
grant insert on public.lead_notes to authenticated;
revoke all on all tables in schema private from anon, authenticated;

-- Funzioni: revoca di default, poi grant mirati
revoke execute on all functions in schema public from public, anon, authenticated;
revoke execute on all functions in schema private from public, anon, authenticated;
grant execute on function public.submit_lead(text, jsonb) to anon, authenticated;
grant execute on function public.register_lead_attachments(text, uuid, text) to anon, authenticated;
grant execute on function public.submit_partner_application(text, jsonb) to anon, authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_staff() to authenticated;
grant execute on function public.suggest_partners(uuid) to authenticated;

-- ---------------------------------------------------------------------
-- Storage: bucket PRIVATO per foto/planimetrie
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lead-uploads', 'lead-uploads', false, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Upload consentito solo in <lead_id>/<upload_token>/<file> con token valido (30 min) e max 5 file
create or replace function private.can_upload_lead_file(p_name text)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_parts text[] := string_to_array(p_name, '/');
  v_lead uuid;
  v_existing integer;
begin
  if array_length(v_parts, 1) <> 3 or v_parts[2] !~ '^[0-9a-f]{48}$' or v_parts[3] !~ '^[a-z0-9-]{1,64}\.(jpg|jpeg|png|webp|heic|heif|pdf)$' then
    return false;
  end if;
  begin
    v_lead := v_parts[1]::uuid;
  exception when others then
    return false;
  end;
  if not exists (
    select 1 from public.leads l
     where l.id = v_lead
       and l.upload_token_hash = encode(extensions.digest(v_parts[2], 'sha256'), 'hex')
       and l.upload_expires_at > now()
  ) then
    return false;
  end if;
  select count(*) into v_existing from storage.objects o
   where o.bucket_id = 'lead-uploads' and o.name like v_parts[1] || '/%';
  return v_existing < 5;
end;
$$;

grant usage on schema private to anon, authenticated;
grant execute on function private.can_upload_lead_file(text) to anon, authenticated;

create policy lead_uploads_insert on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'lead-uploads' and private.can_upload_lead_file(name));
create policy lead_uploads_staff_read on storage.objects for select to authenticated
  using (bucket_id = 'lead-uploads' and public.is_staff());
create policy lead_uploads_admin_delete on storage.objects for delete to authenticated
  using (bucket_id = 'lead-uploads' and public.is_admin());

-- ---------------------------------------------------------------------
-- Seed cataloghi
-- ---------------------------------------------------------------------
insert into public.services (slug, name, has_landing, sort) values
  ('ristrutturazione-completa', 'Ristrutturazione completa', true, 10),
  ('bagno', 'Ristrutturazione bagno', true, 20),
  ('cucina', 'Ristrutturazione cucina', true, 30),
  ('cartongesso', 'Cartongesso e controsoffitti', true, 40),
  ('pittura', 'Pittura e finiture', true, 50),
  ('impianti', 'Impianti elettrici e idraulici', true, 60),
  ('pavimenti', 'Pavimenti e rivestimenti', true, 70),
  ('opere-murarie', 'Opere murarie', false, 80),
  ('isolamento', 'Isolamento e cappotto termico', false, 90),
  ('facciata', 'Facciate', false, 100),
  ('altro', 'Altro', false, 999)
on conflict (slug) do nothing;

-- Zone: TUTTE non verificate finché il proprietario non conferma la copertura reale
insert into public.service_areas (slug, name, kind, parent_slug, verified) values
  ('messina', 'Messina', 'comune', null, false),
  ('messina-centro', 'Messina Centro', 'quartiere', 'messina', false),
  ('ganzirri', 'Ganzirri', 'quartiere', 'messina', false),
  ('torre-faro', 'Torre Faro', 'quartiere', 'messina', false),
  ('giostra', 'Giostra', 'quartiere', 'messina', false),
  ('tremestieri', 'Tremestieri', 'quartiere', 'messina', false),
  ('galati', 'Galati', 'quartiere', 'messina', false),
  ('milazzo', 'Milazzo', 'comune', null, false),
  ('barcellona-pozzo-di-gotto', 'Barcellona Pozzo di Gotto', 'comune', null, false),
  ('taormina', 'Taormina', 'comune', null, false)
on conflict (slug) do nothing;
