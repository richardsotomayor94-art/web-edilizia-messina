# Dati da fornire prima della produzione

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

In produzione Vercel la raccolta dati resta bloccata finché mancano titolare, sede o email privacy (`intakeBlockedByLegalData`).
