-- Impermeabilizzazioni come voce reale del catalogo servizi.
-- Solo aggiunta: non modifica righe esistenti e si può rieseguire senza effetti.
-- leads.service ha una foreign key su services(slug): senza questa riga il modulo fallirebbe.
-- DA APPLICARE soltanto prima di attivare le richieste reali.
insert into public.services (slug, name, has_landing, sort) values
  ('impermeabilizzazione', 'Impermeabilizzazioni', true, 105)
on conflict (slug) do nothing;

-- Cappotto termico ha ora una landing dedicata.
update public.services set has_landing = true, name = 'Cappotto e isolamento' where slug = 'isolamento';

-- Facciate ha una landing dal 2026-11-09
update public.services set has_landing = true where slug = 'facciata';
