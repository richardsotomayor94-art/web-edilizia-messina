import type { StaticImageData } from "next/image";
import type { ServicePage } from "./services";
import type { ServiceExperience } from "./service-experience";

import microHero from "@/assets/images/d-microsabbiatura-hero.jpg";
import microScheda from "@/assets/images/d-microsabbiatura-scheda.jpg";
import microChiusura from "@/assets/images/d-microsabbiatura-chiusura.jpg";
import tecnicoHero from "@/assets/images/d-restauro-tecnico-hero.jpg";
import tecnicoScheda from "@/assets/images/d-restauro-tecnico-scheda.jpg";
import tecnicoChiusura from "@/assets/images/d-restauro-tecnico-chiusura.jpg";
import conservativoHero from "@/assets/images/d-restauro-conservativo-hero.jpg";
import conservativoScheda from "@/assets/images/d-restauro-conservativo-scheda.jpg";
import conservativoChiusura from "@/assets/images/d-restauro-conservativo-chiusura.jpg";
import risanamentoHero from "@/assets/images/d-risanamento-conservazione-hero.jpg";
import risanamentoScheda from "@/assets/images/d-risanamento-conservazione-scheda.jpg";
import risanamentoChiusura from "@/assets/images/d-risanamento-conservazione-chiusura.jpg";
import traslochiHero from "@/assets/images/d-traslochi-hero.jpg";
import traslochiScheda from "@/assets/images/d-traslochi-scheda.jpg";
import traslochiChiusura from "@/assets/images/d-traslochi-chiusura.jpg";
import sgomberiHero from "@/assets/images/d-sgomberi-smaltimento-hero.jpg";
import sgomberiScheda from "@/assets/images/d-sgomberi-smaltimento-scheda.jpg";
import sgomberiChiusura from "@/assets/images/d-sgomberi-smaltimento-chiusura.jpg";
import giardinoHero from "@/assets/images/d-giardinaggio-hero.jpg";
import giardinoScheda from "@/assets/images/d-giardinaggio-scheda.jpg";
import giardinoChiusura from "@/assets/images/d-giardinaggio-chiusura.jpg";

/**
 * Landing degli «altri servizi» aggiunti il 2026-11-16. Ogni pagina ha un intento proprio
 * (vedi docs/ANALISI-RESTAURO-CANNIBALIZZAZIONE.md e docs/SERVIZI-SPECIALISTICI.md):
 *  - Microsabbiatura: pietra decorata e superfici di pregio; il confronto con la sabbiatura vive qui;
 *  - Restauro tecnico: ripristino di elementi in calcestruzzo armato (balconi, cornicioni, pilastri, scale);
 *  - Restauro conservativo: la categoria «restauro e risanamento conservativo» e gli edifici storici o tutelati;
 *  - Risanamento e conservazione: umidità e degrado dei muri, a partire dalla diagnosi della causa;
 *  - Traslochi, Sgomberi e smaltimento, Giardinaggio: servizi per la casa con il percorso normale del modulo.
 * Nessun prezzo, tempo, disponibilità, certificazione o partner. Immagini: tavole disegnate.
 */

const img = (src: StaticImageData, alt: string) => ({ src, alt });

export const altriMedia = {
  microsabbiatura: {
    hero: img(microHero, "Illustrazione: cornice e lesena in pietra con una patina scura e un reticolo di piccole aree di prova"),
    scheda: img(microScheda, "Illustrazione: scheda con le informazioni utili per valutare una microsabbiatura"),
    chiusura: img(microChiusura, ""),
  },
  "restauro-tecnico": {
    hero: img(tecnicoHero, "Illustrazione: sezione del bordo di un balcone in calcestruzzo con ferri scoperti e una fessura"),
    scheda: img(tecnicoScheda, "Illustrazione: scheda con le informazioni utili per valutare il ripristino di un elemento in calcestruzzo"),
    chiusura: img(tecnicoChiusura, ""),
  },
  "restauro-conservativo": {
    hero: img(conservativoHero, "Illustrazione: portale storico in prospetto con il rilievo del degrado, lacune e croste segnate"),
    scheda: img(conservativoScheda, "Illustrazione: scheda con le informazioni utili per valutare un restauro conservativo"),
    chiusura: img(conservativoChiusura, ""),
  },
  "risanamento-conservazione": {
    hero: img(risanamentoHero, "Illustrazione: sezione di un muro al piano terra con l'umidità che risale dal terreno, sali e intonaco che si stacca"),
    scheda: img(risanamentoScheda, "Illustrazione: scheda con le informazioni utili per valutare un muro umido"),
    chiusura: img(risanamentoChiusura, ""),
  },
  traslochi: {
    hero: img(traslochiHero, "Illustrazione: pianerottolo con scale, scatoloni e le misure da prendere prima di un trasloco"),
    scheda: img(traslochiScheda, "Illustrazione: scheda con le informazioni utili per il preventivo di un trasloco"),
    chiusura: img(traslochiChiusura, ""),
  },
  "sgomberi-smaltimento": {
    hero: img(sgomberiHero, "Illustrazione: pianta di una stanza con mobili e scatole segnati da recuperare o da smaltire"),
    scheda: img(sgomberiScheda, "Illustrazione: scheda con le informazioni utili per il preventivo di uno sgombero"),
    chiusura: img(sgomberiChiusura, ""),
  },
  giardinaggio: {
    hero: img(giardinoHero, "Illustrazione: pianta di un giardino con prato, siepe, alberi, vialetto e distanza dal confine"),
    scheda: img(giardinoScheda, "Illustrazione: scheda con le informazioni utili per il preventivo di un lavoro in giardino"),
    chiusura: img(giardinoChiusura, ""),
  },
};

const N = (urn: string) => `https://www.normattiva.it/uri-res/N2Ls?${urn}`;
const DPR380_3 = N("urn:nir:stato:decreto.del.presidente.della.repubblica:2001-06-06;380~art3");
const DPR380_22 = N("urn:nir:stato:decreto.del.presidente.della.repubblica:2001-06-06;380~art22");
const DLGS42_21 = N("urn:nir:stato:decreto.legislativo:2004-01-22;42~art21");
const DLGS42_29 = N("urn:nir:stato:decreto.legislativo:2004-01-22;42~art29");
const DLGS44 = N("urn:nir:stato:decreto.legislativo:2020-06-01;44");
const INAIL_SILICE = "https://www.inail.it/content/dam/inail-hub-site/documenti/catalogo-generale/2024/11/EsposizioneSiliceCristallinaRespirabile.pdf";
const FVG_MICRO = "https://www.regione.fvg.it/rafvg/cms/RAFVG/infrastrutture-lavori-pubblici/lavori-pubblici/prezzario-2025/?cod=25.5.YE1.01";
const SICILIA_SISMICA = "https://www.regione.sicilia.it/sites/default/files/2022-03/D.D.G.%20n%C2%B064%20del%2011.03.2022_0.pdf";
const SOPRINTENDENZA_ME = "https://regione.sicilia.it/istituzioni/regione/strutture-regionali/soprintendenza-beni-culturali-ambientali-messina";

const IN_PREPARAZIONE =
  "Stiamo confermando specialità, zone e condizioni dei professionisti. Puoi già inviare la richiesta: ti diciamo se abbiamo la persona adatta e, se non la troviamo, te lo diciamo chiaramente.";

const FREE = { big: "0 €", label: "per chi invia la richiesta" };

