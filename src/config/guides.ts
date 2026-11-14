export interface GuideMeta {
  path: string;
  title: string;
  excerpt: string;
  /** Prima pubblicazione: data del primo commit della pagina */
  published: string;
  updated: string; // ISO date
}

export const LOCAL_GUIDE_PATH = "/guide/lavori-casa-messina-verifiche-zona/";

export const guides: GuideMeta[] = [
  {
    path: LOCAL_GUIDE_PATH,
    title: "Lavori in casa a Messina: cosa controllare zona per zona",
    excerpt: "Zona sismica, Piano Borzì, vincoli a Ganzirri e Capo Peloro, PAI nella zona sud e come presentare le pratiche.",
    published: "2026-11-09",
    updated: "2026-11-09",
  },
  {
    path: "/guide/ristrutturare-casa-messina-da-dove-iniziare/",
    title: "Devo ristrutturare casa a Messina: da dove iniziare",
    excerpt: "Stato dell'immobile, budget, pratiche, preventivi e ordine dei lavori: il percorso prima di aprire il cantiere.",
    published: "2026-11-09",
    updated: "2026-11-09",
  },
  {
    path: "/guide/costo-rifacimento-bagno-messina/",
    title: "Quanto costa rifare un bagno a Messina: le voci che fanno il prezzo",
    excerpt: "Perché un bagno piccolo non costa in proporzione, cosa cambia tra finiture e rifacimento completo, come confrontare i preventivi.",
    published: "2026-11-09",
    updated: "2026-11-09",
  },
  {
    path: "/guide/come-scegliere-impresa-edile-messina/",
    title: "Come scegliere un'impresa edile a Messina: cosa verificare prima di firmare",
    excerpt: "Documenti, preventivo, contratto e segnali d'allarme: la lista di controllo prima di affidare i lavori.",
    published: "2026-11-09",
    updated: "2026-11-09",
  },
  {
    path: "/guide/costo-ristrutturazione-casa-messina/",
    title: "Quanto costa ristrutturare casa a Messina: le voci che fanno il prezzo",
    excerpt: "Perché i prezzi al metro quadro trovati online non bastano e come leggere un preventivo.",
    published: "2026-11-08",
    updated: "2026-11-09",
  },
  {
    path: "/guide/bonus-ristrutturazione-2026/",
    title: "Bonus ristrutturazione 2026: aliquote, limiti e novità 2027",
    excerpt: "Detrazioni per recupero edilizio, ecobonus e bonus mobili nel 2026, con le fonti ufficiali.",
    published: "2026-11-08",
    updated: "2026-11-09",
  },
  {
    path: "/guide/cila-quando-serve/",
    title: "CILA: quando serve per ristrutturare casa",
    excerpt: "Edilizia libera, CILA e SCIA spiegate semplici, con le particolarità della Sicilia.",
    published: "2026-11-08",
    updated: "2026-11-09",
  },
];
