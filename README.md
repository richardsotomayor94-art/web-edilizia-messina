# MessinaCasa360 — lead generation edilizia Messina

Asset digitale locale di **lead generation trasparente** per ristrutturazioni, lavori edili e servizi per la casa a Messina e provincia.
L'utente descrive il lavoro → la richiesta viene qualificata, attribuita e salvata → inoltrata a max 3 imprese/artigiani partner → sopralluogo → lavoro.
Il sito **non** si presenta come impresa edile.

> Nome provvisorio/raccomandato: **MessinaCasa360** (configurabile, vedi `docs/BRAND-DOMAIN.md`). Dominio consigliato `messinacasa360.it`, **non acquistato**.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Supabase (Postgres, Auth, Storage, EU) · Vercel.

## Avvio locale
```bash
cp .env.example .env.local   # compila i valori (mai committare)
npm install
npm run dev                  # http://localhost:3000
npm run check                # typecheck + lint + unit test
npm run build && npm start
```

## Variabili segrete (server)

I valori **non** stanno nel repository: vanno in Vercel → progetto `messinacasa360` → Settings → Environment Variables (tipo *Sensitive*, ambienti Production e Preview) e, per lo sviluppo, in `.env.local` (ignorato da git). Dopo averle aggiunte o cambiate serve un **nuovo deploy**.

| Variabile | Obbligatoria | Dove si usa | Effetto se manca |
|---|---|---|---|
| `LEAD_INGEST_SECRET` | sì, ≥ 32 caratteri | `src/lib/supabase/public.ts` → `ingestSecret()`, passato come `p_secret` alle RPC `submit_lead` (`src/app/api/leads/route.ts`), `register_lead_attachments` (`src/app/api/leads/attachments/route.ts`) e `submit_partner_application` (`src/app/api/partners/route.ts`) | le API rispondono `503 not_configured`; nessun lead salvato |
| `IP_HASH_SALT` | consigliata | `src/lib/request.ts` → `hashIp()`: SHA-256 di `salt:ip`, troncato; il risultato va in `leads.ip_hash` e nelle chiavi del rate limit | l'hash viene calcolato senza sale (funziona, ma è più debole) |

**Come Supabase valida `LEAD_INGEST_SECRET`.** Il database non conosce il segreto, solo il suo hash:
`private.app_config` contiene la riga `lead_ingest_secret_hash` = SHA-256 esadecimale del segreto. Ogni RPC di ingestione chiama `private.verify_ingest_secret(p_secret)`, che verifica `length(p_secret) >= 32` e confronta `encode(digest(p_secret, 'sha256'), 'hex')` con quell'hash. Se non coincide la RPC solleva `unauthorized` (42501). Lo schema `private` non è esposto dall'API REST. Codice: `supabase/migrations/20261108000001_init_lead_crm.sql`.

**Rotazione:** genera un nuovo valore casuale (≥ 32 caratteri), salvalo in Vercel e nel tuo gestore di password, poi aggiorna l'hash nel DB con la query in `docs/DEPLOYMENT.md`, e rifai il deploy. Il vecchio segreto smette subito di funzionare.

## Route
| Route | Tipo |
|---|---|
| `/` | home |
| `/ristrutturazioni-messina/` `/ristrutturazione-bagno-messina/` `/ristrutturazione-cucina-messina/` `/cartongesso-messina/` `/imbianchino-messina/` `/impianti-messina/` `/pavimenti-messina/` | landing servizi (SSG) |
| `/guide/` + `costo-ristrutturazione-casa-messina/`, `bonus-ristrutturazione-2026/`, `cila-quando-serve/` | guide |
| `/preventivo/` `/preventivo/grazie/` | funnel multistep (noindex) |
| `/come-funziona/` `/come-selezioniamo-i-professionisti/` `/chi-siamo/` `/contatti/` `/diventa-partner/` | istituzionali |
| `/privacy/` `/cookie/` `/termini/` | bozze legali (noindex) |
| `/admin/` `/admin/leads/[id]/` `/admin/partners/` `/admin/export/` `/admin/login/` | area riservata |
| `/api/leads/` `/api/leads/attachments/` `/api/partners/` | API |
| `/robots.txt` `/sitemap.xml` `/llms.txt` `/og.png` | SEO |

## Documentazione
- Strategia (A–O): [docs/STRATEGY.md](docs/STRATEGY.md) · Brand & domini: [docs/BRAND-DOMAIN.md](docs/BRAND-DOMAIN.md)
- [ARCHITECTURE](docs/ARCHITECTURE.md) · [DATABASE](docs/DATABASE.md) · [LEAD-FLOW](docs/LEAD-FLOW.md) · [SECURITY](docs/SECURITY.md) · [GDPR-DATA-FLOW](docs/GDPR-DATA-FLOW.md) · [DEPLOYMENT](docs/DEPLOYMENT.md)
- SEO: [AUDIT](docs/SEO-AUDIT.md) · [KEYWORDS](docs/SEO-KEYWORDS.md) · [COMPETITORS](docs/SEO-COMPETITORS.md) · [LOCAL](docs/SEO-LOCAL.md) · [AEO-GEO](docs/SEO-AEO-GEO.md) · [BASELINE](docs/SEO-BASELINE.md)
- [GBP-ELIGIBILITY](docs/GBP-ELIGIBILITY.md) · [BUSINESS-BASELINE](docs/BUSINESS-BASELINE.md) · [LEGAL-RESEARCH-NOTES](docs/LEGAL-RESEARCH-NOTES.md)

## Regole
- Niente testimonianze, numeri, anni di esperienza, recensioni o portfolio non dimostrabili.
- Niente prezzi inventati. Contenuti fiscali/legali con fonte e data.
- Niente pagine doorway città×servizio.
- Testi legali marcati **[REVISIONE LEGALE RICHIESTA]** finché non validati.
