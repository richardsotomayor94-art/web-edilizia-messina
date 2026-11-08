# Brand e dominio — analisi e verifica disponibilità

Data verifica: **2026-11-08**. Nessun dominio acquistato, nessun account creato presso registrar.

## Metodo di verifica

- **Fonte usata:** API registrar di Hostinger (`domains_availability_check`, operazione in sola lettura).
- **Tentativi falliti:** API registrar Vercel (403 dal connettore) e RDAP ufficiali (`rdap.verisign.com`, `rdap.nic.it`) bloccati dal proxy di rete della sessione.
- Lo stato è **"DISPONIBILE AL MOMENTO DEL CONTROLLO"**: può cambiare in qualsiasi momento. Ricontrollare prima dell'acquisto.
- `.it`: la registrazione richiede dati anagrafici di un soggetto UE (flag `it_legal_documents` restituito dal registrar).

## Tabella candidati

| BRAND | DOMINIO | EST. | DISPONIBILITÀ (2026-11-08) | SEO / LOCAL SEO | BRANDABILITY | MEMORABILITÀ | SCALABILITÀ | RISCHIO | RACCOMANDAZIONE |
|---|---|---|---|---|---|---|---|---|---|
| **MessinaCasa360** | messinacasa360.it | .it | ✅ Disponibile al controllo | Buona: "Messina" + "casa" chiari come entità locale | Alta | Alta (pattern "360" già usato dal proprietario) | Media: copre tutti i servizi casa; geografia legata a Messina | Basso | **RACCOMANDATO** |
| MessinaCasa360 | messinacasa360.com | .com | ✅ Disponibile al controllo | = | = | = | = | Basso | Registrare insieme al .it (difensivo) |
| EdilMessina360 | edilmessina360.it / .com | .it/.com | ✅ / ✅ | Buona su "edil" | Media | Media | Media: "Edil" sbilancia verso opere murarie, meno pittura/impianti | Basso-medio (molte "Edil…" a Messina: confondibilità) | Alternativa 1 |
| CasaLavori360 | casalavori360.it / .com | .it/.com | ✅ / ✅ | Neutra (nessun segnale locale) | Media | Media | **Alta**: replicabile in altre città | Basso | Alternativa 2 (se si punta a più città) |
| MessinaCasaPro | messinacasapro.it / .com | .it/.com | ✅ / ✅ | Buona | Media | Media | Media | **Medio**: "Pro" suggerisce di essere professionisti/impresa → tensione con il modello trasparente | Alternativa 3 |
| EdiliziaMessina | ediliziamessina.it / .com | .it/.com | ✅ / ✅ | Exact-match (beneficio SEO oggi marginale) | Bassa (generico) | Bassa | Bassa (troppo verticale) | Medio: keyword-stuffed, debole come entità, confondibile | Sconsigliato |
| RistrutturaMessina | ristrutturamessina.it / .com | .it/.com | ✅ / ✅ | Buona su ristrutturazioni | Media | Media | Bassa: rigidità semantica (lezione Termo Caldera Pro) | Medio | Sconsigliato |
| RistrutturazioniMessina | ristrutturazionimessina.it / .com | .it/.com | ❌ / ❌ già registrati | — | — | — | — | Alto | Scartato |
| Ristruttura360 | ristruttura360.it / .com | .it/.com | ❌ / ❌ già registrati | — | — | — | — | — | Scartato |
| CasaPro360 | casapro360.it / .com | .it/.com | ✅ / ❌ (.com registrato) | — | — | — | — | Medio (.com altrui) | Scartato |
| EdilMessina | edilmessina.it / .com | .it/.com | ✅ / ✅ | — | Bassa | Media | Bassa | Alto: nome molto comune tra ditte locali | Scartato |
| LavoriCasaMessina | lavoricasamessina.it / .com | .it/.com | ✅ / ✅ | Buona | Bassa (lungo) | Bassa | Media | Basso | Scartato (troppo lungo) |
| CantiereMessina | cantieremessina.it / .com | .it/.com | ✅ / ✅ | Media | Media | Media | Bassa | Medio: evoca impresa esecutrice | Scartato |

## Raccomandazione

1. **Dominio consigliato:** `messinacasa360.it` (+ `messinacasa360.com` difensivo, con redirect 301 al .it).
2. **Alternative:** `edilmessina360.it`, `casalavori360.it`, `messinacasapro.it`.
3. **Perché:** "Casa" copre ristrutturazioni, bagni, cucine, cartongesso, pittura, impianti, pavimenti, facciate e isolamento senza la rigidità di una sola categoria (problema vissuto con Termo Caldera Pro); "Messina" rafforza l'entità locale e il valore dell'asset per un acquirente/affittuario locale (modelli D/E); "360" comunica copertura completa ed è coerente con gli altri progetti del proprietario. Breve, senza trattini, pronunciabile.
4. **Estensione consigliata:** `.it` (pubblico italiano, fiducia locale); `.com` solo difensivo.
5. **Disponibilità rilevata:** entrambi disponibili al controllo del 2026-11-08 (Hostinger API).
6. **Rischi naming/marchio:** non è stata eseguita una ricerca di anteriorità sui marchi (UIBM / EUIPO TMview) né sul Registro Imprese: **da fare prima dell'acquisto**. "360" è un suffisso molto diffuso (bassa distintività, ma basso rischio di conflitto). Per espandersi in altre città conviene replicare l'asset (stesso codice, configurazione diversa) con brand-città, oppure valutare `CasaLavori360` come brand ombrello.

## Stato nel codice

Il brand è **solo configurazione** (`NEXT_PUBLIC_SITE_NAME`, default `MessinaCasa360` in `src/config/site.ts`). Cambiarlo non richiede modifiche al codice.
