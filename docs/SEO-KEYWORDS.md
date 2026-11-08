# Ricerca keyword e SERP — Edilizia / Ristrutturazioni Messina

Data ricerca: **2026-11-08** · Stato: prima ricognizione, da validare con dati Google reali.

---

## 1. Metodologia e limiti

**Come è stata fatta**
- 16 query principali + ~12 query long-tail/fiscali interrogate con lo strumento WebSearch (modalità *standard*, una *extended*).
- Per verificare la presenza dei portali sono state rifatte ricerche filtrate per dominio (prontopro.it, instapro.it, starofservice.it, habitissimo.it, houzz.it, paginegialle.it, edilnet.it, ristrutturazioni.com, facileristrutturare.it).
- Le informazioni fiscali vengono da pagine di agenziaentrate.gov.it ed efficienzaenergetica.enea.it. Le abbiamo lette **solo dagli estratti dei risultati di ricerca**, perché WebFetch su quei domini è bloccato dalla rete di questa sessione. Anche edilnet.it e prontopro.it non erano raggiungibili con WebFetch.

**Limiti (importanti)**
1. **WebSearch è un motore con sede negli USA, non una SERP Google.it localizzata.** L'ordine dei risultati NON corrisponde a quello che vede un utente a Messina. Abbiamo osservato molto "rumore": PDF di appalti di UniMe e della Città Metropolitana, annunci immobiliari e notizie. Su Google.it questo rumore è probabilmente minore.
2. **Local pack e Google Maps non sono osservabili** con questo strumento. Per le query commerciali "servizio + Messina" la presenza di un local pack è un'ipotesi da verificare, non un dato.
3. **Volumi di ricerca: nessuna fonte affidabile disponibile.** Tutti i volumi sono "N/D".
4. **La competizione è valutata in modo qualitativo**: tipo di domini presenti (portali nazionali con molta autorità contro schede di directory) e numero di pagine Messina-specifiche dedicate. Non abbiamo usato metriche di autorità (DR/DA).
5. Le valutazioni "chi domina" valgono solo per i risultati osservati. I domini citati sono **esclusivamente quelli comparsi davvero** nei risultati.

**Verifiche raccomandate prima di produrre contenuti**
- Google Keyword Planner (località: Messina / provincia ME, lingua italiano) per i volumi.
- Uno strumento SERP con geolocalizzazione italiana (es. SERP checker con località "Messina, Sicilia", oppure ricerca manuale da Google.it in navigazione anonima con `&gl=it&hl=it` e località impostata), per local pack e ordine reale.
- Google Search Console, dopo il lancio, per impressioni e query reali (la fonte più affidabile per decidere su P2/P3).

---

## 2. Tabella principale

Legenda competizione: **alta** = presenti ≥3 portali nazionali con pagina dedicata "servizio + Messina"; **media** = 1–2 portali dedicati più directory generiche; **bassa** = solo directory generiche o risultati non pertinenti, quindi pochi contenuti dedicati.

