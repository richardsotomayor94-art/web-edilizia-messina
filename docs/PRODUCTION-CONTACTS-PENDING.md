# Dati da fornire prima della produzione

> Questi dati **non bloccano demo, sviluppo e SEO** e oggi non esistono: non vanno inventati. Servono solo alla fase di richieste reali e la struttura si definirà con un commercialista. Modello e fasi: [AUDITORIA-SEO-GEO-2026-11.md](./AUDITORIA-SEO-GEO-2026-11.md).

Fonte unica nel codice: `src/config/site.ts`, tramite variabili d'ambiente. Finché mancano non compaiono al pubblico; l'elenco è visibile solo nell'area admin.

- [ ] Dominio (`NEXT_PUBLIC_SITE_URL`)
- [ ] Telefono (`NEXT_PUBLIC_CONTACT_PHONE`)
- [ ] WhatsApp (`NEXT_PUBLIC_WHATSAPP_NUMBER`)
- [ ] Email (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] PEC (`NEXT_PUBLIC_LEGAL_PEC`)
- [ ] Soggetto giuridico (`NEXT_PUBLIC_LEGAL_OWNER_NAME`)
- [ ] Partita IVA (`NEXT_PUBLIC_LEGAL_VAT`)
- [ ] Sede legale, se necessaria (`NEXT_PUBLIC_LEGAL_ADDRESS`)
- [ ] Titolare del trattamento ed email privacy (`NEXT_PUBLIC_PRIVACY_EMAIL`)
- [ ] Partner reali, con le verifiche di `/come-selezioniamo-i-professionisti/`
- [ ] Copertura della provincia verificata (`coverageVerified` in `src/config/areas.ts`)

## PENDING BEFORE REAL LEAD ACTIVATION

- [x] **Impermeabilizzazioni: opzione propria nel modulo (codice).** La landing invia `impermeabilizzazione`, non più `Altro`.
- [ ] **Impermeabilizzazioni: riga nel catalogo del database.** La migrazione `20261109000001_add_impermeabilizzazione_service.sql` è scritta ma **non applicata**. Va applicata prima di attivare le richieste reali: `leads.service` ha una foreign key su `services(slug)`, senza quella riga l'inserimento fallisce.

In produzione Vercel la raccolta dati resta bloccata finché mancano titolare, sede o email privacy (`intakeBlockedByLegalData`).
