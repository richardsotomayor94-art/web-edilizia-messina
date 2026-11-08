# Analisi competitor SEO – Ristrutturazioni e servizi casa a Messina

> Data rilevazione: **2026-11-08**
> Oggetto: competitor reali per un sito di lead generation locale (Messina città + provincia) che mette in contatto utenti con imprese/artigiani partner. Il nostro sito **non** è un'impresa edile.

---

## 0. Metodo e limiti (leggere prima)

- **Ricerche eseguite (WebSearch, modalità standard; "extended" solo dove i risultati erano poveri):**
  `ristrutturazioni Messina`, `impresa edile Messina`, `rifacimento bagno Messina`, `cartongesso Messina`, `imbianchino Messina`, `cappotto termico Messina`, `ristrutturazione appartamento Messina preventivo impresa` (extended), `ristrutturazione bagno Messina prezzi`, `impresa ristrutturazioni chiavi in mano Messina sito` (extended), `cappotto termico Messina impresa isolamento facciate` (extended), `CILA ristrutturazione Messina`, più ricerche limitate al dominio di ciascun competitor.
- **WebFetch fallito su tutti i siti delle imprese locali** (edilcasamessina.com, impresit.srl, edilvitamessina.it, edildg.com, edilraffa.com, lettinacostruzioni.it): errore `ENOTFOUND`, cioè host non consentiti dalla rete di questa sessione cloud. Anche `curl` è stato rifiutato dal proxy (403). Seguendo le istruzioni dell'ambiente non ho tentato altri fetch.
- **Conseguenza:** tutte le osservazioni derivano da **titoli e snippet dei risultati di ricerca** (inclusi i riassunti del motore di ricerca sul contenuto delle pagine), non dall'HTML. Quindi:
  - **Title** = titolo mostrato nei risultati (di solito coincide col `<title>`, ma non è garantito).
  - **H1, meta description, schema.org, velocità, UX mobile: "non verificabile via fetch"** per tutti.
  - Le cifre (rating, prezzi, numero recensioni) sono quelle dichiarate dalle pagine stesse, non verificate in modo indipendente.
- **Nota sul motore di ricerca:** è un motore "US-only"; la SERP reale di Google.it per Messina può differire (in particolare il Local Pack/Maps, che qui non è osservabile).
- Per completare l'analisi on-page (H1, meta, JSON-LD, Core Web Vitals) serve abilitare i domini sopra nelle impostazioni di rete della sessione, oppure eseguire un crawl (es. Screaming Frog / PageSpeed Insights) da una macchina locale.

Legenda incertezza: **[V]** = visto negli snippet; **[?]** = incerto/da verificare; **[NV]** = non verificabile via fetch.

---

## 1. Panoramica: chi compare davvero nelle ricerche

| Tipo | Player | Dove è comparso |
|---|---|---|
| Marketplace preventivi | **ProntoPro** (prontopro.it) | cappotto termico Messina; ricerche dominio |
| Marketplace preventivi | **Cronoshare** (cronoshare.it) | ristrutturazioni / cartongesso / imbianchino / bagno Messina (presenza massiccia) |
| Directory + lead form | **Ristrutturazioni.com** | chiavi in mano Messina |
| Directory classica | **PagineGialle** | ristrutturazione appartamento Messina; cappotto termico |
| Directory + preventivi | **Quotalo.it** | ristrutturazione appartamento Messina |
| Secondari visti | Instapro, Habitissimo (aziende.habitissimo.it), Archisio, Ristrutturare-casa.org, Edilnet, Edilizia.com, EdiliziaPoint, Virgilio, Cylex, ImpresaItalia, Reteimprese | varie query |
| Impresa locale | **Impresit S.r.l.** | ristrutturazione appartamento Messina |
| Impresa locale | **Edil Raffa** | chiavi in mano Messina |
| Impresa locale | **Edil Casa** (Viale Italia 52) | appartamento / chiavi in mano Messina |
| Impresa locale | **Edilvita S.r.l.** | chiavi in mano Messina |
| Impresa locale | **Edil DG Building** | chiavi in mano Messina; PagineGialle |
| Impresa provincia | **Lettina Costruzioni** (S. Alessio Siculo) | appartamento Messina; cappotto termico |
| Fuori città | RG2 Costruzioni (Catania), Ecofin Design (Catania) | ristrutturazione Messina (pagine "Catania, Messina e Siracusa") |

