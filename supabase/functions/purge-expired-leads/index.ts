// Cancellazione automatica delle richieste scadute (12 mesi) e dei loro file.
// Chiamata ogni giorno da pg_cron (migrazione 20261115000002). Non registra dati personali:
// risponde e scrive nel log solo numeri e codici d'errore.
import { createClient } from "npm:@supabase/supabase-js@2.49.4";

const BUCKET = "lead-uploads";
const BATCH = 100;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  // Il segreto lo verifica il database (Vault); qui si scarta solo ciò che è chiaramente sbagliato
  const secret = req.headers.get("x-purge-secret") ?? "";
  if (secret.length < 32) return json({ ok: false, error: "unauthorized" }, 401);

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return json({ ok: false, error: "config_missing" }, 500);
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  const begin = await db.rpc("purge_begin", { p_secret: secret });
  if (begin.error) {
    const denied = begin.error.code === "42501";
    return json({ ok: false, error: denied ? "unauthorized" : "begin_failed" }, denied ? 401 : 500);
  }
  if (begin.data?.skipped) return json({ ok: true, skipped: true });

  const files: string[] = begin.data?.files ?? [];
  let deleted = 0;
  let errorCode: string | null = null;
  for (let i = 0; i < files.length; i += BATCH) {
    const { data, error } = await db.storage.from(BUCKET).remove(files.slice(i, i + BATCH));
    if (error) {
      errorCode = "storage_remove_failed";
      break;
    }
    deleted += data?.length ?? 0;
  }

  const finish = await db.rpc("purge_finish", {
    p_secret: secret,
    p_run_id: begin.data.run_id,
    p_files_deleted: deleted,
    p_error: errorCode,
  });
  if (finish.error) return json({ ok: false, error: "finish_failed" }, 500);
  return json(finish.data);
});
