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
