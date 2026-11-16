import type { StaticImageData } from "next/image";
import type { ServicePage } from "./services";
import type { ServiceExperience } from "./service-experience";
import { material, media } from "./media";
import { BLASTING } from "./specialist";

import restauroHero from "@/assets/images/d-restauro-hero.jpg";
import tomba from "@/assets/images/d-tomba.jpg";
import scheda from "@/assets/images/d-restauro-scheda.jpg";
import portone from "@/assets/images/d-portone.jpg";
import sabbiaturaHero from "@/assets/images/d-sabbiatura-hero.jpg";
import pietra from "@/assets/images/d-pietra.jpg";
import legno from "@/assets/images/d-legno.jpg";
import metallo from "@/assets/images/d-metallo.jpg";
import prova from "@/assets/images/d-prova.jpg";

/**
 * Landing dei servizi specialistici. Regole in più rispetto alle altre landing:
 *  - si raccolgono richieste di VALUTAZIONE: nessuna disponibilità, prezzo, tempo o risultato promesso;
 *  - pulizia, manutenzione, riparazione e restauro restano distinti;
 *  - la tecnica di pulizia a getto non è confermata: nessuna descrizione specifica finché BLASTING.confirmed è false;
 *  - nessuna tecnica è presentata come delicata, ecologica, senza residui o adatta a ogni superficie.
 * Le immagini sono tavole disegnate (Illustrazione / Schema illustrativo), mai lavori eseguiti.
 */

const img = (src: StaticImageData, alt: string) => ({ src, alt });

export const specialistMedia = {
  restauroHero: img(restauroHero, "Illustrazione: lapide in marmo con iscrizione, macchie di muschio e un'area di prova segnata"),
  tomba: img(tomba, "Illustrazione: prospetto di una cappella funeraria di famiglia con cancello e iscrizione"),
  scheda: img(scheda, "Illustrazione: scheda di valutazione con spazio per le foto e le voci materiale, stato, dimensioni e accesso"),
  portone: img(portone, "Illustrazione: portone in legno a due ante con vernice scrostata, crepe e ferramenta segnate"),
  sabbiaturaHero: img(sabbiaturaHero, "Schema illustrativo: muratura in pietra con deposito superficiale su una metà e un'area di prova"),
  pietra: img(pietra, "Illustrazione: muratura in pietra a vista con giunti di malta"),
  legno: img(legno, "Illustrazione: trave in legno con una parte ricoperta di vecchia vernice"),
  metallo: img(metallo, "Illustrazione: ringhiera in ferro con punti di ruggine"),
  prova: img(prova, "Schema illustrativo: tre piccole aree di prova su una superficie, segnate A, B e C"),
};

const D_LGS_42 = "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2004-01-22;42";
const DPR_285 = "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1990-09-10;285";
const MESSINA_CIMITERI = "https://sportellotelematico.comune.messina.it/action:c_f158:posa.monumenti.funebri";
const SOPRINTENDENZA_ME = "https://regione.sicilia.it/istituzioni/regione/strutture-regionali/soprintendenza-beni-culturali-ambientali-messina";
const INAIL_SILICE = "https://www.inail.it/content/dam/inail-hub-site/documenti/catalogo-generale/2024/11/EsposizioneSiliceCristallinaRespirabile.pdf";
const D_LGS_44 = "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2020-06-01;44";

const RESTAURO_PATH = "/restauro-e-pulizia-messina/";
const SABBIATURA_PATH = "/sabbiatura-messina/";

const IN_PREPARAZIONE =
  "Stiamo confermando specialità, zone e condizioni dei professionisti. Puoi già inviare una richiesta di valutazione: ti diciamo se abbiamo la persona adatta e, se non la troviamo, te lo diciamo chiaramente.";