**Non visti** nei risultati per Messina: Houzz, Preventivi.it, CercaPreventivi. Facile Ristrutturare compare solo come **scheda PagineGialle** "Facile Ristrutturare S.r.l. a Messina" [V]; non è emersa una pagina Messina sul sito del network [?].

Osservazione chiave: per query "pure" (`ristrutturazioni Messina`, `rifacimento bagno Messina`, `cappotto termico Messina`) la SERP osservata è dominata da **notizie, PDF di enti pubblici, guide nazionali e pagine "offerte di lavoro" di Cronoshare**. Pochissimi risultati sono pagine commerciali locali di qualità → **intento locale servito male**.

---

## 2. Directory e marketplace nazionali

### 2.1 ProntoPro
- **URL viste:** `/messina-ristrutturazioni`, `/messina-ristrutturazione-casa`, `/messina-ristrutturazione-bagno`, `/messina-ristrutturazione-completa-bagno`, `/messina-ristrutturazione-interni`, `/messina-edile`, `/messina-rifacimento-terrazzo`, `/me/messina/isolamento-a-cappotto`, + pagine `/costi-prezzi/...`.
- **Title [V]:** schema fisso "I 40 migliori Ditte Ristrutturazione Bagno a Messina" (stesso template per ogni servizio). Pagine prezzi: "Ristrutturazione Bagno Costi e prezzi 2026".
- **H1 / meta / schema.org:** [NV].
- **Recensioni [V]:** es. ristrutturazione interni Messina: 79 imprese, media 4,6, 630 recensioni. Piattaforma dichiara recensioni "reali e verificate". Alcune recensioni molto brevi, alcune del 2019–2021.
- **Prezzi [V]:** ristrutturazione bagno Messina "tra 90 € e 9500 €"; completa "tra 1500 € e 9100 €". Forbice così ampia da essere poco utile; fonte/metodo non dichiarati.
- **Form [V]:** questionario a domande (multistep) → più preventivi da più professionisti.
- **Presenza locale:** pagine programmatiche per città, nessun contenuto specifico su Messina oltre a nomi/recensioni [?].
- **Trust:** volume recensioni, brand nazionale.
- **Limiti percepiti:** template identico per tutte le città; "40 migliori" generico; lead venduto a più professionisti (rischio telefonate multiple).

### 2.2 Cronoshare
- **URL viste:** `/servizi/preventivo-ristrutturazione-bagno/messina/messina`, `/servizi/ditte-ristrutturazioni/messina/messina`, `/servizi/muratore/messina/messina`, `/servizi/idraulico/messina/messina` + decine di pagine `/impiego/offerte-lavoro-.../messina/<frazione>` (Ganzirri, Torre Faro, Pace, ecc.).
- **Title [V]:** "10 Migliori Preventivi Ristrutturazione Bagno a Messina"; "Offerte di lavoro di Ristrutturazione bagni a Messina".
- **H1 / meta / schema:** [NV].
- **Prezzi [V]:** bagno Messina "prezzo medio 1.906 €, forbice 1.466–2.478 €" → **molto più basso** delle guide nazionali (es. 4.500–8.000 € per 5 m² secondo Studio Madera) [?: possibile media di lavori parziali]. Nessuna fonte/metodo.
- **Form [V]:** fino a 4 preventivi da imprese.
- **Punto forte SEO:** copertura capillare di frazioni e comuni della provincia con pagine "offerte di lavoro" (contenuto generato dalle richieste degli utenti: "bagno 3–4 m²", "trasformare vasca in doccia", "spostare 4 pareti").
- **Debolezza:** le pagine sono pensate per i **professionisti** (offerte di lavoro), non per il cliente finale; domande utenti su pratiche/certificazioni ("serve una pratica?") **restano senza risposta** [V].

### 2.3 Ristrutturazioni.com
- **URL viste:** `/messina/` + pagine per comune (`/messina/venetico/`, `/itala/`, `/scaletta-zanclea/`, `/roccalumera/`, `/nizza-di-sicilia/`, ...).
- **Title [V]:** "Ristrutturazioni Messina,10 imprese edili con i migliori preventivi" (manca lo spazio dopo la virgola); comuni: "Ristrutturazioni Venetico in provincia di Messina, 5 Imprese Edili con i migliori Preventivi".
- **Form [V]:** modulo descrizione lavori → fino a 3 preventivi; sopralluogo gratuito.
- **Imprese elencate [V]:** Sviluppo e Costruzioni Srl, Hydrothermoimpianti, Maugeri Costruzioni (Letojanni), Edil So.l.e. (Taormina): molte **non sono in città**.
- **Recensioni:** "autodichiarate dal sito" [V secondo snippet].
- **Debolezza:** pagine comune quasi identiche ("stesse imprese con poche varianti") → contenuto thin/duplicato.

