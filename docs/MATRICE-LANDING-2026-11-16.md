# Matrice delle landing — 2026-11-16

Fonti: audit automatico di tutte le landing (title, meta, H1/H2, parole, FAQ, collegamenti nel contenuto, JSON-LD, overflow a 360/390/768/1024/1440, CTA), ricerche per servizio con fonti ufficiali, test del funnel. **Volumi di ricerca: DATA NOT AVAILABLE** (nessuno strumento di dati di ricerca collegato; SERP osservate solo in modo approssimativo, non da google.it).

Legenda: **IN/OUT** = collegamenti ad altre landing presenti nel contenuto principale (senza menu e footer, che collegano già tutte le pagine). **Stato:** PRONTA = pronta per l'indicizzazione quando sarà autorizzata; PREPARATA = completa ma «in preparazione» (noindex finché i professionisti non sono confermati).

| Landing | Intento principale | Tema locale | Temi secondari | IN | OUT | Cannibalizzazione | SEO | Local SEO | GEO/AEO | Performance | Funnel | Stato |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| /ristrutturazioni-messina/ | Ristrutturare casa o appartamento | Ristrutturazione a Messina, zona sismica, centro post-1908 | chiavi in mano, CILA, costi | 9 | 5 | PASS (hub) | PASS | PASS | PASS | PASS | PASS | PRONTA |
| /ristrutturazione-bagno-messina/ | Rifare il bagno | Bagno a Messina | DM 37, CILA, costi | 4 | 3 | PASS | PASS | PASS | PASS | PASS | PASS | PRONTA |
| /ristrutturazione-cucina-messina/ | Rifare la cucina | Cucina a Messina | impianti, varco, costi | 3 | 3 | PASS | PASS | PASS | PASS | PASS | PASS | PRONTA |
| /cartongesso-messina/ | Pareti e controsoffitti in cartongesso | Cartongesso a Messina | isolamento, costi | 4 | 4 | PASS | PASS | PASS | PASS | PASS | PASS | PRONTA |
| /imbianchino-messina/ | Tinteggiare casa | Imbianchino a Messina | muffa, pitture | 9 | 4 | WARN (muffa ↔ Risanamento, rimando aggiunto) | PASS | PASS | PASS | PASS | PASS | PRONTA |
| /impianti-messina/ | Rifare impianti | Impianti a Messina | DM 37, conformità | 5 | 3 | PASS | PASS | PASS | PASS | PASS | PASS | PRONTA |
| /pavimenti-messina/ | Posare o rifare pavimenti | Pavimenti a Messina | gres, parquet, resina | 5 | 4 | PASS | PASS | PASS | PASS | PASS | PASS | PRONTA |
| /rifacimento-facciata-messina/ | Rifare la facciata | Facciate a Messina, condominio | frontalini, assemblea, bonus | 6 | 4 | WARN (frontalini ↔ Restauro tecnico, rimando aggiunto) | PASS | PASS | PASS | PASS | PASS | PRONTA |
| /impermeabilizzazione-terrazzi-messina/ | Fermare infiltrazioni da terrazzi | Terrazzi a Messina | lastrico, condominio | 4 | 4 | WARN (infiltrazioni ↔ Risanamento, rimando aggiunto) | PASS | PASS | PASS | PASS | PASS | PRONTA |
| /cappotto-termico-messina/ | Isolare l'edificio | Cappotto in zona climatica B | interno/esterno, condominio | 4 | 3 | PASS | PASS | PASS | PASS | PASS | PASS | PRONTA |
| /sabbiatura-messina/ | Sabbiare travi, ferro, muri rustici | Sabbiatura a Messina, salsedine | idrosabbiatura, ghiaccio secco, silice | 3 | 4 | PASS (separata da Microsabbiatura) | PASS | PASS | PASS | PASS | PASS | PREPARATA |
| /microsabbiatura-messina/ | Pulitura di precisione di pietra e decori | Portali e cornici del centro, Soprintendenza | tasselli, croste nere, laser | 4 | 3 | PASS (possiede il confronto) | PASS | PASS | PASS | PASS | PASS | PREPARATA |
| /restauro-e-pulizia-messina/ | Oggetti: tombe, marmi, porte, mobili | Cimiteri di Messina, imprese autorizzate | lapidi, muschio, legno | 3 | 4 | PASS (solo oggetti) | PASS | PASS | PASS | PASS | PASS | PREPARATA |
| /restauro-tecnico-messina/ | Ripristino del calcestruzzo armato | Zona sismica 1, salsedine sui ferri | balconi, cornicioni, carbonatazione | 4 | 3 | WARN (termine poco usato; frontalini ↔ Facciate) | PASS | PASS | PASS | PASS | PASS | PREPARATA |
| /restauro-conservativo-messina/ | Restauro e risanamento conservativo, edifici storici | Centro post-1908, Soprintendenza BB.CC.AA. | DPR 380 art. 3, CILA/SCIA, vincoli | 5 | 4 | WARN (lessicale ↔ Risanamento) | PASS | PASS | PASS | PASS | PASS | PREPARATA |
| /risanamento-conservazione-messina/ | Muri umidi e degrado delle murature | Piani terra, sali marini | risalita/condensa/infiltrazione, diagnosi | 5 | 3 | WARN (lessicale ↔ Conservativo) | PASS | PASS | PASS | PASS | PASS | PREPARATA |
| /sgomberi-smaltimento-messina/ | Svuotare cantine, case, garage | Ritiro ingombranti MessinaServizi vs impresa | Albo, FIR, RAEE | 3 | 3 | PASS | PASS | PASS | PASS | PASS | PASS | PREPARATA |
| /traslochi-messina/ | Fare un trasloco di casa | Suolo pubblico Comune e Città Metropolitana, villaggi collinari | autoscala, danni (art. 1693), inventario | 3 | 3 | PASS | PASS | PASS | PASS | PASS | PASS | PREPARATA |
| /giardinaggio-messina/ | Manutenzione di giardini e siepi | Clima estivo secco, bruciature vietate | L. 154/2016, distanze dal confine | 2 | 2 | PASS | PASS | PASS | PASS | PASS | PASS | PREPARATA (collegamenti deboli) |

