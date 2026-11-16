-- Altri servizi (2026-11-16): sette categorie nuove nel catalogo (sabbiatura esiste già dalla 20261115000004).
-- Solo righe nuove in public.services: nessuna colonna, vincolo o funzione cambia. Il valore del modulo
-- coincide con lo slug, quindi submit_lead, suggest_partners, filtri admin ed export funzionano già.
-- DA APPLICARE SOLO CON AUTORIZZAZIONE DEL PROPRIETARIO.
-- Per tornare indietro (solo se nessuna richiesta le usa): delete from public.services where slug in (...).

insert into public.services (slug, name, has_landing, sort) values
  ('microsabbiatura', 'Microsabbiatura', true, 310),
  ('restauro-tecnico', 'Restauro tecnico', true, 400),
  ('restauro-conservativo', 'Restauro conservativo', true, 410),
  ('risanamento-conservazione', 'Risanamento e conservazione', true, 420),
  ('traslochi', 'Traslochi', true, 500),
  ('sgomberi-smaltimento', 'Sgomberi e smaltimento', true, 510),
  ('giardinaggio', 'Giardinaggio', true, 520)
on conflict (slug) do nothing;
