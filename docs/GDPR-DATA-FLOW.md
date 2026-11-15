# GDPR — flusso dei dati  [REVISIONE LEGALE RICHIESTA]

> Bozza tecnica. Ruoli, basi giuridiche e tempi di conservazione vanno validati da un legale/DPO. Fonti: LEGAL-RESEARCH-NOTES.md.

## Mappa
```
Utente ──(HTTPS)──► Vercel (hosting, funzioni)  ──► Supabase EU (Francoforte): DB + Storage
                          │                               ▲
                          ├──► Telegram (solo lavoro, zona, link admin: nessun dato personale) / webhook (opzionale, richiesta completa: indicare il fornitore nell'informativa prima di attivarlo)
                          │
Collaboratore sul territorio (staff) ◄── RLS ────┘   ricontatta il cliente, sceglie l'impresa
   │
   └──► Impresa (una sola) — titolare autonoma: sopralluogo, preventivo, contratto
```

## Dati, finalità, basi, conservazione
| Dato | Finalità | Base giuridica (ipotesi) | Conservazione (proposta) |
|---|---|---|---|
| Richiesta (servizio, immobile, m², tempi, budget, luogo, descrizione, foto) | gestire e inoltrare la richiesta | art. 6.1.b misure precontrattuali su richiesta dell'interessato (alternativa: consenso 6.1.a) | fino alla chiusura, max 12 mesi (informativa 2026-11-15; `retention_until` a 12 mesi, migrazione 20261115000001 applicata il 2026-11-15) |
| Contatti (nome, telefono, WhatsApp, email) | ricontatto da parte del collaboratore e dell'impresa | come sopra | max 12 mesi |
| Consenso privacy (timestamp, versione informativa) | prova | obbligo/legittimo interesse | per tutta la conservazione del lead |
| Consenso marketing | **rimosso** dal modulo il 2026-11-15 (nessun marketing, scelta del proprietario); colonna sempre false | — | — |
| UTM, landing, referrer (senza query) | misurare i canali | legittimo interesse | come il lead |
| IP-hash | rate limit / anti-abuso | legittimo interesse | 48 h (rate_limits) + sul lead |
| User agent | anti-abuso | legittimo interesse | come il lead |

## Condivisione con i partner
- Dichiarata **prima** dell'invio (checkbox obbligatoria che descrive la gestione da parte del collaboratore e l'inoltro a una sola impresa per servizio e zona).
- Prima di inviare dati reali: **contratto con il partner** (uso solo per quella richiesta, divieto di cessione, sicurezza, cancellazione, informativa art. 14 al primo contatto). → *decision gate del proprietario*.
- Nessuna cessione a terzi per marketing (consenso separato non previsto).

## Collaboratore sul territorio (2026-11-15)
- Riceve e gestisce le richieste, ricontatta il cliente e passa la richiesta a un'impresa dei suoi contatti.
- Con il proprietario come titolare serve un **atto scritto**: nomina a responsabile (art. 28) se è un soggetto esterno, oppure autorizzazione con istruzioni (art. 29 GDPR, art. 2-quaterdecies Codice privacy) se agisce sotto l'autorità del titolare. Se invece decide lui finalità e mezzi, il titolare (o contitolare, art. 26) è lui e l'informativa va cambiata. → **A carico del titolare, fuori repo** (2026-11-15): nomina scritta come persona autorizzata, firmata da titolare e collaboratore, non pubblicata.

## Diritti
Accesso, rettifica, cancellazione (eliminare il lead: cascata su eventi/note/allegati; rimuovere i file dal bucket), opposizione, revoca marketing, reclamo al Garante. Serve una **email privacy** reale (`NEXT_PUBLIC_PRIVACY_EMAIL`).

## Cookie
Solo strumenti tecnici (sessionStorage/localStorage di prima parte). GA4 assente di default; se configurato, caricato solo dopo consenso esplicito con "Rifiuta" equivalente. Banner mostrato solo se GA4 è configurato.

## Revisione dell'informativa (2026-11-15, bozza-2)
- Base giuridica unica: servizio di contatto richiesto (art. 6.1.b); la casella del modulo conferma la richiesta, non è un consenso.
- Collaboratore indicato come persona autorizzata con istruzioni scritte; Cloudflare Turnstile tra i fornitori; cookie GA4 (_ga, _ga_*) con durata.
- Telegram senza dati personali: Telegram non offre un contratto art. 28 né garanzie per i trasferimenti.

## Da fare
- [ ] Inserire dati del titolare e email privacy.
- [ ] Validazione legale informativa, termini, base giuridica, retention.
- [ ] Registro dei trattamenti (art. 30) e DPA con fornitori (Vercel, Supabase).
- [x] Cancellazione automatica a 12 mesi, foto e file orfani compresi (job `purge-expired-leads`, 2026-11-15).
- [ ] Verificare inquadramento dell'attività (L. 39/1989 "servizi vari"?) con Camera di Commercio/commercialista.