| QUERY | INTENT | SERP (chi domina, osservato) | LOCAL INTENT | COMPETITION (base) | SERVICE | PROPOSED URL | PRIORITY | VOLUME |
|---|---|---|---|---|---|---|---|---|
| impresa edile Messina | commerciale / navigazionale | Directory: virgilio.it (IMPRESE_EDILI), edilizia.com, reteimprese.it, impresaitalia.info, cylex-italia.it; in verifica per dominio anche prontopro.it (`messina-edile`), starofservice.it, edilnet.it, paginegialle.it, instapro.it | alto | **alta**: ≥5 directory con pagina Messina dedicata | brand / generale | `/` | P1 | N/D |
| ristrutturazioni Messina | commerciale | Directory: edilizia.com, virgilio.it, cronoshare.it (richieste lavoro); per dominio: prontopro.it, paginegialle.it, edilnet.it, ristrutturazioni.com (`/messina/`), starofservice.it. Molto rumore da notizie (Risanamento baracche, regione.sicilia.it) | alto | **alta**: tutti i portali principali hanno una pagina Messina | ristrutturazioni | `/ristrutturazioni-messina/` | P1 | N/D |
| ristrutturazione appartamento Messina | commerciale | Annunci immobiliari (tecnocasa.it, wikicasa.it, tecnorete.it, mioaffitto.it), cronoshare.it; paginegialle.it ha `ristrutturazione_appartamenti.html` | alto | **media**: SERP "sporca" (case "da ristrutturare"), pochi contenuti di servizio | ristrutturazioni | `/ristrutturazioni-messina/` (unire) | P1 | N/D |
| ristrutturazioni chiavi in mano Messina | commerciale / transazionale | edilizia.com (schede aziende), virgilio.it, reteimprese.it; prontopro.it `messina-ristrutturazione-chiavi-in-mano`; Facile Ristrutturare ha uno store a Messina (comunicato stampa) ma **non abbiamo visto** una sua pagina città Messina | alto | **media** | ristrutturazioni | `/ristrutturazioni-messina/` (unire, sezione H2 "chiavi in mano") | P1 | N/D |
| cartongesso Messina | commerciale | cronoshare.it (richieste/offerte), impresaitalia.info; per dominio: prontopro.it `messina-cartongessista` (dichiara 341 professionisti), instapro.it, paginegialle.it | alto | **media** | cartongesso | `/cartongesso-messina/` | P2 | N/D |
| controsoffitto cartongesso Messina | commerciale | cronoshare.it (2 pagine), poi PDF tecnici e appalti non pertinenti; prontopro.it `messina-controsoffitto-in-cartongesso` (74 professionisti) | alto | **bassa-media**: poche pagine dedicate | cartongesso | `/cartongesso-messina/` (unire, H2 controsoffitti) | P2 | N/D |
| rifacimento bagno Messina | commerciale | Quasi nessun risultato locale di servizio: guide nazionali (money.it, trend-online.com, italiaoggi.it), forum condominioweb.com, schede edilizia.com | alto | **bassa** (sulla variante "rifacimento") | bagno | `/ristrutturazione-bagno-messina/` (unire) | P1 | N/D |
| ristrutturazione bagno Messina | commerciale | cronoshare.it, edilizia.com; per dominio: prontopro.it (`messina-ristrutturazione-bagno`, `messina-ristrutturazione-completa-bagno`), edilnet.it (`ristrutturazione_bagno/messina/messina/`), instapro.it, paginebianche.it | alto | **alta**: ≥4 portali con pagina dedicata | bagno | `/ristrutturazione-bagno-messina/` | P1 | N/D |
| ristrutturazione cucina Messina | commerciale | cronoshare.it, edilizia.com; molto rumore (ristoranti, corsi di cucina) | alto | **bassa-media** | cucina | `/ristrutturazione-cucina-messina/` | P2 | N/D |
| imbianchino Messina | commerciale / transazionale | cronoshare.it, cylex-italia.it, impresaitalia.info, virgilio.it; per dominio: instapro.it, paginegialle.it (`imbianchini.html`), prontopro.it (`messina-imbiancatura-e-tinteggiatura`), starofservice.it | alto | **alta** | pittura | `/imbianchino-messina/` | P2 | N/D |
| pitturazione appartamento Messina | commerciale / informativo (prezzo) | **cronoshare.it `/quanto-costa/pitturare-appartamento/messina` in 1ª posizione** (8–18 €/mq), edilizia.com | alto | **media** | pittura | `/imbianchino-messina/` (unire) + guida costo | P2 | N/D |
| impianto elettrico Messina | commerciale (misto con B2B/PA) | PDF tecnici di enti pubblici, qualenergia.it (appalti), cronoshare.it, impresaitalia.info; per dominio: paginegialle.it `elettricisti.html` | alto | **media** (intento misto) | impianti | `/impianti-messina/` | P2 | N/D |
| idraulico ristrutturazioni Messina | commerciale | edilizia.com (termoidraulica), cronoshare.it, reteimprese.it, virgilio.it; per dominio: starofservice.it `servizi-idraulici` | medio-alto | **bassa-media** sulla combinazione; "idraulico Messina" da solo = intento di urgenza/riparazione (non verificato) | impianti | `/impianti-messina/` (unire) | P2 | N/D |
| pavimentazione Messina | commerciale (ambiguo) | cronoshare.it (`/quanto-costa/pavimento-laminato/messina`), edilizia.com (pavimentazioni interne/esterne, autobloccanti, stradali), houzz (Cannaò Pavimenti), virgilio.it; paginegialle.it `pavimenti.html` (vendita e posa); prontopro.it `messina-sostituzione-pavimento` | alto | **media** | pavimenti | `/pavimenti-messina/` (puntare su "posa/rifacimento pavimenti") | P2 | N/D |
| cappotto termico Messina | informativo > commerciale | Nessun risultato locale di servizio: guide nazionali (quifinanza.it, lanazione.it, biopianeta.it), manuale ANIT, forum; edilizia.com ha una categoria "isolamento termico" Messina | medio | **bassa** sul locale, **alta** sull'informativo nazionale | cappotto | `/cappotto-termico-messina/` | P3 | N/D |
| rifacimento facciata Messina | informativo / commerciale (spesso condominiale) | ingenio-web.it (articolo Ordine Ingegneri Messina sul bonus facciate, datato), PDF UniMe/Città Metropolitana, forum; prontopro.it `messina-ristrutturazione-facciata` | medio | **bassa-media** | facciate | `/rifacimento-facciata-messina/` | P3 | N/D |

