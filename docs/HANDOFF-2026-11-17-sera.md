# Stato serale — 2026-11-17 (sessione desktop "web messina")

Nessun segreto in questo file. Integra `HANDOFF-2026-11-17.md`.

## Fatto
- **DNS IONOS** (`messinacasa360.it`): A `@` → 216.150.1.1 e 216.150.16.1; CNAME `www` → `4c2fa8695a2c2b37.vercel-dns-016.com`. Rimossi A/AAAA di parcheggio e il TXT `_dep_ws_mutex` (si disattivano con il Default Site). MX, SPF, DKIM, DMARC, `_domainconnect` intatti. Vercel: `misconfigured: false`, nessun conflitto.
- **Segreti Vercel** (Sensitive, Production + Preview): `LEAD_INGEST_SECRET`, `IP_HASH_SALT` creati. Hash in `private.app_config` aggiornato; `private.verify_ingest_secret()` conferma il nuovo valore. Il valore non è salvato in nessun file: per rotarlo si segue README → "Variabili segrete".
- **Produzione** ridistribuita dal commit `4825713` (branch `rebuild/master-2026-11`): `dpl_EHH185dfuxfY93GmWLbn1RjtXj6f`, alias `www.messinacasa360.it` e `messinacasa360.it`. `X-Robots-Tag: noindex, nofollow` attivo.
- **Supabase Auth**: registrazione pubblica già disattivata (verificato in dashboard). 1 utente, 1 admin, 0 lead.

## Bloccante per ricevere lead in produzione
`intakeBlockedByLegalData()` (src/config/site.ts) fa rispondere `/api/leads/` con 503 in produzione finché mancano:
- `NEXT_PUBLIC_LEGAL_OWNER_NAME` (titolare)
- `NEXT_PUBLIC_LEGAL_ADDRESS` (indirizzo)
- email privacy (`NEXT_PUBLIC_PRIVACY_EMAIL` o `NEXT_PUBLIC_CONTACT_EMAIL`) → richiede la casella/inoltro del dominio
Sono dati reali del titolare: vanno forniti dal proprietario. Opzionali: `NEXT_PUBLIC_LEGAL_VAT`, `NEXT_PUBLIC_LEGAL_PEC`.

## Da fare
1. Email dominio (IONOS o inoltro ImprovMX) → impostare le env email.
2. Dati legali del titolare → env sopra → redeploy → E2E live (form → lead → upload → `/admin`) → pulizia dati di test.
3. Notifiche lead (Make.com/Telegram, vedi `src/lib/notify.ts`).
4. Controllare il preview fallito del 15/11 (f31450f): i deploy successivi sono tutti READY.
5. Solo con autorizzazione: indicizzazione (`NEXT_PUBLIC_SITE_INDEXABLE=true`) + Search Console.
