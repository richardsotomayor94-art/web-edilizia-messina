/**
 * «Altri servizi»: fonte unica di stato, termini provvisori e opzioni del modulo.
 *
 * Nove categorie oltre ai lavori in casa, tutte «in preparazione» finché i professionisti non
 * confermano specialità, tecnica, copertura e condizioni (vedi docs/SERVIZI-SPECIALISTICI.md):
 *  - in preparazione: landing visibile ma noindex, fuori da sitemap, llms.txt e catalogo JSON-LD,
 *    con un avviso chiaro, senza promettere disponibilità;
 *  - attivo: si cambia lo stato qui sotto e la pagina entra in sitemap e nei dati strutturati.
 *
 * Tre categorie (restauro, sabbiatura, microsabbiatura) hanno un percorso del modulo dedicato
 * (oggetto, materiale, intervento): sono le «linee» qui sotto. Le altre usano il percorso normale.
 */

export type SpecialistLine = "restauro" | "sabbiatura" | "microsabbiatura";
export type SpecialistStatus = "in_preparazione" | "attivo";

/** Le categorie aggiunte il 2026-11-16, valori del modulo = slug del database. */
export const NEW_CATEGORY_VALUES = [
  "sabbiatura",
  "microsabbiatura",
  "traslochi",
  "sgomberi-smaltimento",
  "giardinaggio",
  "restauro-tecnico",
  "restauro-conservativo",
  "risanamento-conservazione",
] as const;
export type NewCategory = (typeof NEW_CATEGORY_VALUES)[number];

/** Stato di ogni servizio extra (chiave = id della landing). Da cambiare in "attivo" solo con dati confermati. */
export const SPECIALIST_STATUS: Record<"restauro" | NewCategory, SpecialistStatus> = {
  restauro: "in_preparazione",
  sabbiatura: "in_preparazione",
  microsabbiatura: "in_preparazione",
  traslochi: "in_preparazione",
  "sgomberi-smaltimento": "in_preparazione",
  giardinaggio: "in_preparazione",
  "restauro-tecnico": "in_preparazione",
  "restauro-conservativo": "in_preparazione",
  "risanamento-conservazione": "in_preparazione",
};

/** Invito delle landing: lo stesso del resto del sito, il servizio arriva già scelto nel modulo. */
export const EVALUATION_CTA = "Richiedi un preventivo";

export const isSpecialistLine = (v: string): v is SpecialistLine => v === "restauro" || v === "sabbiatura" || v === "microsabbiatura";
export const isSpecialistActive = (id: string) => (SPECIALIST_STATUS as Record<string, SpecialistStatus>)[id] === "attivo";

/**
 * Termini della tecnica di pulizia a getto, ancora da confermare con il professionista.
 * Tutti i testi che nominano la tecnica leggono da qui: alla conferma si aggiorna un solo punto.
 */
export const BLASTING = {
  confirmed: false,
  /** Nome della categoria (deciso dal proprietario il 2026-11-16) */
  name: "Sabbiatura",
  short: "Sabbiatura",
  /** Nome esatto del procedimento, quando confermato (es. «microsabbiatura», «pulizia criogenica») */
  technique: null as string | null,
  /** Materiale proiettato (es. «sabbia», «vetro micronizzato», «ghiaccio secco») */
  medium: null as string | null,
  equipment: null as string | null,
  surfaces: [] as string[],
  exclusions: [] as string[],
  testPatch: null as boolean | null,
  /** Dove si lavora: sul posto, in laboratorio o entrambi */
  where: null as "sul_posto" | "laboratorio" | "entrambi" | null,
  coverage: null as string | null,
};

export const SPECIALIST_LINE_LABELS: Record<SpecialistLine, string> = {
  restauro: "Restauro, pulizia e recupero",
  sabbiatura: BLASTING.name,
  microsabbiatura: "Microsabbiatura",
};

/** Sottocategorie salvate nel database (public.services) e dichiarabili dalle imprese. */
export const SPECIALIST_SLUGS = [
  { slug: "restauro-funerario", line: "restauro", label: "Tombe, lapidi e monumenti funerari" },
  { slug: "restauro-pietra", line: "restauro", label: "Marmo e pietra" },
  { slug: "restauro-legno", line: "restauro", label: "Porte, mobili e legno" },
  { slug: "restauro-decorativo", line: "restauro", label: "Elementi decorativi e architettonici" },
  { slug: "restauro-valutazione", line: "restauro", label: "Restauro: valutazione generale" },
  { slug: "sabbiatura", line: "sabbiatura", label: BLASTING.name },
  { slug: "microsabbiatura", line: "microsabbiatura", label: "Microsabbiatura" },
] as const satisfies readonly { slug: string; line: SpecialistLine; label: string }[];