### 2.4 PagineGialle
- **URL viste:** `/sicilia/messina/ristrutturazioni.html`, `/sicilia/messina/ristrutturazione_appartamenti.html`, `/sicilia/messina/imprese_edili.html`, `/sicilia/messina/isolamento_termico_a_cappotto.html`, schede aziende.
- **Title [V]:** "Imprese di Ristrutturazione Casa a Messina: Info e Contatti"; schede "ᐅ CarAman Costruzioni a Messina (ME): Orari Apertura e Mappa".
- **Recensioni [V]:** poche per scheda. CarAman 5,0 su 9 (altra pagina dice 7 → dato incoerente); Framus 2 recensioni; **Edil DG Building 1 recensione da 1 stella** ("nessuna risposta dopo il sopralluogo"); Ecobonus 2020 e Facile Ristrutturare senza recensioni.
- **Presenza locale:** forte (NAP, orari, mappa, quartieri es. "Quartiere Maregrosso").
- **Form:** contatto diretto all'impresa, nessuna qualificazione [?].
- **Debolezza:** elenco, non consulenza; nessun prezzo, nessuna guida.

### 2.5 Quotalo.it
- **URL viste:** `/ristrutturazioni-edili/me/messina`, `/cartongesso/me/messina`, `/impermeabilizzazione/me/messina`, `/rifacimento-tetti/me/messina`, `/posa-parquet/me/messina`, guida `/guide/preventivo-per-ristrutturazione`.
- **Title [V]:** "Ditte per Ristrutturazioni a Messina - Preventivi e prezzi - Quotalo.it".
- **Prezzi [V]:** cartongesso Messina "da 25 €/mq fino a 53 €/mq (antincendio)"; guida 2026: base 400–600 €/mq, completa 600–900 €/mq, pregio >1.000 €/mq ("solo manodopera salvo diversa indicazione").
- **Imprese [V]:** Esse.Pi.Impianti, Costruzioni Tamburello, CEICA, Ariete Costruzioni.
- **Debolezza:** prezzi nazionali applicati alla città, fonte non dichiarata.

### 2.6 Secondari (citati, non approfonditi)
- **Ristrutturare-casa.org [V]:** Messina 240,03–471,17 €/mq, dichiarate "stime personali"; parcelle tecniche 1,86–5,99%; articolo 100 mq vecchio di ~9 anni. **Incoerente con Quotalo (400–900 €/mq)** → il mercato informativo è confuso.
- **Instapro [V]:** pagina "Imprese Edili a Messina" (Pelloritana Costruzioni, Fast Building).
- **Habitissimo [V]:** solo "ristrutturazione condomini Messina" (4 imprese) visto.
- **Archisio [V]:** profili (Edilcasa di Aldo Barbera, Giuseppe Rossello, Edil Scopelliti), molte schede vecchie.
- **EdiliziaPoint [V]:** "Cappotto Termico a Messina" con stima "orientativa".
- **Edilnet, Edilizia.com, Virgilio (154 imprese edili), Cylex, ImpresaItalia, Reteimprese:** puri elenchi.

---

## 3. Imprese locali con sito

> Per tutte: **WebFetch fallito (ENOTFOUND, host non consentito)**. H1, meta description, schema.org, velocità e UX mobile = **[NV]**.