export const altriPages: ServicePage[] = [
  // ---------------- MICROSABBIATURA ----------------
  {
    id: "microsabbiatura",
    line: "microsabbiatura",
    funnelService: "microsabbiatura",
    path: "/microsabbiatura-messina/",
    navLabel: "Microsabbiatura",
    cardTitle: "Microsabbiatura",
    cardText: "Pulitura di precisione di portali, cornici ed elementi in pietra, con prove su piccole aree prima di decidere.",
    title: "Microsabbiatura a Messina: pietra e decori",
    metaDescription:
      "Microsabbiatura a Messina per portali, cornici ed elementi in pietra: cos'è, quando si usa, perché si parte dai tasselli di prova. Richiesta gratuita.",
    h1: "Microsabbiatura a Messina: pulitura di precisione per pietra, portali e decori",
    lead:
      "Un portale annerito dallo smog, una cornice con croste scure, uno stemma che non si legge più: la microsabbiatura toglie i depositi lavorando a piccole aree, senza consumare la superficie. Descrivi l'elemento con qualche foto e cerchiamo chi la esegue.",
    answer:
      "La microsabbiatura è una pulitura con un getto molto fine e a bassa pressione: una pistola piccola, ugelli di pochi decimi di millimetro e un abrasivo meno duro del materiale da pulire. Si usa su pietra, elementi decorati e metalli quando la sabbiatura normale sarebbe troppo aggressiva. Si parte sempre da piccoli tasselli di prova; sui beni tutelati serve l'autorizzazione della Soprintendenza.",
    quoteChecklist: [
      "Tasselli di prova e chi approva il risultato prima di procedere",
      "Abrasivo previsto, diametro dell'ugello e pressione di lavoro",
      "Protezione con teli e aspirazione delle polveri",
      "Elementi o superficie da trattare, misurati",
      "Protettivo o consolidante dopo la pulitura, se serve",
    ],
    includes: [
      "Portali, cornici, lesene e capitelli in pietra",
      "Stemmi, iscrizioni e decori scolpiti",
      "Croste nere e depositi da smog sulla pietra",
      "Elementi in ferro battuto, bronzo e ottone",
      "Piccole superfici di pregio dove serve controllo",
    ],
    scopeTitle: "Su che cosa si usa",
    costTitle: "Da cosa dipende il costo",
    whenTitle: "Microsabbiatura o sabbiatura?",
    when: [
      "Getto sottile, bassa pressione e abrasivi fini: si lavora a piccole aree, lentamente, controllando il risultato. È il metodo per pietra decorata, superfici di pregio e dettagli.",
      "Getto più ampio e pressioni più alte: rende su travi, ringhiere, muri rustici e superfici resistenti, dove serve togliere molto in poco tempo. Su pietre tenere e decori può lasciare segni.",
    ],
    costFactors: [
      "Numero di elementi o metri quadri da pulire",
      "Tipo di deposito: patina, crosta nera, vecchia pittura",
      "Delicatezza del materiale e dei dettagli scolpiti",
      "Ponteggi o trabattelli per gli elementi in quota",
      "Teli, aspirazione e smaltimento dei residui",
      "Autorizzazioni per i beni tutelati",
    ],
    messinaNotes: [
      "Molti palazzi del centro, ricostruiti dopo il terremoto del 1908, hanno portali, cornici e decori in facciata: prima di pulirli verifica se l'edificio è tutelato.",
      "Traffico e aria di mare lasciano patine e depositi scuri sulle superfici esposte: dopo la pulitura conviene valutare anche la protezione.",
      "Per i beni culturali è competente la Soprintendenza BB.CC.AA. di Messina: senza la sua autorizzazione non si interviene.",
    ],
    permitsNote:
      "Sui beni culturali qualsiasi intervento, compresa la pulitura, richiede l'autorizzazione della Soprintendenza (art. 21 D.Lgs 42/2004) e il restauro spetta ai restauratori di beni culturali (art. 29). Se l'abrasivo libera polvere di silice valgono le regole sugli agenti cancerogeni del D.Lgs 81/2008 (Allegato XLII). In facciata possono servire titolo edilizio e occupazione di suolo pubblico.",
    faqs: [
      { q: "Il servizio è già attivo?", a: IN_PREPARAZIONE },
      {
        q: "Che cos'è la microsabbiatura?",
        a: "È una pulitura a getto di precisione: pressione bassa, ugelli sottili e abrasivi fini, spesso meno duri del materiale. Permette di togliere croste e depositi da superfici delicate lavorando a piccole aree, con un controllo continuo del risultato.",
      },
      {
        q: "Che differenza c'è tra sabbiatura e microsabbiatura?",
        a: "Cambiano scala e controllo. La sabbiatura lavora su superfici ampie e resistenti, come travi, ringhiere e muri rustici; la microsabbiatura su elementi piccoli o di pregio, con pressioni basse e abrasivi fini. Per travi e ferro leggi la pagina sulla [sabbiatura](/sabbiatura-messina/).",
      },
      {
        q: "La microsabbiatura rovina la pietra?",
        a: "Può farlo se l'abrasivo è troppo duro o la pressione troppo alta: per questo si sceglie un abrasivo meno duro della pietra e si decide solo dopo i tasselli di prova. Su superfici molto fragili il professionista può proporre altri metodi.",
      },
      {
        q: "Si può usare sul marmo di una tomba?",
        a: "Su marmi lucidati si va con molta cautela, perché il getto può opacizzarli: spesso si parte da lavaggi e metodi più delicati. Per tombe e lapidi leggi la pagina su [restauro e pulizia](/restauro-e-pulizia-messina/).",
      },
      {
        q: "Serve l'autorizzazione della Soprintendenza?",
        a: "Sì, se l'elemento è un bene culturale: per esempio un portale di un edificio vincolato o un bene di un ente pubblico o ecclesiastico con più di 70 anni. Per gli edifici storici leggi anche la pagina sul [restauro conservativo](/restauro-conservativo-messina/).",
      },
      {
        q: "Microsabbiatura o laser?",
        a: "Sono metodi diversi: il laser è molto selettivo ma richiede attrezzature e operatori specializzati; la microsabbiatura è più diffusa. La scelta dipende dal materiale e dal deposito da togliere e la fa il professionista o il restauratore.",
      },
    ],
    updated: "2026-11-16",
    sources: [
      { label: "Prezzario Regione FVG 2025, microsabbiatura di precisione", href: FVG_MICRO },
      { label: "D.Lgs 42/2004, art. 21", href: DLGS42_21 },
      { label: "D.Lgs 44/2020, agenti cancerogeni", href: DLGS44 },
      { label: "INAIL, silice cristallina respirabile (2024)", href: INAIL_SILICE },
    ],
    related: ["sabbiatura", "restauro-conservativo", "restauro"],
  },

  // ---------------- RESTAURO TECNICO ----------------
  {
    id: "restauro-tecnico",
    funnelService: "restauro-tecnico",
    path: "/restauro-tecnico-messina/",
    navLabel: "Restauro tecnico",
    cardTitle: "Restauro tecnico",
    cardText: "Calcestruzzo con ferri scoperti, balconi, cornicioni, pilastri e scale da ripristinare, con la verifica di un tecnico.",
    title: "Restauro tecnico: calcestruzzo e balconi",
    metaDescription:
      "Ripristino di calcestruzzo armato a Messina: balconi con ferri scoperti, cornicioni, pilastri e scale. Cosa fare subito, chi valuta, quali pratiche.",
    h1: "Restauro tecnico a Messina: ripristino di calcestruzzo, balconi e cornicioni",
    lead:
      "Pezzi che cadono dal balcone, ferri arrugginiti in vista, una crepa lungo il cornicione: sono segnali di calcestruzzo armato degradato. Descrivi l'elemento con qualche foto e cerchiamo un'impresa che esegue ripristini; la verifica spetta a un tecnico abilitato.",
    answer:
      "Per restauro tecnico intendiamo il ripristino di elementi in calcestruzzo armato degradati: si toglie il calcestruzzo che si stacca, si puliscono e proteggono i ferri, si ricostruisce lo spessore con malte da ripristino e si protegge la superficie. Se i ferri hanno perso sezione o l'elemento porta carichi decide un tecnico abilitato, secondo le Norme tecniche per le costruzioni.",
    quoteChecklist: [
      "Elementi da ripristinare, con misure e foto di riferimento",
      "Come vengono trattati i ferri e con quali prodotti",
      "Malta da ripristino e protezione finale, con le schede tecniche",
      "Messa in sicurezza, ponteggi e occupazione di suolo pubblico",
      "Chi è il tecnico e quale pratica serve",
    ],
    includes: [
      "Frontalini e solette di balconi con ferri scoperti",
      "Cornicioni e aggetti che si sfaldano",
      "Pilastri, travi e scale in calcestruzzo degradato",
      "Rimozione delle parti che si staccano e messa in sicurezza",
      "Trattamento dei ferri e ricostruzione con malte da ripristino",
      "Protezione finale della superficie",
    ],
    scopeTitle: "Che cosa si ripristina",
    costTitle: "Da cosa dipende il costo del ripristino",
    whenTitle: "Riparazione locale o intervento strutturale?",
    when: [
      "Il degrado è superficiale e limitato: copriferro che si stacca, ferri arrugginiti ma integri. Di norma si ripara localmente, con la conferma di un tecnico.",
      "Ferri che hanno perso sezione, fessure estese, elementi che portano carichi: servono un progetto e le verifiche previste dalle Norme tecniche per le costruzioni (NTC 2018, capitolo 8).",
    ],
    costFactors: [
      "Numero ed estensione degli elementi",
      "Profondità del degrado e stato dei ferri",
      "Ponteggi, trabattelli o piattaforme",
      "Messa in sicurezza e occupazione di suolo pubblico",
      "Progetto e pratiche del tecnico, se servono",
      "Finitura e protezione finale",
    ],
    messinaNotes: [
      "Messina è in zona sismica 1: su travi, pilastri e solai valgono le Norme tecniche per le costruzioni e serve un tecnico abilitato.",
      "L'aria di mare porta cloruri che accelerano la ruggine dei ferri: balconi e cornicioni esposti verso la costa si degradano prima.",
      "In condominio chi paga dipende dall'elemento, frontalino, soletta o cornicione: chiedilo all'amministratore prima del sopralluogo.",
    ],
    permitsNote:
      "Il ripristino di parti strutturali rientra di norma nella manutenzione straordinaria (DPR 380/2001, art. 3) e può richiedere una CILA o una SCIA (art. 22); in Sicilia vale la L.R. 16/2016 e il titolo lo stabilisce il tecnico. Gli interventi sulle strutture seguono le NTC 2018 e le procedure per le zone sismiche. Su edifici tutelati serve anche la Soprintendenza.",
    faqs: [
      { q: "Il servizio è già attivo?", a: IN_PREPARAZIONE },
      {
        q: "Cosa fare se si vedono i ferri del balcone?",
        a: "Non sostare sotto il balcone, segnalare il pericolo e far togliere le parti che si staccano; poi far valutare l'elemento da un tecnico. I ferri in vista arrugginiscono in fretta: rimandare allarga il danno e la spesa.",
      },
      {
        q: "Che cos'è la carbonatazione del calcestruzzo?",
        a: "Con gli anni l'anidride carbonica dell'aria penetra nel calcestruzzo e ne riduce la protezione naturale sui ferri. Quando arriva all'armatura i ferri arrugginiscono, aumentano di volume e fanno staccare lo strato esterno, il copriferro.",
      },
      {
        q: "Il ripristino del balcone è manutenzione straordinaria?",
        a: "Di norma sì, perché riguarda parti anche strutturali senza cambiare volumi: può servire una CILA o una SCIA. In Sicilia si applica la L.R. 16/2016; il titolo corretto lo indica il tecnico.",
      },
      {
        q: "Chi deve valutare il degrado?",
        a: "Un tecnico abilitato, che stabilisce se basta una riparazione locale o serve un intervento strutturale con progetto. L'impresa esegue il ripristino secondo le sue indicazioni.",
      },
      {
        q: "Che differenza c'è con il rifacimento della facciata?",
        a: "Qui si ripristinano singoli elementi in calcestruzzo armato; il rifacimento della facciata riguarda intonaci, finiture e tutto il prospetto. Spesso si fanno insieme: leggi la pagina sul [rifacimento della facciata](/rifacimento-facciata-messina/).",
      },
      {
        q: "Restauro tecnico e restauro conservativo sono la stessa cosa?",
        a: "No: il restauro tecnico ripara elementi degradati; il restauro conservativo è una categoria di intervento per conservare un edificio e i suoi caratteri, tipica degli edifici storici. Leggi la pagina sul [restauro conservativo](/restauro-conservativo-messina/).",
      },
    ],
    updated: "2026-11-16",
    sources: [
      { label: "DPR 380/2001, art. 3", href: DPR380_3 },
      { label: "DPR 380/2001, art. 22", href: DPR380_22 },
      { label: "Regione Siciliana, classificazione sismica (DDG 64/2022)", href: SICILIA_SISMICA },
    ],
    related: ["facciate", "restauro-conservativo", "risanamento-conservazione"],
  },

  // ---------------- RESTAURO CONSERVATIVO ----------------
  {
    id: "restauro-conservativo",
    funnelService: "restauro-conservativo",
    path: "/restauro-conservativo-messina/",
    navLabel: "Restauro conservativo",
    cardTitle: "Restauro conservativo",
    cardText: "Restauro e risanamento conservativo di edifici, anche storici o vincolati: che cosa comporta, quali pratiche, chi coinvolgere.",
    title: "Restauro conservativo di edifici a Messina",
    metaDescription:
      "Restauro conservativo a Messina: cos'è il restauro e risanamento conservativo, quando serve la Soprintendenza, come si lavora su edifici storici.",
    h1: "Restauro conservativo a Messina: edifici storici e tutelati",
    lead:
      "Un palazzo del primo Novecento da recuperare senza snaturarlo, una facciata con decori da conservare, un edificio vincolato: il restauro conservativo mantiene l'organismo edilizio e i suoi caratteri. Descrivi l'edificio e il lavoro: cerchiamo un'impresa che interviene su edifici storici.",
    answer:
      "Il «restauro e risanamento conservativo» è una categoria di intervento definita dal DPR 380/2001 (art. 3): lavori che conservano l'organismo edilizio e lo rendono funzionale rispettandone elementi tipologici, formali e strutturali. Sui beni culturali vale anche il Codice dei beni culturali: ogni intervento richiede l'autorizzazione della Soprintendenza e il restauro spetta ai restauratori qualificati.",
    quoteChecklist: [
      "Progetto o relazione del tecnico, con il rilievo dello stato di fatto",
      "Elementi da conservare e come vengono trattati",
      "Materiali compatibili con quelli originali, indicati per nome",
      "Autorizzazioni: titolo edilizio ed eventuale Soprintendenza",
      "Chi esegue le operazioni riservate al restauratore, se ci sono",
    ],
    includes: [
      "Consolidamento di murature, solai e coperture, conservandone la struttura",
      "Recupero di facciate storiche, cornici, stucchi e decori",
      "Rinnovo degli impianti nel rispetto dell'edificio",
      "Eliminazione degli elementi estranei all'organismo edilizio",
      "Interventi su edifici vincolati, con la Soprintendenza",
    ],
    scopeTitle: "Che cosa comprende",
    costTitle: "Da cosa dipende il costo",
    whenTitle: "Manutenzione straordinaria o restauro conservativo?",
    when: [
      "Rinnova o sostituisce parti dell'edificio, anche strutturali, e realizza servizi e impianti, senza cambiare volumi e destinazioni d'uso.",
      "Conserva l'organismo edilizio e ne assicura la funzionalità con opere che rispettano i suoi elementi tipologici, formali e strutturali: è la categoria tipica degli edifici storici.",
    ],
    costFactors: [
      "Stato di conservazione e indagini preliminari",
      "Elementi decorativi da recuperare",
      "Materiali compatibili e lavorazioni manuali",
      "Ponteggi e accessi nel centro storico",
      "Progetto, direzione lavori e autorizzazioni",
      "Operazioni riservate al restauratore",
    ],
    messinaNotes: [
      "Il centro di Messina è stato ricostruito dopo il terremoto del 1908: molti edifici storici sono del primo Novecento e hanno caratteri da conservare.",
      "Messina è in zona sismica 1: per i beni tutelati il Codice dei beni culturali prevede che il restauro comprenda anche il miglioramento strutturale.",
      "Per i beni culturali è competente la Soprintendenza BB.CC.AA. di Messina, struttura della Regione Siciliana.",
    ],
    permitsNote:
      "Il titolo dipende da cosa si tocca: senza interventi su strutture o prospetti di norma basta una CILA, altrimenti può servire una SCIA (DPR 380/2001, art. 22; in Sicilia L.R. 16/2016, più volte modificata). Lo stabilisce il tecnico con il Comune. Sui beni culturali ogni intervento richiede l'autorizzazione della Soprintendenza (art. 21 D.Lgs 42/2004).",
    faqs: [
      { q: "Il servizio è già attivo?", a: IN_PREPARAZIONE },
      {
        q: "Che cos'è il restauro e risanamento conservativo?",
        a: "È la categoria di intervento del DPR 380/2001 (art. 3, lettera c) che riunisce i lavori per conservare un edificio e renderlo funzionale rispettandone tipologia, forme e struttura: consolidamento, ripristino e rinnovo di elementi costitutivi, impianti necessari, eliminazione degli elementi estranei.",
      },
      {
        q: "Che differenza c'è con una ristrutturazione?",
        a: "La ristrutturazione edilizia può trasformare l'edificio; il restauro conservativo lo mantiene com'è, migliorandone lo stato e la funzionalità. Per rinnovare un appartamento leggi la pagina sulle [ristrutturazioni](/ristrutturazioni-messina/).",
      },
      {
        q: "Serve la CILA o la SCIA?",
        a: "Dipende da cosa si tocca: senza interventi su strutture o prospetti di norma basta la CILA, altrimenti può servire la SCIA. In Sicilia la L.R. 16/2016 ha regole proprie e più volte modificate: il titolo corretto lo indica il tecnico.",
      },
      {
        q: "Il mio palazzo è vincolato: cosa devo fare?",
        a: "Prima di qualsiasi lavoro serve l'autorizzazione della Soprintendenza BB.CC.AA. di Messina, chiesta con un progetto o una descrizione tecnica. Anche i beni di enti pubblici o ecclesiastici con più di 70 anni sono tutelati fino alla verifica.",
      },
      {
        q: "Chi può restaurare un bene vincolato?",
        a: "Manutenzione e restauro dei beni culturali mobili e delle superfici decorate dei beni architettonici spettano ai restauratori di beni culturali (art. 29 D.Lgs 42/2004). Le opere edili possono farle imprese qualificate, sotto la direzione del progetto.",
      },
      {
        q: "L'umidità nei muri di un edificio storico è restauro conservativo?",
        a: "Il risanamento dell'umidità può far parte di un restauro conservativo, ma parte da una diagnosi della causa. Leggi la pagina su [risanamento e conservazione](/risanamento-conservazione-messina/).",
      },
    ],
    updated: "2026-11-16",
    sources: [
      { label: "DPR 380/2001, art. 3", href: DPR380_3 },
      { label: "DPR 380/2001, art. 22", href: DPR380_22 },
      { label: "D.Lgs 42/2004, art. 21", href: DLGS42_21 },
      { label: "D.Lgs 42/2004, art. 29", href: DLGS42_29 },
      { label: "Soprintendenza BB.CC.AA. di Messina", href: SOPRINTENDENZA_ME },
    ],
    related: ["restauro-tecnico", "risanamento-conservazione", "microsabbiatura"],
  },

  // ---------------- RISANAMENTO E CONSERVAZIONE ----------------
  {
    id: "risanamento-conservazione",
    funnelService: "risanamento-conservazione",
    path: "/risanamento-conservazione-messina/",
    navLabel: "Risanamento",
    cardTitle: "Risanamento e conservazione",
    cardText: "Muri umidi, sali, intonaci che si sfaldano: prima la diagnosi della causa, poi il risanamento, anche negli edifici storici.",
    title: "Risanamento e conservazione: muri umidi",
    metaDescription:
      "Muri umidi e intonaci che si sfaldano a Messina: come capire se è risalita, condensa o infiltrazione e come si risana una muratura. Richiesta gratuita.",
    h1: "Risanamento e conservazione a Messina: umidità e degrado dei muri",
    lead:
      "Macchie che salgono dal pavimento, intonaco che si gonfia e si sbriciola, aloni bianchi sul muro: prima di ridipingere bisogna capire da dove arriva l'acqua. Descrivi dove e quando compare l'umidità, con qualche foto, e cerchiamo chi fa diagnosi e risanamento.",
    answer:
      "Il risanamento parte dalla causa: l'umidità di un muro può risalire dal terreno, nascere dalla condensa o arrivare da un'infiltrazione, e ogni causa ha rimedi diversi. Prima si fa una diagnosi, anche misurando l'umidità nella muratura; poi si interviene sulla causa e sugli intonaci rovinati dai sali; infine si protegge il muro nel tempo. Negli edifici storici i materiali devono restare compatibili con quelli originali.",
    quoteChecklist: [
      "Causa individuata e come è stata verificata",
      "Misure dell'umidità nella muratura, non solo in superficie",
      "Intonaci e finiture previsti, compatibili con il muro",
      "Che cosa si fa contro la causa, non solo sulle macchie",
      "Come e quando si verifica il risultato",
    ],
    includes: [
      "Diagnosi della causa dell'umidità",
      "Rimozione degli intonaci rovinati da sali e umidità",
      "Intonaci e finiture traspiranti, compatibili con la muratura",
      "Interventi contro la risalita, scelti in base al muro",
      "Ventilazione di vespai e locali interrati",
      "Protezione e manutenzione nel tempo",
    ],
    scopeTitle: "Che cosa comprende un risanamento",
    costTitle: "Da cosa dipende il costo",
    whenTitle: "Da dove viene l'umidità?",
    when: [
      "Risalita capillare: macchie e sali nella parte bassa dei muri al piano terra, fino a una certa altezza, che non cambiano con il meteo.",
      "Condensa: muffa negli angoli, dietro i mobili e sui muri freddi, che peggiora d'inverno e con poca ventilazione.",
      "Infiltrazione: macchie che compaiono o crescono dopo la pioggia, vicino a terrazzi, coperture o facciate.",
      "Perdite di impianti: macchie localizzate vicino alle tubazioni, che non dipendono dal meteo.",
    ],
    costFactors: [
      "Causa dell'umidità e indagini necessarie",
      "Metri quadri di muro e altezza delle macchie",
      "Tipo di muratura: pietra, laterizio, tufo",
      "Intonaci da rimuovere e rifare",
      "Interventi sulla causa: risalita, ventilazione, infiltrazioni",
      "Vincoli di tutela sugli edifici storici",
    ],
    messinaNotes: [
      "Piani terra e seminterrati sono i più esposti alla risalita capillare: tienilo presente se la casa è al piano strada.",
      "Vicino al mare l'aria porta sali che si depositano sulle murature esposte e ne accelerano il degrado.",
      "Negli edifici storici del centro i muri chiedono malte e intonaci compatibili con quelli originali: per gli edifici tutelati serve la Soprintendenza.",
    ],
    permitsNote:
      "Rifare intonaci e finiture senza toccare la struttura è di norma manutenzione; interventi su parti strutturali possono richiedere un titolo edilizio (DPR 380/2001, art. 3 e 22; in Sicilia L.R. 16/2016), che indica il tecnico. Sui beni culturali serve l'autorizzazione della Soprintendenza (art. 21 D.Lgs 42/2004).",
    faqs: [
      { q: "Il servizio è già attivo?", a: IN_PREPARAZIONE },
      {
        q: "Come capire se è umidità di risalita o condensa?",
        a: "La risalita lascia macchie e sali nella parte bassa dei muri, fino a un'altezza abbastanza costante, tutto l'anno. La condensa forma muffa negli angoli e sui muri freddi e peggiora d'inverno. Il dubbio si scioglie con una diagnosi e con misure nella muratura.",
      },
      {
        q: "Perché l'intonaco si sfalda in basso?",
        a: "L'acqua che risale porta con sé sali che, quando l'acqua evapora, cristallizzano sotto la superficie e la fanno gonfiare e cadere. Rifare l'intonaco senza agire sulla causa riporta lo stesso problema.",
      },
      {
        q: "Cosa sono le macchie bianche sul muro?",
        a: "Sono di solito efflorescenze saline: sali portati in superficie dall'acqua che evapora. Indicano che nel muro circola umidità e vanno lette insieme alla diagnosi.",
      },
      {
        q: "Basta ridipingere con una pittura antimuffa?",
        a: "Se la muffa nasce da condensa può aiutare, insieme a ventilazione e ponti termici; se l'acqua viene dal terreno o da un'infiltrazione no. Per la muffa da condensa leggi la pagina sull'[imbianchino](/imbianchino-messina/).",
      },
      {
        q: "L'acqua arriva dal terrazzo del piano di sopra: è risanamento?",
        a: "Prima si ferma l'infiltrazione, poi si risanano i muri. Per terrazzi e lastrici leggi la pagina sulle [impermeabilizzazioni](/impermeabilizzazione-terrazzi-messina/).",
      },
      {
        q: "Si può risanare un muro in pietra di un edificio storico?",
        a: "Sì, con materiali compatibili con quelli originali e, se l'edificio è tutelato, con l'autorizzazione della Soprintendenza. Leggi la pagina sul [restauro conservativo](/restauro-conservativo-messina/).",
      },
    ],
    updated: "2026-11-16",
    sources: [
      { label: "DPR 380/2001, art. 3", href: DPR380_3 },
      { label: "DPR 380/2001, art. 22", href: DPR380_22 },
      { label: "D.Lgs 42/2004, art. 21", href: DLGS42_21 },
    ],
    related: ["impermeabilizzazione", "imbianchino", "restauro-conservativo"],
  },

  // ---------------- SGOMBERI E SMALTIMENTO ----------------
  {
    id: "sgomberi-smaltimento",
    funnelService: "sgomberi-smaltimento",
    path: "/sgomberi-smaltimento-messina/",
    navLabel: "Sgomberi",
    cardTitle: "Sgomberi e smaltimento",
    cardText: "Cantine, garage e appartamenti da svuotare: cosa si recupera, dove finiscono i materiali, quali documenti chiedere.",
    title: "Sgomberi a Messina: cantine e appartamenti",
    metaDescription:
      "Sgombero di cantine, garage e appartamenti a Messina: cosa si recupera, come si smaltisce, quali documenti chiedere e quando basta il ritiro comunale.",
    h1: "Sgomberi e smaltimento a Messina: cantine, appartamenti e garage",
    lead:
      "Una cantina piena, un appartamento da liberare dopo una vendita o un'eredità, un garage da svuotare: descrivi gli spazi e cosa c'è dentro e cerchiamo un'impresa che fa sgomberi e porta i materiali dove devono andare.",
    answer:
      "Uno sgombero è lo svuotamento di uno spazio, con il trasporto e la gestione di ciò che si toglie: una parte si può recuperare, il resto diventa rifiuto. Mobili, materassi ed elettrodomestici di casa sono rifiuti urbani; chi li trasporta per lavoro deve essere iscritto all'Albo nazionale gestori ambientali e accompagnarli con il formulario (FIR). Per pochi pezzi, a Messina le utenze domestiche possono prenotare il ritiro gratuito degli ingombranti.",
    quoteChecklist: [
      "Locali da svuotare e che cosa resta",
      "Che cosa viene recuperato e che cosa smaltito",
      "Numero di iscrizione all'Albo gestori ambientali di chi trasporta",
      "Formulario (FIR) e destinazione dei materiali",
      "Pulizia finale e consegna dei locali",
    ],
    includes: [
      "Cantine, soffitte e garage",
      "Appartamenti interi, anche dopo una vendita o un'eredità",
      "Mobili, materassi ed elettrodomestici",
      "Separazione tra oggetti da recuperare e rifiuti",
      "Trasporto dei materiali agli impianti",
      "Pulizia finale dei locali",
    ],
    scopeTitle: "Che cosa si sgombera",
    costTitle: "Da cosa dipende il costo dello sgombero",
    whenTitle: "Ritiro comunale o sgombero con un'impresa?",
    when: [
      "Gratuito per le utenze domestiche, si prenota online e vale per pochi pezzi alla volta; gli oggetti si lasciano fuori casa la sera prima.",
      "Svuota tutto in una volta, anche da piani alti e cantine, separa recuperi e rifiuti e porta i materiali agli impianti, con i documenti previsti.",
    ],
    costFactors: [
      "Volume da sgomberare e numero di locali",
      "Piano, ascensore e distanza dal mezzo",
      "Quanto si recupera e quanto si smaltisce",
      "Tipo di materiali: legno, metalli, elettrodomestici",
      "Smontaggi e pulizia finale",
      "Data entro cui liberare i locali",
    ],
    messinaNotes: [
      "Per le utenze domestiche MessinaServizi Bene Comune ritira gratuitamente gli ingombranti su prenotazione online: utile quando i pezzi sono pochi.",
      "I centri comunali di raccolta accettano solo rifiuti delle utenze domestiche: un'impresa non può portarci i materiali di uno sgombero.",
      "Lasciare mobili in strada fuori dal ritiro prenotato è abbandono di rifiuti.",
    ],
    permitsNote:
      "Mobili, materassi e apparecchi elettrici di casa sono rifiuti urbani (D.Lgs 152/2006, art. 183). Raccolta e trasporto per conto di altri richiedono l'iscrizione all'Albo nazionale gestori ambientali (art. 212) e il formulario di identificazione dei rifiuti (art. 193). Comprando un apparecchio nuovo, il negozio ritira gratis quello vecchio equivalente (D.Lgs 49/2014, art. 11). Noi non trasportiamo né gestiamo rifiuti: lo fa l'impresa.",
    faqs: [
      { q: "Il servizio è già attivo?", a: IN_PREPARAZIONE },
      {
        q: "Quanto costa svuotare una cantina?",
        a: "Non c'è un prezzo unico: dipende da volume, piano e accesso, da quanto si recupera e da quanto va smaltito. Con qualche foto l'impresa può darti una prima indicazione; il preventivo arriva dopo il sopralluogo o la valutazione delle foto.",
      },
      {
        q: "L'impresa deve essere iscritta all'Albo gestori ambientali?",
        a: "Sì, se raccoglie e trasporta i rifiuti per conto tuo. L'iscrizione si può verificare online sul sito dell'Albo: chiedi il numero prima di affidare il lavoro.",
      },
      {
        q: "Che cos'è il FIR?",
        a: "È il formulario di identificazione dei rifiuti: accompagna i rifiuti trasportati da un'impresa e indica produttore, trasportatore e impianto di destinazione. Chiedine una copia: è la prova di dove sono finiti i materiali.",
      },
      {
        q: "Come si prenota il ritiro ingombranti a Messina?",
        a: "Per le utenze domestiche si prenota online dal portale di MessinaServizi Bene Comune, con SPID o CIE: è gratuito e vale per pochi pezzi alla volta. Per svuotare una casa intera serve di solito un'impresa.",
      },
      {
        q: "E gli elettrodomestici vecchi?",
        a: "Sono RAEE e vanno separati dagli altri rifiuti. Se compri un apparecchio nuovo, il negozio deve ritirare gratis quello vecchio equivalente; altrimenti li gestisce l'impresa dello sgombero.",
      },
      {
        q: "Si può fare lo sgombero insieme al trasloco?",
        a: "Sì, spesso conviene: si porta via solo ciò che serve e il resto si recupera o si smaltisce. Leggi anche la pagina sui [traslochi](/traslochi-messina/).",
      },
    ],
    updated: "2026-11-16",
    sources: [
      { label: "D.Lgs 152/2006, art. 183", href: N("urn:nir:stato:decreto.legislativo:2006-04-03;152~art183") },
      { label: "D.Lgs 152/2006, art. 212", href: N("urn:nir:stato:decreto.legislativo:2006-04-03;152~art212") },
      { label: "D.Lgs 49/2014, art. 11", href: N("urn:nir:stato:decreto.legislativo:2014-03-14;49~art11") },
      { label: "MessinaServizi Bene Comune, ritiro ingombranti", href: "https://www.messinaservizibenecomune.it/ritiro-ingombranti-raee-sfalci-e-potature/" },
    ],
    related: ["traslochi", "giardinaggio", "imbianchino"],
  },

  // ---------------- TRASLOCHI ----------------
  {
    id: "traslochi",
    funnelService: "traslochi",
    path: "/traslochi-messina/",
    navLabel: "Traslochi",
    cardTitle: "Traslochi",
    cardText: "Da casa a casa, in città o in provincia: inventario, smontaggio dei mobili, autoscala e permessi da concordare prima.",
    title: "Traslochi a Messina: preventivo per la casa",
    metaDescription:
      "Trasloco a Messina: cosa indicare per un preventivo serio, smontaggio dei mobili, autoscala e suolo pubblico, danni durante il trasporto. Richiesta gratuita.",
    h1: "Traslochi a Messina: come preparare il trasloco di casa",
    lead:
      "Cambi casa in città o in provincia? Indica da dove a dove, a che piano, cosa va smontato e cosa è delicato: cerchiamo un'impresa di traslochi della zona, che ti contatta per un sopralluogo o per una valutazione da foto e video.",
    answer:
      "Un trasloco si preventiva bene solo partendo da un inventario: quanti mobili e scatoloni, cosa va smontato e rimontato, piani e ascensori alla partenza e all'arrivo, distanza e accesso dei mezzi. Se il furgone o l'autoscala occupano la strada serve il permesso dell'ente proprietario. Il trasportatore risponde della perdita e dei danni alle cose trasportate, salvo i casi previsti dal Codice civile (art. 1693).",
    quoteChecklist: [
      "Inventario di mobili e scatoloni compreso nel preventivo",
      "Smontaggio, rimontaggio e imballaggio: che cosa è incluso",
      "Autoscala e occupazione di suolo pubblico: chi chiede i permessi",
      "Data, orari e numero di persone previste",
      "Come vengono gestiti eventuali danni",
    ],
    includes: [
      "Trasporto di mobili e scatoloni da casa a casa",
      "Smontaggio e rimontaggio dei mobili",
      "Imballaggio degli oggetti fragili",
      "Autoscala o piattaforma quando l'ascensore non basta",
      "Facchinaggio su scale lunghe o strette",
      "Sgombero di ciò che non porti, da concordare",
    ],
    scopeTitle: "Che cosa può comprendere un trasloco",
    costTitle: "Da cosa dipende il costo del trasloco",
    whenTitle: "Le cose da decidere prima del preventivo",
    when: [
      "Che cosa porti e che cosa lasci: un inventario stanza per stanza evita sorprese nel preventivo.",
      "Chi imballa: tu o l'impresa. Cambiano tempi, materiali e costi.",
      "Come si arriva: piano, ascensore, larghezza di scale e porte, distanza del furgone dal portone, sia alla partenza sia all'arrivo.",
      "Quando: indica una data e se è flessibile.",
    ],
    costFactors: [
      "Volume da trasportare e numero di stanze",
      "Piani, ascensori e accessi a partenza e arrivo",
      "Distanza tra le due case",
      "Smontaggio, rimontaggio e imballaggio",
      "Autoscala e occupazione di suolo pubblico",
      "Oggetti pesanti o delicati, come pianoforti e casseforti",
    ],
    messinaNotes: [
      "Il territorio comunale si allunga sulla costa tra il mare e i Peloritani, con molti villaggi collinari: tra le colline e il centro cambiano distanze e accessi per i mezzi.",
      "Per occupare suolo pubblico nel Comune di Messina serve l'autorizzazione, con il canone unico che dal 2021 ha sostituito la COSAP; sulle strade provinciali è competente la Città Metropolitana.",
      "Misura scale, ascensore e porte prima del sopralluogo: i mobili grandi passano solo se le misure tornano.",
    ],
    permitsNote:
      "Occupare la sede stradale senza autorizzazione è sanzionato dal Codice della strada (art. 20). Il contratto di trasporto è regolato dal Codice civile (art. 1678 e seguenti): il trasportatore risponde della perdita e dei danni alle cose trasportate, salvo caso fortuito, natura delle cose o fatto di chi le consegna (art. 1693). Le condizioni dell'impresa vanno lette nel preventivo scritto.",
    faqs: [
      { q: "Il servizio è già attivo?", a: IN_PREPARAZIONE },
      {
        q: "Quanto costa un trasloco a Messina?",
        a: "Non c'è un prezzo unico: dipende da volume, piani, distanza, smontaggi e permessi. Con un inventario e qualche foto o video l'impresa può fare una valutazione; il preventivo definitivo arriva spesso dopo il sopralluogo.",
      },
      {
        q: "Serve il permesso per l'autoscala?",
        a: "Se l'autoscala o il furgone occupano la strada o il marciapiede sì: va chiesta l'autorizzazione all'ente proprietario della strada. Concorda nel preventivo chi la chiede e chi paga il canone.",
      },
      {
        q: "Chi risponde se un mobile si rompe?",
        a: "Il trasportatore risponde della perdita e dei danni alle cose, salvo i casi previsti dal Codice civile, come il caso fortuito o un imballaggio inadeguato fatto da te. Controlla i mobili all'arrivo e segnala subito eventuali danni.",
      },
      {
        q: "Smontano e rimontano i mobili?",
        a: "Molte imprese lo fanno, ma va scritto nel preventivo: quali mobili, chi fornisce viti e ferramenta, se sono compresi gli allacci di cucina ed elettrodomestici.",
      },
      {
        q: "Si può avere un preventivo senza sopralluogo?",
        a: "Per traslochi piccoli spesso bastano un inventario dettagliato, foto e video; per case intere l'impresa di solito preferisce vedere gli spazi. Indicalo nella richiesta.",
      },
      {
        q: "E le cose che non porto nella nuova casa?",
        a: "Si possono recuperare o smaltire con uno sgombero, anche lo stesso giorno. Leggi la pagina su [sgomberi e smaltimento](/sgomberi-smaltimento-messina/).",
      },
    ],
    updated: "2026-11-16",
    sources: [
      { label: "Codice della strada, art. 20", href: N("urn:nir:stato:decreto.legislativo:1992-04-30;285~art20") },
      { label: "Codice civile, art. 1693", href: N("urn:nir:stato:regio.decreto:1942-03-16;262~art1693") },
      { label: "Comune di Messina, canone per l'occupazione di spazi pubblici", href: "https://sportellotelematico.comune.messina.it/action:s_italia:canone.occupazione.spazi.aree.pubbliche" },
    ],
    related: ["sgomberi-smaltimento", "imbianchino", "ristrutturazioni"],
  },

  // ---------------- GIARDINAGGIO ----------------
  {
    id: "giardinaggio",
    funnelService: "giardinaggio",
    path: "/giardinaggio-messina/",
    navLabel: "Giardinaggio",
    cardTitle: "Giardinaggio",
    cardText: "Prati, siepi, potature e pulizia del giardino, con interventi singoli o periodici e lo smaltimento del verde.",
    title: "Giardinaggio a Messina: cura del verde",
    metaDescription:
      "Giardinaggio a Messina: manutenzione periodica o interventi singoli, potature, siepi, prati e smaltimento del verde. Chi può farlo per legge. Richiesta gratuita.",
    h1: "Giardinaggio a Messina: manutenzione di giardini, siepi e prati",
    lead:
      "Un giardino da rimettere in ordine, siepi da regolare, un prato da curare con regolarità: descrivi lo spazio e che cosa serve e cerchiamo un giardiniere della zona, con partita IVA e fattura.",
    answer:
      "Il giardinaggio comprende la manutenzione del verde privato: taglio dell'erba, potature, siepi, pulizia e cura delle piante, con interventi singoli o periodici. Per legge chi fa manutenzione del verde per conto di altri deve avere requisiti precisi, come l'iscrizione al registro delle imprese con un attestato di idoneità (L. 154/2016, art. 12). Sfalci e potature vanno smaltiti correttamente.",
    quoteChecklist: [
      "Lavori inclusi: taglio, potature, siepi, pulizia",
      "Frequenza e periodo, se è una manutenzione periodica",
      "Raccolta e smaltimento di sfalci e potature",
      "Attrezzature e accesso dei mezzi",
      "Requisiti per la manutenzione del verde (L. 154/2016)",
    ],
    includes: [
      "Taglio dell'erba e cura del prato",
      "Potatura di arbusti e piccoli alberi",
      "Taglio e sagomatura delle siepi",
      "Pulizia di aiuole, vialetti e terreni",
      "Manutenzione periodica del giardino",
      "Raccolta e smaltimento del verde tagliato",
    ],
    scopeTitle: "Che cosa comprende",
    costTitle: "Da cosa dipende il costo",
    whenTitle: "Intervento singolo o manutenzione periodica?",
    when: [
      "Per rimettere in ordine un giardino trascurato, fare una potatura o pulire un terreno prima di un evento o di una vendita.",
      "Passaggi programmati durante l'anno: prato, siepi e piante restano curati senza dover chiamare ogni volta.",
    ],
    costFactors: [
      "Superficie del giardino o del terreno",
      "Tipo di lavori: taglio, potature, siepi",
      "Altezza delle piante e attrezzature necessarie",
      "Frequenza degli interventi",
      "Quantità di verde da raccogliere e smaltire",
      "Accesso per i mezzi",
    ],
    messinaNotes: [
      "Estati secche e piogge concentrate tra autunno e inverno: irrigazione e potature vanno programmate tenendone conto.",
      "Nei periodi di massimo rischio di incendio bruciare sfalci e potature è sempre vietato.",
      "Alcuni centri comunali di raccolta accettano sfalci e potature delle utenze domestiche: verifica sul sito di MessinaServizi Bene Comune prima di portarli.",
    ],
    permitsNote:
      "La manutenzione del verde per conto di altri è riservata a chi ha i requisiti della L. 154/2016 (art. 12). Le distanze di alberi e siepi dal confine sono fissate dal Codice civile, salvo regolamenti e usi locali (art. 892), e il vicino può chiedere il taglio dei rami che sporgono (art. 896). Gli abbruciamenti di residui vegetali sono vietati nei periodi di massimo rischio di incendio (D.Lgs 152/2006, art. 182).",
    faqs: [
      { q: "Il servizio è già attivo?", a: IN_PREPARAZIONE },
      {
        q: "Il giardiniere deve avere un attestato?",
        a: "Per la manutenzione del verde per conto di altri sì: la L. 154/2016 la riserva agli imprenditori agricoli iscritti al registro ufficiale e alle imprese iscritte al registro delle imprese con un attestato di idoneità. Chiedilo prima di affidare il lavoro.",
      },
      {
        q: "Chi porta via sfalci e potature?",
        a: "Va concordato nel preventivo: di solito il giardiniere raccoglie e smaltisce il verde tagliato. Per piccole quantità, le utenze domestiche possono usare i centri comunali che lo accettano.",
      },
      {
        q: "Posso bruciare le potature?",
        a: "Solo in piccoli cumuli, nei limiti di legge e se il Comune non lo vieta; nei periodi di massimo rischio di incendio è sempre vietato. Nella maggior parte dei casi conviene farle raccogliere.",
      },
      {
        q: "A che distanza dal confine si può piantare un albero?",
        a: "Il Codice civile prevede 3 metri per gli alberi di alto fusto, 1,5 metri per quelli non di alto fusto e mezzo metro per arbusti, siepi e frutti alti fino a 2,5 metri, salvo regolamenti e usi locali diversi.",
      },
      {
        q: "Il vicino deve tagliare i rami che sporgono nel mio giardino?",
        a: "Puoi chiedergli di tagliarli in qualsiasi momento; le radici che entrano nel tuo terreno puoi tagliarle tu (Codice civile, art. 896).",
      },
      {
        q: "Potate anche alberi molto alti?",
        a: "Gli alberi alti richiedono attrezzature e competenze specifiche: indicalo nella richiesta con una foto e l'altezza approssimativa, il professionista ti dirà se può farlo.",
      },
    ],
    updated: "2026-11-16",
    sources: [
      { label: "L. 154/2016, art. 12", href: N("urn:nir:stato:legge:2016-07-28;154~art12") },
      { label: "Codice civile, art. 892", href: N("urn:nir:stato:regio.decreto:1942-03-16;262~art892") },
      { label: "D.Lgs 152/2006, art. 182", href: N("urn:nir:stato:decreto.legislativo:2006-04-03;152~art182") },
    ],
    related: ["sgomberi-smaltimento", "traslochi"],
  },
];

