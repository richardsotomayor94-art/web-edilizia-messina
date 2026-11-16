/**
 * Catalogo unico delle categorie: raggruppamento per home, menu e footer, e base per il futuro chatbot.
 *
 * Il chatbot (Gemini, non ancora implementato) dovrà leggere SOLO da qui: nessuna categoria fuori da
 * questo elenco. `matchService` è un riconoscimento semplice e deterministico per parole chiave, utile
 * come fallback e per i test; il valore restituito è quello che il modulo accetta in `?servizio=`.
 */
import { funnelServiceLabels, type FunnelService } from "./services";
import { BLASTING, SPECIALIST_STATUS, isSpecialistActive } from "./specialist";

export type CatalogGroup = "casa" | "superfici" | "restauro" | "spazi";

export const GROUP_LABELS: Record<CatalogGroup, string> = {
  casa: "Lavori in casa",
  superfici: "Pulizia delle superfici",
  restauro: "Restauro e conservazione",
  spazi: "Traslochi, sgomberi e verde",
};

/** Una riga sotto il nome del gruppo nel menu: dice che cosa c'è dentro, senza promesse. */
export const GROUP_BLURBS: Record<CatalogGroup, string> = {
  casa: "Ristrutturazioni, interni ed esterni",
  superfici: "Sabbiatura e microsabbiatura",
  restauro: "Edifici, muri umidi, marmo e legno",
  spazi: "Spostare, svuotare, curare il verde",
};

/** Sottotitolo di ogni voce nel menu (breve, concreto, coerente con la landing). */
export const NAV_HINTS: Partial<Record<FunnelService, string>> = {
  "ristrutturazione-completa": "Case e appartamenti, chiavi in mano",
  bagno: "Rifacimento, doccia al posto della vasca",
  cucina: "Disposizione, impianti, rivestimenti",
  cartongesso: "Pareti, controsoffitti, contropareti",
  pittura: "Tinteggiatura, antimuffa, stucchi",
  impianti: "Elettrico e idraulico da rifare",
  pavimenti: "Gres, parquet, resina e massetti",
  facciata: "Intonaci, balconi e frontalini",
  impermeabilizzazione: "Terrazzi, balconi e lastrici solari",
  isolamento: "Esterno, interno o in intercapedine",
  sabbiatura: "Travi, ringhiere, muri in pietra",
  microsabbiatura: "Pietra, portali e decori, con prove",
  restauro: "Tombe e lapidi, marmo, porte e mobili",
  "restauro-tecnico": "Calcestruzzo, balconi, ferri scoperti",
  "restauro-conservativo": "Edifici storici o vincolati",
  "risanamento-conservazione": "Muri umidi, sali, intonaci che cadono",
  "sgomberi-smaltimento": "Cantine, garage e appartamenti",
  traslochi: "Da casa a casa, in città e in provincia",
  giardinaggio: "Prati, siepi, potature e pulizia",
};

export interface CatalogEntry {
  /** Valore del modulo (`/preventivo/?servizio=`) */
  value: FunnelService;
  label: string;
  group: CatalogGroup;
  /** Landing dedicata, se esiste */
  path?: string;
  /** Sinonimi e forme con cui le persone descrivono il bisogno (minuscolo, senza accenti obbligatori) */
  keywords: string[];
}