### 3.1 Impresit S.r.l. – impresit.srl (il benchmark più forte)
- **Title [V]:** "Home - Impresit" (debole, nessuna keyword). Pagine servizi: `/servizi1/ristrutturazioni`, `/condomini`, `/pubblico`, `/progettazione`, `/partner-affidabili`, `/qualità/associazioni`.
- **Proposta [V]:** "Ristrutturiamo la tua casa dalla A alla Z, Prezzo bloccato, tempi certi, zero pensieri"; dal 1960; area "Stretto di Messina (città e provincia)".
- **Processo [V]:** sopralluogo gratuito → preventivo dettagliato + cronoprogramma → referente unico → consegna chiavi in mano; pagamenti a SAL.
- **Trust [V]:** prezzo bloccato con varianti scritte; **penale 100 €/settimana di ritardo (max 1.200 €)**; garanzia 24 mesi; certificati conformità impianti; pagina associazioni.
- **FAQ [V]:** durata 12–20 settimane, gestione pratiche e bonus "su richiesta", area operativa; esclusi rivestimenti/infissi/sanitari.
- **Recensioni [V]:** testimonianze sul sito, nessuna recensione terza trovata.
- **Prezzi:** nessuna forbice pubblica [V per assenza negli snippet].
- **NAP [V]:** Via N. Fabrizi, Messina, tel. 090 630933.
- **Gap:** title SEO nullo; URL "servizi1"; nessuna pagina per singolo servizio (bagno, cappotto, cartongesso) emersa; zero contenuti di costo.

### 3.2 Edil Raffa – edilraffa.com
- **Title [V]:** "Costruzioni e Ristrutturazioni a Messina"; servizi: "Ristrutturazioni Chiavi in Mano a Messina", "Cartongesso e Pitturazione a Messina", "Impianti a Messina", "Pavimenti e Rivestimenti a Messina - Edil Raffa", "Progettazione Edilizia a Messina".
- **SEO:** l'unico con **una pagina per servizio + "Messina" in title/URL** → buona struttura locale.
- **Trust [V]:** attiva dai primi anni '80 (fondatore Renato Raffa, oggi Giuseppe); **rating "4.9/5 Google"** mostrato in home + testimonianze; assistenza detrazioni 50% e 36%.
- **CTA [V]:** "sopralluogo gratuito e preventivo su misura".
- **NAP [V]:** Via Giovanni Verga 110, Messina; tel. 340 1751853; email hotmail (segnale poco professionale).
- **Portfolio:** nessun progetto/foto/case study emerso [?].
- **Freschezza:** contenuto ~570 giorni secondo metadati del motore [?].

### 3.3 Edil Casa – edilcasamessina.com
- **Title [V]:** "Ristrutturazioni Edili Chiavi in Mano a Messina - Edil Casa"; contatti: "Ristrutturazione di Case e Appartamenti a Messina - Edil Casa" (pagina contatti con title da pagina servizi → probabile title duplicato/mal assegnato).
- **Specializzazione [V]:** "rifacimento bagni a Messina e provincia"; anche tetti, facciate, impianti, infissi.
- **CTA [V]:** "preventivo gratuito"; telefono + WhatsApp 348 6809034; email Gmail.
- **NAP [V]:** Viale Italia 52, 98124 Messina; Lun–Sab 8–20. [?] Possibile coincidenza con "Edilcasa di Aldo Barbera" (Archisio, Viale Italia).
- **Freschezza:** ~535 giorni [?]. Nessuna recensione, prezzo, portfolio emerso.

### 3.4 Edilvita S.r.l. – edilvitamessina.it
- **Title [V]:** "EDILVITA" (solo brand).
- **Contenuto [V]:** ristrutturazioni, restauro conservativo (fregi, colonne, capitelli), impianti, facciate, efficientamento, rischio sismico; cita Ecobonus, Sismabonus, Bonus Facciate (bonus in parte non più attivi/modificati → possibile contenuto datato [?]). Testo "in tutta Italia" diluisce il segnale locale.
- **Trust [V]:** team interno ingegneri, mezzi propri, amministratore nominato.
- **NAP [V]:** Vico San Cosimo 7, 98124 Messina. Nessuna recensione emersa.

### 3.5 Edil DG Building – edildg.com
- **Title [V]:** "Impresa Edile ristrutturazioni costruzioni Messina" (keyword stuffing senza brand).
- **Contenuto [V]:** chiavi in mano, nuove costruzioni, facciate, impermeabilizzazioni, cartongesso, pitture, pavimenti, impianti; noleggio ragno/gru/ponteggi; vendita materiali.
- **NAP [V]:** Via dei Mille 207, 98123 Messina; P.IVA 03714030834.
- **Reputazione [V]:** PagineGialle 1 recensione, 1 stella (mancata risposta dopo sopralluogo).