### Decisioni di accorpamento (anti-cannibalizzazione)

- **`/ristrutturazioni-messina/`** raccoglie *ristrutturazioni*, *ristrutturazione appartamento*, *ristrutturazione casa* e *chiavi in mano*. **Motivo:** nei risultati osservati gli stessi domini (edilizia.com, virgilio.it, prontopro.it, paginegialle.it, edilnet.it) rispondono a tutte e tre le query con pagine-categoria simili, quindi l'intento è lo stesso: "trovare un'impresa che ristrutturi casa". ProntoPro ha pagine separate (`ristrutturazione-casa`, `ristrutturazione-chiavi-in-mano`), ma è una strategia programmatica da portale e un sito locale nuovo non ha l'autorità per sostenerla. "Chiavi in mano" diventa una sezione H2 con FAQ dedicate. **Da rivalutare** con GSC: una pagina separata ha senso solo se "chiavi in mano" mostra impressioni proprie e una SERP diversa.
- **`/ristrutturazione-bagno-messina/`** = *rifacimento bagno* + *ristrutturazione bagno* (stesso servizio; sinonimi nel title e negli H2).
- **`/cartongesso-messina/`** = *cartongesso* + *controsoffitto in cartongesso* + *pareti divisorie* (ProntoPro le separa, ma la domanda locale osservata su cronoshare è bassa e mista).
- **`/imbianchino-messina/`** = *imbianchino* + *pitturazione/tinteggiatura appartamento*. Il **costo** va in una guida separata (`/guide/costo-pitturare-casa-messina/`) per non mischiare intento transazionale e informativo, visto che cronoshare domina la query di prezzo con una pagina "quanto costa".
- **`/impianti-messina/`** = *impianto elettrico* + *idraulico per ristrutturazioni*. Si posiziona su "rifacimento impianti in ristrutturazione", **non** su "elettricista/idraulico Messina" con intento di urgenza o riparazione, che porterebbe lead non in target.
- **Homepage `/`** = *impresa edile Messina* (query di brand/categoria).
- **`/opere-murarie-messina/`**: nessuna query del set la richiede direttamente. ProntoPro ha `messina-muratore` e `messina-artigiano-edile`, quindi la domanda esiste, ma è una pagina da creare in seguito (P3).

---

## 3. Cluster keyword per servizio