export const SERVICE_CATALOG: CatalogEntry[] = [
  { value: "ristrutturazione-completa", label: funnelServiceLabels["ristrutturazione-completa"], group: "casa", path: "/ristrutturazioni-messina/", keywords: ["ristrutturazione", "ristrutturare", "ristrutturazioni", "chiavi in mano", "rifare casa", "rifare l'appartamento"] },
  { value: "bagno", label: "Bagno", group: "casa", path: "/ristrutturazione-bagno-messina/", keywords: ["bagno", "doccia", "vasca", "sanitari"] },
  { value: "cucina", label: "Cucina", group: "casa", path: "/ristrutturazione-cucina-messina/", keywords: ["cucina"] },
  { value: "cartongesso", label: "Cartongesso", group: "casa", path: "/cartongesso-messina/", keywords: ["cartongesso", "controsoffitto", "controparete", "parete divisoria"] },
  { value: "pittura", label: "Pittura", group: "casa", path: "/imbianchino-messina/", keywords: ["imbianchino", "pittura", "tinteggiatura", "pitturare", "tinteggiare", "imbiancare"] },
  { value: "impianti", label: "Impianti", group: "casa", path: "/impianti-messina/", keywords: ["impianto elettrico", "impianto idraulico", "impianti", "elettricista", "idraulico"] },
  { value: "pavimenti", label: "Pavimenti", group: "casa", path: "/pavimenti-messina/", keywords: ["pavimento", "pavimenti", "piastrelle", "parquet", "gres"] },
  { value: "facciata", label: "Facciata", group: "casa", path: "/rifacimento-facciata-messina/", keywords: ["facciata", "facciate", "frontalini", "balconi", "prospetto"] },
  { value: "impermeabilizzazione", label: "Impermeabilizzazioni", group: "casa", path: "/impermeabilizzazione-terrazzi-messina/", keywords: ["impermeabilizzazione", "impermeabilizzare", "terrazzo", "lastrico", "infiltrazioni"] },
  { value: "isolamento", label: "Cappotto e isolamento", group: "casa", path: "/cappotto-termico-messina/", keywords: ["cappotto", "isolamento termico", "isolare"] },
  { value: "opere-murarie", label: "Opere murarie", group: "casa", keywords: ["opere murarie", "muratore", "tramezzo"] },
  // Altri servizi: l'ordine conta per il riconoscimento (prima le forme più specifiche)
  { value: "microsabbiatura", label: "Microsabbiatura", group: "superfici", path: "/microsabbiatura-messina/", keywords: ["microsabbiatura", "micro sabbiatura", "microsabbiare"] },
  { value: "sabbiatura", label: BLASTING.name, group: "superfici", path: "/sabbiatura-messina/", keywords: ["sabbiatura", "sabbiare", "idrosabbiatura", "sabbiatore"] },
  { value: "restauro-conservativo", label: "Restauro conservativo", group: "restauro", path: "/restauro-conservativo-messina/", keywords: ["restauro conservativo", "risanamento conservativo", "edificio storico", "edificio vincolato"] },
  { value: "restauro-tecnico", label: "Restauro tecnico", group: "restauro", path: "/restauro-tecnico-messina/", keywords: ["restauro tecnico", "calcestruzzo ammalorato", "ferri scoperti", "cornicione", "ripristino calcestruzzo"] },
  { value: "risanamento-conservazione", label: "Risanamento e conservazione", group: "restauro", path: "/risanamento-conservazione-messina/", keywords: ["risanamento", "umidità di risalita", "muri umidi", "intervento di risanamento"] },
  { value: "restauro", label: "Restauro, pulizia e recupero", group: "restauro", path: "/restauro-e-pulizia-messina/", keywords: ["pulizia tomba", "pulire una tomba", "lapide", "restauro mobili", "restauro porta", "restaurare un mobile", "marmo"] },
  { value: "sgomberi-smaltimento", label: "Sgomberi e smaltimento", group: "spazi", path: "/sgomberi-smaltimento-messina/", keywords: ["sgombero", "sgomberi", "sgomberare", "svuotare", "svuota cantine", "smaltimento", "smaltire", "ingombranti"] },
  { value: "traslochi", label: "Traslochi", group: "spazi", path: "/traslochi-messina/", keywords: ["trasloco", "traslochi", "traslocare", "trasferire i mobili"] },
  { value: "giardinaggio", label: "Giardinaggio", group: "spazi", path: "/giardinaggio-messina/", keywords: ["giardino", "giardinaggio", "giardiniere", "prato", "siepe", "aiuole"] },
];

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ");

/**
 * Riconoscimento per parole chiave: restituisce la categoria della prima corrispondenza più lunga.
 * Se nulla corrisponde, `undefined`: il chatbot deve chiedere, non indovinare.
 */
export function matchService(text: string): CatalogEntry | undefined {
  const t = norm(text);
  let best: { e: CatalogEntry; len: number } | undefined;
  for (const e of SERVICE_CATALOG) {
    for (const k of e.keywords) {
      const kk = norm(k);
      if (t.includes(kk) && (!best || kk.length > best.len)) best = { e, len: kk.length };
    }
  }
  return best?.e;
}

/** Link al modulo con il servizio già scelto (stesso comportamento delle CTA delle landing). */
export const preventivoHref = (value: FunnelService) => `/preventivo/?servizio=${value}`;

/** Categorie per gruppo, nell'ordine del catalogo (home, menu, footer). */
export function byGroup(group: CatalogGroup) {
  return SERVICE_CATALOG.filter((e) => e.group === group);
}

/** Un servizio extra è «in preparazione» finché non viene attivato in config/specialist.ts. */
export const isInPreparation = (value: string) => value in SPECIALIST_STATUS && !isSpecialistActive(value);

export interface NavItem {
  id: string;
  path: string;
  cardTitle: string;
  funnelService: string;
  hint?: string;
}

export interface NavGroup {
  key: CatalogGroup;
  label: string;
  blurb: string;
  items: NavItem[];
}

/**
 * Menu «Servizi»: ogni landing nel suo gruppo, nell'ordine dei gruppi del catalogo.
 * Dati semplici (niente import nel componente client) per non appesantire il bundle.
 */
export function navGroups(pages: { id: string; path: string; cardTitle: string; funnelService: string }[]): NavGroup[] {
  const groupOf = (v: string) => SERVICE_CATALOG.find((e) => e.value === v)?.group;
  return (Object.keys(GROUP_LABELS) as CatalogGroup[])
    .map((key) => ({
      key,
      label: GROUP_LABELS[key],
      blurb: GROUP_BLURBS[key],
      items: pages
        .filter((p) => groupOf(p.funnelService) === key)
        .map(({ id, path, cardTitle, funnelService }) => ({ id, path, cardTitle, funnelService, hint: NAV_HINTS[funnelService as FunnelService] })),
    }))
    .filter((g) => g.items.length > 0);
}

/** Etichetta del gruppo di una categoria (menu, footer). */
export const groupLabelOf = (value: string) => {
  const g = SERVICE_CATALOG.find((e) => e.value === value)?.group;
  return g ? GROUP_LABELS[g] : undefined;
};
