-- Correzioni suggerite dagli advisor di Supabase (2026-11-13). Solo aggiunte, nessun dato modificato.

-- Indici sulle chiavi esterne (join e cancellazioni più rapide)
create index if not exists leads_area_slug_idx on public.leads (area_slug);
create index if not exists leads_duplicate_of_idx on public.leads (duplicate_of);
create index if not exists service_areas_parent_slug_idx on public.service_areas (parent_slug);

-- La policy valuta auth.uid() una volta per query invece che per ogni riga (stesso comportamento)
drop policy if exists admin_users_self on public.admin_users;
create policy admin_users_self on public.admin_users for select to authenticated using (user_id = (select auth.uid()));
