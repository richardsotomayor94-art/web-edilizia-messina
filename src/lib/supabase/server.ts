import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

/** Client con sessione utente (admin). Tutto passa da RLS. */
export async function sessionClient() {
  const env = supabaseEnv();
  if (!env) throw new Error("Supabase non configurato");
  const cookieStore = await cookies();
  return createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {
          // chiamato da un Server Component: il refresh avviene nel proxy
        }
      },
    },
  });
}

export async function requireStaff() {
  const supabase = await sessionClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return { supabase, user: null, isAdmin: false, isStaff: false } as const;
  const { data: row } = await supabase.from("admin_users").select("role").eq("user_id", user.id).maybeSingle();
  return {
    supabase,
    user,
    isStaff: !!row,
    isAdmin: row?.role === "admin",
  } as const;
}
