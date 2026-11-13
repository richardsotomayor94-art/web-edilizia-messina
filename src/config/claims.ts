/**
 * Registro delle promesse commerciali del sito.
 * Ogni frase pubblicata deve rientrare tra le autorizzate; le "pendenti" si potranno usare solo
 * quando la condizione sarà vera. Le vietate sono controllate da tests/claims.test.ts.
 */
export interface Claim {
  text: string;
  basis: string;
}

/** Usabili oggi: il funzionamento del sito le sostiene. */
export const AUTHORIZED_CLAIMS: Claim[] = [
  { text: "Richiesta gratuita", basis: "Il modulo non prevede pagamenti né costi per chi invia la richiesta." },
  { text: "Senza impegno", basis: "L'utente non firma nulla con la piattaforma e sceglie se accettare un preventivo." },
  { text: "Fino a 3 professionisti", basis: "MAX_PARTNERS_PER_LEAD = 3, applicato in area admin e da un trigger del database (migrazione 20261113000001)." },
  { text: "Non eseguiamo direttamente i lavori", basis: "Modello di intermediazione: Organization, non LocalBusiness né impresa." },
  { text: "Verifichiamo la richiesta", basis: "Controllo di completezza manuale in area admin prima dell'inoltro. Condizione: staff attivo che legge le richieste." },
  { text: "Se in zona non ci sono professionisti disponibili, te lo diciamo", basis: "Processo manuale. Condizione: staff attivo e copertura per area (src/config/areas.ts)." },
  { text: "Immagini illustrative", basis: "IMAGE_NOTE in src/config/media.ts accanto alle fotografie generate." },
];

/** Da non usare finché la condizione non è vera. */
export const PENDING_CLAIMS: (Claim & { requires: string })[] = [
  { text: "Professionisti verificati / selezionati", basis: "", requires: "Partner attivi con verifiche documentali registrate nel database (visura, DURC, assicurazione)." },
  { text: "Zona servita / copertura confermata", basis: "", requires: "Area con coverageVerified=true e partner disponibili (coverage = confirmed)." },
  { text: "Tempo di risposta (es. entro 24 ore)", basis: "", requires: "Tempi reali misurati su richieste vere." },
  { text: "Numero di richieste, clienti o lavori", basis: "", requires: "Dati reali dimostrabili." },
  { text: "Installazione climatizzatori", basis: "", requires: "Partner con certificazione F-gas (Reg. UE 2024/573, DPR 146/2018 in aggiornamento)." },
];

/** Frasi vietate: promettono ciò che la piattaforma non controlla o non può dimostrare. */
export const FORBIDDEN_PATTERNS: RegExp[] = [
  /preventiv[oi] gratuit[oi]/i,
  /sopralluogo gratuito/i,
  /garantiamo|garantit[oa] (il|la|i|le)? ?(risultat|lavor|qualità)/i,
  /professionisti (certificati|verificati)|imprese (certificate|verificate)/i,
  /\bi migliori\b|\ble migliori\b/i,
  /(entro|in) 24 ?ore/i,
  /anni di esperienza/i,
  /clienti soddisfatti/i,
  /trova l'impresa giusta/i,
];
