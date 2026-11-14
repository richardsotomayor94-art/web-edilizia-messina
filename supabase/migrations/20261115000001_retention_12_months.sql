-- Conservazione a 12 mesi (informativa del 2026-11-15, chiarimento del proprietario).
-- DA APPLICARE SOLO CON APPROVAZIONE ESPLICITA.
-- Allinea la scadenza delle richieste nuove ed esistenti; non attiva la cancellazione automatica
-- (private.purge_expired_leads resta da schedulare ed estendere ai file del bucket).

alter table public.leads
  alter column retention_until set default ((now() + interval '12 months')::date);

update public.leads
   set retention_until = least(retention_until, (created_at + interval '12 months')::date)
 where retention_until > (created_at + interval '12 months')::date;
