import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseEnv } from "./env";

/**
 * Client server-side SENZA sessione, con chiave publishable.
 * Può solo chiamare le RPC di ingestione protette dal segreto server
 * (LEAD_INGEST_SECRET). Nessun accesso in lettura alle tabelle dei lead.
 */
let cached: SupabaseClient | null = null;

export function ingestClient(): SupabaseClient | null {
  const env = supabaseEnv();
  if (!env) return null;
  if (!cached) {
    cached = createClient(env.url, env.key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { headers: { "x-application-name": "web-edilizia-messina" } },
    });
  }
  return cached;
}

export function ingestSecret(): string | null {
  const s = process.env.LEAD_INGEST_SECRET?.trim();
  return s && s.length >= 32 ? s : null;
}
