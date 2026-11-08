# Business baseline

Metrica principale: **lead qualificati + lavori generati + valore economico del lead** (non le visite).
Fonte dati: vista `v_lead_daily` + tabelle `leads` / `lead_assignments` (KPI 30 gg già nell'admin).

## Query utili
```sql
-- Lead per canale / servizio / città (30 giorni)
select source, service, city, sum(leads) leads, sum(valid_leads) validi, sum(qualified_leads) qualificati,
       sum(won_leads) vinti, sum(revenue) ricavi, sum(job_value) valore_lavori
from public.v_lead_daily where day >= current_date - 30 group by 1,2,3 order by leads desc;

-- Lead per landing
select landing_page, sum(leads) from public.v_lead_daily group by 1 order by 2 desc;

-- Ricavo medio per lead valido
select sum(revenue) / nullif(sum(valid_leads),0) as revenue_per_lead from public.v_lead_daily;
```

## Tabella mensile
| Mese | Lead | Validi | Qualificati | Assegnati | Vinti | Close rate | Ricavi | Ricavo/lead | Costo/lead | Valore lavori | Top canale | Top servizio | Top città |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11 | 0 | 0 | 0 | 0 | 0 | — | 0 € | — | — | 0 € | — | — | — |

Stato al 2026-11-08: nessun lead reale (sito in staging, nessun partner attivo).

## Asset value (obiettivo dimostrabile)
"Questo sito genera **X** lead qualificati/mese per ristrutturazioni a Messina, con close rate **Y%** e valore medio lavoro **Z €**."
Per renderlo credibile: compilare `job_value`/`revenue` a ogni esito, registrare il motivo dei persi, collegare Search Console e (se attivato) GA4 per conversion rate e costo per lead dei canali a pagamento.

## Dashboard futura
VISITS (GA4) · ORGANIC CLICKS / IMPRESSIONS (Search Console API) · LEADS / QUALIFIED / ASSIGNED / WON / REVENUE (Supabase) · CONVERSION RATE = lead / sessioni per landing · REVENUE PER LEAD · PARTNER ROI = valore lavori / costo lead per partner.
