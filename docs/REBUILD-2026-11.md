# Rebuild novembre 2026: stato e pendenze

> **Fase marca (2026-11-09):** identità visiva sostituita integralmente, vedi [BRAND.md](./BRAND.md) e [IMAGE-PLAN.md](./IMAGE-PLAN.md). Mercato e territorio in [LOCAL-SEO-EXPANSION.md](./LOCAL-SEO-EXPANSION.md), dati mancanti in [PRODUCTION-CONTACTS-PENDING.md](./PRODUCTION-CONTACTS-PENDING.md). Checkpoint prima del reset: tag locale `rebuild-checkpoint-before-brand-reset` su `e3d2ce0`. I numeri Lighthouse qui sotto si riferiscono alla versione precedente al reset.
>
> **Lighthouse dopo il reset (PC Windows locale, 3 esecuzioni per pagina):** mobile 75-94, accessibilità e best practices 100, CLS 0, LCP 0,8-1,0 s su modulo e guide e 2,4-3,2 s sulle pagine con fotografia principale; desktop 99-100. L'obiettivo mobile ≥ 95 e LCP ≤ 2,5 s **non è raggiunto in modo stabile**. Il tempo reale dell'LCP in home senza limitazioni è circa 420 ms; il costo restante è soprattutto l'esecuzione di React. Da rimisurare sulla preview Vercel con accesso autenticato.
>
> **Demo pubblica di revisione:** https://messinacasa360-demo.vercel.app, progetto Vercel separato `messinacasa360-demo`, senza variabili Supabase né segreti, con `NEXT_PUBLIC_DEMO_MODE=true`: i moduli non inviano né salvano nulla e l'area admin risponde 503. Noindex attivo. Non si aggiorna da sola a ogni push: va ridistribuita indicando il commit della branch. Online non significa lancio: niente dominio, Search Console o indicizzazione.
>
> **Pass landing e movimento (2026-11-09, demo su `07455c7`):** sistema di sezioni, fondi e movimento in [BRAND.md](./BRAND.md). Dalla rete: 6 larghezze, axe, SEO, movimento ridotto e menu senza problemi; LCP mobile ≤ 2,5 s, CLS 0, desktop 100. **Regressione da recuperare:** Lighthouse mobile delle landing da 92-94 a 83-85, TBT 500-650 ms. JS invariato (160 KB gzip). Auditoria SEO/GEO in [AUDITORIA-SEO-GEO-2026-11.md](./AUDITORIA-SEO-GEO-2026-11.md).
>
> **Sicurezza (audit in sola lettura):** RLS, storage, RPC, area admin, API, upload e segreti superati. Da decidere e autorizzare, perché richiedono migrazioni: cancellazione a 24 mesi (righe e file, oggi non attiva), TOTP obbligatorio per lo staff, tetto globale alle candidature partner. Da attivare in dashboard: leaked password protection. Consigliati prima del lancio: Turnstile su entrambi i moduli e `IP_HASH_SALT` obbligatorio.

Branch: `rebuild/master-2026-11` (su GitHub e in preview Vercel protetta, **non in produzione**). Punto di ripristino: tag locale `pre-rebuild-2026-11-09` su `3d586d8`.
Il sito resta `noindex` (meta + `X-Robots-Tag`). Nessun deploy eseguito, nessuna scrittura sul database.

## Cosa è cambiato

