# Deployment

## Ambienti
| Ambiente | URL | Indicizzazione | Note |
|---|---|---|---|
| Locale | http://localhost:3000 | noindex | `.env.local` (non committato) |
| Preview (branch) | `*-<team>.vercel.app` | noindex | protetto da Vercel Authentication |
| Staging/produzione temporanea | `https://messinacasa360.vercel.app` (atteso) | **noindex** | demo condivisibile |
| Produzione definitiva | `https://messinacasa360.it` (futuro) | index | dopo acquisto dominio |

## Variabili d'ambiente (Vercel → Project → Settings → Environment Variables)
Vedi `.env.example`. Minime per il funzionamento:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (plain)
- `LEAD_INGEST_SECRET`, `IP_HASH_SALT` (**sensitive**)
- `NEXT_PUBLIC_SITE_NAME=MessinaCasa360`, `NEXT_PUBLIC_SITE_INDEXABLE=false`
`NEXT_PUBLIC_SITE_URL` può restare vuota in staging (si usa `VERCEL_PROJECT_PRODUCTION_URL`).

Se si rigenera `LEAD_INGEST_SECRET`, aggiornare anche l'hash nel DB:
```sql
update private.app_config set value = encode(extensions.digest('<NUOVO_SEGRETO>', 'sha256'), 'hex'), updated_at = now()
where key = 'lead_ingest_secret_hash';
```

## Primo deploy su Vercel (staging)
1. Vercel → Add New Project → importa `richardsotomayor94-art/web-edilizia-messina` (framework Next.js, nessun comando custom).
2. Imposta le variabili sopra (Production + Preview).
3. *Production Branch*: `main` (o il branch di lavoro finché non viene fatto il merge).
4. Deployment Protection: "Standard" (solo preview protette) → l'URL di produzione `.vercel.app` è condivisibile.
5. Verifiche: `/robots.txt` senza Sitemap, header `X-Robots-Tag: noindex`, invio di un lead di test, comparsa in `/admin/`.

**Regole staging:** non inviare a Search Console, nessun backlink o citazione verso `.vercel.app`, nessun uso del `.vercel.app` come URL aziendale.

## Migrazione al dominio definitivo (procedura futura)
1. Acquista `messinacasa360.it` (+ `.com` difensivo) — *decision gate*.
2. Vercel → Project → Settings → Domains → aggiungi `messinacasa360.it` e `www.messinacasa360.it` (imposta www → apex con redirect 308, o viceversa: sceglierne **uno** canonico).
3. DNS presso il registrar: record indicati da Vercel (A apex verso l'IP di Vercel / CNAME `www` verso `cname.vercel-dns.com`, oppure nameserver Vercel). Attendi la propagazione.
4. HTTPS: certificato emesso automaticamente da Vercel; verifica in Domains.
5. Env (Production): `NEXT_PUBLIC_SITE_URL=https://messinacasa360.it`, `NEXT_PUBLIC_SITE_INDEXABLE=true`. Redeploy.
6. Automatico dal codice: canonical, sitemap, robots (con Sitemap), Schema `@id`, OpenGraph, llms.txt usano il nuovo URL; `noindex` rimosso.
7. Redirect: `proxy.ts` reindirizza con **308** ogni host diverso dal canonico (incluso `messinacasa360.vercel.app`) → nessun contenuto duplicato. Le preview restano noindex.
8. Verifica: `curl -I https://messinacasa360.vercel.app/` → 308 verso il dominio; `curl -I https://messinacasa360.it/` → nessun X-Robots-Tag; `view-source` canonical corretto.
9. Search Console: proprietà **Dominio** (`messinacasa360.it`) con verifica DNS TXT.
10. Invia `https://messinacasa360.it/sitemap.xml`.
11. Ispeziona URL della home e delle landing P1 e richiedi l'indicizzazione (strumento manuale, non Indexing API).
12. Baseline: compila `SEO-BASELINE.md` (giorno 0) e `BUSINESS-BASELINE.md`.
13. Monitoraggio a +7 / +14 / +28 / +90 giorni.
14. Se il `.vercel.app` risultasse indicizzato: il 308 + noindex storico lo rimuovono; opzionalmente usare lo strumento Rimozioni sulla proprietà corretta solo se necessario.
15. Aggiorna dati legali (`NEXT_PUBLIC_LEGAL_*`), contatti, email privacy prima della pubblicazione.
16. Attiva Turnstile/GA4 solo se deciso (variabili già previste).

## Supabase
Migrazioni in `supabase/migrations/`. Applicate al progetto `etqifeyzwpetpqtluwfs`. Per un nuovo ambiente: `supabase db push` oppure eseguire il file nello SQL editor, poi inserire l'hash del segreto e creare l'admin (vedi DATABASE.md).
