-- "Fino a 3 professionisti": la promessa pubblica diventa un vincolo del database.
-- Le assegnazioni annullate non contano. DA APPLICARE prima di attivare le richieste reali.
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
  ) >= 3 then
    raise exception 'max_partners_per_lead' using errcode = 'P0001', hint = 'Una richiesta può essere inoltrata al massimo a 3 professionisti.';
  end if;
  return new;
end;
$$;

drop trigger if exists lead_assignments_max_three on public.lead_assignments;
create trigger lead_assignments_max_three
  before insert or update of status, lead_id on public.lead_assignments
  for each row execute function private.enforce_max_partners_per_lead();
