import type { Media } from "./media";
import { material, media, serviceMedia } from "./media";

/**
 * Regia delle landing: stesso sistema di sezioni, ordine, materia e tema diversi per servizio.
 * I testi qui sono indicazioni generali: nessun dato di disponibilità, prezzo o tempo garantito.
 * Le pagine restano una sola route (`app/[service]`), cambiano solo questi dati.
 */

export type Ground = "lava" | "sea" | "cotto" | "intonaco" | "calce" | "travertino";
export type Seam = "none" | "door" | "ruler" | "tooth";
export type Motif = "tiles" | "water" | "layout" | "studs" | "runs" | "coats" | "plan" | "facade" | "membrane";
export type SectionKey = "answer" | "stage" | "scope" | "visual" | "transform" | "feature" | "decision" | "cost" | "local" | "process" | "faq";

export interface Fact {
  big: string;
  label: string;
}

export interface StageOption {
  name: string;
  short: string;
  img: Media;
  text: string;
  points: string[];
}

export interface ServiceExperience {
  ground: Extract<Ground, "lava" | "sea" | "cotto" | "calce" | "travertino">;
  motif: Motif;
  flip?: boolean;
  /** Lavori di superficie posata: fotografie scoperte a piastrelle da desktop */
  surface?: boolean;
  /** Schema di posa sulla foto e invito per materiale nel selettore */
  plate?: boolean;
  theme: string;
  facts: Fact[];
  stage: { label: string; title: string; intro: string; legend: string; note?: string; options: StageOption[] };
  scopeImg: Media;
  visual: { img: Media; insight: string };
  transform?: { raw: Media; done: Media; title: string; text: string };
  /** Approfondimento su una formula specifica del servizio */
  feature?: { label: string; title: string; text: string; listTitle: string; items: string[] };
  /** Se presente, la sezione "quando" diventa un confronto a due vie */
  compare?: [string, string];
  /** Stratigrafia schematica dei due casi, dall'alto verso il basso */
  layers?: [string[], string[]];
  /** `door`: chiusura con la porta disegnata; le altre usano il disegno tecnico del proprio lavoro */
  closing: { title: string; cta: string; bring: string[]; img: Media; door?: boolean };
  sections: { key: SectionKey; ground: Ground; seam?: Seam }[];
}

const FREE: Fact = { big: "0 €", label: "per chi invia la richiesta" };