Le varianti segnate con (*) sono state osservate come slug o titoli di portali. Le altre sono varianti semantiche ragionevoli **non verificate** con volumi.

| Cluster | URL | Keyword principali | Varianti / semantica |
|---|---|---|---|
| Generale / brand | `/` | impresa edile Messina | imprese edili Messina (*), ditta edile Messina, lavori edili Messina (*), artigiano edile Messina (*) |
| Ristrutturazioni | `/ristrutturazioni-messina/` | ristrutturazioni Messina | ristrutturazione casa Messina (*), ristrutturazione appartamento Messina (*), ristrutturazione chiavi in mano Messina (*), ristrutturazione interni Messina (*), ristrutturazioni edili Messina (*) |
| Bagno | `/ristrutturazione-bagno-messina/` | ristrutturazione bagno Messina | rifacimento bagno Messina, ristrutturazione completa bagno Messina (*), sostituzione vasca con doccia Messina, smaltatura vasca (*) |
| Cucina | `/ristrutturazione-cucina-messina/` | ristrutturazione cucina Messina | rifacimento cucina, sostituzione top/piano cucina (osservato nelle richieste cronoshare), impianti cucina |
| Cartongesso | `/cartongesso-messina/` | cartongesso Messina | cartongessista Messina (*), controsoffitto in cartongesso Messina (*), pareti divisorie cartongesso, controsoffitto isolato |
| Pittura | `/imbianchino-messina/` | imbianchino Messina | imbianchini Messina (*), tinteggiatura interni Messina (*), pitturazione appartamento Messina, verniciatura (*) |
| Impianti | `/impianti-messina/` | impianto elettrico Messina | rifacimento impianto elettrico, elettricisti Messina (*), idraulico ristrutturazioni Messina, termoidraulica Messina (*) |
| Pavimenti | `/pavimenti-messina/` | pavimenti Messina / posa pavimenti Messina | sostituzione pavimento Messina (*), posa laminato/parquet, pavimentista Messina (*), rivestimenti |
| Cappotto | `/cappotto-termico-messina/` | cappotto termico Messina | isolamento termico Messina (*), cappotto interno/esterno |
| Facciate | `/rifacimento-facciata-messina/` | rifacimento facciata Messina | ristrutturazione facciata Messina (*), facciate condominiali, ripristino frontalini/intonaci |
| Opere murarie | `/opere-murarie-messina/` | muratore Messina (*) | demolizioni (*), tramezzi, massetti, impermeabilizzazione terrazzi (osservata spesso nelle richieste) |

---

## 4. Long-tail e domande (stile AEO)

