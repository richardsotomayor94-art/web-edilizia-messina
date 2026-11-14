/**
 * Catalogo servizi e contenuti delle landing.
 *
 * Regole editoriali (vedi docs/SEO-KEYWORDS.md):
 *  - una landing solo se c'è un intento distinto in SERP;
 *  - nessun prezzo inventato: si spiegano i fattori di costo;
 *  - nessuna promessa di copertura o di esperienza non verificata;
 *  - permessi/fisco: solo indicazioni generali + rimando a tecnico abilitato.
 */

export type FunnelService =
  | "ristrutturazione-completa"
  | "bagno"
  | "cucina"
  | "cartongesso"
  | "pittura"
  | "impianti"
  | "pavimenti"
  | "facciata"
  | "impermeabilizzazione"
  | "isolamento"
  | "opere-murarie"
  | "altro";

export interface Faq {
  q: string;
  a: string;
}

export interface ServicePage {
  id: string; // usato per @id schema: #service-<id>
  funnelService: FunnelService;
  path: string;
  navLabel: string;
  cardTitle: string;
  cardText: string;
  title: string; // <title>: max ~43 caratteri, il template aggiunge " | MessinaCasa360"
  metaDescription: string;
  h1: string;
  lead: string;
  /** "In breve": risposta diretta, estraibile da motori di ricerca e assistenti IA */
  answer: string;
  /** Cosa deve contenere un preventivo serio per questo lavoro */
  quoteChecklist: string[];
  includes: string[];
  /** H2 delle sezioni "cosa comprende" e "costo": propri del servizio, non di modello */
  scopeTitle?: string;
  costTitle?: string;
  whenTitle: string;
  when: string[];
  costFactors: string[];
  messinaNotes: string[];
  permitsNote: string;
  faqs: Faq[];
  related: string[]; // id di altri servizi
  /** Data reale dell'ultima modifica del contenuto (non della build): pagina, dati strutturati e sitemap */
  updated: string;
  /** Fonti ufficiali delle norme citate nella pagina */
  sources: { label: string; href: string }[];
  guide?: string; // path guida correlata
  moreGuides?: string[];
}

const SCEGLIERE = "/guide/come-scegliere-impresa-edile-messina/";

const permessiGenerico =
  "Per lavori interni che modificano tramezzi, impianti o la distribuzione degli spazi di norma serve una pratica edilizia (in genere CILA), mentre la sola sostituzione delle finiture rientra di solito nell'edilizia libera. In Sicilia si applica anche la normativa regionale (L.R. 16/2016): la verifica va sempre fatta da un tecnico abilitato o presso lo Sportello Unico per l'Edilizia del Comune.";