export const experience: Record<string, ServiceExperience> = {
  pavimenti: {
    ground: "lava",
    motif: "tiles",
    surface: true,
    plate: true,
    theme: "Superficie",
    facts: [
      { big: "2", label: "strade possibili: demolire e rifare il massetto, o posare in sovrapposizione" },
      { big: "3", label: "famiglie di materiali da confrontare: gres, parquet e laminati, resina" },
      FREE,
    ],
    stage: {
      label: "Materiali",
      title: "Gres, parquet o resina: la scelta parte *dall'uso*.",
      intro: "Ogni superficie chiede un fondo diverso e cambia il modo di vivere la casa. Scegli un materiale per capire cosa comporta.",
      legend: "Scegli il materiale",
      note: "Indicazioni generali: la fattibilità si verifica al sopralluogo.",
      options: [
        {
          name: "Gres porcellanato",
          short: "Gres",
          img: material.gres,
          text: "Assorbe pochissima acqua e regge bene umidità, sabbia e salsedine. È la scelta più versatile per le case vicino al mare e per gli ambienti molto usati.",
          points: ["I grandi formati chiedono un fondo planare e una posa accurata", "Fai indicare nel preventivo formato e schema di posa"],
        },
        {
          name: "Parquet e laminati",
          short: "Parquet",
          img: material.parquet,
          text: "Il più caldo sotto i piedi, il più sensibile all'acqua. Chiede un massetto asciutto e attenzione negli ambienti umidi.",
          points: ["Nei piani terra verifica prima l'eventuale risalita di umidità", "L'umidità del massetto si misura prima della posa"],
        },
        {
          name: "Resina",
          short: "Resina",
          img: material.resina,
          text: "Una superficie continua, senza fughe e con spessori ridotti. Riporta però in vista i difetti del fondo, che deve essere stabile.",
          points: ["Eventuali crepe del massetto vanno trattate prima", "Chiedi quali strati prevede il ciclo completo"],
        },
      ],
    },
    scopeImg: material.pavSoglia,
    visual: { img: material.pavimentiWide, insight: "Ogni millimetro in più arriva a porte, soglie e battiscopa." },
    compare: ["Sovrapporre", "Demolire"],
    layers: [
      ["Nuovo pavimento", "Adesivo", "Pavimento esistente", "Massetto esistente"],
      ["Nuovo pavimento", "Adesivo", "Nuovo massetto"],
    ],
    closing: { title: "Racconta il tuo *pavimento*.", cta: "Inizia dal tuo pavimento", bring: ["Metri quadri indicativi", "Materiale che hai in mente", "Foto e piantina, se le hai"], img: material.pavFinito, door: true },
    sections: [
      { key: "answer", ground: "intonaco", seam: "tooth" },
      { key: "stage", ground: "lava", seam: "door" },
      { key: "scope", ground: "intonaco" },
      { key: "visual", ground: "lava" },
      { key: "decision", ground: "travertino", seam: "tooth" },
      { key: "cost", ground: "calce", seam: "ruler" },
      { key: "local", ground: "sea", seam: "door" },
      { key: "process", ground: "cotto", seam: "tooth" },
      { key: "faq", ground: "calce", seam: "tooth" },
    ],
  },

  bagno: {
    ground: "sea",
    motif: "water",
    surface: true,
    flip: true,
    theme: "Acqua",
    facts: [
      { big: "DM 37", label: "l'idraulico deve essere abilitato e rilasciare la dichiarazione di conformità" },
      { big: "CILA", label: "in genere necessaria se sposti tramezzi o cambi la distribuzione" },
      FREE,
    ],
    stage: {
      label: "Interventi",
      title: "Tre livelli di lavoro, *tre bagni diversi*.",
      intro: "Da quanto intervieni dipendono impianti, pratiche e tempi. Scegli il caso più vicino al tuo.",
      legend: "Scegli il tipo di intervento",
      options: [
        {
          name: "Solo finiture",
          short: "Finiture",
          img: material.bagnoLavabo,
          text: "Nuovi rivestimenti e sanitari, con gli impianti dove sono. Senza modifiche a impianti e spazi rientra di norma nell'edilizia libera.",
          points: ["Controlla lo stato delle fughe e del fondo prima di coprire", "Fai indicare i metri quadri di rivestimento"],
        },
        {
          name: "Da vasca a doccia",
          short: "Doccia",
          img: material.bagnoWide,
          text: "Si smonta la vasca, si adattano gli scarichi e si impermeabilizza la zona doccia prima dei nuovi rivestimenti.",
          points: ["Chiedi quale impermeabilizzazione è prevista", "Verifica pendenze e posizione dello scarico"],
        },
        {
          name: "Rifacimento completo",
          short: "Completo",
          img: material.bagnoGrezzo,
          text: "Nuovi impianti, scarichi e distribuzione. Se sposti tramezzi serve in genere una CILA con un tecnico abilitato.",
          points: ["Le colonne di scarico condominiali sono parti comuni", "A fine lavori chiedi la dichiarazione di conformità"],
        },
      ],
    },
    scopeImg: material.bagnoMembrana,
    visual: { img: material.bagnoMacro, insight: "L'acqua trova sempre il punto debole. Il bagno comincia da ciò che non si vede." },
    closing: { title: "Racconta il tuo *bagno*.", cta: "Inizia dal tuo bagno", bring: ["Metratura e altezza dei rivestimenti", "Vasca o doccia, oggi e domani", "2 o 3 foto dell'ambiente attuale"], img: material.bagnoFinito },
    sections: [
      { key: "answer", ground: "intonaco", seam: "tooth" },
      { key: "scope", ground: "calce", seam: "ruler" },
      { key: "visual", ground: "sea" },
      { key: "stage", ground: "sea" },
      { key: "cost", ground: "intonaco", seam: "door" },
      { key: "decision", ground: "travertino", seam: "tooth" },
      { key: "local", ground: "lava", seam: "door" },
      { key: "process", ground: "sea", seam: "tooth" },
      { key: "faq", ground: "calce", seam: "tooth" },
    ],
  },

  cucina: {
    ground: "lava",
    motif: "layout",
    theme: "Spazio",
    facts: [
      { big: "Zona 1", label: "Messina è in zona sismica 1: una parete si toglie solo dopo la verifica di un tecnico" },
      { big: "3", label: "impianti da coordinare con i mobili: acqua, elettrico e gas" },
      FREE,
    ],
    stage: {
      label: "Disposizione",
      title: "Prima la disposizione, *poi i mobili*.",
      intro: "La posizione di attacchi e prese dipende da come vuoi usare la stanza. Tre casi, tre cantieri diversi.",
      legend: "Scegli la disposizione",
      options: [
        {
          name: "Stessa disposizione",
          short: "Stessa",
          img: material.cucinaMacro,
          text: "I mobili cambiano, attacchi e scarichi restano dove sono. Il lavoro si concentra su rivestimenti, punti elettrici e finiture.",
          points: ["Verifica la potenza disponibile per forno e induzione", "Chiarisci chi prende le misure finali"],
        },
        {
          name: "Nuova disposizione",
          short: "Nuova",
          img: material.cucinaAttacchi,
          text: "Si spostano acqua, scarichi e prese seguendo il progetto dei mobili. Per il gas serve un tecnico abilitato.",
          points: ["Definisci il progetto della cucina prima dei lavori", "Le opere murarie vanno indicate a parte"],
        },
        {
          name: "Aperta sul soggiorno",
          short: "Aperta",
          img: material.cucinaVarco,
          text: "Eliminare una parete cambia la casa, ma va prima verificato che non sia portante. In genere serve almeno una CILA.",
          points: ["Il tecnico abilitato valuta la parete prima del progetto", "Definisci chi segue la pratica edilizia"],
        },
      ],
    },
    scopeImg: material.cucinaParaschizzi,
    visual: { img: material.cucinaWide, insight: "Attacchi, scarichi e prese si decidono sul progetto, non dopo." },
    closing: { title: "Racconta la tua *cucina*.", cta: "Inizia dalla tua cucina", bring: ["Metratura e pianta, se ce l'hai", "Cosa vuoi spostare o aprire", "Foto dell'ambiente attuale"], img: material.cucinaFinita },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "stage", ground: "travertino", seam: "ruler" },
      { key: "visual", ground: "lava" },
      { key: "decision", ground: "lava" },
      { key: "scope", ground: "intonaco", seam: "door" },
      { key: "cost", ground: "calce", seam: "ruler" },
      { key: "local", ground: "sea", seam: "door" },
      { key: "process", ground: "lava" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },

  cartongesso: {
    ground: "calce",
    motif: "studs",
    theme: "Geometria",
    facts: [
      { big: "4", label: "tipi di lastra da indicare nel preventivo: standard, idrofuga, ignifuga, acustica" },
      { big: "CILA", label: "una nuova parete che cambia la distribuzione è un tramezzo a tutti gli effetti" },
      FREE,
    ],
    stage: {
      label: "Soluzioni",
      title: "Pareti, soffitti, contropareti: *stesso materiale, tre lavori*.",
      intro: "Cambiano struttura, lastre e dettagli. Scegli cosa ti serve per capire cosa chiedere.",
      legend: "Scegli la soluzione",
      options: [
        {
          name: "Parete divisoria",
          short: "Parete",
          img: material.cartParete,
          text: "Ricava una stanza in più senza opere murarie pesanti. La struttura metallica e le lastre scelte decidono resistenza e isolamento.",
          points: ["Nei locali umidi preferisci lastre idrofughe", "Se cambia la distribuzione serve in genere una CILA"],
        },
        {
          name: "Controsoffitto e velette",
          short: "Soffitto",
          img: material.cartGola,
          text: "Nasconde impianti e canalizzazioni e porta la luce dentro l'architettura, con gole e faretti integrati.",
          points: ["Coordina cartongessista, elettricista e installatore del clima", "Velette e dettagli su misura vanno indicati a parte"],
        },
        {
          name: "Controparete isolata",
          short: "Controparete",
          img: material.cartongessoMacro,
          text: "Riduce i rumori dal vicino e migliora il comfort: contano doppia lastra, isolante nell'intercapedine e giunti ben sigillati.",
          points: ["Chiedi spessore e tipo di isolante", "Fai specificare il numero di lastre per lato"],
        },
      ],
    },
    scopeImg: material.cartStruttura,
    visual: { img: material.cartongessoWide, insight: "Una parete leggera resta un tramezzo a tutti gli effetti." },
    closing: { title: "Racconta la tua *parete*.", cta: "Inizia dalla tua parete", bring: ["Metri quadri o misure indicative", "Parete, soffitto o controparete", "Foto dell'ambiente attuale"], img: material.cartFinito },
    sections: [
      { key: "answer", ground: "travertino" },
      { key: "visual", ground: "intonaco" },
      { key: "stage", ground: "intonaco" },
      { key: "scope", ground: "calce", seam: "ruler" },
      { key: "cost", ground: "lava", seam: "door" },
      { key: "decision", ground: "travertino" },
      { key: "local", ground: "sea", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },

  imbianchino: {
    ground: "travertino",
    motif: "coats",
    flip: true,
    theme: "Luce",
    facts: [
      { big: "1°", label: "prima si cerca la causa della muffa, solo dopo si dipinge" },
      { big: "Libera", label: "la tinteggiatura interna rientra nell'edilizia libera" },
      FREE,
    ],
    stage: {
      label: "Finiture",
      title: "La pittura giusta *dipende dal muro*.",
      intro: "Stato delle pareti, umidità e uso della stanza vengono prima del colore. Scegli una finitura per capire quando ha senso.",
      legend: "Scegli la finitura",
      options: [
        {
          name: "Lavabile",
          short: "Lavabile",
          img: material.pitLavabile,
          text: "Si pulisce con facilità: adatta a corridoi, cucine e stanze molto vissute.",
          points: ["Chiedi marca, tipo di pittura e numero di mani", "Le stuccature contano quanto il prodotto"],
        },
        {
          name: "Traspirante",
          short: "Traspirante",
          img: material.pitTraspirante,
          text: "Lascia respirare il muro: utile nelle case dove l'umidità è di casa, come spesso accade sulla costa.",
          points: ["Va abbinata a una buona ventilazione", "Non risolve da sola un'infiltrazione"],
        },
        {
          name: "Antimuffa",
          short: "Antimuffa",
          img: material.pitMuffa,
          text: "Un trattamento specifico per le superfici colpite. Funziona solo dopo aver individuato la causa: condensa, infiltrazione o ponte termico.",
          points: ["Fai indicare il trattamento della superficie", "Chiedi come è stata verificata la causa"],
        },
        {
          name: "Decorativa",
          short: "Decorativa",
          img: material.pitturaMacro,
          text: "Effetti materici e calce per dare carattere a una parete: chiede mano esperta e una preparazione accurata del fondo.",
          points: ["Chiedi una campionatura sulla parete", "Fai indicare la superficie esatta"],
        },
      ],
    },
    scopeImg: material.pitStucco,
    visual: { img: material.pitturaWide, insight: "Senza togliere la causa, la muffa ritorna." },
    closing: { title: "Racconta le tue *pareti*.", cta: "Inizia dalle tue pareti", bring: ["Metri quadri o numero di stanze", "Stato delle pareti", "Foto di muffa o crepe, se ci sono"], img: material.pitFinita },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "decision", ground: "calce", seam: "ruler" },
      { key: "stage", ground: "lava", seam: "door" },
      { key: "visual", ground: "intonaco" },
      { key: "scope", ground: "intonaco" },
      { key: "cost", ground: "travertino", seam: "ruler" },
      { key: "local", ground: "sea", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },

  impianti: {
    ground: "sea",
    motif: "runs",
    theme: "Sistemi",
    facts: [
      { big: "DM 37", label: "solo imprese abilitate possono rifare gli impianti e rilasciare la conformità" },
      { big: "1 volta", label: "le tracce si aprono una sola volta, prima di intonaci e pavimenti" },
      FREE,
    ],
    stage: {
      label: "Sistemi",
      title: "Quello che non si vede *fa funzionare la casa*.",
      intro: "Ogni impianto ha regole e verifiche proprie. Scegli quello che devi rifare.",
      legend: "Scegli l'impianto",
      note: "Per guasti urgenti o fughe di gas contatta un tecnico di pronto intervento: questo servizio riguarda lavori programmati.",
      options: [
        {
          name: "Impianto elettrico",
          short: "Elettrico",
          img: material.impScatole,
          text: "Nuovo quadro, linee separate, punti luce e prese pensati per come usi la casa oggi, compresi induzione e climatizzazione.",
          points: ["Fai contare punti luce, prese e attacchi", "Chiedi quale potenza è prevista per il quadro"],
        },
        {
          name: "Idrico e scarichi",
          short: "Idrico",
          img: material.impiantiMacro,
          text: "Le vecchie tubazioni in ferro zincato possono dare perdite o acqua torbida: si valuta se sostituirle mentre le pareti sono aperte.",
          points: ["Chiedi se le tubazioni sottotraccia sono incluse", "Le colonne condominiali sono parti comuni"],
        },
        {
          name: "Predisposizioni",
          short: "Clima e dati",
          img: material.impClima,
          text: "Climatizzazione, dati e domotica costano meno se previsti prima di chiudere le tracce e posare le finiture.",
          points: ["Definisci prima la posizione delle macchine", "Coordina impiantisti e cartongessista"],
        },
      ],
    },
    scopeImg: material.impQuadro,
    visual: { img: material.impiantiWide, insight: "Le tracce si aprono una volta sola: è lì che si decide tutto." },
    closing: { title: "Racconta i tuoi *impianti*.", cta: "Inizia dai tuoi impianti", bring: ["Metratura dell'immobile", "Quali impianti vuoi rifare", "Età degli impianti, se la conosci"], img: material.impFinito },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "scope", ground: "travertino", seam: "ruler" },
      { key: "stage", ground: "sea", seam: "door" },
      { key: "visual", ground: "sea" },
      { key: "cost", ground: "intonaco" },
      { key: "decision", ground: "calce", seam: "ruler" },
      { key: "local", ground: "lava", seam: "door" },
      { key: "process", ground: "cotto" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },

  facciate: {
    ground: "lava",
    motif: "facade",
    flip: true,
    theme: "Involucro",
    facts: [
      { big: "Assemblea", label: "in condominio i lavori straordinari si decidono in assemblea" },
      { big: "Ponteggio", label: "una voce che pesa: durata e permessi vanno indicati a parte" },
      FREE,
    ],
    stage: {
      label: "Interventi",
      title: "Intonaci, balconi, colore: *tre lavori, una facciata*.",
      intro: "Spesso servono tutti e tre, ma nell'ordine giusto: prima la sicurezza, poi la finitura.",
      legend: "Scegli l'intervento",
      note: "Indicazioni generali: lo stato della facciata si valuta al sopralluogo.",
      options: [
        {
          name: "Ripristino degli intonaci",
          short: "Intonaci",
          img: material.facIntonaco,
          text: "Si individuano le parti distaccate, si rimuovono e si ricostruisce l'intonaco con materiali compatibili con il supporto.",
          points: ["Chiedi come verrà verificata l'estensione del distacco", "Le quantità reali emergono spesso a ponteggio montato"],
        },
        {
          name: "Frontalini e balconi",
          short: "Balconi",
          img: material.facBalcone,
          text: "Il calcestruzzo ammalorato si rimuove, i ferri a vista si trattano contro la corrosione e il bordo si ricostruisce con malte adatte.",
          points: ["Fai indicare il ciclo di ripristino previsto", "Se il degrado è esteso serve il parere di un tecnico"],
        },
        {
          name: "Tinteggiatura",
          short: "Colore",
          img: material.facColore,
          text: "Una finitura per esterni protegge il muro solo se il supporto è sano. Il colore può essere soggetto a regole condominiali o comunali.",
          points: ["Fai indicare prodotto, colore e numero di mani", "Prima di cambiare colore verifica regolamento e Comune"],
        },
      ],
    },
    scopeImg: material.facFrontalino,
    visual: { img: material.facWide, insight: "Una facciata si legge da lontano, ma si rifà da vicino." },
    feature: {
      label: "Condominio",
      title: "In condominio *decide l'assemblea*.",
      text: "La facciata è di norma parte comune. Per riparazioni straordinarie di notevole entità servono la maggioranza degli intervenuti e almeno la metà del valore dell'edificio; le spese si dividono di regola per millesimi.",
      listTitle: "Da preparare per l'assemblea",
      items: [
        "Una valutazione tecnica dello stato di intonaci e balconi",
        "Preventivi comparabili, voce per voce e con le stesse quantità",
        "Costo e durata del ponteggio, permessi compresi",
        "Criterio di ripartizione delle spese e piano dei pagamenti",
      ],
    },
    closing: { title: "Racconta la tua *facciata*.", cta: "Inizia dalla tua facciata", bring: ["Numero di piani", "Stato di intonaci e balconi", "Foto della facciata"], img: material.facFinita },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "decision", ground: "calce", seam: "ruler" },
      { key: "visual", ground: "lava" },
      { key: "stage", ground: "travertino" },
      { key: "feature", ground: "cotto", seam: "door" },
      { key: "scope", ground: "intonaco" },
      { key: "cost", ground: "calce", seam: "ruler" },
      { key: "local", ground: "sea", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },

  impermeabilizzazione: {
    ground: "sea",
    motif: "membrane",
    theme: "Tenuta",
    facts: [
      { big: "Prima", label: "si cerca da dove passa l'acqua, poi si sceglie la soluzione" },
      { big: "1/3", label: "la quota di chi ha l'uso esclusivo del lastrico solare, secondo l'art. 1126 c.c." },
      FREE,
    ],
    stage: {
      label: "Soluzioni",
      title: "Non esiste una sola *impermeabilizzazione*.",
      intro: "La soluzione dipende da quanto è esteso il problema e da cosa c'è sopra. Scegli il caso più vicino al tuo.",
      legend: "Scegli la soluzione",
      note: "Indicazioni generali: la soluzione adatta si valuta al sopralluogo.",
      options: [
        {
          name: "Sopra il pavimento esistente",
          short: "Sopra",
          img: material.terGocce,
          text: "Prodotti applicati sulle piastrelle, senza demolire. Hanno senso se il pavimento è ben ancorato, le pendenze funzionano e l'acqua entra da punti individuati.",
          points: ["Chiedi come è stata individuata la causa", "Verifica durata e manutenzione del prodotto"],
        },
        {
          name: "Rifacimento degli strati",
          short: "Rifare",
          img: material.terRifacimento,
          text: "Si demoliscono pavimento e massetto, si ricostruiscono le pendenze, si posa il nuovo sistema impermeabile e il pavimento per esterni.",
          points: ["Fai indicare demolizioni e smaltimento a parte", "Curati risvolti, soglie e scarichi"],
        },
        {
          name: "Lastrico a vista",
          short: "Lastrico",
          img: material.terLastrico,
          text: "Sulle coperture non praticabili il manto resta esposto: contano sormonti, risvolti e manutenzione periodica.",
          points: ["Chiedi tipo e spessore del manto", "Verifica di chi è la copertura in condominio"],
        },
      ],
    },
    scopeImg: material.terRisvolto,
    visual: { img: material.terWide, insight: "La macchia è sotto. Il problema spesso è altrove." },
    compare: ["Riparare", "Rifare"],
    layers: [
      ["Protettivo o resina", "Pavimento esistente", "Massetto esistente"],
      ["Nuovo pavimento", "Impermeabilizzazione", "Nuovo massetto in pendenza"],
    ],
    feature: {
      label: "Condominio",
      title: "Terrazzo condominiale: *chi paga cosa*.",
      text: "Sul lastrico solare in uso esclusivo, l'art. 1126 del Codice civile mette un terzo della spesa a carico di chi ne ha l'uso e due terzi dei condomini a cui serve. Se il lastrico è comune si seguono i millesimi.",
      listTitle: "Da verificare prima dei lavori",
      items: [
        "Regolamento di condominio e titoli di proprietà",
        "Se è un terrazzo privato, un lastrico solare o un balcone",
        "Una causa accertata dell'infiltrazione",
        "Chi incarica il tecnico e chi approva la spesa",
      ],
    },
    closing: { title: "Racconta il tuo *terrazzo*.", cta: "Inizia dal tuo terrazzo", bring: ["Metri quadri indicativi", "Dove compare l'infiltrazione", "Foto del terrazzo e delle macchie"], img: material.terFinito },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "scope", ground: "calce", seam: "ruler" },
      { key: "stage", ground: "sea", seam: "door" },
      { key: "visual", ground: "sea" },
      { key: "decision", ground: "travertino" },
      { key: "feature", ground: "cotto", seam: "door" },
      { key: "cost", ground: "intonaco" },
      { key: "local", ground: "lava", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },

  ristrutturazioni: {
    ground: "cotto",
    motif: "plan",
    theme: "Trasformazione",
    facts: [
      { big: "Zona 1", label: "su muri portanti e solai serve sempre un tecnico abilitato" },
      { big: "1911", label: "il Piano Borzì ridisegna il centro: prima di progettare, verifica impianti e solai" },
      FREE,
    ],
    stage: {
      label: "Livelli",
      title: "Tre livelli di intervento, *tre percorsi*.",
      intro: "Capire in quale ricade il tuo lavoro cambia tempi, pratiche e professionisti. Nel dubbio decide un tecnico abilitato.",
      legend: "Scegli il livello di intervento",
      options: [
        {
          name: "Rinnovare le finiture",
          short: "Finiture",
          img: media.materia,
          text: "Pavimenti, rivestimenti, sanitari nella stessa posizione, tinteggiatura. Di norma rientrano nell'edilizia libera.",
          points: ["Il tema è scegliere bene materiali e posa", "Fai elencare le lavorazioni con le quantità"],
        },
        {
          name: "Rifare impianti e distribuzione",
          short: "Impianti",
          img: media.cantiere,
          text: "Spostare tramezzi non portanti, rifare impianti, unire due ambienti. In genere serve una CILA con un tecnico abilitato.",
          points: ["Chiedi chi segue la pratica edilizia", "Pretendi le dichiarazioni di conformità"],
        },
        {
          name: "Toccare strutture e involucro",
          short: "Strutture",
          img: media.facciata,
          text: "Muri portanti, solai, facciate e terrazzi. In zona sismica 1 servono progetto e titolo adeguato; sulla costa vanno controllati anche i vincoli.",
          points: ["Il progetto va affidato a un tecnico abilitato", "In condominio verifica regolamento e assemblea"],
        },
      ],
    },
    scopeImg: material.risTavolo,
    visual: { img: serviceMedia.ristrutturazioni, insight: "" },
    transform: {
      raw: material.ristrutturazioneGrezzo,
      done: material.ristrutturazioneFinito,
      title: "Da grezzo a *finito*: ogni passaggio va scritto.",
      text: "Schema illustrativo, non un lavoro eseguito. Tra le due immagini ci sono demolizioni, impianti, massetti, intonaci e finiture: un preventivo serio le elenca una per una.",
    },
    feature: {
      label: "Chiavi in mano",
      title: "Ristrutturazione *chiavi in mano*: cosa deve essere scritto.",
      text: "Significa affidare a un solo soggetto tutte le lavorazioni, con un unico referente e un unico preventivo. La stessa espressione però può coprire contenuti molto diversi: prima di firmare, fatti mettere per iscritto cosa comprende.",
      listTitle: "Da chiarire nel contratto",
      items: [
        "Cosa è incluso: pratiche edilizie, direzione lavori, smaltimento, forniture, infissi, pulizia finale",
        "Chi è il referente unico e chi eseguirà i lavori, compresi eventuali subappalti",
        "Come vengono gestite varianti e costi aggiuntivi",
        "Cronoprogramma, pagamenti per stati di avanzamento ed eventuali penali",
        "Documenti di fine lavori: dichiarazioni di conformità e aggiornamento catastale, quando dovuto",
      ],
    },
    closing: { title: "Racconta la tua *casa*.", cta: "Inizia dalla tua casa", bring: ["Metratura e numero di ambienti", "Cosa vuoi cambiare", "Foto e piantina, se le hai"], img: material.risFinito, door: true },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "transform", ground: "lava", seam: "door" },
      { key: "stage", ground: "travertino" },
      { key: "scope", ground: "intonaco" },
      { key: "feature", ground: "cotto", seam: "door" },
      { key: "decision", ground: "calce", seam: "ruler" },
      { key: "cost", ground: "lava", seam: "door" },
      { key: "local", ground: "sea" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
  cappotto: {
    ground: "calce",
    motif: "facade",
    flip: true,
    theme: "Involucro termico",
    facts: [
      { big: "Zona B", label: "la classe climatica di Messina: conta anche il caldo estivo, non solo l'inverno" },
      { big: "5", label: "strati di un cappotto esterno: collante, pannello, tasselli, rasatura armata, finitura" },
      FREE,
    ],
    stage: {
      label: "Sistemi",
      title: "Dall'esterno, dall'interno o *dentro il muro*.",
      intro: "Cambiano lavoro, spazio e regole. Scegli il caso più vicino al tuo edificio.",
      legend: "Scegli il sistema di isolamento",
      note: "Indicazioni generali: il sistema adatto si valuta con un tecnico al sopralluogo.",
      options: [
        {
          name: "Cappotto esterno",
          short: "Esterno",
          img: material.capEsterno,
          text: "Pannelli isolanti incollati e tassellati sulla facciata, protetti da una rasatura armata con rete e da una finitura. Avvolge anche pilastri e travi.",
          points: ["Chiedi marca e certificazione del sistema completo", "Fai indicare come si raccordano davanzali e imbotti"],
        },
        {
          name: "Isolamento interno",
          short: "Interno",
          img: material.capInterno,
          text: "Contropareti isolanti stanza per stanza, senza ponteggio. Utile se la facciata non si può modificare o se intervieni in un solo appartamento.",
          points: ["Chiedi come viene gestito il rischio di condensa", "Verifica quanto spazio si perde per parete"],
        },
        {
          name: "Insufflaggio in intercapedine",
          short: "Intercapedine",
          img: material.capIntercapedine,
          text: "Se il muro ha una camera d'aria continua, l'isolante si soffia all'interno da piccoli fori, senza cambiare né facciata né stanze.",
          points: ["Fai verificare prima che l'intercapedine sia continua e asciutta", "Chiedi quale materiale viene insufflato"],
        },
      ],
    },
    scopeImg: material.capStrati,
    visual: { img: material.capWide, insight: "Un cappotto si giudica dai dettagli: davanzali, spigoli e pilastri." },
    compare: ["Esterno", "Interno"],
    layers: [
      ["Finitura", "Rasatura armata", "Pannello isolante", "Muro esistente"],
      ["Lastra in cartongesso", "Isolante", "Muro esistente"],
    ],
    feature: {
      label: "Condominio",
      title: "In condominio il cappotto *si decide insieme*.",
      text: "La facciata è parte comune: l'intervento passa dall'assemblea e le spese si dividono di regola per millesimi. Arrivare con una descrizione dei lavori uguale per tutti rende i preventivi confrontabili.",
      listTitle: "Da preparare per l'assemblea",
      items: [
        "Una valutazione tecnica di muri, ponti termici e stato degli intonaci",
        "Preventivi sulla stessa descrizione e con gli stessi spessori",
        "Costo e durata del ponteggio, permessi compresi",
        "Verifica delle detrazioni applicabili con il commercialista",
      ],
    },
    closing: { title: "Racconta i tuoi *muri*.", cta: "Inizia dai tuoi muri", bring: ["Tipo di edificio e numero di piani", "Casa singola o condominio", "Foto della facciata o delle pareti con muffa"], img: material.capFinito },
    sections: [
      { key: "answer", ground: "intonaco" },
      { key: "stage", ground: "travertino", seam: "ruler" },
      { key: "visual", ground: "lava" },
      { key: "decision", ground: "calce" },
      { key: "scope", ground: "intonaco", seam: "door" },
      { key: "feature", ground: "sea", seam: "door" },
      { key: "cost", ground: "calce", seam: "ruler" },
      { key: "local", ground: "lava", seam: "door" },
      { key: "process", ground: "intonaco" },
      { key: "faq", ground: "calce", seam: "ruler" },
    ],
  },
};

export const DARK_GROUNDS: Ground[] = ["lava", "sea", "cotto"];