### 3.6 Lettina Costruzioni – lettinacostruzioni.it (provincia)
- **Title [V]:** "Impresa edile" (home, generico); "Isolanti termici a cappotto"; "Ristrutturazione chiavi in mano" (assegnato alla pagina **contatti** → title errato); "Impianti elettrici e idrici".
- **Contenuto [V]:** sede S. Alessio Siculo, opera in tutta la provincia; cappotto con lana di roccia/EPS/fibra di legno + finitura silossanica; consulenza detrazioni.
- **CTA [V]:** "Chiamateci per richiedere un preventivo gratuito!".
- **Nessuna** recensione/prezzo emerso.

---

## 4. Tabella comparativa sintetica

| Player | Title locale | Pagine per servizio | Prezzi | Recensioni | Form | Processo spiegato | CILA/permessi | Portfolio |
|---|---|---|---|---|---|---|---|---|
| ProntoPro | Sì (template) | Sì | Forbici enormi, no fonte | Molte | Multistep | Generico | No [?] | Foto pro [?] |
| Cronoshare | Sì (template) | Sì + frazioni | Media senza fonte | [?] | Multistep [?] | Generico | Domande senza risposta | [?] |
| Ristrutturazioni.com | Sì | Comuni duplicati | No | Autodichiarate | Modulo | Minimo | No [?] | No [?] |
| PagineGialle | Sì | Categorie | No | Poche | Contatto diretto | No | No | No |
| Quotalo | Sì | Sì | Sì, nazionali | [?] | Modulo | Guida | No [?] | No |
| Impresit | **No** | No (servizi1) | No | Solo testimonianze | Contatto [?] | **Sì, ottimo** | "su richiesta" | [?] |
| Edil Raffa | **Sì** | **Sì** | No | 4.9 Google (dichiarato) | Contatto [?] | Parziale | No | Non emerso |
| Edil Casa | Sì | Poche | No | No | Tel/WhatsApp | No | No | No |
| Edilvita | No | Sì (generico) | No | No | [?] | No | Bonus (datati?) | Restauro [?] |
| Edil DG | Sì (stuffing) | [?] | No | 1★ PG | [?] | No | No | No |
| Lettina | No | Sì | No | No | Telefono | No | Detrazioni | No |

H1, meta description, schema.org, velocità, CTA mobile: **[NV] per tutti**.

---

## 5. COSA NON STANNO FACENDO (gap da sfruttare)

