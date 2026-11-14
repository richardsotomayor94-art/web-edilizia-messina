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
  { text: "Una sola impresa specializzata per richiesta", basis: "Scelta del proprietario (2026-11-14). MAX_PARTNERS_PER_LEAD = 1 in area admin; nel database con la migrazione 20261114000001." },
  { text: "Non eseguiamo direttamente i lavori", basis: "Modello di intermediazione: Organization, non LocalBusiness né impresa." },
  { text: "Verifichiamo la richiesta", basis: "Controllo di completezza manuale in area admin prima dell'inoltro. Condizione: staff attivo che legge le richieste." },
  // Dichiarazioni operative del proprietario (2026-11-14): «è come lavoriamo»
  { text: "Solo imprese con partita IVA che rilasciano regolare fattura", basis: "Requisito di collaborazione dichiarato dal proprietario il 2026-11-14." },
  { text: "Imprese specializzate nel lavoro richiesto, con squadre e mezzi propri; niente tuttofare", basis: "Criterio di selezione dichiarato dal proprietario il 2026-11-14." },
  { text: "Per impianti e lavori strutturali, solo imprese abilitate per quell'intervento", basis: "Dichiarato dal proprietario il 2026-11-14 (DM 37/2008 per gli impianti)." },
  { text: "Parliamo con l'impresa e le spieghiamo la richiesta prima di passare il contatto", basis: "Processo manuale dichiarato dal proprietario il 2026-11-14." },
  { text: "Se non abbiamo un'impresa per quel settore, la cerchiamo noi; se non la troviamo, te lo diciamo", basis: "Collaboratore sul territorio, dichiarato dal proprietario il 2026-11-14." },
  { text: "I dati li ricevono solo il collaboratore sul territorio e l'impresa che prende in carico la richiesta", basis: "Chiarimento del proprietario del 2026-11-15; un'assegnazione per richiesta (MAX_PARTNERS_PER_LEAD = 1); informativa privacy 2026-11-15." },
  { text: "Nessun marketing, nessuna cessione, nessuna profilazione; dati cancellati entro 12 mesi", basis: "Chiarimento del proprietario del 2026-11-15. Nel database la scadenza resta 24 mesi finché non si applica la migrazione 20261115000001." },
  { text: "Partita IVA e fattura sono un requisito, non un controllo documentale nostro", basis: "Chiarimento del proprietario del 2026-11-15: i documenti li mostra l'impresa al cliente." },
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
  // Dal 2026-11-14 la richiesta va a una sola impresa: nessun testo deve promettere più contatti
  /fino a (3|tre) (professionist|impres|ditt|artigian)|(al |un )?massimo (di )?(3|tre) (professionist|impres|ditt|artigian)|\b(3|tre) professionisti\b/i,
];
