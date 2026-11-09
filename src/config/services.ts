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
  whenTitle: string;
  when: string[];
  costFactors: string[];
  messinaNotes: string[];
  permitsNote: string;
  faqs: Faq[];
  related: string[]; // id di altri servizi
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
      "Devi ristrutturare casa a Messina? Descrivi il progetto una volta sola: inoltriamo la richiesta a un massimo di 3 imprese locali. Gratis e senza impegno.",
    h1: "Ristrutturazioni a Messina: trova l'impresa giusta per il tuo appartamento",
    lead:
      "Che si tratti di rinnovare un appartamento anni '60, di una ristrutturazione chiavi in mano o di un intervento su più ambienti, ci racconti il progetto una volta sola e ti mettiamo in contatto con imprese edili della zona disponibili a fare un sopralluogo.",
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
        a: "Un'impresa o una ditta edile regolarmente iscritta alla Camera di Commercio, meglio se in grado di coordinare anche impiantisti e finiture. Per lavori che richiedono una pratica edilizia serve anche un tecnico abilitato (geometra, architetto o ingegnere). Con una sola richiesta su questo sito ti mettiamo in contatto con imprese locali disponibili.",
      },
      {
        q: "Come trovare un'impresa per ristrutturare un appartamento a Messina?",
        a: "Descrivi il lavoro (tipo di immobile, metratura, tempi, zona) nel modulo di richiesta preventivo. Verifichiamo la richiesta e la inoltriamo a un massimo di 3 professionisti locali disponibili per quel servizio e quella zona, che ti contattano per un sopralluogo; se in zona non ce ne sono, te lo diciamo. Confronta sempre più preventivi scritti e dettagliati.",
      },
      {
        q: "Quanto costa ristrutturare un appartamento a Messina?",
        a: "Dipende da metratura, stato di partenza, impianti da rifare e livello delle finiture: per questo un prezzo affidabile si ottiene solo dopo un sopralluogo. Diffida dei preventivi al metro quadro dati senza vedere l'immobile. Nella nostra guida trovi i fattori che fanno variare il costo.",
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
    ],
    related: ["bagno", "cucina", "impianti", "pavimenti"],
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
    title: "Rifacimento bagno a Messina: preventivi",
    metaDescription:
      "Rifare il bagno a Messina: vasca in doccia, nuovi rivestimenti, impianti e sanitari. Richiedi un preventivo gratuito a professionisti locali, anche con foto.",
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
        q: "Quanto costa rifare un bagno a Messina?",
        a: "Non esiste un prezzo unico: dipende da metratura, rifacimento di impianti e scarichi, spostamento dei sanitari e materiali. Per un importo affidabile servono un sopralluogo e un preventivo scritto voce per voce. Nella guida dedicata spieghiamo le voci che fanno il prezzo.",
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
        q: "Si possono usare i bonus fiscali per il bagno?",
        a: "Le detrazioni per il recupero edilizio possono riguardare anche il bagno quando l'intervento rientra tra quelli agevolati (es. manutenzione straordinaria). Requisiti e aliquote cambiano nel tempo: consulta la nostra guida aggiornata e verifica con il tuo commercialista.",
      },
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
      "Ristrutturare la cucina a Messina: spostamento impianti, rivestimenti, apertura sul soggiorno. Richiedi un preventivo gratuito a imprese e artigiani locali.",
    h1: "Ristrutturazione cucina a Messina: impianti, rivestimenti e nuovi spazi",
    lead:
      "Rinnovare la cucina spesso significa più di cambiare i mobili: spostare attacchi acqua e gas, rifare i punti elettrici, aprire la cucina sul soggiorno. Ti aiutiamo a trovare chi si occupa delle opere edili e impiantistiche.",
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
      "Pareti in cartongesso, controsoffitti, velette e isolamento a Messina. Descrivi il lavoro e ti mettiamo in contatto con cartongessisti locali. Gratis.",
    h1: "Cartongesso a Messina: pareti, controsoffitti e velette",
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
    ],
    related: ["imbianchino", "ristrutturazioni", "impianti"],
    guide: SCEGLIERE,
  },
  {
    id: "imbianchino",
    funnelService: "pittura",
    path: "/imbianchino-messina/",
    navLabel: "Pittura",
    cardTitle: "Pittura e finiture",
    cardText: "Imbiancatura appartamenti, trattamenti antimuffa, stucchi e pitture decorative.",
    title: "Imbianchino a Messina: pittura interni",
    metaDescription:
      "Cerchi un imbianchino a Messina? Pitturazione appartamenti, trattamenti antimuffa e finiture decorative. Richiesta gratuita a pittori edili locali.",
    h1: "Imbianchino a Messina: pitturazione di appartamenti e finiture",
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
        a: "Va prima individuata la causa (condensa, infiltrazione, ponte termico), poi trattata la superficie con prodotti specifici e infine applicata una pittura adatta. Senza risolvere la causa la muffa tende a tornare.",
      },
    ],
    related: ["cartongesso", "facciate", "ristrutturazioni", "pavimenti"],
    guide: SCEGLIERE,
  },
  {
    id: "impianti",
    funnelService: "impianti",
    path: "/impianti-messina/",
    navLabel: "Impianti",
    cardTitle: "Impianti",
    cardText: "Rifacimento impianto elettrico e idraulico durante la ristrutturazione.",
    title: "Impianti elettrici e idraulici a Messina",
    metaDescription:
      "Rifacimento di impianto elettrico e idraulico a Messina durante una ristrutturazione. Richiesta gratuita a impiantisti locali, senza impegno.",
    h1: "Impianti elettrici e idraulici a Messina per la tua ristrutturazione",
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
      "Nuovi pavimenti a Messina: gres, parquet, resina, sovrapposizione o rifacimento massetto. Richiedi un preventivo gratuito a posatori e imprese locali.",
    h1: "Pavimenti a Messina: posa, sovrapposizione e rifacimento",
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
      "Rifacimento facciata a Messina: intonaci, balconi e tinteggiatura per palazzi e condomini. Cosa verificare, come decide l'assemblea, preventivi gratuiti.",
    h1: "Rifacimento facciata a Messina: intonaci, balconi e condomini",
    lead:
      "Quando l'intonaco si stacca o i frontalini dei balconi si sfaldano, rifare la facciata riguarda sicurezza, decoro e spese condominiali. Descrivi la situazione e ti mettiamo in contatto con imprese della zona disponibili a un sopralluogo.",
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
        q: "Esiste ancora il bonus facciate?",
        a: "No: il bonus facciate non si applica alle spese sostenute dal 2023. Alcuni interventi possono rientrare in altre detrazioni: verifica con il tuo commercialista e consulta la nostra guida sui bonus.",
      },
      {
        q: "Serve un permesso per rifare la facciata?",
        a: "Dipende da intervento e zona. Il ripristino senza modifiche è di norma manutenzione; un cambio di aspetto o interventi strutturali possono richiedere un titolo edilizio. La verifica va fatta con un tecnico abilitato e con il Comune.",
      },
    ],
    related: ["impermeabilizzazione", "imbianchino", "ristrutturazioni"],
    guide: SCEGLIERE,
    moreGuides: ["/guide/lavori-casa-messina-verifiche-zona/", "/guide/bonus-ristrutturazione-2026/"],
  },
  {
    id: "impermeabilizzazione",
    // Il modulo non ha ancora questa voce: serve una riga nel catalogo servizi prima delle richieste reali
    funnelService: "altro",
    path: "/impermeabilizzazione-terrazzi-messina/",
    navLabel: "Terrazzi",
    cardTitle: "Impermeabilizzazioni",
    cardText: "Terrazzi, balconi e lastrici solari: ricerca della causa e rifacimento delle impermeabilizzazioni.",
    title: "Impermeabilizzazione terrazzi a Messina",
    metaDescription:
      "Infiltrazioni dal terrazzo a Messina? Cause, soluzioni e chi paga in condominio. Descrivi il problema e chiedi un preventivo gratuito a professionisti locali.",
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
        q: "Si può impermeabilizzare senza togliere le piastrelle?",
        a: "A volte sì, con prodotti applicati sopra il pavimento esistente, se le piastrelle sono ben ancorate e le pendenze funzionano. Se l'infiltrazione è diffusa di solito bisogna rifare gli strati sottostanti.",
      },
      {
        q: "Come capire da dove arriva l'infiltrazione?",
        a: "La macchia non è sempre sotto il punto da cui entra l'acqua: può dipendere da fughe, scarichi, soglie, risvolti o impianti. Il sopralluogo serve a individuare la causa prima di scegliere il lavoro.",
      },
    ],
    related: ["facciate", "pavimenti", "ristrutturazioni"],
    guide: SCEGLIERE,
    moreGuides: ["/guide/lavori-casa-messina-verifiche-zona/"],
  },
];

/** Servizi presenti nel funnel ma ancora senza landing dedicata (domanda da validare) */
export const extraFunnelServices: { value: FunnelService; label: string }[] = [
  { value: "isolamento", label: "Isolamento / cappotto" },
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
  isolamento: "Isolamento / cappotto",
  "opere-murarie": "Opere murarie",
  altro: "Altro",
};