1. **Nessuno risponde all'intento "pure local" con una pagina vera.** Per `ristrutturazioni Messina`, `rifacimento bagno Messina`, `cappotto termico Messina` la SERP osservata è piena di news, PDF pubblici, guide nazionali e offerte di lavoro. Una pagina servizio+Messina ben fatta ha spazio reale.
2. **Prezzi trasparenti con fonti: assenti.** Le forbici esistenti sono contraddittorie (Cronoshare bagno ~1.900 €; ProntoPro 90–9.500 €; Ristrutturare-casa.org 240–471 €/mq; Quotalo 400–900 €/mq) e **nessuno cita la fonte o il metodo**. Nessuna impresa locale pubblica una forbice. → Pagine "Quanto costa X a Messina" con range, voci incluse/escluse, fonti (prezzari, es. Prezzario Regione Siciliana [da verificare], preventivi reali anonimizzati dei partner) e data di aggiornamento.
3. **CILA / SCIA / permessi a Messina: nessuno ne parla in modo locale.** La ricerca `CILA ristrutturazione Messina` restituisce solo guide nazionali; gli utenti Cronoshare chiedono "serve una pratica?" senza risposta. → Guida "CILA a Messina: quando serve, chi la presenta, tempi, costi tipici tecnico + diritti (da verificare con Ufficio Edilizia Privata del Comune)".
4. **FAQ / AEO quasi assenti.** Solo Impresit ha FAQ. Nessuno risponde in formato domanda-risposta a: costo bagno 4 m², tempi, bonus 2026, umidità/salsedine, condominio. → Blocchi FAQ con `FAQPage` e risposte brevi citabili da AI Overview/assistenti.
5. **Bonus fiscali aggiornati: contenuti datati o generici.** Edilvita cita Bonus Facciate/Sismabonus; Edil Raffa "50% e 36%"; nessuna data. → Pagina bonus 2026 con data, fonte (Agenzia Entrate) e disclaimer.
6. **Nessuna qualificazione intelligente del lead.** Imprese = telefono/WhatsApp/contatto generico; marketplace = questionari che girano la richiesta a 3–4+ ditte. → Multistep con: tipo lavoro, m², zona/quartiere, piano/ascensore, tempistica, budget, **upload foto**, e promessa "max 2–3 imprese, niente spam".
7. **Upload foto / descrizione visiva: non emerso da nessuno.** Riduce sopralluoghi inutili e aumenta qualità del lead.
8. **Zero contenuti iper-locali.** Nessuno tratta quartieri e zone (Centro, Ganzirri, Torre Faro, Mili, Gazzi, Villaggi collinari, Tirrenica/Ionica), né problemi tipici del territorio: salsedine e umidità di risalita sulla costa, vecchi edifici post-1908 e normativa sismica (zona sismica elevata [da verificare classificazione]), terrazzi da impermeabilizzare, caldo estivo vs cappotto. Cronoshare ha le frazioni ma solo come annunci di lavoro.
9. **Portfolio / prima-dopo verificabili: assenti.** Nessuno snippet mostra case study con foto, m², costo e tempi. → Case study dei partner con dati reali (costo, durata, zona).
10. **Recensioni poco credibili o opache.** Testimonianze self-selected (Impresit, Edil Raffa), "autodichiarate" (Ristrutturazioni.com), dati incoerenti (CarAman 9 vs 7), schede vuote. → Recensioni verificate per lavoro concluso, con data, tipo di lavoro, zona; mostrare anche il voto medio reale, non solo 5 stelle.
11. **Processo e garanzie spiegati: solo Impresit.** Gli altri non dicono cosa succede dopo il form. → Pagina "Come funziona" in 4 step + cosa garantiamo (tempi di risposta, numero imprese, criteri di selezione partner: visura, DURC, assicurazione RC).
12. **Trasparenza del modello lead-gen: nessuno.** I marketplace non dicono chiaramente chi paga, quante imprese ricevono il contatto, come sono scelte. → Dichiararlo apertamente è un differenziale.
13. **SEO tecnico on-page debole nelle imprese:** title "Home - Impresit", "EDILVITA", "Impresa edile"; title duplicati/errati su pagine contatti (Edil Casa, Lettina); URL non parlanti ("servizi1"). Contenuti vecchi (~535–570 giorni). Facile superarli con title/URL puliti e aggiornamento regolare.
14. **Servizi "piccoli" scoperti:** imbianchino, cartongesso, cappotto a Messina → in SERP solo elenchi (Cylex, ImpresaItalia, PagineGialle) e Quotalo. Pagine dedicate con prezzi €/mq e tempi possono posizionarsi rapidamente.
15. **Città vs provincia confuse.** Directory mostrano imprese di Taormina/Letojanni per "Messina"; imprese catanesi (RG2, Ecofin) intercettano query Messina. → Separare chiaramente "Messina città" e "comuni della provincia" e dichiarare area servita dal singolo partner.
16. **Schema.org / CTA mobile / velocità:** non verificabile in questa sessione → **da auditare** appena possibile (non dare per scontato che manchino).

---

## 6. Posizionamento raccomandato

**Proposta:** "Il modo trasparente per ristrutturare a Messina: prezzi indicativi con fonti, pratiche spiegate, al massimo 2–3 imprese locali verificate, nessuna vendita del tuo numero a decine di ditte."

- **Contro i marketplace nazionali (ProntoPro, Cronoshare, Ristrutturazioni.com, Quotalo):** battere su *profondità locale* (quartieri, clima, edifici, Comune di Messina), *prezzi con fonti e data*, *numero limitato di contatti* e *chiarezza su chi paga* (modello lead-gen dichiarato in pagina).
- **Contro le imprese locali (Impresit, Edil Raffa, Edil Casa, ...):** non competere come impresa; posizionarsi come **guida neutrale** che confronta più partner. Ispirarsi a Impresit per processo e garanzie (unico benchmark serio), ma estenderlo con prezzi, FAQ e contenuti per servizio.
- **Contro le directory (PagineGialle, Virgilio, Cylex):** offrire ciò che un elenco non dà: qualificazione multistep con foto, risposta entro tempi dichiarati, criteri di verifica partner pubblici.
- **Architettura minima suggerita:** `/ristrutturazioni-messina/` (hub) → pagine servizio (`/rifacimento-bagno-messina/`, `/cappotto-termico-messina/`, `/cartongesso-messina/`, `/imbianchino-messina/`, `/impermeabilizzazione-terrazzi-messina/`) → pagine "quanto costa" e "CILA a Messina" → pagine zona solo dove c'è contenuto reale (evitare il thin content stile Ristrutturazioni.com).
- **Compliance:** dichiarare che il sito non è un'impresa edile; disclaimer sui prezzi; consenso privacy esplicito per invio dati ai partner; non usare recensioni non verificabili.

