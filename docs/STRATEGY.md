# Strategia e decisioni (output pre-implementazione A–O)

Data: 2026-11-08. Fonti di dettaglio: [SEO-KEYWORDS.md](./SEO-KEYWORDS.md), [SEO-COMPETITORS.md](./SEO-COMPETITORS.md),
[GBP-ELIGIBILITY.md](./GBP-ELIGIBILITY.md), [LEGAL-RESEARCH-NOTES.md](./LEGAL-RESEARCH-NOTES.md), [BRAND-DOMAIN.md](./BRAND-DOMAIN.md).

## A. Brand raccomandato
**MessinaCasa360** — dominio `messinacasa360.it` disponibile al controllo del 2026-11-08 (non acquistato). Dettagli e 3 alternative in BRAND-DOMAIN.md.

## B. Business model
Piattaforma di **lead generation trasparente**: l'utente descrive il lavoro → richiesta qualificata e attribuita → inoltro a max 3 partner locali → sopralluogo → lavoro. Il sito dichiara apertamente di non essere un'impresa edile.
Lo schema DB supporta già tutti i modelli: costo per lead (`partners.lead_price`, `lead_assignments.price_charged`), commissione (`commission_rate`, `commission_amount`, `leads.job_value`), esclusiva di zona (`exclusive_area`, `monthly_fee`), affitto/vendita asset (`billing_model = asset_rent`, dashboard `v_lead_daily`).

## C. Market analysis (sintesi)
- Le SERP locali sono dominate da **directory programmatiche** (ProntoPro, Cronoshare, Instapro, StarOfService, PagineGialle, Edilnet, Ristrutturazioni.com, edilizia.com, Virgilio). Nessuna impresa locale ha pagine di servizio forti.
- Diverse query ("rifacimento bagno Messina", "cappotto termico Messina", "ristrutturazione cucina Messina") mostrano SERP "sporche" (news, PDF, annunci): **spazio per pagine di servizio utili**.
- Volumi di ricerca: **N/D** (nessuna fonte affidabile in sessione). Da misurare con Search Console / Keyword Planner.

## D. Competitor summary
- **Directory:** pagine città-servizio quasi identiche, recensioni non sempre verificabili, prezzi contraddittori senza fonte, nessuna chiarezza su quante imprese ricevono la richiesta.
- **Imprese locali:** Impresit (benchmark più forte: prezzo fisso, garanzia, FAQ), Edil Raffa (pagine servizio), altre con SEO tecnico debole.
- **Gap sfruttabili:** trasparenza sul modello, funnel qualificato con foto, contenuti su CILA/Sicilia e bonus 2026 con fonti datate, specificità di Messina (sismica, salsedine, edilizia post-1908), FAQ estraibili da IA.

## E. Keyword clusters
Generale (`/`), Ristrutturazioni (+appartamento, chiavi in mano), Bagno (+rifacimento), Cucina, Cartongesso (+controsoffitti), Pittura (imbianchino), Impianti (elettrico+idraulico in ristrutturazione), Pavimenti; P3: Cappotto, Facciate, Opere murarie. Informativi: costo ristrutturazione, bonus 2026, CILA.

## F. Information architecture (implementata)
```
/                                   home (brand + "impresa edile Messina")
/ristrutturazioni-messina/          P1
/ristrutturazione-bagno-messina/    P1
/ristrutturazione-cucina-messina/   P2
/cartongesso-messina/               P2
/imbianchino-messina/               P2
/impianti-messina/                  P2
/pavimenti-messina/                 P2
/guide/  + 3 guide (costo, bonus 2026, CILA)
/preventivo/  /preventivo/grazie/   funnel (noindex)
/come-funziona/  /come-selezioniamo-i-professionisti/  /chi-siamo/  /contatti/  /diventa-partner/
/privacy/  /cookie/  /termini/      bozze (noindex)
/admin/…                            area riservata
/robots.txt /sitemap.xml /llms.txt /og.png
```
**Non creati (di proposito):** pagine città×servizio (no doorway), cappotto/facciate/opere murarie (domanda locale da validare: restano selezionabili nel funnel).

## G. Database architecture
Vedi [DATABASE.md](./DATABASE.md): `leads`, `lead_events`, `lead_assignments`, `lead_notes`, `lead_attachments`, `partners`, `partner_applications`, `services`, `service_areas`, `admin_users`, vista `v_lead_daily`.

## H. Lead flow
Vedi [LEAD-FLOW.md](./LEAD-FLOW.md).

## I. SEO strategy
SEO tecnico completo dal giorno 1 (canonical da config, sitemap, robots, Schema.org, breadcrumbs, 404, redirect varianti), landing per intento distinto, contenuto utile senza prezzi inventati, internal linking servizi↔guide↔correlati. Vedi [SEO-AUDIT.md](./SEO-AUDIT.md) e [SEO-LOCAL.md](./SEO-LOCAL.md).

## J. AEO/GEO strategy
FAQ in HTML (non JS), risposte dirette nella prima frase, "In breve" nelle guide, entity graph coerente, `llms.txt`, crawler IA non bloccati. Vedi [SEO-AEO-GEO.md](./SEO-AEO-GEO.md).

## K. Security plan
Vedi [SECURITY.md](./SECURITY.md).

## L. GDPR data flow
Vedi [GDPR-DATA-FLOW.md](./GDPR-DATA-FLOW.md).

## M. MVP scope (consegnato)
Sito completo + funnel 8 step con upload + DB/RLS + scoring + attribuzione + notifiche opzionali + admin (lead, partner, export) + SEO/AEO + documentazione.

## N. Future features
Partner portal (login partner, inbox, accetta/rifiuta, note, appuntamenti, preventivi, esito), routing automatico, pagamenti partner (Stripe), dashboard Search Console + GA4 + DB, recensioni verificate post-lavoro, portfolio reale prima/dopo, pagine P3 se la domanda è confermata, eventuali pagine territoriali con contenuto distinto.

## O. Costi esterni previsti
| Voce | Oggi | Nota |
|---|---|---|
| Supabase | 0 € (piano Free) | Il piano Free mette in pausa i progetti inattivi; per l'uso commerciale valutare Pro. Prezzi da verificare su supabase.com/pricing. |
| Vercel | 0 € (Hobby) | **Attenzione:** il piano Hobby è destinato a uso personale non commerciale. Per un sito commerciale serve **Pro** (prezzo da verificare su vercel.com/pricing). Decisione del proprietario. |
| Dominio .it (+ .com difensivo) | non acquistato | Costo annuo da verificare sul registrar scelto. |
| Telegram Bot, Cloudflare Turnstile, GA4, Search Console | 0 € | Opzionali. |
| WhatsApp Business API | non attivata | A pagamento per conversazione: richiede decisione. |
| Revisione legale (privacy, termini, inquadramento attività) | da preventivare | **Necessaria** prima del lancio commerciale. |
