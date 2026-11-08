export interface GuideMeta {
  path: string;
  title: string;
  excerpt: string;
  updated: string; // ISO date
}

export const guides: GuideMeta[] = [
  {
    path: "/guide/costo-ristrutturazione-casa-messina/",
    title: "Quanto costa ristrutturare casa a Messina: le voci che fanno il prezzo",
    excerpt: "Perché i prezzi al metro quadro trovati online non bastano e come leggere un preventivo.",
    updated: "2026-11-08",
  },
  {
    path: "/guide/bonus-ristrutturazione-2026/",
    title: "Bonus ristrutturazione 2026: aliquote e limiti",
    excerpt: "Detrazioni per recupero edilizio, ecobonus e bonus mobili nel 2026, con le fonti ufficiali.",
    updated: "2026-11-08",
  },
  {
    path: "/guide/cila-quando-serve/",
    title: "CILA: quando serve per ristrutturare casa",
    excerpt: "Edilizia libera, CILA e SCIA spiegate semplici, con le particolarità della Sicilia.",
    updated: "2026-11-08",
  },
];
