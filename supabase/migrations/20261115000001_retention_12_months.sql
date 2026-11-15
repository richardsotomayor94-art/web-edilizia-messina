-- Conservazione a 12 mesi (informativa del 2026-11-15, chiarimento del proprietario).
-- Applicata il 2026-11-15 con approvazione del proprietario (0 richieste presenti).
-- Allinea la scadenza delle richieste nuove ed esistenti; non attiva la cancellazione automatica
-- (la cancellazione automatica arriva con la migrazione 20261115000002).

alter table public.leads
  alter column retention_until set default ((now() + interval '12 months')::date);

update public.leads
   set retention_until = least(retention_until, (created_at + interval '12 months')::date)
 where retention_until > (created_at + interval '12 months')::date;