export const altriExperience: Record<string, ServiceExperience> = {
  microsabbiatura: {
    ground: "calce",
    motif: "strata",
    theme: "Precisione",
    facts: [
      { big: "0,4–1,8 mm", label: "gli ugelli della microsabbiatura di precisione in un prezzario regionale" },
      { big: "Art. 21", label: "sui beni culturali anche la pulitura chiede l'autorizzazione della Soprintendenza" },
      FREE,
    ],
    scopeImg: altriMedia.microsabbiatura.scheda,
    feature: {
      label: "Tasselli",
      title: "Prima si prova, *poi si pulisce*.",
      text: "La pulitura non si può annullare: quello che si toglie non torna. Per questo si fanno piccole aree di prova, i tasselli, con abrasivi e pressioni diverse, e si sceglie il metodo guardando il risultato.",
      listTitle: "Da chiedere sui tasselli",
      items: ["Dove vengono fatti: in una zona poco visibile", "Con quali abrasivi e a quale pressione", "Chi li approva prima di procedere", "Se il risultato viene documentato con foto"],
    },
    compare: ["Microsabbiatura", "Sabbiatura"],
    closing: { title: "Raccontaci il tuo *elemento*.", cta: "Richiedi un preventivo", bring: ["Che cos'è e di che materiale", "Una foto d'insieme e una da vicino", "Se l'edificio è tutelato, se lo sai"], img: altriMedia.microsabbiatura.chiusura },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "feature", ground: "travertino", seam: "door" },
      { key: "scope", ground: "calce", seam: "ruler" },
      { key: "decision", ground: "intonaco" },
      { key: "cost", ground: "travertino", seam: "ruler" },
      { key: "local", ground: "sea", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
  "restauro-tecnico": {
    ground: "travertino",
    motif: "membrane",
    flip: true,
    theme: "Calcestruzzo",
    facts: [
      { big: "Zona 1", label: "la classe sismica di Messina: sulle strutture decide un tecnico" },
      { big: "NTC 2018", label: "il capitolo 8 regola gli interventi sulle costruzioni esistenti" },
      FREE,
    ],
    scopeImg: altriMedia["restauro-tecnico"].scheda,
    feature: {
      label: "Sicurezza",
      title: "Se cade qualcosa, *prima la sicurezza*.",
      text: "Frammenti che cadono da balconi e cornicioni sono un pericolo per chi passa sotto. La messa in sicurezza, cioè togliere le parti instabili e delimitare l'area, viene prima del ripristino.",
      listTitle: "Cosa fare subito",
      items: ["Non sostare sotto l'elemento e segnalare il pericolo", "Avvisare l'amministratore, se è una parte comune", "Far valutare l'elemento da un tecnico abilitato", "Conservare foto datate dello stato"],
    },
    compare: ["Riparazione locale", "Intervento strutturale"],
    closing: { title: "Raccontaci il tuo *balcone*.", cta: "Richiedi un preventivo", bring: ["Quale elemento e dove si trova", "Foto d'insieme e da vicino dei ferri", "Se è una parte comune del condominio"], img: altriMedia["restauro-tecnico"].chiusura },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "feature", ground: "cotto", seam: "door" },
      { key: "decision", ground: "travertino" },
      { key: "scope", ground: "calce", seam: "ruler" },
      { key: "cost", ground: "intonaco" },
      { key: "local", ground: "lava", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
  "restauro-conservativo": {
    ground: "calce",
    motif: "facade",
    flip: true,
    theme: "Tutela",
    facts: [
      { big: "Art. 3", label: "del DPR 380/2001 definisce il restauro e risanamento conservativo" },
      { big: "1908", label: "il terremoto dopo cui è stato ricostruito il centro di Messina" },
      FREE,
    ],
    scopeImg: altriMedia["restauro-conservativo"].scheda,
    feature: {
      label: "Vincoli",
      title: "Edificio tutelato: *prima la Soprintendenza*.",
      text: "Su un bene culturale nessun lavoro può partire senza l'autorizzazione della Soprintendenza, che valuta il progetto e può dare prescrizioni. Conviene verificarlo prima di chiedere preventivi.",
      listTitle: "Da verificare prima di iniziare",
      items: ["Se l'edificio o una sua parte è dichiarato di interesse culturale", "Se è di un ente pubblico o ecclesiastico e ha più di 70 anni", "Chi redige il progetto e chi chiede l'autorizzazione", "Quali operazioni spettano a un restauratore"],
    },
    compare: ["Manutenzione straordinaria", "Restauro conservativo"],
    closing: { title: "Raccontaci il tuo *edificio*.", cta: "Richiedi un preventivo", bring: ["Epoca dell'edificio e vincoli, se li conosci", "Che cosa vuoi conservare o recuperare", "Foto della facciata e dei dettagli"], img: altriMedia["restauro-conservativo"].chiusura },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "decision", ground: "travertino", seam: "door" },
      { key: "feature", ground: "sea", seam: "door" },
      { key: "scope", ground: "calce", seam: "ruler" },
      { key: "local", ground: "lava", seam: "door" },
      { key: "cost", ground: "intonaco" },
      { key: "process", ground: "travertino" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
  "risanamento-conservazione": {
    ground: "travertino",
    motif: "strata",
    theme: "Umidità",
    facts: [
      { big: "4", label: "possibili origini dell'umidità: risalita, condensa, infiltrazione, impianti" },
      { big: "1", label: "regola: prima la diagnosi della causa, poi il rimedio" },
      FREE,
    ],
    scopeImg: altriMedia["risanamento-conservazione"].scheda,
    feature: {
      label: "Diagnosi",
      title: "Prima la causa, *poi il rimedio*.",
      text: "Ridipingere o rifare l'intonaco senza capire da dove arriva l'acqua spesso sposta solo il problema. Una diagnosi seria guarda dove e quando compaiono le macchie e misura l'umidità nella muratura.",
      listTitle: "Da chiedere alla diagnosi",
      items: ["Quale causa è stata individuata e come", "Misure dell'umidità nel muro, non solo in superficie", "Se ci sono sali e quali intonaci sono compatibili", "Come verrà verificato il risultato nel tempo"],
    },
    closing: { title: "Raccontaci i tuoi *muri*.", cta: "Richiedi un preventivo", bring: ["Dove compaiono le macchie e a che altezza", "Da quanto tempo e se cambiano con la pioggia", "Foto delle pareti e dei punti rovinati"], img: altriMedia["risanamento-conservazione"].chiusura },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "decision", ground: "calce", seam: "ruler" },
      { key: "feature", ground: "cotto", seam: "door" },
      { key: "scope", ground: "intonaco" },
      { key: "cost", ground: "travertino", seam: "ruler" },
      { key: "local", ground: "sea", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
  "sgomberi-smaltimento": {
    ground: "travertino",
    motif: "plan",
    theme: "Spazi",
    facts: [
      { big: "FIR", label: "il formulario che accompagna i rifiuti trasportati da un'impresa" },
      { big: "Albo", label: "nazionale gestori ambientali: l'iscrizione serve per trasportare rifiuti di altri" },
      FREE,
    ],
    scopeImg: altriMedia["sgomberi-smaltimento"].scheda,
    feature: {
      label: "Rifiuti",
      title: "Chi trasporta i rifiuti *deve essere iscritto*.",
      text: "Per raccogliere e trasportare rifiuti per conto di altri serve l'iscrizione all'Albo nazionale gestori ambientali, che si può verificare online. Chiedi il numero di iscrizione e una copia del formulario: è la prova di dove sono finiti i tuoi mobili.",
      listTitle: "Da chiedere all'impresa",
      items: ["Numero di iscrizione all'Albo gestori ambientali", "Formulario di identificazione dei rifiuti (FIR)", "Dove vengono portati i materiali", "Come vengono gestiti gli elettrodomestici (RAEE)"],
    },
    compare: ["Ritiro comunale", "Impresa di sgomberi"],
    closing: { title: "Raccontaci il tuo *spazio*.", cta: "Richiedi un preventivo", bring: ["Quali locali e a che piano", "Che cosa vuoi tenere e che cosa togliere", "Foto di ogni stanza"], img: altriMedia["sgomberi-smaltimento"].chiusura },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "decision", ground: "calce", seam: "ruler" },
      { key: "feature", ground: "sea", seam: "door" },
      { key: "scope", ground: "intonaco" },
      { key: "cost", ground: "travertino", seam: "ruler" },
      { key: "local", ground: "lava", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
  traslochi: {
    ground: "calce",
    motif: "boxes",
    flip: true,
    theme: "Trasloco",
    facts: [
      { big: "Art. 1693", label: "del Codice civile: il trasportatore risponde dei danni alle cose, salvo i casi previsti" },
      { big: "Art. 20", label: "del Codice della strada: occupare la strada senza permesso è sanzionato" },
      FREE,
    ],
    scopeImg: altriMedia.traslochi.scheda,
    feature: {
      label: "Suolo pubblico",
      title: "Furgone e autoscala in strada: *serve il permesso*.",
      text: "Occupare carreggiata o marciapiede con il furgone o l'autoscala richiede l'autorizzazione dell'ente proprietario della strada: nel territorio comunale il Comune di Messina, sulle strade provinciali la Città Metropolitana. Chi la chiede va scritto nel preventivo.",
      listTitle: "Da concordare con l'impresa",
      items: ["Chi chiede il permesso e con quale anticipo", "Dove sostano furgone e autoscala", "Chi avvisa il condominio", "Il canone di occupazione, se dovuto"],
    },
    closing: { title: "Raccontaci il tuo *trasloco*.", cta: "Richiedi un preventivo", bring: ["Indirizzi indicativi di partenza e arrivo", "Piani, ascensori e mobili da smontare", "Foto o video delle stanze"], img: altriMedia.traslochi.chiusura },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "decision", ground: "travertino", seam: "ruler" },
      { key: "feature", ground: "cotto", seam: "door" },
      { key: "scope", ground: "calce" },
      { key: "cost", ground: "intonaco", seam: "ruler" },
      { key: "local", ground: "sea", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
  giardinaggio: {
    ground: "calce",
    motif: "garden",
    flip: true,
    theme: "Verde",
    facts: [
      { big: "3 m", label: "la distanza dal confine per gli alberi di alto fusto (Codice civile, art. 892)" },
      { big: "L. 154", label: "del 2016: la manutenzione del verde per conto di altri richiede requisiti precisi" },
      FREE,
    ],
    scopeImg: altriMedia.giardinaggio.scheda,
    feature: {
      label: "Confini",
      title: "Alberi e siepi vicino al confine: *le distanze contano*.",
      text: "Il Codice civile fissa distanze minime dal confine per alberi e siepi, salvo regolamenti e usi locali, e permette al vicino di chiedere il taglio dei rami che sporgono. Conviene tenerne conto prima di piantare o di potare.",
      listTitle: "Le distanze del Codice civile (art. 892)",
      items: ["3 metri per gli alberi di alto fusto", "1,5 metri per gli alberi non di alto fusto", "0,5 metri per arbusti, siepi e frutti alti fino a 2,5 metri", "Regolamenti e usi locali possono prevedere altro"],
    },
    compare: ["Intervento singolo", "Manutenzione periodica"],
    closing: { title: "Raccontaci il tuo *giardino*.", cta: "Richiedi un preventivo", bring: ["Superficie indicativa e tipo di piante", "Che cosa serve e con che frequenza", "Foto del giardino"], img: altriMedia.giardinaggio.chiusura },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "scope", ground: "calce", seam: "ruler" },
      { key: "decision", ground: "travertino" },
      { key: "feature", ground: "sea", seam: "door" },
      { key: "cost", ground: "intonaco" },
      { key: "local", ground: "lava", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
};

export const altriHeroMedia: Record<string, { src: StaticImageData; alt: string }> = Object.fromEntries(
  Object.entries(altriMedia).map(([id, m]) => [id, m.hero]),
);
