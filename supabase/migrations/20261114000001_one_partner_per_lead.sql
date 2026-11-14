-- «Una sola impresa specializzata per richiesta» (scelta del proprietario, 2026-11-14).
-- Sostituisce il limite di 3 della migrazione 20261113000001. Le assegnazioni annullate non contano:
-- per cambiare impresa si annulla prima quella attuale.
-- Nessun dato da migrare: la base non contiene richieste reali con più di un'assegnazione attiva
-- (verificare con la query in fondo prima di applicare).
create or replace function private.enforce_max_partners_per_lead()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status is distinct from 'cancelled' and (
    select count(*) from public.lead_assignments a
     where a.lead_id = new.lead_id
       and a.status <> 'cancelled'
       and a.id <> new.id
  ) >= 1 then
    raise exception 'max_partners_per_lead' using errcode = 'P0001', hint = 'Una richiesta va a una sola impresa: annulla prima l''assegnazione attuale.';
  end if;
  return new;
end;
$$;

drop trigger if exists lead_assignments_max_three on public.lead_assignments;
drop trigger if exists lead_assignments_max_one on public.lead_assignments;
create trigger lead_assignments_max_one
  before insert or update of status, lead_id on public.lead_assignments
  for each row execute function private.enforce_max_partners_per_lead();

-- Controllo preliminare (deve restituire 0 righe):
-- select lead_id, count(*) from public.lead_assignments where status <> 'cancelled' group by lead_id having count(*) > 1;