## Performance: prima e dopo, sulla demo

Lighthouse mobile, mediana di 3 misure, con un Chrome nuovo per ogni misura. **Avvertenza:** il PC era sotto carico (CPU 79–93%), quindi il TBT è gonfiato e poco affidabile; LCP, CLS e peso sono confrontabili.

| Pagina | Prima (score / LCP / CLS / peso) | Dopo (score / LCP / CLS / peso) | Esito |
|---|---|---|---|
| / | 77 / 1,11 s / 0 / 450 KB | 77 / 1,08 s / 0 / 454 KB | PASS |
| /pavimenti-messina/ | 83 / 2,28 s / 0 / 369 KB | 84 / 2,46 s / 0 / 371 KB | WARN: LCP vicino a 2,5 s, già noto prima di questo lavoro |
| /sabbiatura-messina/ | 81 / 1,83 s / 0 / 363 KB | 80 / 1,83 s / 0 / 365 KB | PASS |
| /preventivo/ | 86 / 1,09 s / 0 / 305 KB | 82 / 0,93 s / 0 / 309 KB | PASS (TBT 565 → 760 ms, sotto carico) |
| /traslochi-messina/ (nuova) | — | 78 / 1,69 s / 0 / 312 KB | PASS |
| /restauro-conservativo-messina/ (nuova) | — | 79 / 1,60 s / 0 / 315 KB | PASS |

Le tavole delle nuove landing pesano 25–108 KB ciascuna, prima dell'ottimizzazione di Next/Image.

## Valutazione delle 8 categorie concordate

| Criterio | Sabbiatura | Microsabb. | Traslochi | Sgomberi | Giardinaggio | Rest. tecnico | Rest. conservativo | Risanamento |
|---|---|---|---|---|---|---|---|---|
| Search intent | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Local relevance | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Unique content | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Title/H1 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Content structure | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Internal linking | PASS | PASS | PASS | PASS | WARN | PASS | PASS | PASS |
| Schema | PASS* | PASS* | PASS* | PASS* | PASS* | PASS* | PASS* | PASS* |
| FAQ | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| CTA | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Mobile | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Performance | vedi sotto | vedi sotto | vedi sotto | vedi sotto | vedi sotto | vedi sotto | vedi sotto | vedi sotto |
| Cannibalization | PASS | PASS | PASS | PASS | PASS | WARN | WARN | WARN |
| GEO/AEO | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Lead funnel | PASS | PASS | PASS** | PASS** | PASS** | PASS** | PASS** | PASS** |

\* Schema: mentre la categoria è «in preparazione» la pagina pubblica solo WebPage e BreadcrumbList, senza Service né FAQPage, per non dichiarare un servizio non ancora disponibile. Con lo stato «attivo» entrano automaticamente Service, FAQPage, sitemap, llms.txt e il catalogo della home.
\** Il funnel è verificato fino all'invio (intercettato nei test). La migrazione `20261116000001` è stata **applicata il 2026-11-16** con autorizzazione: `submit_lead` e l'instradamento sono verificati per tutte le 8 categorie.
