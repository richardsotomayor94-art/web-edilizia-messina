export interface GuideMeta {
  path: string;
  title: string;
  excerpt: string;
  updated: string; // ISO date
}

export const LOCAL_GUIDE_PATH = "/guide/lavori-casa-messina-verifiche-zona/";

export const guides: GuideMeta[] = [
  {
    path: LOCAL_GUIDE_PATH,
    title: "Lavori in casa a Messina: cosa controllare zona per zona",
    excerpt: "Zona sismica, Piano Borzì, vincoli a Ganzirri e Capo Peloro, PAI nella zona sud e come presentare le pratiche.",
    updated: "2026-11-09",
  },
  {
    path: "/guide/costo-ristrutturazione-casa-messina/",
    title: "Quanto costa ristrutturare casa a Messina: le voci che fanno il prezzo",
    excerpt: "Perché i prezzi al metro quadro trovati online non bastano e come leggere un preventivo.",
    updated: "2026-11-09",
  },
  {
    path: "/guide/bonus-ristrutturazione-2026/",
    title: "Bonus ristrutturazione 2026: aliquote, limiti e novità 2027",
    excerpt: "Detrazioni per recupero edilizio, ecobonus e bonus mobili nel 2026, con le fonti ufficiali.",
    updated: "2026-11-09",
  },
  {
    path: "/guide/cila-quando-serve/",
    title: "CILA: quando serve per ristrutturare casa",
    excerpt: "Edilizia libera, CILA e SCIA spiegate semplici, con le particolarità della Sicilia.",
    updated: "2026-11-09",
  },
];
