"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setBusy(true);
        setError("");
        const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
        const { error } = await supabase.auth.signInWithPassword({ email: String(fd.get("email")), password: String(fd.get("password")) });
        setBusy(false);
        if (error) {
          setError("Credenziali non valide.");
          return;
        }
        router.push("/admin/");
        router.refresh();
      }}
    >
      <div>
        <label htmlFor="a-email" className="block text-sm font-semibold">Email</label>
        <input id="a-email" name="email" type="email" required autoComplete="username" className="input mt-1" />
      </div>
      <div>
        <label htmlFor="a-pass" className="block text-sm font-semibold">Password</label>
        <input id="a-pass" name="password" type="password" required autoComplete="current-password" className="input mt-1" />
      </div>
      {error && <p role="alert" className="text-sm text-err">{error}</p>}
      <button className="btn btn-sea w-full" disabled={busy}>{busy ? "Accesso…" : "Accedi"}</button>
    </form>
  );
}
