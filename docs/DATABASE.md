# Database (Supabase)

Progetto: `messinacasa360` (ref `etqifeyzwpetpqtluwfs`), eu-central-1. Migrazione: `supabase/migrations/20261108000001_init_lead_crm.sql`.
Progetto **separato** da MyChef360: nessuna condivisione di dati o credenziali.

## Tabelle
| Tabella | Scopo | Accesso |
|---|---|---|
| `leads` | richiesta + attribuzione + qualificazione + consensi + pipeline + valore economico + retention | staff: read; admin: update/delete; **anon: nessuno** |
| `lead_events` | audit trail (creato, cambio stato, assegnazione, note, allegati) — scritto da trigger | staff: read |
| `lead_assignments` | lead → partner (prezzo, commissione, esito) | admin |
| `lead_notes` | note interne | staff read, admin insert |
| `lead_attachments` | metadati file (path nel bucket privato) | staff read |
| `partners` | imprese partner: servizi, zone, cap giornaliero, esclusiva, modello e prezzi | staff read, admin write |
| `partner_applications` | candidature dal sito | staff read, admin update |
| `services`, `service_areas` | cataloghi (zone con flag `verified`) | lettura pubblica, admin write |
| `admin_users` | chi è staff/admin (`role`) | self-read |
| `private.app_config` | hash SHA-256 del segreto di ingestione | nessuno (schema non esposto) |
| `private.rate_limits` | contatori a finestra fissa (chiavi già hashate) | nessuno |

Vista `v_lead_daily` (`security_invoker`): lead, validi, qualificati, assegnati, vinti, ricavi, valore lavori per giorno × fonte × servizio × città × landing.

## Stati lead
`new → qualified → assigned → contacted → appointment → quote_sent → won | lost` + `invalid`, `duplicate`.

## Funzioni
- `submit_lead(secret, jsonb)` — SECURITY DEFINER; verifica segreto, rate limit (5/h per IP-hash, 300/h globale), duplicati (stesso telefono+servizio in 72h → `duplicate`), spam ≥60 → `invalid`, genera token upload (30 min).
- `register_lead_attachments(secret, lead_id, token)` — collega i file realmente presenti nello storage.
- `submit_partner_application(secret, jsonb)` — 3/h per IP-hash.
- `suggest_partners(lead_id)` — SECURITY INVOKER; partner attivi per servizio, zona prima, esclusive prima, rispetto `max_leads_day`.
- `is_admin()`, `is_staff()` — usate dalle policy.
- `private.purge_expired_leads()` — cancella lead oltre `retention_until` (default 24 mesi). **Non schedulata**: attivare con pg_cron dopo validazione legale.

## Storage
Bucket **privato** `lead-uploads`: max 10 MB/file, MIME ammessi jpeg/png/webp/heic/heif/pdf. INSERT consentito solo su `<lead_id>/<token>/file-N.ext` con token valido e max 5 file; lettura solo staff via URL firmati (10 min).

## Creare il primo admin
1. Supabase Dashboard → Authentication → Users → *Add user* (email + password; disattivare signup pubblico in Auth settings).
2. SQL editor: `insert into public.admin_users (user_id, role) select id, 'admin' from auth.users where email = 'tua@email.it';`

## Verifiche eseguite (2026-11-08)
Come ruolo `anon`: SELECT/INSERT/UPDATE/DELETE su `leads` negati; `partners`, `lead_attachments`, `private.app_config` negati; `purge` negato; RPC con segreto errato rifiutata; cataloghi leggibili.
Funzionale (in transazione con rollback): primo lead `new` + token 48 hex; secondo identico `duplicate`; policy upload accetta solo token valido ed estensioni ammesse; rate limit attivo dopo 5 invii/ora; servizio inesistente rifiutato (FK).

## Advisor Supabase (accettati e motivati)
- `anon_security_definer_function_executable` su `submit_lead`, `register_lead_attachments`, `submit_partner_application`: **voluto**, le funzioni rifiutano senza il segreto server.
- `rls_enabled_no_policy` su `private.*`: voluto (nessun accesso via API).
