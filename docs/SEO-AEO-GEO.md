# AEO / GEO / AI search

## Entity graph (ID stabili da SITE_URL)
- `#organization` — Organization (provider/publisher)
- `#website` — WebSite (publisher → #organization)
- `#service-ristrutturazioni`, `#service-bagno`, `#service-cucina`, `#service-cartongesso`, `#service-imbianchino`, `#service-impianti`, `#service-pavimenti` — Service (provider → #organization, offer 0 € per l'utente)
- `#catalog` — OfferCatalog (home)
- `<url>#webpage`, `#breadcrumb`, `#faq`, `#article` per pagina
Tipi usati: Organization, WebSite, WebPage/AboutPage/ContactPage/CollectionPage, Service, OfferCatalog, BreadcrumbList, FAQPage, Article. Validazione locale: JSON valido, @id coerenti.
**Nota FAQPage:** Google ha ritirato i rich result FAQ a maggio 2026; il markup resta solo come struttura semantica per motori e IA.

## Domande target e dove rispondiamo
| Domanda | Pagina |
|---|---|
| Chi può fare una ristrutturazione a Messina? | home FAQ, /ristrutturazioni-messina/ FAQ |
| Come trovare un'impresa per ristrutturare un appartamento? | /ristrutturazioni-messina/ FAQ |
| Quanto costa ristrutturare un appartamento a Messina? | /guide/costo-ristrutturazione-casa-messina/ (fattori, nessun prezzo inventato) |
| Chi fa cartongesso a Messina? | /cartongesso-messina/ FAQ |
| Come richiedere un preventivo per rifare un bagno? | /ristrutturazione-bagno-messina/ FAQ |
| Chi può rifare un impianto durante una ristrutturazione? | /impianti-messina/ FAQ (DM 37/2008) |
| Serve la CILA? | /guide/cila-quando-serve/ |
| Bonus ristrutturazione 2026? | /guide/bonus-ristrutturazione-2026/ (fonti AdE, data) |

## Estraibilità
- Risposta diretta nella prima frase; box "In breve" nelle guide; tabelle per confronti.
- FAQ in `<details>` con testo nel DOM (non caricato via JS).
- Date di aggiornamento visibili (`<time>`), fonti ufficiali linkate.

## AI crawlability
- robots.txt non blocca crawler IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) — scelta deliberata per la visibilità GEO; modificabile in `src/app/robots.ts`.
- In staging tutto è `noindex`.
- `/llms.txt`: brand, descrizione del modello, come funziona, servizi, guide, pagine utili. Complemento a basso rischio: non è uno standard riconosciuto dai motori e Google dichiara di non usarlo nella ricerca. **Non** è un requisito né un fattore di ranking.
- Attribuzione: referrer da chatgpt.com/perplexity/gemini/copilot/claude → `source = ai` nei lead.

## Verdetto
AEO/GEO: **PASS** per l'MVP (struttura, entità, estraibilità). Citazioni esterne: zero (sito nuovo) — da costruire dopo il dominio definitivo.
