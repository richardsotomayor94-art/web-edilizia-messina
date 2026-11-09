# Sicurezza

## Modello
| Minaccia | Mitigazione |
|---|---|
| Lettura/scrittura diretta dei lead dal browser con la chiave pubblica | RLS su tutte le tabelle; nessuna policy per `anon`; `REVOKE` espliciti; verificato con test come ruolo anon |
| Inserimenti anonimi incontrollati via REST | Inserimento solo tramite RPC `SECURITY DEFINER` che richiedono `LEAD_INGEST_SECRET` (solo server; nel DB solo SHA-256) |
| Spam / bot | honeypot, tempo minimo 6 s, validazione telefono e pattern finti, spam score, rate limit DB per IP-hash (5/h lead, 3/h partner) + globale 300/h, duplicati 72h, Turnstile opzionale (gratuito) |
| CSRF sulle API pubbliche | controllo `Origin` = host |
| Payload abnormi | limite 20 KB, lunghezze massime zod + CHECK nel DB |
| File malevoli | bucket privato; MIME e dimensione limitati dal bucket; percorso vincolato a token monouso 30 min; max 5 file; nessun accesso pubblico; URL firmati 10 min solo staff; immagini ricodificate lato client (best effort). **Nessuna scansione antivirus nell'MVP**: aprire i PDF con cautela; valutare scansione (es. ClamAV/servizio esterno) prima di inoltrare file ai partner |
| Accesso admin | Supabase Auth + tabella `admin_users` + RLS; `proxy.ts` reindirizza al login; header `noindex` e `no-store` |
| XSS | React escaping; JSON-LD con escape di `<`; CSP; nessun HTML da utente renderizzato |
| Clickjacking / sniffing | `X-Frame-Options: DENY`, `frame-ancestors 'none'`, `nosniff`, HSTS, Referrer-Policy, Permissions-Policy |
| CSV injection nell'export | prefisso `'` per celle che iniziano con `= + - @` |
| PII in analytics | whitelist parametri + filtro regex email/telefono; GA4 solo con consenso |
| Segreti | solo env Vercel (`sensitive`); `.env*` in `.gitignore`; nessuna service-role key usata dall'app |
| IP | mai salvato in chiaro: hash SHA-256 salato (`IP_HASH_SALT`), troncato |

## Note
- CSP usa `'unsafe-inline'` per gli script (necessario per l'idratazione di Next senza nonce, che renderebbe dinamiche tutte le pagine). Migliorabile con nonce se in futuro si accetta il rendering dinamico.
- Registrazione pubblica in Supabase Auth: disattivata (verificato il 2026-11-09, `disable_signup=true`). Usare password forti / 2FA per gli admin.
- Advisor Supabase: i warning sulle 3 RPC eseguibili da anon sono intenzionali (vedi DATABASE.md).
- Progetto Supabase MyChef360 (separato): l'advisor segnala `public.spatial_ref_sys` senza RLS. Non toccato; decisione del proprietario.