| Domanda / query | Intent | Pagina di destinazione | Note e fonti osservate |
|---|---|---|---|
| quanto costa ristrutturare casa a Messina (al mq) | informativo-commerciale | `/guide/costo-ristrutturazione-casa-messina/` | Pagina Messina-specifica di **edilnet.it** ("Ristrutturazione casa a Messina: quale il costo"). Un riepilogo di ricerca riporta 190–430 €/mq per chiavi in mano: attribuzione a edilnet probabile ma **non verificata** (WebFetch bloccato). |
| quanto costa rifare il bagno (a Messina) | informativo-commerciale | `/guide/costo-rifacimento-bagno/` | Solo fonti nazionali: money.it, edilizia.com (2026: 8.000–17.000 € per un rifacimento completo di 4–6 mq), cronoshare blog (3.000–10.000 €), idealista. Nessuna pagina Messina-specifica osservata → **gap**. |
| quanto costa pitturare un appartamento a Messina | informativo-commerciale | `/guide/costo-pitturare-casa-messina/` | cronoshare.it: 8–18 €/mq a Messina (stima di un singolo portale). |
| costo cartongesso al mq | informativo | `/guide/costo-cartongesso-al-mq/` | studiomadera.it (controsoffitto da 50 €/mq; pareti a doppia lastra 60–85 €/mq), idealista.it (15–50 €/mq). Le forbici sono discordanti. |
| quanto costa il cappotto termico al mq | informativo | `/guide/costo-cappotto-termico/` | studiomadera.it 80–150 €/mq; moneyside 60–120 €/mq. Attenzione: moneyside cita detrazioni al "50–65%", in contrasto con AdE 2026. Non usarla per la parte fiscale. |
| quanto costa posare un pavimento a Messina | informativo-commerciale | `/pavimenti-messina/` (sezione FAQ) | cronoshare.it: posa laminato 10–25 €/mq a Messina. |
| bonus ristrutturazione 2026: quanto spetta | informativo | `/guide/bonus-ristrutturazione-2026/` | Vedi box fiscale. Tema YMYL: citare AdE e indicare la data di aggiornamento. |
| la cucina rientra nel bonus mobili 2026? | informativo | stessa guida bonus (H2) + link da `/ristrutturazione-cucina-messina/` | Vedi box fiscale. |
| CILA: quando serve (bagno, tramezzi, impianti) | informativo | `/guide/cila-quando-serve/` | Vedi box normativo. |
| serve la CILA per rifare il bagno? | informativo | H2 in guida CILA + FAQ nella pagina bagno | Fonti in disaccordo (studiomadera.it, biblus.acca.it, ntplusfisco.ilsole24ore.com). |
| esiste ancora il bonus facciate nel 2026? | informativo | FAQ in `/rifacimento-facciata-messina/` | Vedi box fiscale (fonte secondaria). |
| cappotto termico: quali detrazioni nel 2026 | informativo | FAQ in `/cappotto-termico-messina/` | Ecobonus 36%/50% (AdE/ENEA). |
| quanto tempo serve per ristrutturare un appartamento di 80–100 mq | informativo | FAQ in `/ristrutturazioni-messina/` | Non ricercato; nessun dato da citare. |
| cosa include una ristrutturazione chiavi in mano | informativo-commerciale | H2 in `/ristrutturazioni-messina/` | Un forum (studiomadera.it) segnala che alcuni "chiavi in mano" escludono infissi e rivestimenti: spazio per la trasparenza. |
| come scegliere un'impresa edile affidabile a Messina (DURC, Camera di Commercio, assicurazione) | informativo | `/guide/come-scegliere-impresa-edile/` (P3) | Tema ricorrente nei risultati; nessun contenuto locale dedicato osservato. |

### Box fiscale (stato 2026, solo da fonti ufficiali, letto dagli estratti di ricerca il 2026-11-08)

- **Bonus ristrutturazioni (art. 16-bis TUIR), spese 2026:** detrazione **36%**, oppure **50% per l'abitazione principale**, su un massimo di **96.000 €** per unità immobiliare. Base normativa: L. 199/2025 (legge di bilancio 2026), art. 1, c. 22. Il 50% spetta solo al proprietario o al titolare di un diritto reale di godimento. Familiare convivente e detentore (locatario, comodatario) restano al 36%. **2027:** 30% (36% per l'abitazione principale). **2028–2033:** 30% con limite di 48.000 €. Fonti: AdE "La misura della detrazione e i limiti di detraibilità"; Guida AdE "Ristrutturazioni edilizie" (febbraio 2026).
- **Ecobonus (cappotto, infissi), spese 2025–2026:** 36%, oppure **50% per l'abitazione principale**. 2027: 30%/36% (L. 199/2025, art. 1, c. 22, lett. a). Fonti: scheda AdE "Riqualificazione energetica"; tabella ENEA "Ecobonus 2026". Scheda ENEA da inviare entro 90 giorni dalla fine dei lavori. I vademecum ENEA 2026 risultano aggiornati al 23/09/2026.
- **Bonus mobili 2026:** 50% su un massimo di **5.000 €**, acquisti entro il 31/12/2026, con un intervento di recupero iniziato dal 1° gennaio dell'anno precedente. Fonte: Guida AdE bonus mobili (gennaio 2026), L. 199/2025 art. 1 c. 22.
- **Bonus facciate:** **non più in vigore** per le spese successive al 31/12/2022. La fonte è **secondaria** (edilizia.com, "Bonus Facciate 2026: che fine ha fatto") e non è stata verificata direttamente su AdE. Una fonte (moneyside.app) lo presenta come "attivo al 36%": è probabilmente una confusione con il bonus ristrutturazioni e va considerata non affidabile.
- ⚠️ La circolare AdE 8/E del 19/06/2025 descrive il regime **precedente** alla L. 199/2025. Non usarla per le aliquote 2026.

