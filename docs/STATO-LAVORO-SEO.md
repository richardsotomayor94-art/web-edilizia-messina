# Stato lavoro SEO — 2026-11-19

## Completato (preparato e verificato, non pubblicato)
- Audit del repository e del sito: `AUDIT-SEO-2026-11-19.md`.
- Mappa servizio → keyword → intento → URL → azione: `MAPPA-SEO-SERVIZI.csv`.
- Correzione di `/contatti/` e di due description; test aggiunto (`REGISTRO-INTERVENTI-SEO.md`, R1-R2).
- Controlli: `vitest` 235/235, `eslint` 0 errori (5 avvisi preesistenti), `tsc` senza errori reali (solo tipi delle immagini non generati).

## Non eseguito, con motivo
- `next build`: Google Fonts risponde 403 dal proxy di questo ambiente. Lo farà l'anteprima Vercel.
- Controllo in Search Console e Bing: nessun accesso da qui.
- Pubblicazione, IndexNow, indicizzazione: richiedono l'approvazione della PR.

## Bloccato in attesa del titolare
1. Esportazione settimanale di Search Console (Pagine e Query) o accesso autorizzato.
2. Intervalli di costo dai partner e foto di lavori reali con consenso.
3. Schede dei professionisti per attivare i 9 servizi in preparazione.
4. Dati legali del titolare e recapiti, se la raccolta richieste in produzione è ancora bloccata (da verificare).

## Prossime tre priorità
1. Approvare la PR di bozza e lasciare che l'anteprima Vercel esegua la build.
2. Rapporto GSC a 15 giorni (circa 3-4 dicembre 2026).
3. Aggiornare la guida bonus appena la legge di Bilancio 2027 sia in Gazzetta Ufficiale.

## Automazione
Attività programmata settimanale (lunedì mattina, ora di Madrid): clona il repository, rilegge questo stato, rifà l'audit tecnico (build non possibile: usa test e lettura delle pagine pubbliche), controlla le fonti fiscali e normative, cerca novità sulla concorrenza, applica solo modifiche piccole, reversibili e documentate nel registro, e apre una pull request di bozza. **Non fa merge né deploy**: la decisione di pubblicare resta del titolare. Costo: nessuno aggiuntivo oltre al piano Claude esistente; non usa servizi a pagamento.

## Autorizzazione e regole del titolare (20/11/2026)

- Nessun prezzo, intervallo €/mq o tabella di costo sul sito; non è un dato da chiedere ai partner.
- Autorizzati: merge su `rebuild/master-2026-11` e deploy delle modifiche SEO utili e coerenti, e invio IndexNow dopo la pubblicazione. Restano esclusi DNS, segreti, database, autenticazione, modulo e servizi a pagamento.
- GSC, Bing e IndexNow erano già attivi (docs/LANZAMIENTO-2026-11.md); IndexNow: `node scripts/indexnow.mjs https://www.messinacasa360.it e251e6386007e2883fd65d5ad7cecfd5`.

## Osservato il 20/11/2026 (Search Console e Bing, con sessione del titolare)

- Search Console: la proprietà è di tipo prefisso URL `https://www.messinacasa360.it/` (non "dominio"). Sitemap `/sitemap.xml`: Riuscita, 24 pagine rilevate. Home: indicizzata. `/contatti/`: sconosciuta a Google, indicizzazione richiesta (coda prioritaria). Rapporto "Indicizzazione delle pagine": in elaborazione, da ricontrollare.
- Bing Webmaster: sitemap Success, 24 URL scoperte, 0 errori. Impressioni totali 184 (picco 156 il 10/11), 0 click.
- IndexNow: 24 URL inviate il 20/11/2026, tutte HTTP 200. Invio manuale su Search Console limitato a circa 10 URL al giorno.
- Da fare: leggere il rapporto di indicizzazione completo e richiedere l'indicizzazione solo delle pagine non ancora entrate.
