# Lead flow

```
UTENTE ─► landing SEO / guida / home
   │  (attribuzione first-touch in sessionStorage: UTM, gclid, landing, referrer senza query)
   ▼
/preventivo/  — wizard 8 passi (servizio può essere precompilato da ?servizio=)
   1 lavoro · 2 immobile · 3 metratura · 4 stato progetto · 5 budget (facoltativo, "Salta")
   6 comune / CAP / zona · 7 contatti + descrizione + foto · 8 riepilogo + consensi
   ▼
POST /api/leads/
   same-origin · limite payload 20 KB · validazione zod (telefono → E.164)
   honeypot + tempo minimo 6 s → scarto silenzioso dei bot
   Turnstile (solo se configurato) · spam score · lead score (HOT/WARM/COLD)
   ▼
rpc submit_lead (DB)
   segreto server · rate limit IP-hash 5/h · duplicati 72h → status duplicate
   spam ≥ 60 → invalid · token upload 30 min
   ▼
Upload foto (browser → bucket privato, compresse, EXIF rimossi)  → register_lead_attachments
   ▼
Notifica (solo status new): Telegram / webhook n8n-Make firmato HMAC
   ▼
ADMIN /admin/  — filtra, apre il lead, aggiorna stato, note, allegati firmati
   ▼
ROUTING  suggest_partners(lead): servizio ∩ zona → esclusive → capacità giornaliera
   ▼
ASSEGNAZIONE  lead_assignments (prezzo lead opzionale) → trigger: lead.status = assigned
   ▼
ESITO  contacted → appointment → quote_sent → won (job_value, revenue) | lost (motivo)
```

## Lead scoring (trasparente)
Solo caratteristiche del progetto e completezza (mai attributi personali/sensibili):

| Componente | Punti |
|---|---|
| Tempistica | urgente 30 · presto 25 · preventivi 18 · info 6 |
| Dimensione | >150 m² 20 · 100–150 18 · 50–100 15 · <50 10 · non so 6 |
| Servizio | ristrutturazione completa 20 · bagno/cucina 16 · impianti/facciata/isolamento 14 · pavimenti 13 · cartongesso/opere murarie 11 · pittura 10 · altro 6 |
| Zona nell'area di raccolta | 12 |
| Descrizione | ≥40 caratteri 8 · ≥10 caratteri 4 |
| Completezza | email 3 · CAP 2 · budget indicato 3 · foto 4 |

HOT ≥ 70 · WARM 45–69 · COLD < 45. Usato **solo** per priorità commerciale. Codice: `src/lib/scoring.ts` (test in `tests/scoring.test.ts`).

## Notifica (formato)
```
NUOVO LEAD (WARM · 62/100)
Servizio / Zona / Comune / Tipologia immobile / Metratura / Tempistica
Nome / Telefono / Descrizione / Allegati / Landing / UTM / ID
```
Configurazione: `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` (Bot API ufficiale) e/o `LEAD_WEBHOOK_URL` + `LEAD_WEBHOOK_SECRET`. Nessuna automazione WhatsApp non ufficiale.

## Partner portal (futuro)
Lo schema è pronto: `lead_assignments.status` (offered/accepted/rejected/expired), `responded_at`, `outcome`, `notes`. Servirà: tabella `partner_users` (auth.users ↔ partner), policy RLS "il partner vede solo le proprie assegnazioni e i campi minimi del lead", inbox, accetta/rifiuta, esiti.