### Box normativo CILA (incerto, da far validare a un tecnico o allo SUE del Comune di Messina)

- **Livello nazionale:** il glossario dell'edilizia libera (DM 2 marzo 2018) comprende la sostituzione di sanitari e finiture. Se si rifanno impianti, tubazioni o massetto, o si modifica la distribuzione interna, l'intervento diventa manutenzione straordinaria e serve la **CILA** (fonti di settore: studiomadera.it, biblus.acca.it, Il Sole 24 Ore NT+ Fisco).
- **Sicilia:** il DPR 380/2001 è recepito con la **L.R. 16/2016** (art. 3 per le opere libere e la CILA), modificata dalla **L.R. 23/2021**. Secondo ANCE Ragusa (circolare 395/2021) la Sicilia non è del tutto allineata alla norma nazionale. **Testo coordinato non consultato** (servono GURS/ARS): non pubblicare regole puntuali senza verificarle.

---

## 5. Gap di contenuto (cosa non fanno le pagine osservate)

1. **Le SERP sono dominate da pagine-elenco programmatiche** (ProntoPro "I 40 migliori…", StarOfService "10 migliori…", ristrutturazioni.com "10 imprese…", PagineGialle, Edilnet, Instapro). Sono elenchi di schede autoprodotte, spesso datate (2017–2019 secondo gli estratti), senza progetti reali né prezzi spiegati. **Nei risultati osservati non è comparso nessun sito di un'impresa locale con una pagina di servizio ben posizionata** (eccezione marginale: rg2costruzioni.it, area Catania/Messina/Siracusa).
2. **Costi Messina-specifici scarsi:** solo cronoshare (pittura, laminato) ed edilnet (ristrutturazione casa). Per bagno, cucina, cartongesso e cappotto le fonti sono **solo nazionali**: spazio per tabelle di prezzo locali con data e criteri.
3. **Fiscalità non aggiornata o errata** in molte pagine posizionate: si trovano ancora riferimenti al 36%/50% "vecchio regime", al 65% e al bonus facciate. Una pagina con le aliquote 2026 corrette, la fonte AdE e la data di aggiornamento è un vantaggio di fiducia. Va aggiornata a gennaio 2027 (aliquote 30%/36%).
4. **Nessuno collega servizio e pratiche edilizie siciliane** (CILA secondo la L.R. 16/2016, SUE di Messina, condominio per le facciate).
5. **Nessuna prova locale:** mancano casi studio con quartieri/zone (es. centro, zona sud, villaggi), foto prima/dopo, tempi reali. I portali non possono offrirli.
6. **Trasparenza sul "chiavi in mano"**: un forum segnala esclusioni nascoste (infissi, rivestimenti) in offerte di catene nazionali. Spazio per una checklist "cosa è incluso".
7. **Query di prezzo con intento misto:** cronoshare vince "pitturazione appartamento Messina" con una pagina "quanto costa": serve una risposta diretta (forbice €/mq + esempio) in alto, con struttura adatta ai featured snippet e alle risposte AI.

---

## 6. Set di pagine iniziale raccomandato

**Ora (lancio), P1:**
| Pagina | Perché |
|---|---|
| `/` | Query di brand/categoria "impresa edile Messina"; hub di link interni verso i servizi. |
| `/ristrutturazioni-messina/` | Query principale con più domanda osservata (molte richieste cronoshare di appartamenti da 80–100 mq). Accorpa appartamento e chiavi in mano. |
| `/ristrutturazione-bagno-messina/` | Servizio ad alto valore, con domanda ricorrente (cronoshare); tutti i portali hanno una pagina dedicata, quindi è un servizio richiesto. |
| `/guide/costo-ristrutturazione-casa-messina/` | Unico concorrente Messina-specifico osservato (edilnet); intento informativo ma molto vicino alla conversione. |

