# Architettura

## Stack
- **Next.js 16.4** (App Router, Turbopack, React 19.3, TypeScript strict) — pagine pubbliche statiche/SSG, funnel e admin dinamici.
- **Tailwind CSS 4** con design token in `src/app/globals.css` (`@theme`).
- **Supabase** (Postgres 17, Auth, Storage) — progetto `messinacasa360`, regione **eu-central-1** (Francoforte).
- **Vercel** per hosting.
- Dipendenze runtime: `next`, `react`, `react-dom`, `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `server-only`. Nessuna libreria UI (icone SVG inline, componenti propri). Font di sistema (zero richieste esterne).

## Struttura
```
src/
  config/site.ts        configurazione centrale (URL, brand, contatti, indicizzazione) — tutto via env
  config/services.ts    catalogo servizi + contenuti landing + FAQ
  config/guides.ts      metadati guide
  lib/seo.ts            metadata (canonical/OG) + entity graph Schema.org
  lib/lead-schema.ts    validazione zod condivisa (funnel/API)
  lib/scoring.ts        lead scoring, anti-spam, deriveSource
  lib/phone.ts          normalizzazione telefoni IT → E.164
  lib/attribution.ts    UTM/gclid/landing/referrer (sessionStorage)
  lib/analytics.ts      eventi GA4 senza PII (whitelist)
  lib/notify.ts         Telegram + webhook firmato HMAC
  lib/supabase/*        client: ingest (RPC con segreto), sessione admin (RLS)
  lib/upload-client.ts  compressione immagini + upload su bucket privato
  proxy.ts              redirect dominio canonico + guardia /admin
  app/                  route (vedi README)
supabase/migrations/    schema SQL versionato
tests/                  unit test vitest
docs/                   documentazione
```

## Principi
- **Indipendenza dal dominio:** nessun URL assoluto hardcoded. `site.url` deriva da `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL`. Canonical, sitemap, robots, OG, Schema e llms.txt usano `absoluteUrl()`.
- **Indicizzazione esplicita:** `NEXT_PUBLIC_SITE_INDEXABLE=true` **e** `VERCEL_ENV=production` sono entrambi necessari. Altrimenti meta `noindex` + header `X-Robots-Tag: noindex, nofollow` su ogni risposta.
- **Least privilege:** il server usa solo la chiave *publishable*; nessuna service-role key nell'app. Scritture pubbliche solo via RPC che verificano un segreto server.
- **Contenuto prima del JS:** landing e guide sono HTML statico; JS solo per wizard, menu mobile, consenso.

## Flusso richiesta
Browser → `POST /api/leads/` (Vercel Function, same-origin check, zod, honeypot, tempo minimo, Turnstile opzionale, scoring) → `rpc submit_lead(secret, payload)` (rate limit, duplicati, insert) → risposta con `uploadToken` → upload diretto su Storage privato (policy su token) → `POST /api/leads/attachments/` → `rpc register_lead_attachments` → notifica Telegram/webhook in `after()`.