export type SpecialistSlug = (typeof SPECIALIST_SLUGS)[number]["slug"];
export const SPECIALIST_SLUG_LABELS: Record<SpecialistSlug, string> = Object.fromEntries(SPECIALIST_SLUGS.map((s) => [s.slug, s.label])) as Record<SpecialistSlug, string>;

type Opt = { value: string; label: string; hint?: string };

/** Che cosa va trattato: decide anche la sottocategoria della richiesta. */
export const OBJECT_OPTIONS: Record<SpecialistLine, (Opt & { slug: SpecialistSlug })[]> = {
  restauro: [
    { value: "tomba", label: "Tomba, lapide o monumento funerario", slug: "restauro-funerario" },
    { value: "pietra", label: "Marmo o pietra", hint: "Scale, soglie, piani, rivestimenti", slug: "restauro-pietra" },
    { value: "porta", label: "Porta o portone in legno", slug: "restauro-legno" },
    { value: "mobile", label: "Mobile, tavolo o arredo", slug: "restauro-legno" },
    { value: "decorativo", label: "Elemento decorativo o architettonico", hint: "Cornici, stucchi, ringhiere, colonne", slug: "restauro-decorativo" },
    { value: "altro", label: "Altro o non so", hint: "Lo valutiamo noi e cerchiamo chi se ne occupa", slug: "restauro-valutazione" },
  ],
  sabbiatura: [
    { value: "muratura", label: "Muratura, pietra o mattoni a vista", slug: "sabbiatura" },
    { value: "legno", label: "Travi, persiane o elementi in legno", slug: "sabbiatura" },
    { value: "metallo", label: "Ringhiere, cancelli o elementi in metallo", slug: "sabbiatura" },
    { value: "superficie", label: "Pavimento o superficie esterna", slug: "sabbiatura" },
    { value: "altro", label: "Altro o non so", slug: "sabbiatura" },
  ],
  // Microsabbiatura: superfici piccole o di pregio, dove serve un getto fine e controllato
  microsabbiatura: [
    { value: "pietra_decorata", label: "Cornici, portali o elementi in pietra", slug: "microsabbiatura" },
    { value: "superficie_pregio", label: "Superfici decorate o di pregio", slug: "microsabbiatura" },
    { value: "metallo", label: "Elementi in metallo", hint: "Ferro battuto, bronzo, ottone", slug: "microsabbiatura" },
    { value: "legno", label: "Elementi in legno", slug: "microsabbiatura" },
    { value: "altro", label: "Altro o non so", slug: "microsabbiatura" },
  ],
};

export const MATERIAL_OPTIONS: Record<SpecialistLine, Opt[]> = {
  restauro: [
    { value: "marmo", label: "Marmo" },
    { value: "pietra", label: "Altra pietra", hint: "Pietra lavica, arenaria, granito" },
    { value: "legno", label: "Legno" },
    { value: "metallo", label: "Metallo", hint: "Ferro, bronzo, ottone" },
    { value: "stucco", label: "Stucco, gesso o intonaco" },
    { value: "non_so", label: "Non lo so" },
  ],
  sabbiatura: [
    { value: "pietra", label: "Pietra o marmo" },
    { value: "mattone", label: "Mattone" },
    { value: "intonaco", label: "Intonaco o cemento" },
    { value: "legno", label: "Legno" },
    { value: "metallo", label: "Metallo" },
    { value: "non_so", label: "Non lo so" },
  ],
  microsabbiatura: [
    { value: "pietra", label: "Pietra o marmo" },
    { value: "stucco", label: "Stucco o intonaco decorato" },
    { value: "metallo", label: "Metallo" },
    { value: "legno", label: "Legno" },
    { value: "non_so", label: "Non lo so" },
  ],
};