export const specialistPages: ServicePage[] = [
  {
    id: "restauro",
    line: "restauro",
    funnelService: "restauro",
    path: RESTAURO_PATH,
    navLabel: "Restauro e pulizia",
    cardTitle: "Restauro, pulizia e recupero",
    cardText: "Tombe e lapidi, marmo e pietra, porte e mobili in legno: una richiesta di valutazione per chi fa proprio quel lavoro.",
    title: "Restauro e pulizia: tombe, marmo, legno",
    metaDescription:
      "Pulizia di tombe e lapidi, recupero di marmo e pietra, restauro di porte e mobili a Messina: richiesta di valutazione gratuita, a un professionista locale.",
    h1: "Restauro, pulizia e recupero a Messina: tombe, marmo, porte e mobili",
    lead:
      "Una lapide annerita, un portone da recuperare, il tavolo di famiglia rovinato: descrivi l'oggetto e il suo stato, con qualche foto, e cerchiamo chi fa proprio quel lavoro. Prima la valutazione, poi il preventivo.",
    answer:
      "Pulire, riparare e restaurare sono lavori diversi, spesso di professionisti diversi: il marmista per tombe e lapidi, il falegname o il restauratore per porte e mobili. Il metodo si sceglie dopo aver visto materiale e stato, partendo dal più delicato e con una prova su una piccola zona. Se l'oggetto è un bene tutelato servono l'autorizzazione della Soprintendenza e un restauratore qualificato.",
    quoteChecklist: [
      "Che cosa si fa: pulizia, riparazione, sostituzione di parti o restauro",
      "Metodo e prodotti previsti, con una prova su una zona poco visibile",
      "Se si lavora sul posto o in laboratorio, e chi si occupa del trasporto",
      "Cosa resta escluso: parti mancanti da rifare, permessi, smaltimento",
      "Tempi indicativi e condizioni di pagamento, per iscritto",
    ],
    includes: [
      "Pulizia di tombe, lapidi e monumenti funerari",
      "Rimozione di terra, muschio e vegetazione con prodotti adatti al materiale",
      "Recupero di superfici in marmo e pietra rovinate",
      "Valutazione di pezzi staccati, rotture e parti da riparare o sostituire",
      "Restauro di porte e portoni in legno",
      "Recupero di tavoli, mobili e arredi",
      "Ripristino di finiture: cera, gommalacca, vernici",
      "Cornici, stucchi, ringhiere e altri elementi decorativi",
    ],
    scopeTitle: "Che cosa si può valutare",
    costTitle: "Da cosa dipende la valutazione",
    whenTitle: "Pulizia, manutenzione, riparazione o restauro?",
    when: [
      "Pulizia: togliere sporco, terra, muschio e macchie senza togliere materiale. È il primo passo e a volte basta.",
      "Manutenzione: proteggere e conservare ciò che è in buono stato, a intervalli regolari.",
      "Riparazione: rimettere al suo posto o rifare parti rotte, staccate o mancanti.",
      "Restauro: recuperare aspetto e finitura di un oggetto di valore con metodi documentati. Sui beni tutelati è riservato ai restauratori di beni culturali.",
    ],
    costFactors: [
      "Materiale e stato di conservazione",
      "Dimensioni e numero di elementi",
      "Tipo di intervento: pulizia, riparazione o restauro",
      "Accesso: cimitero, piani alti, spazi stretti, trasporto in laboratorio",
      "Parti da rifare o sostituire",
      "Autorizzazioni eventuali: cimitero, Soprintendenza",
    ],
    messinaNotes: [
      "Nei cimiteri comunali di Messina i lavori edili o in marmo li possono eseguire solo le imprese autorizzate dal Comune, e la posa o la modifica di monumenti chiede un'autorizzazione: il professionista ti dice se serve per il tuo caso.",
      "Sulle tombe decide il titolare della concessione o i suoi eredi: tienilo presente prima di chiedere un sopralluogo.",
      "Vicino al mare l'aria salmastra favorisce sali e ruggine su marmi, pietre e metalli esposti: la protezione dopo la pulizia conta quanto la pulizia.",
      "Per la commemorazione dei defunti del 2 novembre conviene muoversi con anticipo.",
    ],
    permitsNote:
      "Per una porta o un mobile di casa, non tutelati, di norma non serve alcuna autorizzazione. Sui beni culturali, ad esempio oggetti di enti pubblici o ecclesiastici con più di 70 anni o dichiarati di interesse, ogni intervento richiede l'autorizzazione della Soprintendenza (art. 21 D.Lgs 42/2004) e il restauro spetta ai restauratori di beni culturali (art. 29). In Sicilia la competenza è della Regione, tramite la Soprintendenza BB.CC.AA. di Messina. Nei cimiteri valgono anche il DPR 285/1990 e il regolamento comunale.",
    faqs: [
      {
        q: "Il servizio è già attivo?",
        a: IN_PREPARAZIONE,
      },
      {
        q: "Quanto costa pulire una tomba a Messina?",
        a: "Non c'è un prezzo unico: dipende da materiale, dimensioni, stato, tipo di sepoltura e da cosa va fatto oltre alla pulizia. Con qualche foto il professionista può darti una prima indicazione; il preventivo arriva dopo averla vista.",
      },
      {
        q: "Si può pulire il marmo con prodotti acidi o anticalcare?",
        a: "Meglio di no: i prodotti acidi sciolgono il carbonato del marmo e lo opacizzano. Si parte dal metodo più delicato, di solito acqua e detergenti neutri, provando prima su una zona poco visibile.",
      },
      {
        q: "Il muschio torna dopo la pulizia?",
        a: "Può tornare: dipende da umidità, ombra e posizione. Il professionista toglie muschio e licheni con prodotti adatti al materiale e può consigliarti una manutenzione periodica, ma nessuno può garantire che non ricresca.",
      },
      {
        q: "Serve un permesso per lavorare su una tomba?",
        a: "Dipende dal lavoro. Nei cimiteri comunali di Messina i lavori edili e in marmo li eseguono solo imprese autorizzate e la posa o la modifica di un monumento richiede un'autorizzazione; per monumenti di interesse storico può servire anche la Soprintendenza. Chiedi al professionista cosa serve nel tuo caso.",
      },
      {
        q: "Una porta antica si può sabbiare?",
        a: `Non è detto che sia la scelta giusta: sul legno il getto abrasivo consuma di più le parti tenere e mette in rilievo le venature. Su porte e mobili di pregio si usano di solito metodi più controllati. Per le superfici dove il getto può servire leggi la pagina sulla [sabbiatura](${SABBIATURA_PATH}).`,
      },
      {
        q: "Chi esegue il lavoro?",
        a: "Un professionista locale, con partita IVA e fattura, che fa proprio quel tipo di lavoro: noi non eseguiamo lavori e non facciamo preventivi. Distinguiamo chi lavora il marmo da chi lavora il legno, così la richiesta arriva alla persona giusta.",
      },
    ],
    updated: "2026-11-15",
    sources: [
      { label: "D.Lgs 42/2004, Codice dei beni culturali", href: D_LGS_42 },
      { label: "DPR 285/1990, Regolamento di polizia mortuaria", href: DPR_285 },
      { label: "Comune di Messina, posa monumenti funebri", href: MESSINA_CIMITERI },
      { label: "Soprintendenza BB.CC.AA. di Messina", href: SOPRINTENDENZA_ME },
    ],
    related: ["sabbiatura", "facciate", "imbianchino"],
  },
  {
    id: "sabbiatura",
    line: "sabbiatura",
    funnelService: "sabbiatura",
    path: SABBIATURA_PATH,
    navLabel: BLASTING.short,
    cardTitle: BLASTING.name,
    cardText: "Pietra, mattoni, legno e metallo: pulizia a getto e altre tecniche specialistiche, solo dopo una valutazione del materiale.",
    title: `${BLASTING.name} a Messina`,
    metaDescription: `${BLASTING.name} a Messina per pietra, mattoni, legno e metallo: il metodo si sceglie dopo una valutazione e una prova. Richiesta gratuita.`,
    h1: `${BLASTING.name} a Messina`,
    lead:
      "Muri in pietra anneriti, travi con vecchie vernici, ringhiere arrugginite: descrivi superficie e materiale, con qualche foto, e cerchiamo un professionista che fa pulizie specialistiche. La tecnica si decide dopo aver visto il materiale.",
    answer:
      "Sabbiatura è il nome comune di tecniche diverse che puliscono una superficie proiettando un materiale con aria compressa: sabbia o altri abrasivi, abrasivi fini a bassa pressione (microsabbiatura), abrasivo con acqua (idrosabbiatura) o ghiaccio secco. Nessuna va bene per tutto: su marmo lucidato, pietre tenere o legno di pregio può rovinare la superficie. Per questo si parte da una prova su una piccola zona.",
    quoteChecklist: [
      "Nome della tecnica e materiale proiettato",
      "Prova preliminare su una zona poco visibile, prima del lavoro",
      "Protezione di infissi, piante e superfici vicine",
      "Contenimento della polvere e smaltimento di abrasivo, acqua e residui",
      "Cosa è escluso e cosa succede se la prova non dà il risultato atteso",
    ],
    includes: [
      "Murature in pietra o mattoni a vista",
      "Travi, persiane e altri elementi in legno",
      "Ringhiere, cancelli e inferriate in metallo",
      "Pavimenti e superfici esterne",
      "Rimozione di vernici, ruggine, smog e patine, se il materiale lo consente",
    ],
    scopeTitle: "Quali superfici si possono valutare",
    costTitle: "Da cosa dipende il costo",
    whenTitle: "Le tecniche più comuni",
    when: [
      "Sabbiatura a secco: abrasivo proiettato con aria compressa. Funziona su metallo e superfici resistenti; su pietra e legno può lasciare segni e solleva molta polvere.",
      "Microsabbiatura: getto fine e controllato a bassa pressione, usato anche nella pulitura della pietra. È lenta e chiede mani esperte.",
      "Idrosabbiatura: abrasivo con acqua. Meno polvere, ma la superficie deve asciugare e i materiali molto porosi assorbono acqua.",
      "Ghiaccio secco: granuli di anidride carbonica che all'impatto diventano gas. Non lascia abrasivo, ma lo sporco rimosso va raccolto; è rumorosa e negli ambienti chiusi richiede ventilazione.",
    ],
    costFactors: [
      "Materiale e stato della superficie",
      "Metri quadri e altezza: ponteggi o trabattelli",
      "Tecnica e materiale proiettato",
      "Protezioni e contenimento della polvere",
      "Smaltimento di residui, abrasivo e acqua",
      "Trattamenti dopo la pulizia: protettivi, verniciatura",
    ],
    messinaNotes: [
      "Vicino al mare sale e umidità fanno arrugginire ringhiere e inferriate: dopo la pulizia serve di solito un trattamento protettivo.",
      "Sui palazzi del centro e sugli edifici tutelati la pulizia delle facciate può richiedere autorizzazioni e occupazione di suolo pubblico.",
      "Nei cimiteri e sui beni culturali il metodo non si sceglie da soli: valgono le regole del cimitero e, per i beni tutelati, la Soprintendenza.",
      "In città polvere e rumore arrivano ai vicini: chiedi come verranno protetti spazi comuni, auto e finestre.",
    ],
    permitsNote:
      "Le lavorazioni che espongono a polvere di silice cristallina respirabile, come la sabbiatura con abrasivi silicei, rientrano tra quelle con agenti cancerogeni (D.Lgs 81/2008, Allegato XLII, dal D.Lgs 44/2020): l'impresa deve valutarne il rischio e proteggere lavoratori e vicini. I residui vanno classificati e smaltiti come rifiuti. Sui beni culturali serve l'autorizzazione della Soprintendenza (art. 21 D.Lgs 42/2004); in facciata possono servire titoli edilizi e occupazione di suolo pubblico.",
    faqs: [
      {
        q: "Il servizio è già attivo?",
        a: IN_PREPARAZIONE,
      },
      {
        q: "Che differenza c'è tra sabbiatura, microsabbiatura e idrosabbiatura?",
        a: "Cambiano materiale e controllo del getto: la sabbiatura proietta un abrasivo con aria compressa, la microsabbiatura usa abrasivi fini a bassa pressione su piccole superfici, l'idrosabbiatura aggiunge acqua per ridurre la polvere. La scelta dipende dal materiale e dallo sporco da togliere.",
      },
      {
        q: "La sabbiatura rovina il marmo?",
        a: `Può farlo: su superfici lucidate o pietre tenere un abrasivo troppo duro lascia segni e toglie la lucidatura. Spesso si preferiscono metodi più delicati, provati prima su una zona piccola. Per tombe, lapidi e marmi leggi la pagina su [restauro e pulizia](${RESTAURO_PATH}).`,
      },
      {
        q: "La pulizia con ghiaccio secco è davvero senza residui?",
        a: "Non lascia abrasivo, perché il ghiaccio secco diventa gas, ma lo sporco o la vernice rimossi restano da raccogliere e smaltire. Non è adatta a ogni superficie ed è rumorosa.",
      },
      {
        q: "Si può sabbiare il legno?",
        a: "Su travi e legni rustici si fa, ma il getto consuma di più le parti tenere e mette in rilievo le venature: può essere l'effetto voluto su una trave, non su un mobile di pregio. Il professionista valuta il metodo dopo una prova.",
      },
      {
        q: "Serve una prova prima del lavoro?",
        a: "Sì, è la pratica corretta: si prova il metodo su una piccola zona poco visibile e si decide solo dopo aver visto il risultato.",
      },
      {
        q: "Quanto costa la sabbiatura a Messina?",
        a: "Non esiste un prezzo unico: dipende da materiale, metri quadri, altezza, tecnica, protezioni e smaltimento dei residui. Il preventivo arriva dopo la valutazione e, di solito, dopo la prova.",
      },
    ],
    updated: "2026-11-15",
    sources: [
      { label: "D.Lgs 44/2020, agenti cancerogeni", href: D_LGS_44 },
      { label: "INAIL, silice cristallina respirabile nei cantieri (2024)", href: INAIL_SILICE },
      { label: "D.Lgs 42/2004, Codice dei beni culturali", href: D_LGS_42 },
    ],
    related: ["restauro", "facciate", "imbianchino"],
  },
];

