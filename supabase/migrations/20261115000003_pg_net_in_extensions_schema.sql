-- pg_net non supporta SET SCHEMA: si reinstalla nello schema extensions (avviso extension_in_public).
-- Le funzioni restano in net.*, quindi il job purge-expired-leads non cambia.
drop extension if exists pg_net;
create extension pg_net with schema extensions;