| Area | Prima | Ora |
|---|---|---|
| Primo schermo mobile | Hero a tutta altezza, selettore del lavoro sotto la piega | Selettore "pianta della casa" nel primo schermo (390×844: da 343 a 639 px) |
| Funnel | 8 passaggi, dati personali a metà, form contatti molto lungo | 7 passaggi: 4 scelte con un tocco, zona, dettagli facoltativi, contatti e consenso alla fine |
| Barra mobile | Sempre visibile, duplicava l'hero, fuori dai landmark | Compare fuori dall'hero, dentro un landmark |
| Foto | GPS conservato se il JPEG ricodificato non era più leggero; HEIC caricato con EXIF | Ogni immagine ricodificata; iOS converte in JPEG; HEIC non elaborabile rifiutato |
| JS `/preventivo/` | 227 KB gzip | 156 KB gzip (`supabase-js` caricato solo all'upload) |
| Landing | Title fino a 87 caratteri, CTA innaturali | Title ≤ 60, description ≤ 160, "In breve" (AEO), checklist del preventivo |
| Locale | Note generiche | Guida zona per zona con fonti; fatti verificati al 2026-11-09 |
| Dati mancanti | Segnaposto visibili ("DA INSERIRE") | Nascosti; elenco solo in admin tramite `pendingBusinessData()` |

## Verifiche sulla build di produzione locale (2026-11-09)

- `npm run check`: typecheck e lint ok, 37/37 test.
- Revisione indipendente del funnel: 4 difetti gravi e 6 minori, corretti nel codice salvo la schedulazione della cancellazione dati (vedi sotto). Doppio tocco, menu, bozza e limite del corpo verificati nel browser o sull'API locale.
- Crawl: 22 URL, 0 link rotti, 0 errori in console; title, description, H1, canonical, JSON-LD e noindex controllati su ogni URL.
- axe (WCAG 2.1 AA + best practice) su 8 pagine a 390 e 1280 px: 0 violazioni.
- Overflow orizzontale: nessuno a 320, 360, 390, 430, 768, 1024, 1280, 1440 px.
- Funnel E2E: 7 passaggi, errori con focus sul primo campo, payload corretto, bozza cancellata, pagina di conferma. L'invio finale è **simulato** con risposta intercettata.
- Senza segreto, l'API reale risponde 503 e l'utente vede un messaggio chiaro.

| Lighthouse | Perf | A11y | BP | SEO* | LCP | CLS |
|---|---|---|---|---|---|---|
| Mobile `/` | 93 | 100 | 100 | 66 | 1.0 s | 0 |
| Mobile servizio bagno | 97 | 100 | 100 | 66 | 0.8 s | 0 |
| Mobile `/preventivo/` | 98 | 100 | 100 | 66 | 0.8 s | 0 |
| Mobile guida locale | 97 | 100 | 100 | 66 | 0.8 s | 0 |
| Desktop (4 pagine) | 100 | 100 | 100 | 66 | 0.2–0.4 s | 0 |

\* L'unico audit SEO fallito è `is-crawlable`, cioè il `noindex` voluto. Valori di laboratorio su un PC Windows, con oscillazioni tra un'esecuzione e l'altra (`/preventivo/` è passato da 87 a 98): non confrontabili in assoluto con il baseline del 2026-11-08, misurato nell'ambiente cloud.

**Non verificato:** upload reale su Supabase con il nuovo codice (richiede il segreto), iPhone fisico, Turnstile, dati di campo CrUX/INP.

## Da fare, con responsabile

### Bloccano la ricezione di lead reali
1. **Segreti Vercel** (proprietario). `LEAD_INGEST_SECRET` e `IP_HASH_SALT` mancano: `/api/leads/` risponde 503. Procedura nel README, "Variabili segrete": generare i valori in locale, salvarli su Vercel, aggiornare l'hash in `private.app_config`, ridistribuire.
2. **Dati del titolare** (proprietario): ragione sociale, sede, email privacy e P.IVA. Da impostare come `NEXT_PUBLIC_LEGAL_*` e `NEXT_PUBLIC_PRIVACY_EMAIL`. Nuovo blocco di sicurezza: in produzione Vercel (`VERCEL_ENV=production`) le API rispondono 503 finché mancano titolare, sede o email privacy; preview e locale restano liberi per le prove. Per toglierlo: `intakeBlockedByLegalData()` in `src/config/site.ts`.
3. **Revisione legale** di privacy, termini e cookie. Punti da validare: base giuridica dell'inoltro ai partner, conservazione 24 mesi e verifica periodica del consenso marketing, ruolo dei partner come titolari autonomi, trasferimenti extra UE.
4. **Partner reali**. Con 0 partner il sito può solo raccogliere richieste. Le verifiche di `/come-selezioniamo-i-professionisti/` vanno applicate a ogni partner prima dell'attivazione. Il testo descrive al presente contratto con i partner, riscontri dei clienti e sospensioni: al lancio deve essere vero, altrimenti va cambiato.
5. **Conservazione dei dati** (sviluppo + proprietario). L'informativa promette la cancellazione a 24 mesi, ma `private.purge_expired_leads` non è schedulata e cancella solo le righe: le foto resterebbero nello storage. Prima del lancio: schedulare la funzione, estenderla ai file del bucket e confermare i termini con il legale. Richiede una migrazione sul database, non eseguita in questo rebuild.

### Prima dell'indicizzazione
6. Dominio definitivo e `NEXT_PUBLIC_SITE_URL`; solo allora `NEXT_PUBLIC_SITE_INDEXABLE=true`.
7. Piano Vercel: Hobby è per uso non commerciale (vedi STRATEGY.md, sezione O).
8. Telefono e WhatsApp, se si vogliono mostrare: compaiono da soli una volta configurati.
9. Foto reali di lavori, solo con consenso. Oggi il sito non ne usa volutamente.

### Sicurezza Supabase
- **Registrazione pubblica: già disattivata.** Letto il 2026-11-09 da `/auth/v1/settings`: `disable_signup=true`. L'handoff del 2026-11-09 su questo punto è superato.
- **Leaked password protection disattivata** (advisor Supabase): da attivare in Authentication, se disponibile nel piano in uso.
- Gli avvisi `SECURITY DEFINER` eseguibile da `anon` su `submit_lead`, `submit_partner_application` e `register_lead_attachments` sono noti: le funzioni rifiutano le chiamate senza segreto valido. Migliorabile in futuro revocando `EXECUTE` ad `anon` e usando un ruolo dedicato; richiede una migrazione e un test del flusso completo.

### Fatti da non pubblicare finché non verificati
Altezze e tipologie edilizie del Piano Borzì, regole operative nelle aree PAI, orari e perimetri delle ZTL, procedura e tariffe per il suolo pubblico, testo vigente del Regolamento Edilizio Comunale, associazione ufficiale tra quartieri e circoscrizioni. Il DDL Bilancio 2027 va ricontrollato dopo l'approvazione definitiva e la guida bonus aggiornata.