---

## 7. Prossimi passi per chiudere i [NV]

1. Abilitare in rete i domini dei competitor o lanciare un crawl locale per estrarre title/H1/meta/JSON-LD.
2. PageSpeed Insights (mobile) su home + 1 pagina servizio di Impresit, Edil Raffa, ProntoPro, Cronoshare.
3. Verificare SERP reale da IP italiano/Messina (Google.it + Local Pack) per le 6 keyword principali.
4. Verificare schede Google Business Profile dei competitor locali (rating reali, numero recensioni, foto).

---

## 8. Fonti (consultate il 2026-11-08, tramite risultati di ricerca; fetch diretto fallito per i siti aziendali)

Directory / marketplace
- https://prontopro.it/messina-ristrutturazioni
- https://prontopro.it/messina-ristrutturazione-bagno
- https://prontopro.it/messina-ristrutturazione-completa-bagno
- https://prontopro.it/messina-ristrutturazione-interni
- https://prontopro.it/me/messina/isolamento-a-cappotto
- https://prontopro.it/costi-prezzi/ristrutturazione-bagno_111876
- https://www.cronoshare.it/servizi/preventivo-ristrutturazione-bagno/messina/messina
- https://www.cronoshare.it/servizi/ditte-ristrutturazioni/messina/messina
- https://www.cronoshare.it/impiego/offerte-lavoro-ristrutturazione-bagni/messina
- https://www.cronoshare.it/impiego/offerte-lavoro-cartongessista/messina
- https://www.cronoshare.it/impiego/offerte-lavoro-imbianchino/messina
- https://www.ristrutturazioni.com/messina/
- https://www.ristrutturazioni.com/messina/venetico/
- https://www.paginegialle.it/sicilia/messina/ristrutturazioni.html
- https://www.paginegialle.it/sicilia/messina/ristrutturazione_appartamenti.html
- https://www.paginegialle.it/sicilia/messina/isolamento_termico_a_cappotto.html
- https://www.paginegialle.it/caramancostruzioni-imprese-edili-me
- https://www.paginegialle.it/edildgbuilding-imprese-edili-me
- https://www.paginegialle.it/messina-me/manutenzione-stabili/facile-ristrutturare-s-r-l
- https://www.quotalo.it/ristrutturazioni-edili/me/messina
- https://www.quotalo.it/cartongesso/me/messina
- https://www.quotalo.it/guide/preventivo-per-ristrutturazione
- https://www.ristrutturare-casa.org/imprese/ristrutturazione-casa/messina/messina/
- https://www.instapro.it/costruzione-ristrutturazione-casa/impresa-edile-professionisti/messina
- https://aziende.habitissimo.it/ristrutturazione-condomini/messina
- https://www.archisio.it/imprese-edili/messina
- https://www.ediliziapoint.it/cappotto-termico/messina
- https://www.edilnet.it/aziende/imprese_edili/messina/messina
- https://www.edilizia.com/imprese/ristrutturazioni/messina/
- https://www.virgilio.it/italia/messina/cat/IMPRESE_EDILI.html
- https://www.cylex-italia.it/messina/imbianchino.html

Imprese locali
- https://www.impresit.srl/ ; http://impresit.srl/servizi1/ristrutturazioni
- https://edilraffa.com/ ; https://edilraffa.com/service/ristrutturazioni-chiavi-in-mano-messina/ ; https://edilraffa.com/service/cartongesso-pitturazione-messina/
- https://edilcasamessina.com/ ; http://edilcasamessina.com/contatti/
- https://edilvitamessina.it/
- https://www.edildg.com/
- https://www.lettinacostruzioni.it/ ; https://www.lettinacostruzioni.it/isolamento-a-cappotto
- https://rg2costruzioni.it/ristrutturazione-ville-catania-messina-siracusa/
- https://www.ecofindesign.it/ristrutturazioni-chiavi-in-mano

Riferimenti prezzi/normativa usati per confronto
- https://studiomadera.it/news/152-rifacimentobagno
- https://www.cosedicasa.com/normativa-legge/normativa-pratiche-edilizie/cil-scia-e-permesso-di-costruire-per-ogni-tipo-di-intervento-un-nome-18890
- https://studiomadera.it/news/172-facile-ristrutturare
