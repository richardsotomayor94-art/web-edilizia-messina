# SEO audit tecnico (MVP) — 2026-11-08

| Area | Stato | Dettaglio |
|---|---|---|
| Semantic HTML | PASS | un H1 per pagina, H2/H3 gerarchici, `nav`/`main`/`footer`, `article` per contenuti |
| Metadata | PASS | title + description unici per pagina; template `%s \| MessinaCasa360` |
| Canonical | PASS | assoluti da `SITE_URL`, con slash finale coerente (`trailingSlash: true`) |
| Robots meta + header | PASS | staging: `noindex` (meta) + `X-Robots-Tag: noindex, nofollow`; produzione: `index, follow, max-image-preview:large` |
| robots.txt | PASS | blocca `/api/`, `/admin/`, `/preventivo/grazie/`; sitemap dichiarata solo in produzione |
| sitemap.xml | PASS | 16 URL canoniche indicizzabili (no funnel, no legali in bozza, no admin) |
| OpenGraph / Twitter | PASS | `og:image` 1200×630 (`/og.png`) su tutte le pagine |
| Breadcrumbs | PASS | visibili + `BreadcrumbList` |
| 404 | PASS | status 404 reale, link ai servizi |
| Redirect | PASS | varianti (appartamento, rifacimento bagno, pittura, controsoffitti) → URL canoniche, 308 |
| HTTPS / HSTS | PASS su Vercel | HSTS preload |
| Clean URLs | PASS | slug italiani descrittivi |
| Schema.org | PASS | vedi SEO-AEO-GEO.md |
| Mobile | PASS | nessun overflow orizzontale (iPhone 13 via Playwright), target touch ≥ 44 px |
| Immagini | PASS | nessuna immagine raster sopra la piega; icone SVG inline; nessuna stock photo |
| Font | PASS | font di sistema: zero richieste, zero CLS da font |
| Internal linking | PASS | home → servizi/guide; servizi → correlati + guida + CILA; footer con tutti i servizi |
| No doorway | PASS | nessuna pagina città×servizio |

## Lighthouse (mobile, simulato, build di produzione locale)
| Pagina | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 97 | 100 | 100 | 66* | 2.4 s | 0 | 120 ms |
| `/ristrutturazione-bagno-messina/` | 99 | 100 | 100 | 66* | 1.9 s | 0 | 120 ms |
| `/preventivo/` | 97 | 100 | 100 | 66* | 2.4 s | 0 | 100 ms |

\* unico audit fallito: `is-crawlable` (noindex voluto in staging). In modalità produzione simulata (`NEXT_PUBLIC_SITE_INDEXABLE=true`): **SEO 100**.
I valori reali (CrUX/INP) saranno misurabili solo con traffico sul dominio definitivo.

## Da fare
- Ripetere Lighthouse/PageSpeed sull'URL Vercel e poi sul dominio definitivo.
- Aggiungere foto reali (con `next/image`) quando disponibili dai partner.