const FREE = { big: "0 €", label: "per chi invia la richiesta di valutazione" };

export const specialistExperience: Record<string, ServiceExperience> = {
  restauro: {
    ground: "travertino",
    motif: "stele",
    flip: true,
    theme: "Recupero",
    facts: [
      { big: "4", label: "lavori diversi: pulizia, manutenzione, riparazione e restauro" },
      { big: "Art. 21", label: "sui beni culturali ogni intervento chiede l'autorizzazione della Soprintendenza" },
      FREE,
    ],
    stage: {
      label: "Oggetti",
      title: "Marmo, legno o decoro: *ogni materiale ha il suo mestiere*.",
      intro: "Chi pulisce una lapide di solito non restaura un mobile. Scegli il caso più vicino al tuo per capire cosa conta.",
      legend: "Scegli l'oggetto",
      note: "Indicazioni generali: metodo e fattibilità li valuta il professionista dopo aver visto l'oggetto.",
      options: [
        {
          name: "Tombe e lapidi",
          short: "Tombe",
          img: specialistMedia.tomba,
          text: "Marmo e pietra all'aperto si sporcano di terra, muschio e croste. Si pulisce partendo dal metodo più delicato; rotture e parti staccate si valutano a parte.",
          points: ["Nei cimiteri comunali lavorano solo imprese autorizzate", "Sulle tombe decide il titolare della concessione"],
        },
        {
          name: "Porte e mobili",
          short: "Legno",
          img: specialistMedia.portone,
          text: "Vernici scrostate, crepe, tarli, finiture consumate. Spesso il lavoro si fa in laboratorio: indica se l'oggetto si può spostare.",
          points: ["Chiedi come viene trattata la finitura originale", "Sui mobili antichi la patina ha valore: si prova sempre in un punto nascosto"],
        },
        {
          name: "Elementi decorativi",
          short: "Decori",
          img: { src: media.materia.src, alt: media.materia.alt },
          text: "Cornici, stucchi, ringhiere, gradini e soglie in pietra. Se fanno parte di un edificio tutelato, prima di intervenire serve la Soprintendenza.",
          points: ["Verifica se l'edificio ha un vincolo", "Sui beni tutelati il restauro spetta a un restauratore qualificato"],
        },
      ],
    },
    scopeImg: specialistMedia.scheda,
    visual: { img: { src: media.porta.src, alt: media.porta.alt }, insight: "Prima di scegliere il metodo si guarda tutto: finitura, crepe, ferramenta." },
    closing: {
      title: "Raccontaci il tuo *oggetto*.",
      cta: "Chiedi una valutazione",
      bring: ["Che cos'è e di che materiale", "Una foto d'insieme e una da vicino", "Se si può spostare o va trattato sul posto"],
      img: { src: media.ombra.src, alt: media.ombra.alt },
    },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "stage", ground: "travertino", seam: "door" },
      { key: "scope", ground: "calce", seam: "ruler" },
      { key: "visual", ground: "intonaco" },
      { key: "decision", ground: "travertino" },
      { key: "cost", ground: "calce", seam: "ruler" },
      { key: "local", ground: "sea", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
  sabbiatura: {
    ground: "calce",
    motif: "strata",
    theme: "Superfici",
    facts: [
      { big: "4", label: "famiglie di tecniche: a secco, micro, ad acqua, ghiaccio secco" },
      { big: "1", label: "prova su una piccola zona prima di scegliere il metodo" },
      FREE,
    ],
    stage: {
      label: "Superfici",
      title: "Pietra, legno o metallo: *il materiale decide il metodo*.",
      intro: "Lo stesso getto che pulisce una ringhiera può segnare una pietra tenera. Scegli la superficie più vicina alla tua.",
      legend: "Scegli la superficie",
      note: "Indicazioni generali: la tecnica adatta la sceglie il professionista dopo una prova.",
      options: [
        {
          name: "Pietra e mattoni",
          short: "Pietra",
          img: specialistMedia.pietra,
          text: "Smog, croste e vecchie pitture su murature a vista. Le pietre tenere e i giunti di malta si consumano facilmente: si prova prima su una zona piccola.",
          points: ["Chiedi come vengono protetti giunti e infissi", "Sugli edifici tutelati serve la Soprintendenza"],
        },
        {
          name: "Legno",
          short: "Legno",
          img: specialistMedia.legno,
          text: "Travi, persiane, perline con vecchie vernici. Il getto mette in rilievo le venature: va bene su un legno rustico, meno su uno di pregio.",
          points: ["Fai indicare se serve una finitura dopo la pulizia", "Per porte e mobili antichi valuta il restauro"],
        },
        {
          name: "Metallo",
          short: "Metallo",
          img: specialistMedia.metallo,
          text: "Ringhiere, cancelli e inferriate con ruggine e vernici vecchie. Dopo la pulizia il metallo va protetto subito, soprattutto vicino al mare.",
          points: ["Chiedi quale ciclo protettivo è previsto", "Verifica come viene contenuta la polvere"],
        },
      ],
    },
    scopeImg: specialistMedia.prova,
    visual: { img: { src: material.facWide.src, alt: material.facWide.alt }, insight: "Il risultato si giudica sulla prova, prima di trattare tutta la superficie." },
    closing: {
      title: "Raccontaci la tua *superficie*.",
      cta: "Chiedi una valutazione",
      bring: ["Materiale e metri quadri indicativi", "Che cosa vuoi togliere: sporco, vernice, ruggine", "Foto d'insieme e da vicino"],
      img: { src: material.pitturaWide.src, alt: material.pitturaWide.alt },
    },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "stage", ground: "calce", seam: "door" },
      { key: "scope", ground: "travertino", seam: "ruler" },
      { key: "visual", ground: "intonaco" },
      { key: "decision", ground: "calce" },
      { key: "cost", ground: "travertino", seam: "ruler" },
      { key: "local", ground: "sea", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
};

export const specialistHeroMedia: Record<string, { src: StaticImageData; alt: string }> = {
  restauro: specialistMedia.restauroHero,
  sabbiatura: specialistMedia.sabbiaturaHero,
};
