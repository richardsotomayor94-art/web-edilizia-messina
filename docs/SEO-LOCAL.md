# Local SEO

## Entity
`MessinaCasa360 (Organization) → servizi per la casa (Service) → Messina (City, Sicilia) → professionisti locali (partner)`.
Il sito si presenta come **servizio di intermediazione**, non come impresa: nessun `LocalBusiness`/`GeneralContractor`/`Electrician`/`Plumber`.

## areaServed
- Organization e Service: `City: Messina` = area in cui **raccogliamo richieste** (non una promessa di copertura per ogni quartiere).
- Zone in DB (`service_areas`): Messina Centro, Ganzirri, Torre Faro, Giostra, Tremestieri, Galati, Milazzo, Barcellona P.G., Taormina — tutte `verified = false`.
- **Non pubblicate come copertura reale** finché il proprietario non conferma partner attivi. Quando confermate: impostare `verified = true` e (eventualmente) estendere `areaServed`.

## Contenuto locale non spam
Ogni landing ha una sezione "Cosa sapere a Messina" con elementi verificabili (ricostruzione post-1908, zona sismica 1, effetto dell'aerosol marino, regole condominiali, L.R. Sicilia 16/2016) invece di ripetere "Messina" nel testo.

Fatti locali verificati il 2026-11-09, con fonti citate in `/guide/lavori-casa-messina-verifiche-zona/`: zona sismica 1 (DGR 81/2022), Piano Borzì del 1911, tutela art. 142 D.Lgs. 42/2004 per costa, laghi e riserve, Riserva di Capo Peloro, alluvione del 2009, PAI, Sportello Telematico. I punti non verificati sono elencati in [REBUILD-2026-11.md](./REBUILD-2026-11.md).

## Google Business Profile
**NON IDONEO** per il modello lead-gen (vedi GBP-ELIGIBILITY.md). Non creato. Decisione del proprietario richiesta.

## Citazioni
Non creare citazioni con l'URL `.vercel.app`. Dopo il dominio definitivo: valutare solo directory che accettano servizi online/intermediari, senza indirizzo fittizio.

## Pagine territoriali (future)
Solo se: domanda misurata in Search Console, partner reali in zona, contenuto distinto (es. specificità di Milazzo/Taormina, regole locali). Mai copie.