export const servicePages: ServicePage[] = [
  {
    id: "ristrutturazioni",
    funnelService: "ristrutturazione-completa",
    path: "/ristrutturazioni-messina/",
    navLabel: "Ristrutturazioni",
    cardTitle: "Ristrutturazioni complete",
    cardText: "Appartamenti e case da rinnovare, anche chiavi in mano: un'unica richiesta per tutto il cantiere.",
    title: "Ristrutturazioni a Messina: preventivi",
    metaDescription:
      "Ristrutturazione di casa o appartamento a Messina, anche chiavi in mano. Descrivi i lavori una volta: inoltriamo la richiesta gratuita fino a 3 ditte locali.",
    h1: "Ristrutturazioni a Messina: case e appartamenti, anche chiavi in mano",
    lead:
      "Che si tratti di rinnovare un appartamento anni '60, di una ristrutturazione chiavi in mano o di un intervento su più ambienti, ci racconti il progetto una volta sola e lo inoltriamo fino a 3 imprese edili della zona, che se disponibili ti contattano per un sopralluogo.",
    answer:
      "Per ristrutturare un appartamento a Messina servono un'impresa edile iscritta alla Camera di Commercio, impiantisti abilitati e, se cambi tramezzi o impianti, un tecnico per la pratica edilizia. Il costo dipende da metratura, stato di partenza e finiture: si definisce solo dopo un sopralluogo.",
    quoteChecklist: [
      "Elenco delle lavorazioni con le quantità, non un totale a corpo",
      "Marca e modello di materiali e forniture incluse",
      "Cosa è escluso: pratiche edilizie, smaltimento, ponteggi, IVA",
      "Chi coordina il cantiere e chi è il referente",
      "Cronoprogramma e pagamenti legati agli stati di avanzamento",
    ],
    includes: [
      "Demolizioni e rifacimento tramezzi",
      "Rifacimento impianti elettrico e idraulico",
      "Bagni e cucine",
      "Massetti, pavimenti e rivestimenti",
      "Cartongesso, controsoffitti e isolamento",
      "Intonaci, pittura e finiture",
      "Sostituzione infissi e porte interne",
      "Coordinamento del cantiere (se richiesto: chiavi in mano)",
    ],
    scopeTitle: "Cosa comprende una ristrutturazione a Messina",
    costTitle: "Da cosa dipende il costo di una ristrutturazione",
    whenTitle: "Quando conviene una ristrutturazione completa",
    when: [
      "Hai acquistato casa e vuoi rinnovarla prima di entrare.",
      "Gli impianti sono datati e vuoi metterli a norma insieme alle finiture.",
      "Vuoi cambiare la distribuzione degli spazi (es. unire cucina e soggiorno).",
      "Preferisci un unico referente per più lavorazioni invece di coordinare più artigiani.",
    ],
    costFactors: [
      "Metratura e numero di ambienti coinvolti",
      "Stato di partenza di impianti, massetti e murature",
      "Livello delle finiture scelte (pavimenti, sanitari, infissi)",
      "Necessità di pratiche edilizie e direzione lavori",
      "Accessibilità del cantiere (piano, ascensore, ZTL, occupazione suolo pubblico)",
      "Formula chiavi in mano o lavori separati",
    ],
    messinaNotes: [
      "Il centro è stato ricostruito dopo il terremoto del 1908 sulla maglia regolare a isolati del Piano Borzì del 1911: prima di progettare fai verificare lo stato reale di impianti e solai.",
      "Il Comune di Messina è classificato in zona sismica 1: gli interventi su murature portanti richiedono sempre un tecnico abilitato.",
      "In ambiente costiero l'aerosol marino può depositare sali nei materiali e favorirne il degrado: per infissi, ringhiere e intonaci esterni chiedi prodotti adatti.",
      "In condominio verifica regolamento, orari dei lavori e comunicazioni all'amministratore prima di iniziare.",
    ],
    permitsNote: permessiGenerico,
    faqs: [
      {
        q: "Chi può fare una ristrutturazione a Messina?",
        a: "Un'impresa o una ditta edile regolarmente iscritta alla Camera di Commercio, meglio se in grado di coordinare anche impiantisti e finiture. Per lavori che richiedono una pratica edilizia serve anche un tecnico abilitato (geometra, architetto o ingegnere). Con una sola richiesta su questo sito la inoltriamo a imprese locali; se in zona non ce ne sono di disponibili, te lo diciamo.",
      },
      {
        q: "Come trovare un'impresa per ristrutturare un appartamento a Messina?",
        a: "Descrivi il lavoro (tipo di immobile, metratura, tempi, zona) nel modulo di richiesta preventivo. Verifichiamo la richiesta e la inoltriamo a un massimo di 3 professionisti locali disponibili per quel servizio e quella zona, che ti contattano per un sopralluogo; se in zona non ce ne sono, te lo diciamo. Confronta sempre più preventivi scritti e dettagliati.",
      },
      {
        q: "Come si ottiene un prezzo affidabile per ristrutturare?",
        a: "Dipende da metratura, stato di partenza, impianti da rifare e livello delle finiture: per questo un prezzo affidabile si ottiene solo dopo un sopralluogo. Diffida dei preventivi al metro quadro dati senza vedere l'immobile. Nella nostra [guida sui costi di ristrutturazione](/guide/costo-ristrutturazione-casa-messina/) trovi i fattori che fanno variare il costo.",
      },
      {
        q: "Chi fa ristrutturazioni chiavi in mano a Messina?",
        a: "Imprese edili in grado di coordinare anche impiantisti e finiture. Non tutte lo offrono, e non tutte includono le stesse voci. Se ti interessa questa formula indicalo nei dettagli della richiesta: la inoltriamo solo a professionisti disponibili. MessinaCasa360 non esegue lavori.",
      },
      {
        q: "Serve un sopralluogo prima di un preventivo?",
        a: "Per un preventivo affidabile sì: solo vedendo l'immobile si valutano impianti, massetti, accessi e condizioni reali. Una cifra data senza sopralluogo è una stima. Lo fa il professionista che ti contatta: chiedigli prima se è gratuito.",
      },
      {
        q: "Cosa significa ristrutturazione chiavi in mano?",
        a: "Significa affidare a un unico soggetto il coordinamento di tutte le lavorazioni, dalle demolizioni alle finiture, con un solo preventivo e un solo referente. Fatti sempre specificare per iscritto cosa è incluso (pratiche, smaltimento, forniture, pulizia finale).",
      },
      {
        q: "Il servizio è a pagamento per chi chiede il preventivo?",
        a: "No. Richiedere un preventivo tramite questo sito è gratuito e senza impegno per chi ha bisogno del lavoro.",
      },
      {
        q: "Quali regole valgono per ristrutturare un appartamento in condominio?",
        a: "Prima di iniziare va data notizia dei lavori all'amministratore, che ne riferisce all'assemblea (art. 1122 del Codice civile), e non si possono eseguire opere che danneggino le parti comuni o pregiudichino stabilità, sicurezza o decoro dell'edificio. Orari dei lavori rumorosi, uso dell'ascensore e deposito dei materiali dipendono dal regolamento di condominio: chiedilo all'amministratore.",
      },
      {
        q: "Meglio un'unica ditta o artigiani separati?",
        a: "Un'unica ditta, anche chiavi in mano, semplifica coordinamento e responsabilità, ma va scritto cosa include. Con artigiani separati scegli ciascuno, però il coordinamento dei tempi resta a te o a un direttore lavori. Nella richiesta puoi indicare quale formula preferisci.",
      },
      {
        q: "Cosa controllare prima di ristrutturare un appartamento anni '60 o '70?",
        a: "Lo stato reale di impianti, scarichi, massetti e solai, che spesso emerge solo al sopralluogo o a demolizioni avviate. Se gli impianti non hanno la dichiarazione di conformità, valuta con l'impiantista se rifarli. Se trovi materiali sospetti, come vecchie canne fumarie o serbatoi in fibrocemento, fermati e fai verificare da un tecnico.",
      },
    ],
    updated: "2026-11-14",
    sources: [
      { label: "Codice civile, art. 1122", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1942-03-16;262~art1122" },
      { label: "DPR 380/2001, Testo unico dell'edilizia", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.presidente.repubblica:2001-06-06;380" },
      { label: "L.R. Sicilia 16/2016, testo coordinato", href: "https://www.regione.sicilia.it/system/files/2025-04/lr%2016_2016%20agg%2028%20feb%202025.pdf" },
      { label: "Regione Siciliana, classificazione sismica (DGR 81/2022)", href: "https://www2.regione.sicilia.it/deliberegiunta/file/giunta/allegati/N.081_24.02.2022.pdf" },
    ],
    related: ["bagno", "cucina", "impianti", "pavimenti", "cartongesso"],
    guide: "/guide/costo-ristrutturazione-casa-messina/",
    moreGuides: ["/guide/ristrutturare-casa-messina-da-dove-iniziare/", SCEGLIERE],
  },
  {
    id: "bagno",
    funnelService: "bagno",
    path: "/ristrutturazione-bagno-messina/",
    navLabel: "Bagni",
    cardTitle: "Bagni",
    cardText: "Rifacimento completo, sostituzione vasca con doccia, nuovi rivestimenti e sanitari.",
    title: "Ristrutturazione bagno a Messina",
    metaDescription:
      "Ristrutturazione o rifacimento del bagno a Messina: vasca in doccia, impianti, rivestimenti e sanitari. Richiesta gratuita fino a 3 professionisti locali.",
    h1: "Ristrutturazione bagno a Messina: rifacimento completo o parziale",
    lead:
      "Dal semplice cambio dei sanitari al rifacimento completo con nuovi impianti: inviaci la richiesta, anche con qualche foto dell'ambiente attuale, e ti mettiamo in contatto con professionisti della zona.",
    answer:
      "Rifare un bagno a Messina richiede un'impresa o un artigiano per opere e rivestimenti e un idraulico abilitato per gli impianti. Se sostituisci solo finiture e sanitari di norma basta l'edilizia libera; se sposti tramezzi o cambi la distribuzione serve in genere una CILA.",
    quoteChecklist: [
      "Smontaggio, smaltimento e rifacimento degli scarichi, indicati a parte",
      "Tipo di impermeabilizzazione della zona doccia",
      "Marca e modello di sanitari, rubinetteria e piatto doccia",
      "Metri quadri di rivestimenti e costo del materiale",
      "Dichiarazione di conformità dell'impianto a fine lavori",
    ],
    includes: [
      "Smontaggio e smaltimento del vecchio bagno",
      "Rifacimento impianto idraulico e scarichi",
      "Trasformazione vasca in doccia",
      "Impermeabilizzazione della zona doccia",
      "Nuovi pavimenti e rivestimenti",
      "Sanitari, rubinetteria e mobile bagno",
      "Punti luce, aspirazione e ventilazione",
    ],
    scopeTitle: "Cosa comprende il rifacimento del bagno",
    costTitle: "Da cosa dipende il prezzo del bagno",
    whenTitle: "Segnali che è il momento di rifare il bagno",
    when: [
      "Infiltrazioni o macchie di umidità al piano di sotto.",
      "Piastrelle crepate o fughe annerite che non si puliscono più.",
      "Vuoi sostituire la vasca con una doccia più comoda e accessibile.",
      "Impianto idraulico datato con scarichi lenti o perdite.",
    ],
    costFactors: [
      "Metratura del bagno e altezza dei rivestimenti",
      "Rifacimento o meno di impianto idraulico e scarichi",
      "Spostamento dei sanitari rispetto alla posizione attuale",
      "Tipologia di piatto doccia, sanitari e rubinetteria",
      "Formato e materiale di piastrelle o resine",
    ],
    messinaNotes: [
      "Negli appartamenti in condominio gli scarichi verticali (colonne) sono parti comuni: eventuali interventi vanno concordati con l'amministratore.",
      "Il clima umido della costa rende importante una buona ventilazione: valuta un aspiratore se il bagno è cieco.",
    ],
    permitsNote:
      "Sostituire sanitari e piastrelle senza modificare impianti e spazi rientra di norma nell'edilizia libera; se sposti tramezzi o rifai la distribuzione degli impianti di solito serve una CILA. In Sicilia vale anche la L.R. 16/2016: fai verificare a un tecnico abilitato.",
    faqs: [
      {
        q: "Come richiedere un preventivo per rifare il bagno a Messina?",
        a: "Compila la richiesta indicando metratura, tipo di intervento e tempi; se puoi allega 2-3 foto del bagno attuale e una piantina. Inoltriamo la richiesta a professionisti locali disponibili, che ti contattano per un sopralluogo e un preventivo scritto.",
      },
      {
        q: "Cosa fa variare il preventivo del bagno?",
        a: "Non esiste un prezzo unico: dipende da metratura, rifacimento di impianti e scarichi, spostamento dei sanitari e materiali. Per un importo affidabile servono un sopralluogo e un preventivo scritto voce per voce. Nella [guida sul costo del bagno](/guide/costo-rifacimento-bagno-messina/) spieghiamo le voci che fanno il prezzo.",
      },
      {
        q: "Quanto tempo serve per rifare un bagno?",
        a: "Dipende dall'entità dei lavori: una semplice sostituzione di sanitari richiede pochi giorni, un rifacimento completo con impianti richiede di più. Chiedi sempre un cronoprogramma scritto insieme al preventivo.",
      },
      {
        q: "Serve un permesso per ristrutturare il bagno?",
        a: "Se cambi solo finiture e sanitari di norma no; se modifichi impianti o tramezzi in genere serve una CILA. La regola precisa va verificata con un tecnico abilitato, anche perché in Sicilia si applica la normativa regionale.",
      },
      {
        q: "Rifare il bagno rientra nel bonus ristrutturazione?",
        a: "In una singola abitazione la detrazione riguarda di norma la manutenzione straordinaria: sostituire solo piastrelle e sanitari è in genere manutenzione ordinaria e da sola non basta, mentre il rifacimento degli impianti o della distribuzione può rientrare. Aliquote e requisiti cambiano: leggi la [guida sui bonus](/guide/bonus-ristrutturazione-2026/) e verifica con il commercialista.",
      },
      {
        q: "Si può sostituire la vasca con la doccia senza opere murarie?",
        a: "In alcuni casi sì: il piatto doccia si installa nello spazio della vasca riducendo le demolizioni. Restano da verificare posizione e pendenza dello scarico e l'impermeabilizzazione della zona, che il professionista valuta al sopralluogo.",
      },
    ],
    updated: "2026-11-14",
    sources: [
      { label: "DM 37/2008, impianti negli edifici", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:ministero.sviluppo.economico:decreto:2008-01-22;37" },
      { label: "L.R. Sicilia 16/2016, testo coordinato", href: "https://www.regione.sicilia.it/system/files/2025-04/lr%2016_2016%20agg%2028%20feb%202025.pdf" },
      { label: "Agenzia delle Entrate, guida alle ristrutturazioni", href: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/ristrutturazioni_edilizie_le_agevolazioni_fiscali-1" },
    ],
    related: ["impianti", "pavimenti", "ristrutturazioni"],
    guide: "/guide/costo-rifacimento-bagno-messina/",
    moreGuides: ["/guide/bonus-ristrutturazione-2026/", SCEGLIERE],
  },
  {
    id: "cucina",
    funnelService: "cucina",
    path: "/ristrutturazione-cucina-messina/",
    navLabel: "Cucine",
    cardTitle: "Cucine",
    cardText: "Nuova disposizione, impianti, rivestimenti e opere murarie per la cucina.",
    title: "Ristrutturazione cucina a Messina",
    metaDescription:
      "Ristrutturare la cucina a Messina: spostamento di attacchi e impianti, rivestimenti, apertura sul soggiorno. Richiesta gratuita fino a 3 imprese locali.",
    h1: "Ristrutturazione cucina a Messina: impianti, rivestimenti e nuovi spazi",
    lead:
      "Rinnovare la cucina spesso significa più di cambiare i mobili: spostare attacchi acqua e gas, rifare i punti elettrici, aprire la cucina sul soggiorno. Descrivi il lavoro: inoltriamo la richiesta a chi si occupa di opere edili e impianti in zona.",
    answer:
      "Ristrutturare una cucina a Messina significa coordinare opere murarie, idraulico, elettricista e, per il gas, un tecnico abilitato; il mobiliere interviene a lavori finiti. Prima di eliminare una parete un tecnico deve verificare che non sia portante.",
    quoteChecklist: [
      "Posizione di attacchi acqua, scarichi e prese, basata sul progetto della cucina",
      "Potenza elettrica e linee dedicate per forno e piano a induzione",
      "Opere murarie indicate a parte: aperture, tramezzi, tracce",
      "Chi coordina tempi e misure con il mobiliere",
      "Dichiarazioni di conformità degli impianti",
    ],
    includes: [
      "Spostamento attacchi acqua e scarichi",
      "Adeguamento impianto elettrico e nuovi punti presa",
      "Verifica e adeguamento dell'allaccio gas (da tecnico abilitato)",
      "Apertura o chiusura di vani e tramezzi",
      "Rivestimenti, paraschizzi e pavimento",
      "Controsoffitti e illuminazione",
    ],
    scopeTitle: "Cosa comprende la ristrutturazione della cucina",
    costTitle: "Da cosa dipende il costo dei lavori in cucina",
    whenTitle: "Quando ristrutturare la cucina",
    when: [
      "Vuoi una cucina aperta sul soggiorno.",
      "Devi installare una nuova cucina con disposizione diversa dalla precedente.",
      "Impianti elettrici insufficienti per piano cottura a induzione e forno.",
    ],
    costFactors: [
      "Spostamento o meno di acqua, scarichi e gas",
      "Opere murarie (apertura vani, nuovi tramezzi)",
      "Superficie di rivestimenti e pavimenti",
      "Potenza elettrica necessaria (es. passaggio a induzione)",
    ],
    messinaNotes: [
      "Se elimini una parete verifica prima con un tecnico che non sia portante: il Comune di Messina è in zona sismica 1.",
      "La fornitura dei mobili è di solito separata dalle opere edili: chiarisci chi coordina tempi e misure.",
    ],
    permitsNote: permessiGenerico,
    faqs: [
      {
        q: "Chi si occupa di ristrutturare la cucina a Messina?",
        a: "Di solito un'impresa edile per le opere murarie insieme a idraulico ed elettricista per gli impianti; il mobiliere installa la cucina a lavori finiti. Con la nostra richiesta puoi cercare un unico referente o più artigiani.",
      },
      {
        q: "Posso unire cucina e soggiorno?",
        a: "Spesso sì, ma solo dopo aver verificato con un tecnico abilitato che la parete non sia portante e quali pratiche servono. In questi casi è normalmente necessaria almeno una CILA.",
      },
      {
        q: "Meglio scegliere prima la cucina o fare prima i lavori?",
        a: "Conviene definire il progetto della cucina prima dei lavori, perché la posizione di attacchi, scarichi e prese dipende dalla disposizione dei mobili.",
      },
      {
        q: "La ristrutturazione della cucina dà diritto al bonus mobili?",
        a: "Il bonus mobili spetta solo se collegato a un intervento di recupero edilizio sull'immobile, non per il solo acquisto della cucina. Requisiti, importi e scadenze sono nella nostra [guida sui bonus](/guide/bonus-ristrutturazione-2026/), con le fonti ufficiali.",
      },
      {
        q: "Per il piano a induzione serve più potenza elettrica?",
        a: "Spesso sì: forno e piano a induzione insieme possono superare la potenza del contratto. L'elettricista valuta linee dedicate e quadro; l'eventuale aumento di potenza si chiede al proprio fornitore di energia.",
      },
      {
        q: "Si può spostare la cucina in un'altra stanza?",
        a: "Sì, ma contano gli scarichi e le loro pendenze, l'uscita della cappa e, se resta il gas, aerazione e allaccio eseguiti da un tecnico abilitato. In condominio verifica anche il regolamento. Il sopralluogo chiarisce cosa è fattibile.",
      },
    ],
    updated: "2026-11-14",
    sources: [
      { label: "DM 37/2008, impianti negli edifici", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:ministero.sviluppo.economico:decreto:2008-01-22;37" },
      { label: "L.R. Sicilia 16/2016, testo coordinato", href: "https://www.regione.sicilia.it/system/files/2025-04/lr%2016_2016%20agg%2028%20feb%202025.pdf" },
      { label: "Agenzia delle Entrate, guida alle ristrutturazioni", href: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/ristrutturazioni_edilizie_le_agevolazioni_fiscali-1" },
    ],
    related: ["impianti", "ristrutturazioni", "pavimenti"],
    guide: "/guide/bonus-ristrutturazione-2026/",
    moreGuides: [SCEGLIERE],
  },
  {
    id: "cartongesso",
    funnelService: "cartongesso",
    path: "/cartongesso-messina/",
    navLabel: "Cartongesso",
    cardTitle: "Cartongesso",
    cardText: "Pareti divisorie, controsoffitti, velette, librerie e isolamento interno.",
    title: "Cartongesso e controsoffitti a Messina",
    metaDescription:
      "Pareti in cartongesso, controsoffitti con faretti LED, velette e contropareti isolanti a Messina. Richiesta gratuita fino a 3 cartongessisti locali.",
    h1: "Cartongessista a Messina: pareti, controsoffitti e contropareti",
    lead:
      "Il cartongesso permette di dividere ambienti, creare controsoffitti con luci integrate, nascondere impianti o migliorare l'isolamento acustico in tempi rapidi e con poca polvere. Raccontaci cosa ti serve e ti mettiamo in contatto con cartongessisti della zona.",
    answer:
      "Il cartongesso serve per dividere ambienti, creare controsoffitti, nascondere impianti e migliorare l'isolamento acustico con poca polvere e tempi ridotti. Una nuova parete che cambia la distribuzione è un tramezzo a tutti gli effetti: in genere serve una CILA.",
    quoteChecklist: [
      "Tipo e spessore delle lastre: standard, idrofuga, ignifuga, acustica",
      "Struttura metallica e isolante nell'intercapedine",
      "Metri quadri e dettagli su misura indicati a parte",
      "Rasatura e pittura finale: incluse o escluse",
      "Coordinamento con elettricista e installatore del clima",
    ],
    includes: [
      "Pareti divisorie e contropareti",
      "Controsoffitti piani, ribassati e con velette",
      "Faretti e strip LED integrati (con elettricista)",
      "Librerie e nicchie su misura",
      "Isolamento termico e acustico con pannelli",
      "Lastre idrofughe per bagni e cucine",
    ],
    scopeTitle: "Lavori in cartongesso: pareti, controsoffitti, contropareti",
    costTitle: "Da cosa dipende il prezzo del cartongesso al metro quadro",
    whenTitle: "Quando scegliere il cartongesso",
    when: [
      "Vuoi ricavare una stanza in più senza opere murarie pesanti.",
      "Devi nascondere tubazioni, canaline del climatizzatore o travi.",
      "Vuoi ridurre i rumori dal vicino con una controparete isolata.",
    ],
    costFactors: [
      "Metri quadri di parete o controsoffitto",
      "Tipo di lastra (standard, idrofuga, ignifuga, acustica)",
      "Presenza di isolante nell'intercapedine",
      "Velette, gole luminose e dettagli su misura",
      "Rasatura e pittura finale incluse o escluse",
    ],
    messinaNotes: [
      "Nei locali umidi o vicino al mare preferisci lastre idrofughe e una buona ventilazione.",
      "Un controsoffitto può ospitare le canalizzazioni del climatizzatore: coordina cartongessista e installatore.",
    ],
    permitsNote:
      "Una parete in cartongesso che modifica la distribuzione interna è un tramezzo a tutti gli effetti: in genere serve una CILA. Per un controsoffitto che non modifica gli spazi fai verificare a un tecnico abilitato se serve una pratica.",
    faqs: [
      {
        q: "Chi fa cartongesso a Messina?",
        a: "Cartongessisti e imprese di finiture specializzate. Con una richiesta sul nostro sito descrivi il lavoro (metri quadri, tipo di parete o controsoffitto) e ti mettiamo in contatto con professionisti locali disponibili.",
      },
      {
        q: "Quanto costa il cartongesso al metro quadro?",
        a: "Il prezzo al metro quadro varia molto in base a tipo di lastra, isolamento, altezza, dettagli e finitura. Per un confronto corretto chiedi preventivi che specifichino questi elementi voce per voce.",
      },
      {
        q: "Una parete in cartongesso isola dal rumore?",
        a: "Sì, se progettata per farlo: doppia lastra, isolante in lana minerale nell'intercapedine e giunti ben sigillati migliorano molto l'isolamento acustico rispetto a una parete semplice.",
      },
      {
        q: "Si può fare un controsoffitto in cartongesso in bagno o in cucina?",
        a: "Sì, con lastre idrofughe e una buona ventilazione dell'ambiente. Se prevedi faretti o un'aspirazione, falli indicare nel progetto, così elettricista e cartongessista lavorano in sequenza.",
      },
      {
        q: "Una parete in cartongesso regge pensili e mensole?",
        a: "Sì, se lo si prevede: per pensili, mobili sospesi, sanitari o TV si inseriscono rinforzi nella struttura prima di chiudere le lastre e si usano tasselli adatti. Indica nella richiesta cosa vuoi appendere.",
      },
    ],
    updated: "2026-11-14",
    sources: [
      { label: "DPR 380/2001, Testo unico dell'edilizia", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.presidente.repubblica:2001-06-06;380" },
      { label: "L.R. Sicilia 16/2016, testo coordinato", href: "https://www.regione.sicilia.it/system/files/2025-04/lr%2016_2016%20agg%2028%20feb%202025.pdf" },
    ],
    related: ["imbianchino", "cappotto", "ristrutturazioni", "impianti"],
    guide: SCEGLIERE,
  },
  {
    id: "imbianchino",
    funnelService: "pittura",
    path: "/imbianchino-messina/",
    navLabel: "Pittura",
    cardTitle: "Pittura e finiture",
    cardText: "Imbiancatura appartamenti, trattamenti antimuffa, stucchi e pitture decorative.",
    title: "Imbianchino a Messina: tinteggiatura casa",
    metaDescription:
      "Cerchi un imbianchino a Messina? Tinteggiatura di appartamenti, trattamenti antimuffa e finiture decorative. Richiesta gratuita fino a 3 pittori edili locali.",
    h1: "Imbianchino a Messina: tinteggiatura di appartamenti e trattamenti antimuffa",
    lead:
      "Ridipingere casa è uno dei lavori più rapidi per cambiare volto agli ambienti. Che sia un singolo locale o l'intero appartamento, descrivi il lavoro e ti mettiamo in contatto con pittori edili della zona.",
    answer:
      "Per ridipingere casa a Messina serve un pittore edile che prepari le pareti prima della pittura: stuccature e trattamento della muffa contano quanto il prodotto. La tinteggiatura interna rientra nell'edilizia libera.",
    quoteChecklist: [
      "Metri quadri di pareti e soffitti",
      "Preparazione: stuccature, rasature, rimozione di vecchie pitture",
      "Marca e tipo di pittura, numero di mani",
      "Trattamento antimuffa e verifica della causa",
      "Protezione di pavimenti e arredi, pulizia finale",
    ],
    includes: [
      "Imbiancatura di pareti e soffitti",
      "Stuccatura e rasatura di crepe e imperfezioni",
      "Trattamenti antimuffa e pitture traspiranti",
      "Smalti per porte, ringhiere e infissi",
      "Pitture decorative ed effetti materici",
      "Protezione di pavimenti e arredi, pulizia finale",
    ],
    scopeTitle: "Cosa comprende la tinteggiatura",
    costTitle: "Da cosa dipende il costo per imbiancare casa",
    whenTitle: "Quando chiamare un imbianchino",
    when: [
      "Prima di entrare in una casa nuova o dopo un trasloco.",
      "Muffa negli angoli o sui soffitti di bagno e camere.",
      "Dopo lavori di cartongesso, impianti o piccole riparazioni.",
    ],
    costFactors: [
      "Superficie da pitturare (pareti e soffitti)",
      "Stato delle pareti: crepe, muffa, vecchie pitture da rimuovere",
      "Tipo di pittura (lavabile, traspirante, antimuffa, decorativa)",
      "Altezza dei soffitti e presenza di arredi da proteggere",
    ],
    messinaNotes: [
      "Con l'umidità della costa la muffa è frequente: trattarla prima di ridipingere evita che ricompaia dopo poche settimane.",
      "Per esterni e ringhiere esposti alla salsedine servono prodotti specifici.",
    ],
    permitsNote:
      "La tinteggiatura interna rientra nell'edilizia libera. Per le facciate in condominio o in zone vincolate possono servire autorizzazioni: chiedi all'amministratore e al Comune.",
    faqs: [
      {
        q: "Come trovare un imbianchino affidabile a Messina?",
        a: "Chiedi più preventivi scritti che indichino superfici, numero di mani, prodotti usati e preparazione delle pareti. Con la nostra richiesta gratuita ti mettiamo in contatto con pittori edili locali.",
      },
      {
        q: "Quanto tempo ci vuole per pitturare un appartamento?",
        a: "Dipende dalla superficie e dallo stato delle pareti: un piccolo appartamento in buone condizioni richiede pochi giorni, mentre stuccature e trattamenti antimuffa allungano i tempi.",
      },
      {
        q: "Come eliminare la muffa prima di imbiancare?",
        a: "Va prima individuata la causa (condensa, infiltrazione o un ponte termico, che si corregge con l'[isolamento a cappotto](/cappotto-termico-messina/)), poi trattata la superficie con prodotti specifici e infine applicata una pittura adatta. Senza risolvere la causa la muffa tende a tornare.",
      },
      {
        q: "Imbiancare casa in affitto: a chi spetta?",
        a: "Dipende dal contratto. Il conduttore deve restituire l'immobile nello stato in cui l'ha ricevuto, salvo il deterioramento derivante dall'uso conforme al contratto (art. 1590 del Codice civile). Prima di imbiancare, leggi il contratto e accordati per iscritto con il proprietario.",
      },
      {
        q: "Si può imbiancare in inverno?",
        a: "Sì, se temperatura e umidità dell'ambiente rientrano nei valori indicati nella scheda tecnica della pittura. Con freddo e umidità l'asciugatura tra una mano e l'altra si allunga: chiedi al pittore come organizza il lavoro.",
      },
      {
        q: "Quante mani di pittura servono?",
        a: "Di solito due, ma dipende dal fondo, dal colore di partenza e dal prodotto. Fai indicare nel preventivo il numero di mani e la preparazione prevista.",
      },
    ],
    updated: "2026-11-14",
    sources: [
      { label: "Codice civile, art. 1590", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1942-03-16;262~art1590" },
      { label: "DPR 380/2001, Testo unico dell'edilizia", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.presidente.repubblica:2001-06-06;380" },
    ],
    related: ["cartongesso", "cappotto", "facciate", "ristrutturazioni"],
    guide: SCEGLIERE,
  },
  {
    id: "impianti",
    funnelService: "impianti",
    path: "/impianti-messina/",
    navLabel: "Impianti",
    cardTitle: "Impianti",
    cardText: "Rifacimento impianto elettrico e idraulico durante la ristrutturazione.",
    title: "Rifacimento impianto elettrico a Messina",
    metaDescription:
      "Rifacimento dell'impianto elettrico e idraulico a Messina durante la ristrutturazione, con dichiarazione di conformità. Richiesta gratuita, non per urgenze.",
    h1: "Rifacimento impianti elettrici e idraulici a Messina",
    lead:
      "Rifare gli impianti è il momento giusto per metterli a norma e predisporre la casa a climatizzazione, induzione e domotica. Questa pagina riguarda il rifacimento di impianti durante lavori programmati, non gli interventi di emergenza.",
    answer:
      "Il rifacimento di impianti elettrici e idraulici può essere eseguito solo da imprese abilitate ai sensi del DM 37/2008, che a fine lavori rilasciano la dichiarazione di conformità. Conviene farlo durante la ristrutturazione, prima di intonaci e pavimenti.",
    quoteChecklist: [
      "Numero di punti luce, prese e attacchi",
      "Nuovo quadro elettrico e linee separate",
      "Sostituzione delle tubazioni sottotraccia, se necessaria",
      "Apertura e chiusura delle tracce: incluse o escluse",
      "Dichiarazione di conformità a fine lavori (DM 37/2008)",
    ],
    includes: [
      "Rifacimento completo dell'impianto elettrico",
      "Nuovo quadro elettrico e linee separate",
      "Punti luce, prese, dati e predisposizioni",
      "Rifacimento impianto idrico e scarichi",
      "Predisposizione climatizzazione",
      "Dichiarazione di conformità a fine lavori (DM 37/2008)",
    ],
    scopeTitle: "Cosa comprende il rifacimento degli impianti",
    costTitle: "Da cosa dipende il costo di impianto elettrico e idraulico",
    whenTitle: "Quando rifare gli impianti",
    when: [
      "Impianto elettrico senza salvavita adeguato o con prese insufficienti.",
      "Tubazioni in ferro zincato vecchie, con perdite o acqua torbida.",
      "Stai già ristrutturando: rompere tracce una sola volta conviene.",
    ],
    costFactors: [
      "Metratura e numero di punti luce, prese e attacchi",
      "Necessità di sostituire o meno le tubazioni sottotraccia",
      "Quadro elettrico e potenza richiesta",
      "Opere murarie di apertura e chiusura tracce",
    ],
    messinaNotes: [
      "Negli edifici più datati è frequente trovare impianti non conformi: una verifica preliminare evita sorprese a cantiere aperto.",
      "Gli impianti devono essere realizzati da imprese abilitate che rilasciano la dichiarazione di conformità.",
    ],
    permitsNote:
      "Il rifacimento degli impianti deve essere eseguito da imprese abilitate ai sensi del DM 37/2008, che a fine lavori rilasciano la dichiarazione di conformità. Se l'intervento rientra in una ristrutturazione più ampia può servire una pratica edilizia: verifica con un tecnico abilitato.",
    faqs: [
      {
        q: "Chi può rifare un impianto durante una ristrutturazione?",
        a: "Solo imprese abilitate per quel tipo di impianto (elettrico, idraulico, gas) ai sensi del DM 37/2008, che a fine lavori devono rilasciare la dichiarazione di conformità. Chiedila sempre.",
      },
      {
        q: "Conviene rifare l'impianto elettrico insieme alla ristrutturazione?",
        a: "Di solito sì: le tracce nei muri si aprono una sola volta, prima di intonaci, pavimenti e pittura, riducendo costi e disagi.",
      },
      {
        q: "Gestite anche guasti urgenti?",
        a: "No, questo servizio è pensato per lavori programmati. Per un guasto urgente o una fuga di gas contatta subito un tecnico di pronto intervento o il numero di emergenza del tuo fornitore.",
      },
      {
        q: "Serve la CILA per rifare l'impianto elettrico?",
        a: "Il Glossario dell'edilizia libera (DM 2 marzo 2018) elenca la riparazione, l'integrazione, il rinnovamento e la messa a norma dell'impianto elettrico, nel rispetto della normativa di settore. Se però i lavori fanno parte di una ristrutturazione che modifica spazi o tramezzi, in genere serve una CILA (vedi la [guida sulla CILA](/guide/cila-quando-serve/)). In Sicilia vale anche la L.R. 16/2016: verifica con un tecnico abilitato.",
      },
      {
        q: "L'impianto è vecchio e non ha la dichiarazione di conformità: cosa si fa?",
        a: "Per gli impianti realizzati prima dell'entrata in vigore del DM 37/2008, se la dichiarazione di conformità non esiste o non è reperibile può essere sostituita da una dichiarazione di rispondenza, redatta dopo sopralluogo e accertamenti da un professionista con i requisiti previsti (art. 7, comma 6). Se l'impianto non è a norma, va adeguato da un'impresa abilitata.",
      },
    ],
    updated: "2026-11-14",
    sources: [
      { label: "DM 37/2008, impianti negli edifici", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:ministero.sviluppo.economico:decreto:2008-01-22;37" },
      { label: "L.R. Sicilia 16/2016, testo coordinato", href: "https://www.regione.sicilia.it/system/files/2025-04/lr%2016_2016%20agg%2028%20feb%202025.pdf" },
    ],
    related: ["ristrutturazioni", "bagno", "cucina"],
    guide: SCEGLIERE,
  },
  {
    id: "pavimenti",
    funnelService: "pavimenti",
    path: "/pavimenti-messina/",
    navLabel: "Pavimenti",
    cardTitle: "Pavimenti",
    cardText: "Posa di gres, parquet e resine, rifacimento massetti e rivestimenti.",
    title: "Posa pavimenti a Messina: preventivi",
    metaDescription:
      "Posa e rifacimento pavimenti a Messina: gres porcellanato, parquet, resina, posa sopra il vecchio o nuovo massetto. Richiesta gratuita a posatori locali.",
    h1: "Posa pavimenti a Messina: rifacimento o sovrapposizione",
    lead:
      "Cambiare il pavimento trasforma la casa. Si può demolire e rifare il massetto oppure, quando possibile, posare in sovrapposizione per ridurre tempi e macerie. Descrivi il lavoro e ti mettiamo in contatto con posatori della zona.",
    answer:
      "Per cambiare i pavimenti a Messina si può demolire e rifare il massetto oppure, se il vecchio pavimento è stabile e lo spessore lo consente, posare in sovrapposizione. Il rifacimento interno senza modifiche strutturali rientra di norma nell'edilizia libera.",
    quoteChecklist: [
      "Metri quadri, con lo sfrido dichiarato",
      "Demolizione e smaltimento del vecchio pavimento",
      "Stato e rifacimento del massetto",
      "Materiale, formato e schema di posa",
      "Adattamento di porte, soglie e battiscopa",
    ],
    includes: [
      "Demolizione del vecchio pavimento e smaltimento",
      "Rifacimento massetti",
      "Posa di gres porcellanato, anche grandi formati",
      "Parquet e laminati",
      "Pavimenti in resina",
      "Posa in sovrapposizione su pavimento esistente",
      "Battiscopa e soglie",
    ],
    scopeTitle: "Cosa comprende la posa dei pavimenti",
    costTitle: "Da cosa dipende il prezzo della posa al metro quadro",
    whenTitle: "Demolire o sovrapporre?",
    when: [
      "Sovrapporre è possibile se il pavimento esistente è stabile e l'aumento di spessore è compatibile con porte e soglie.",
      "Demolire è necessario se devi rifare impianti a pavimento o se il massetto è danneggiato.",
    ],
    costFactors: [
      "Metri quadri e numero di ambienti",
      "Demolizione e nuovo massetto oppure sovrapposizione",
      "Materiale e formato scelto",
      "Schema di posa (dritta, diagonale, spina di pesce)",
      "Adattamento di porte e soglie",
    ],
    messinaNotes: [
      "Per terrazzi e balconi esposti conta molto l'impermeabilizzazione sotto il pavimento.",
      "Nei piani terra verifica l'eventuale risalita di umidità prima di posare parquet.",
    ],
    permitsNote:
      "Il rifacimento di pavimenti interni senza modifiche strutturali rientra di norma nell'edilizia libera. Per terrazzi, parti comuni o interventi più ampi verifica con un tecnico abilitato.",
    faqs: [
      {
        q: "Si può posare un pavimento sopra quello vecchio?",
        a: "Spesso sì, se il pavimento esistente è ben ancorato e planare e se lo spessore aggiuntivo è compatibile con porte e soglie. Un posatore lo verifica al sopralluogo.",
      },
      {
        q: "Quale pavimento scegliere per una casa al mare?",
        a: "Il gres porcellanato resiste bene a umidità, sabbia e salsedine; il parquet richiede più attenzione negli ambienti umidi. Chiedi consiglio al posatore in base all'uso degli ambienti.",
      },
      {
        q: "Come richiedere un preventivo per i pavimenti a Messina?",
        a: "Indica nel modulo metri quadri, materiale desiderato e se va demolito il vecchio pavimento. Puoi allegare foto e piantina: ti mettiamo in contatto con professionisti locali.",
      },
      {
        q: "Cos'è il pavimento SPC e quando conviene?",
        a: "È un pavimento vinilico rigido con incastro, a base di PVC e cariche minerali. Ha spessori ridotti e si posa spesso flottante sopra il pavimento esistente, ma chiede un fondo stabile, piano e asciutto. Confrontalo con gres e laminato in base a uso degli ambienti e umidità.",
      },
      {
        q: "Posso cambiare il pavimento del terrazzo senza rifare l'impermeabilizzazione?",
        a: "Solo se l'impermeabilizzazione sotto è integra e non ci sono infiltrazioni al piano di sotto. Se il terrazzo copre un'abitazione, conviene farla verificare prima: rifarla dopo significa demolire il pavimento nuovo. Vedi l'[impermeabilizzazione del terrazzo](/impermeabilizzazione-terrazzi-messina/).",
      },
    ],
    updated: "2026-11-14",
    sources: [
      { label: "DPR 380/2001, Testo unico dell'edilizia", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.presidente.repubblica:2001-06-06;380" },
      { label: "L.R. Sicilia 16/2016, testo coordinato", href: "https://www.regione.sicilia.it/system/files/2025-04/lr%2016_2016%20agg%2028%20feb%202025.pdf" },
    ],
    related: ["ristrutturazioni", "bagno", "impermeabilizzazione", "imbianchino"],
    guide: SCEGLIERE,
  },
  {
    id: "facciate",
    funnelService: "facciata",
    path: "/rifacimento-facciata-messina/",
    navLabel: "Facciate",
    cardTitle: "Facciate",
    cardText: "Ripristino di intonaci e balconi, tinteggiatura e ponteggi, per palazzi e condomini.",
    title: "Rifacimento facciata a Messina: preventivi",
    metaDescription:
      "Rifacimento facciata a Messina, in condominio o casa privata: intonaci, frontalini e tinteggiatura. Come decide l'assemblea. Richiesta gratuita.",
    h1: "Rifacimento facciata a Messina: intonaci, balconi e condomini",
    lead:
      "Quando l'intonaco si stacca o i frontalini dei balconi si sfaldano, rifare la facciata riguarda sicurezza, decoro e spese condominiali. Descrivi la situazione: inoltriamo la richiesta fino a 3 imprese della zona, che se disponibili ti contattano per un sopralluogo.",
    answer:
      "Per rifare una facciata a Messina servono un'impresa attrezzata per i ponteggi e, quasi sempre, un tecnico che valuti intonaci e balconi. In condominio decide l'assemblea e le spese si dividono per millesimi. Il costo dipende da superficie, ponteggio e degrado: si definisce solo dopo un sopralluogo.",
    quoteChecklist: [
      "Metri quadri di facciata e metodo di misura",
      "Ponteggio: montaggio, noleggio, durata e permessi indicati a parte",
      "Ripristini di intonaci e calcestruzzo, con le quantità",
      "Ciclo di finitura: prodotti, colore e numero di mani",
      "Tempi, pagamenti per stati di avanzamento e pulizia finale",
    ],
    includes: [
      "Ponteggi e protezioni di cantiere",
      "Verifica e rimozione degli intonaci distaccati",
      "Ripristino di frontalini e balconi",
      "Nuovi intonaci e rasature",
      "Trattamento dei ferri d'armatura a vista",
      "Tinteggiatura con prodotti per esterni",
      "Isolamento a cappotto, se previsto dal progetto",
    ],
    scopeTitle: "Cosa comprende il rifacimento della facciata",
    costTitle: "Da cosa dipende il costo della facciata",
    whenTitle: "Segnali che è il momento di intervenire",
    when: [
      "Intonaco che si stacca o suona vuoto se battuto.",
      "Frontalini dei balconi sfaldati o ferri d'armatura a vista.",
      "Crepe e macchie che si allargano nel tempo.",
      "Una segnalazione sullo stato della facciata da parte dell'amministratore o del Comune.",
    ],
    costFactors: [
      "Metri quadri di facciata e altezza dell'edificio",
      "Ponteggio: tipo, durata e occupazione di suolo pubblico",
      "Estensione del degrado di intonaci e balconi",
      "Ciclo di finitura e tipo di prodotti",
      "Accessibilità del cantiere e vincoli della zona",
    ],
    messinaNotes: [
      "In ambiente costiero l'aerosol marino può depositare sali nei materiali e favorirne il degrado: per intonaci e ringhiere chiedi prodotti adatti.",
      "Ponteggi e cassoni su area pubblica richiedono l'autorizzazione del Comune, e l'accesso dei mezzi può essere limitato dalle ZTL.",
      "Il Comune di Messina è in zona sismica 1: gli interventi su parti strutturali richiedono sempre un tecnico abilitato.",
      "Nella fascia costiera e nelle aree tutelate cambiare l'aspetto esterno può richiedere l'autorizzazione paesaggistica.",
    ],
    permitsNote:
      "Il ripristino senza modifiche rientra di norma nella manutenzione. Se cambi colore o aspetto, o tocchi parti strutturali, possono servire un titolo edilizio e, nelle aree tutelate, l'autorizzazione paesaggistica. In Sicilia vale anche la L.R. 16/2016: fai verificare a un tecnico abilitato e al Comune.",
    faqs: [
      {
        q: "Chi decide il rifacimento della facciata in condominio?",
        a: "L'assemblea. Per le riparazioni straordinarie di notevole entità l'art. 1136 del Codice civile richiede la maggioranza degli intervenuti e almeno la metà del valore dell'edificio, anche in seconda convocazione.",
      },
      {
        q: "Come si dividono le spese della facciata?",
        a: "Di regola in proporzione ai millesimi di proprietà, salvo un diverso regolamento o accordo. L'amministratore può indicare il criterio applicabile al tuo condominio.",
      },
      {
        q: "Quanto costa rifare una facciata a Messina?",
        a: "Non esiste un prezzo unico: dipende da metri quadri, altezza, ponteggio, stato di intonaci e balconi e ciclo di finitura. Per un importo affidabile servono un sopralluogo e un preventivo scritto voce per voce.",
      },
      {
        q: "Il rifacimento della facciata si può detrarre nel 2026?",
        a: "Il bonus facciate è terminato con le spese sostenute fino al 2022. Resta il bonus ristrutturazione: sulle parti comuni del condominio può riguardare anche la manutenzione ordinaria, come la tinteggiatura; su una casa singola serve di norma un intervento di manutenzione straordinaria. Verifica con il commercialista e leggi la [guida sui bonus](/guide/bonus-ristrutturazione-2026/).",
      },
      {
        q: "Serve un permesso per rifare la facciata?",
        a: "Dipende da intervento e zona. Il ripristino senza modifiche è di norma manutenzione; un cambio di aspetto o interventi strutturali possono richiedere un titolo edilizio. La verifica va fatta con un tecnico abilitato e con il Comune.",
      },
      {
        q: "Rifare la facciata di una casa privata: cosa cambia rispetto al condominio?",
        a: "Decide il proprietario, senza assemblea, ma restano le stesse verifiche: ponteggio e suolo pubblico, eventuali vincoli paesaggistici e regole comunali sul colore. Se la casa confina con altre proprietà, accordati prima sugli accessi.",
      },
      {
        q: "Chi sceglie l'impresa per la facciata del condominio?",
        a: "L'assemblea, di solito confrontando preventivi raccolti dall'amministratore sulla stessa descrizione dei lavori. Puoi usare la nostra richiesta per raccogliere proposte da portare in assemblea: la decisione resta del condominio.",
      },
    ],
    updated: "2026-11-14",
    sources: [
      { label: "Codice civile, art. 1136", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1942-03-16;262~art1136" },
      { label: "L.R. Sicilia 16/2016, testo coordinato", href: "https://www.regione.sicilia.it/system/files/2025-04/lr%2016_2016%20agg%2028%20feb%202025.pdf" },
      { label: "Agenzia delle Entrate, guida alle ristrutturazioni", href: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/ristrutturazioni_edilizie_le_agevolazioni_fiscali-1" },
    ],
    related: ["impermeabilizzazione", "cappotto", "imbianchino", "ristrutturazioni"],
    guide: SCEGLIERE,
    moreGuides: ["/guide/lavori-casa-messina-verifiche-zona/", "/guide/bonus-ristrutturazione-2026/"],
  },
  {
    id: "impermeabilizzazione",
    funnelService: "impermeabilizzazione",
    path: "/impermeabilizzazione-terrazzi-messina/",
    navLabel: "Terrazzi",
    cardTitle: "Impermeabilizzazioni",
    cardText: "Terrazzi, balconi e lastrici solari: ricerca della causa e rifacimento delle impermeabilizzazioni.",
    title: "Impermeabilizzazione terrazzo a Messina",
    metaDescription:
      "Infiltrazioni dal terrazzo a Messina? Cause, impermeabilizzazione sopra le piastrelle o rifacimento, chi paga in condominio. Richiesta gratuita.",
    h1: "Impermeabilizzazione di terrazzi e balconi a Messina: cause e soluzioni",
    lead:
      "Una macchia sul soffitto del piano di sotto spesso arriva da un terrazzo. Prima di rifare tutto va capito da dove passa l'acqua. Descrivi il problema, anche con qualche foto, e ti mettiamo in contatto con professionisti della zona.",
    answer:
      "Per impermeabilizzare un terrazzo a Messina si cerca prima la causa dell'infiltrazione, poi si sceglie se intervenire sul pavimento esistente o demolire e rifare gli strati. Sul lastrico solare in uso esclusivo, di norma un terzo della spesa è di chi ne ha l'uso e due terzi dei condomini sottostanti.",
    quoteChecklist: [
      "Causa dell'infiltrazione individuata e come è stata verificata",
      "Sistema impermeabilizzante previsto, con prodotti e spessori",
      "Demolizione e smaltimento, indicati a parte",
      "Pendenze, scarichi e risvolti ai bordi",
      "Prove finali e garanzia offerta dall'impresa",
    ],
    includes: [
      "Ricerca della causa dell'infiltrazione",
      "Rifacimento di guaine e sistemi liquidi",
      "Demolizione di pavimento e massetto, se necessaria",
      "Ripristino delle pendenze",
      "Sistemazione di scarichi, soglie e risvolti",
      "Nuova pavimentazione per esterni",
    ],
    scopeTitle: "Cosa comprende l'impermeabilizzazione del terrazzo",
    costTitle: "Da cosa dipende il costo per impermeabilizzare un terrazzo",
    whenTitle: "Riparare o rifare?",
    when: [
      "Intervenire sopra l'esistente è possibile se il pavimento è ben ancorato, le pendenze funzionano e l'acqua entra da punti individuati.",
      "Rifare gli strati è necessario se l'infiltrazione è diffusa, il massetto è degradato o l'acqua ristagna.",
    ],
    costFactors: [
      "Metri quadri e forma del terrazzo",
      "Demolizione di pavimento e massetto oppure intervento sull'esistente",
      "Sistema impermeabilizzante scelto",
      "Stato di pendenze, scarichi e bordi",
      "Piano, accessi e trasporto dei materiali",
    ],
    messinaNotes: [
      "Sole forte e aria salmastra sollecitano i materiali esposti: per terrazzi e balconi chiedi prodotti adatti agli ambienti costieri.",
      "Se l'acqua arriva al piano di sotto, informa subito l'amministratore: stabilire la causa serve anche a capire chi deve intervenire.",
      "In condominio verifica nel regolamento di chi sono terrazzo, lastrico e balconi.",
    ],
    permitsNote:
      "Rifare un'impermeabilizzazione senza modificare quote e aspetto esterno è di norma manutenzione. Se cambi quote, parapetti o prospetti, fai verificare a un tecnico abilitato quale pratica serve; in Sicilia vale anche la L.R. 16/2016.",
    faqs: [
      {
        q: "Chi paga l'impermeabilizzazione del terrazzo in condominio?",
        a: "Per il lastrico solare in uso esclusivo l'art. 1126 del Codice civile prevede un terzo a carico di chi ne ha l'uso e due terzi a carico dei condomini a cui serve, in proporzione al valore delle proprietà. Se il lastrico è comune si seguono i millesimi. Verifica sempre regolamento e titoli di proprietà.",
      },
      {
        q: "Quanto costa impermeabilizzare un terrazzo a Messina?",
        a: "Non esiste un prezzo unico: dipende da metri quadri, demolizioni, sistema scelto, pendenze e accessi. Un preventivo affidabile richiede un sopralluogo e l'individuazione della causa.",
      },
      {
        q: "Si può impermeabilizzare sopra le piastrelle, anche con un trasparente?",
        a: "A volte sì: esistono prodotti, anche trasparenti, che si applicano sul pavimento esistente. Funzionano se le piastrelle sono ben ancorate, le pendenze corrette e l'acqua entra da fughe o punti individuati. Non risolvono problemi di soglie, risvolti, scarichi o massetto degradato.",
      },
      {
        q: "Come capire da dove arriva l'infiltrazione?",
        a: "La macchia non è sempre sotto il punto da cui entra l'acqua: può dipendere da fughe, scarichi, soglie, risvolti o impianti. Il sopralluogo serve a individuare la causa prima di scegliere il lavoro.",
      },
      {
        q: "Infiltrazioni dal terrazzo del piano di sopra: cosa fare?",
        a: "Documenta le macchie con foto e date e avvisa subito il proprietario del terrazzo e l'amministratore. Per il lastrico in uso esclusivo, secondo le Sezioni Unite della Cassazione (sentenza n. 9449/2016) dei danni da infiltrazioni rispondono sia chi ne ha l'uso esclusivo sia il condominio; il riparto interno segue di norma i criteri dell'art. 1126 c.c. Per il caso concreto rivolgiti all'amministratore o a un legale.",
      },
      {
        q: "Le infiltrazioni sono coperte dall'assicurazione?",
        a: "Dipende dalla polizza. Chiedi all'amministratore se il condominio ha una polizza globale fabbricati e leggi le condizioni su danni da acqua, infiltrazioni e ricerca del guasto: alcune le escludono o le limitano.",
      },
    ],
    updated: "2026-11-14",
    sources: [
      { label: "Codice civile, art. 1126", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1942-03-16;262~art1126" },
      { label: "L.R. Sicilia 16/2016, testo coordinato", href: "https://www.regione.sicilia.it/system/files/2025-04/lr%2016_2016%20agg%2028%20feb%202025.pdf" },
    ],
    related: ["facciate", "pavimenti", "ristrutturazioni"],
    guide: SCEGLIERE,
    moreGuides: ["/guide/lavori-casa-messina-verifiche-zona/"],
  },
  {
    id: "cappotto",
    funnelService: "isolamento",
    path: "/cappotto-termico-messina/",
    navLabel: "Cappotto",
    cardTitle: "Cappotto termico",
    cardText: "Isolamento esterno, interno o in intercapedine per case e condomini, con le verifiche da fare prima.",
    title: "Cappotto termico e isolamento a Messina",
    metaDescription:
      "Cappotto termico a Messina, esterno o interno, per case e condomini: quando conviene, cosa chiedere nel preventivo e in assemblea. Richiesta gratuita.",
    h1: "Cappotto termico a Messina: esterno, interno e in condominio",
    lead:
      "Isolare i muri riduce le dispersioni d'inverno, il calore che entra d'estate e la muffa sulle pareti fredde. Che sia una casa singola o un condominio, descrivi l'edificio una volta sola: inoltriamo la richiesta fino a 3 imprese della zona.",
    answer:
      "Il cappotto termico è uno strato isolante applicato sulle pareti, di norma all'esterno e protetto da una rasatura armata e da una finitura. Messina è in zona climatica B: lo spessore e il materiale si scelgono con un tecnico, che valuta anche ponti termici e condensa. In condominio la facciata è parte comune e decide l'assemblea.",
    quoteChecklist: [
      "Sistema completo: collante, pannello, tasselli, rasatura armata e finitura, con marca e certificazione",
      "Materiale e spessore dell'isolante, con il calcolo di riferimento",
      "Ponteggio, durata e permessi indicati a parte",
      "Dettagli: davanzali, imbotti, soglie, zoccolatura, pluviali e cassonetti",
      "Ciclo di finitura, colore e pulizia finale",
    ],
    includes: [
      "Verifica di supporto, umidità e ponti termici",
      "Ponteggi e protezioni di cantiere",
      "Posa dei pannelli isolanti con collante e tasselli",
      "Rasatura armata con rete in fibra di vetro",
      "Raccordi a davanzali, imbotti e zoccolatura",
      "Finitura colorata per esterni",
      "Contropareti isolanti interne, quando l'esterno non è possibile",
    ],
    scopeTitle: "Cosa comprende un cappotto termico",
    costTitle: "Da cosa dipende il costo del cappotto",
    whenTitle: "Esterno o interno?",
    when: [
      "Il cappotto esterno avvolge l'edificio, corregge gran parte dei ponti termici e non toglie spazio alle stanze, ma cambia la facciata e richiede ponteggio e, in condominio, l'assemblea.",
      "L'isolamento interno si fa stanza per stanza, senza ponteggio, ma riduce un po' la superficie e chiede attenzione a condensa e raccordi con solai e pareti.",
    ],
    costFactors: [
      "Metri quadri di facciata e altezza dell'edificio",
      "Materiale e spessore dell'isolante",
      "Ponteggio e occupazione di suolo pubblico",
      "Stato dell'intonaco esistente e ripristini necessari",
      "Numero di finestre, balconi e dettagli da raccordare",
    ],
    messinaNotes: [
      "Messina è in zona climatica B (707 gradi giorno, DPR 412/1993): inverni miti ed estati calde. L'isolamento va pensato anche per il comfort estivo, non solo per il riscaldamento.",
      "Nelle zone vicino al mare l'aria salmastra sollecita intonaci e finiture: chiedi una finitura adatta agli ambienti costieri.",
      "Molti condomini del dopoguerra hanno muri poco isolati e pilastri in cemento armato che fanno da ponte termico: è lì che compare la muffa.",
      "Nella fascia costiera e nelle aree tutelate cambiare l'aspetto della facciata può richiedere l'autorizzazione paesaggistica.",
    ],
    permitsNote:
      "Il cappotto esterno modifica il prospetto: a seconda dell'intervento può servire un titolo edilizio e, nelle aree tutelate, l'autorizzazione paesaggistica. In Sicilia vale anche la L.R. 16/2016. L'isolamento interno senza modifiche agli spazi è di norma più semplice. La verifica va fatta con un tecnico abilitato.",
    faqs: [
      {
        q: "Il cappotto termico conviene a Messina?",
        a: "Dipende dall'edificio. Con inverni miti il risparmio sul riscaldamento è minore che al Nord, ma il cappotto riduce il calore estivo, la muffa sulle pareti fredde e le dispersioni dei pilastri. Un tecnico valuta muri, esposizione e impianti prima di decidere.",
      },
      {
        q: "Meglio cappotto interno o esterno?",
        a: "L'esterno di solito funziona meglio perché avvolge anche pilastri e travi senza togliere spazio, ma richiede ponteggio e, in condominio, l'assemblea. L'interno è utile quando la facciata non si può toccare o si interviene in un solo appartamento, con attenzione alla condensa.",
      },
      {
        q: "Serve l'assemblea per il cappotto in condominio?",
        a: "Sì: la facciata è parte comune e l'intervento si decide in assemblea, con le maggioranze previste dal Codice civile (art. 1120) e dalle norme sull'efficienza energetica. L'amministratore indica quella applicabile e raccoglie i preventivi sulla stessa descrizione dei lavori, spesso insieme al [rifacimento della facciata](/rifacimento-facciata-messina/).",
      },
      {
        q: "Quanto costa il cappotto termico a Messina?",
        a: "Non esiste un prezzo unico: dipende da metri quadri, materiale e spessore, ponteggio, stato dell'intonaco e numero di dettagli da raccordare. Per un importo affidabile servono un sopralluogo e un preventivo scritto voce per voce.",
      },
      {
        q: "Si può detrarre il cappotto termico?",
        a: "Gli interventi di isolamento possono rientrare nelle detrazioni per il recupero edilizio e il risparmio energetico, con requisiti e aliquote che cambiano nel tempo. Leggi la nostra [guida sui bonus](/guide/bonus-ristrutturazione-2026/) e verifica con il commercialista prima di firmare.",
      },
    ],
    updated: "2026-11-14",
    sources: [
      { label: "Codice civile, art. 1120", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1942-03-16;262~art1120" },
      { label: "DPR 412/1993, zone climatiche", href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.presidente.repubblica:1993-08-26;412" },
      { label: "L.R. Sicilia 16/2016, testo coordinato", href: "https://www.regione.sicilia.it/system/files/2025-04/lr%2016_2016%20agg%2028%20feb%202025.pdf" },
    ],
    related: ["facciate", "imbianchino", "cartongesso"],
    guide: SCEGLIERE,
    moreGuides: ["/guide/bonus-ristrutturazione-2026/", "/guide/lavori-casa-messina-verifiche-zona/"],
  },
];

/** Servizi presenti nel funnel ma ancora senza landing dedicata (domanda da validare) */
export const extraFunnelServices: { value: FunnelService; label: string }[] = [
  { value: "opere-murarie", label: "Opere murarie" },
  { value: "altro", label: "Altro" },
];

export function getServiceById(id: string): ServicePage | undefined {
  return servicePages.find((s) => s.id === id);
}

export function getServiceByFunnel(v: string): ServicePage | undefined {
  return servicePages.find((s) => s.funnelService === v);
}

export const funnelServiceLabels: Record<FunnelService, string> = {
  "ristrutturazione-completa": "Ristrutturazione completa",
  bagno: "Bagno",
  cucina: "Cucina",
  cartongesso: "Cartongesso",
  pittura: "Pittura",
  impianti: "Impianti",
  pavimenti: "Pavimenti",
  facciata: "Facciata",
  impermeabilizzazione: "Impermeabilizzazioni",
  isolamento: "Cappotto e isolamento",
  "opere-murarie": "Opere murarie",
  altro: "Altro",
};