/** Pulizia, manutenzione, riparazione e restauro sono lavori diversi: cambiano professionista e valutazione. */
export const INTERVENTION_OPTIONS: Record<SpecialistLine, Opt[]> = {
  restauro: [
    { value: "pulizia", label: "Pulizia", hint: "Sporco, terra, muschio, macchie" },
    { value: "manutenzione", label: "Manutenzione", hint: "Proteggere e mantenere in buono stato" },
    { value: "riparazione", label: "Riparazione", hint: "Parti rotte, staccate o mancanti" },
    { value: "restauro", label: "Restauro", hint: "Recuperare aspetto e finitura" },
    { value: "non_so", label: "Non lo so", hint: "Lo capiamo dalle foto" },
  ],
  sabbiatura: [
    { value: "pulizia", label: "Togliere sporco, smog o patine" },
    { value: "sverniciatura", label: "Togliere vernici o rivestimenti" },
    { value: "ruggine", label: "Togliere ruggine" },
    { value: "preparazione", label: "Preparare la superficie per un nuovo trattamento" },
    { value: "non_so", label: "Non lo so" },
  ],
  microsabbiatura: [
    { value: "pulizia", label: "Togliere patine, croste o sporco" },
    { value: "sverniciatura", label: "Togliere vecchie pitture" },
    { value: "ruggine", label: "Togliere ruggine o ossidi" },
    { value: "non_so", label: "Non lo so" },
  ],
};

export const ITEM_SIZE_OPTIONS: Record<SpecialistLine, Opt[]> = {
  restauro: [
    { value: "piccolo", label: "Piccolo", hint: "Si sposta a mano" },
    { value: "medio", label: "Medio", hint: "Un mobile, una porta, una lapide" },
    { value: "grande", label: "Grande", hint: "Una tomba intera, più elementi" },
    { value: "non_so", label: "Non lo so" },
  ],
  sabbiatura: [
    { value: "lt10", label: "Fino a 10 m²" },
    { value: "10_50", label: "10 – 50 m²" },
    { value: "gt50", label: "Oltre 50 m²" },
    { value: "non_so", label: "Non lo so" },
  ],
  microsabbiatura: [
    { value: "elemento", label: "Un singolo elemento", hint: "Una cornice, un portale, un cancello" },
    { value: "lt10", label: "Fino a 10 m²" },
    { value: "gt10", label: "Oltre 10 m²" },
    { value: "non_so", label: "Non lo so" },
  ],
};

export const MOVABLE_OPTIONS: Opt[] = [
  { value: "si", label: "Sì, si può spostare" },
  { value: "no", label: "No, va trattato sul posto" },
  { value: "non_so", label: "Non lo so" },
];

/** Solo per tombe e monumenti: servono a capire l'accesso, mai i nomi dei defunti. */
export const BURIAL_ACCESS_OPTIONS: Opt[] = [
  { value: "terra", label: "Tomba a terra o lapide" },
  { value: "cappella", label: "Cappella o edicola" },
  { value: "loculo", label: "Loculo in parete" },
  { value: "non_so", label: "Non lo so" },
];

const values = (o: readonly Opt[]) => o.map((x) => x.value) as [string, ...string[]];
export const specialistEnums = (line: SpecialistLine) => ({
  object: values(OBJECT_OPTIONS[line]),
  material: values(MATERIAL_OPTIONS[line]),
  intervention: values(INTERVENTION_OPTIONS[line]),
  size: values(ITEM_SIZE_OPTIONS[line]),
  movable: values(MOVABLE_OPTIONS),
  access: values(BURIAL_ACCESS_OPTIONS),
});

/** Sottocategoria del database a partire dalla linea e dall'oggetto scelto. */
export function specialistSlug(line: SpecialistLine, object: string): SpecialistSlug {
  return OBJECT_OPTIONS[line].find((o) => o.value === object)?.slug ?? (line === "restauro" ? "restauro-valutazione" : line);
}

export const isFunerary = (line: string, object: string) => line === "restauro" && object === "tomba";

const label = (o: readonly Opt[], v?: string) => o.find((x) => x.value === v)?.label;

/** Righe leggibili dei dettagli salvati (area admin e riepilogo del modulo). */
export function describeDetails(d: Record<string, unknown> | null | undefined): [string, string][] {
  if (!d || typeof d !== "object") return [];
  const line = d.line;
  if (typeof line !== "string" || !isSpecialistLine(line)) return [];
  const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : undefined);
  const rows: [string, string | undefined][] = [
    ["Linea", SPECIALIST_LINE_LABELS[line]],
    ["Oggetto", label(OBJECT_OPTIONS[line], s("object"))],
    ["Materiale", label(MATERIAL_OPTIONS[line], s("material"))],
    ["Intervento", label(INTERVENTION_OPTIONS[line], s("intervention"))],
    ["Dimensioni", label(ITEM_SIZE_OPTIONS[line], s("size"))],
    ["Si può spostare", label(MOVABLE_OPTIONS, s("movable"))],
    ["Cimitero", s("cemetery")],
    ["Sepoltura", label(BURIAL_ACCESS_OPTIONS, s("access"))],
  ];
  return rows.filter((r): r is [string, string] => !!r[1]);
}