**Subito dopo (entro 1–3 mesi), P2:**
- `/ristrutturazione-cucina-messina/`, `/cartongesso-messina/`, `/imbianchino-messina/`, `/impianti-messina/`, `/pavimenti-messina/`: servizi con domanda locale osservata (richieste cronoshare, pagine portale dedicate), ma in genere venduti come parte di una ristrutturazione. Si possono lanciare con contenuti più snelli se servono a coprire i servizi offerti.
- `/guide/bonus-ristrutturazione-2026/` e `/guide/cila-quando-serve/`: utili per AEO e per la fiducia. **Rischio**: contenuto YMYL e soggetto a scadenza; la guida bonus va riscritta per il 2027.
- `/guide/costo-rifacimento-bagno/`: gap confermato (nessuna pagina Messina-specifica).

**Più avanti (dopo i dati GSC), P3:**
- `/cappotto-termico-messina/`, `/rifacimento-facciata-messina/`: SERP locali quasi vuote di contenuti di servizio, il che indica poca domanda locale "cercata" (ipotesi). Clienti spesso condomini/B2B, con ciclo lungo.
- `/opere-murarie-messina/`, `/guide/costo-cartongesso-al-mq/`, `/guide/costo-cappotto-termico/`, `/guide/costo-pitturare-casa-messina/`, `/guide/come-scegliere-impresa-edile/`.

**Criterio per promuovere una pagina da P3 a P2:** in GSC compaiono impressioni per query del cluster che finiscono su pagine non pertinenti, oppure Keyword Planner mostra volumi locali non trascurabili.

---

## 7. Fonti (URL osservati, 2026-11-08)

**Portali e directory (presenza verificata nei risultati)**
- https://prontopro.it/messina-ristrutturazione-casa · https://prontopro.it/messina-ristrutturazione-chiavi-in-mano · https://prontopro.it/messina-ristrutturazione-bagno · https://prontopro.it/messina-ristrutturazione-completa-bagno · https://prontopro.it/messina-edile · https://prontopro.it/messina-lavori-edili-e-ristrutturazioni · https://prontopro.it/messina-muratore · https://prontopro.it/messina-cartongessista · https://prontopro.it/messina-controsoffitto-in-cartongesso · https://prontopro.it/messina-imbiancatura-e-tinteggiatura · https://prontopro.it/messina-ristrutturazione-facciata · https://prontopro.it/messina-sostituzione-pavimento
- https://www.starofservice.it/dir/sicilia/messina/messina/lavori-edili · https://www.starofservice.it/dir/sicilia/messina/messina/tinteggiatura-interni · https://www.starofservice.it/dir/sicilia/messina/messina/servizi-idraulici
- https://www.instapro.it/costruzione-ristrutturazione-casa/impresa-edile-professionisti/messina · https://www.instapro.it/tinteggiatura/imbianchino-professionisti/messina · https://www.instapro.it/bagni-sanitari/specialista-bagni-professionisti/calcare-messina
- https://www.paginegialle.it/sicilia/messina/ristrutturazioni.html · https://www.paginegialle.it/sicilia/messina/ristrutturazione_appartamenti.html · https://www.paginegialle.it/sicilia/messina/imbianchini.html · https://www.paginegialle.it/sicilia/messina/elettricisti.html · https://www.paginegialle.it/sicilia/me/pavimenti.html · https://www.paginebianche.it/sicilia/messina/ristrutturazione-bagno.html
- https://www.edilnet.it/aziende/ristrutturazione_casa/messina/messina/ · https://www.edilnet.it/guida/ristrutturazione-casa-a-messina-quale-il-costo-1225 · https://www.edilnet.it/aziende/ristrutturazione_bagno/messina/messina/
- https://www.ristrutturazioni.com/messina/
- https://www.edilizia.com/imprese/ristrutturazioni/messina/ · https://www.edilizia.com/imprese/pitture/messina/ · https://www.edilizia.com/imprese/pavimentazioni-interne-ed-esterne/messina/ · https://www.edilizia.com/imprese/isolamento-termico/messina/
- https://www.virgilio.it/italia/messina/cat/IMPRESE_EDILI.html · https://www.cylex-italia.it/messina/imbianchino.html · https://www.reteimprese.it/155572
- https://www.cronoshare.it/quanto-costa/pitturare-appartamento/messina · https://www.cronoshare.it/quanto-costa/pavimento-laminato/messina · https://www.cronoshare.it/impiego/offerte-lavoro-ristrutturazione-casa/messina · https://www.cronoshare.it/impiego/offerte-lavoro-ristrutturazione-bagni-cucine/messina · https://www.cronoshare.it/impiego/offerte-lavoro-cartongessista/messina
- https://www.houzz.co.nz/professionals/design-and-construction/acquedolci-15-it-probr0-bo~t_11919~r_2525773 (Houzz: solo pagina provincia, presenza debole)
- Facile Ristrutturare, store a Messina (via Garibaldi 213, data del comunicato non verificata, stimata ~2024): https://www.facileristrutturare.it/eventi-e-stampa/facile-ristrutturare-inaugura-tre-store-in-sicilia-a-palermo-messina-e-catania/ ; pagine città osservate solo per Palermo, Catania, Ragusa e Siracusa.
- **Habitissimo:** nessuna pagina Messina emersa nelle ricerche (presenza non verificata, non esclusa).

