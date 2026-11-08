# GDPR — flusso dei dati  [REVISIONE LEGALE RICHIESTA]

> Bozza tecnica. Ruoli, basi giuridiche e tempi di conservazione vanno validati da un legale/DPO. Fonti: LEGAL-RESEARCH-NOTES.md.

## Mappa
```
Utente ──(HTTPS)──► Vercel (hosting, funzioni)  ──► Supabase EU (Francoforte): DB + Storage
                          │                               ▲
                          ├──► Telegram / webhook (notifica interna, opzionale)
                          │
Admin (staff) ◄── RLS ────┘
   │
   └──► Partner (max 3) — titolare autonomo: contatto, sopralluogo, contratto
```

## Dati, finalità, basi, conservazione
| Dato | Finalità | Base giuridica (ipotesi) | Conservazione (proposta) |
|---|---|---|---|
| Richiesta (servizio, immobile, m², tempi, budget, luogo, descrizione, foto) | gestire e inoltrare la richiesta | art. 6.1.b misure precontrattuali su richiesta dell'interessato (alternativa: consenso 6.1.a) | 24 mesi (`retention_until`) |
| Contatti (nome, telefono, WhatsApp, email) | ricontatto da parte dei partner | come sopra | 24 mesi |
| Consenso privacy (timestamp, versione informativa) | prova | obbligo/legittimo interesse | per tutta la conservazione del lead |
| Consenso marketing (separato, non preselezionato) | comunicazioni proprie | consenso 6.1.a | fino a revoca |
| UTM, landing, referrer (senza query) | misurare i canali | legittimo interesse | come il lead |
| IP-hash | rate limit / anti-abuso | legittimo interesse | 48 h (rate_limits) + sul lead |
| User agent | anti-abuso | legittimo interesse | come il lead |

## Condivisione con i partner
- Dichiarata **prima** dell'invio (checkbox obbligatoria che descrive l'inoltro a max 3 partner per servizio e zona).
- Prima di inviare dati reali: **contratto con il partner** (uso solo per quella richiesta, divieto di cessione, sicurezza, cancellazione, informativa art. 14 al primo contatto). → *decision gate del proprietario*.
- Nessuna cessione a terzi per marketing (consenso separato non previsto).

## Diritti
Accesso, rettifica, cancellazione (eliminare il lead: cascata su eventi/note/allegati; rimuovere i file dal bucket), opposizione, revoca marketing, reclamo al Garante. Serve una **email privacy** reale (`NEXT_PUBLIC_PRIVACY_EMAIL`).

## Cookie
Solo strumenti tecnici (sessionStorage/localStorage di prima parte). GA4 assente di default; se configurato, caricato solo dopo consenso esplicito con "Rifiuta" equivalente. Banner mostrato solo se GA4 è configurato.

## Da fare
- [ ] Inserire dati del titolare e email privacy.
- [ ] Validazione legale informativa, termini, base giuridica, retention.
- [ ] Registro dei trattamenti (art. 30) e DPA con fornitori (Vercel, Supabase).
- [ ] Schedulare `private.purge_expired_leads()` (pg_cron) + pulizia file storage dei lead cancellati.
- [ ] Verificare inquadramento dell'attività (L. 39/1989 "servizi vari"?) con Camera di Commercio/commercialista.