**Costi (fonti terze, indicative)**
- https://www.money.it/quanto-costa-rifare-un-bagno-i-costi-della-ristrutturazione · https://www.cronoshare.it/blog/quanto-costa-rifare-il-bagno/ · https://www.idealista.it/news/immobiliare/residenziale/2024/03/12/179831-quanto-costa-rifare-un-bagno-variabili-da-considerare-e-tabelle-indicative
- https://studiomadera.it/news/571-cartongesso-costo · https://studiomadera.it/news/158-controsoffitto · https://www.idealista.it/news/node/184478 · https://www.studiomadera.it/news/155-cappotto-termico

**Fiscale e normativo**
- https://www.agenziaentrate.gov.it/portale/la-misura-della-detrazione-limiti-detraibilita
- https://www.agenziaentrate.gov.it/portale/documents/d/guest/ristrutturazioni_edilizie_le_agevolazioni_fiscali-1 (Guida, febbraio 2026)
- https://www.agenziaentrate.gov.it/portale/schede/agevolazioni/detrazione-riqualificazione-energetica-55-2016/cosa-riqualificazione-55-2016
- https://www.efficienzaenergetica.enea.it/images/detrazioni/TABELLA_ECOBONUS_2026.pdf
- https://www.agenziaentrate.gov.it/portale/documents/d/guest/12-bonus_mobili_ed_elettrodomestici
- https://www.agenziaentrate.gov.it/portale/documents/d/guest/circolare-bonus-edilizi-del-19-giugno-2025 (regime precedente: non usare per il 2026)
- https://www.edilizia.com/?p=6814 (bonus facciate, fonte secondaria)
- https://biblus.acca.it/cila-per-ristrutturazione-bagno/ · https://studiomadera.it/news/686-bagno-cila-straordinaria · https://ntplusfisco.ilsole24ore.com/art/si-detrazioni-il-rifacimento-bagno-edilizia-libera-AExbH2WD
- https://ragusa.ance.it/2021/09/02/circolare-n-395-c-2021-norme-sull-edilizia-privata-l-r-6-8-2021-n-23-primo-commento/?print=pdf · https://www.lavoripubblici.it/news/fine-lavori-cila-regioni-obblighi-scadenze-sanzioni-38757/6
