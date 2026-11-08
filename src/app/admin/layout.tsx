import Link from "next/link";
import type { Metadata } from "next";
import { requireStaff } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isStaff } = await requireStaff().catch(() => ({ user: null, isStaff: false }) as const);
  return (
    <div className="container-page py-6">
      {user && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone bg-white px-4 py-3 text-sm">
          <nav className="flex gap-4 font-semibold" aria-label="Admin">
            <Link href="/admin/">Lead</Link>
            <Link href="/admin/partners/">Partner</Link>
            <Link href="/admin/export/" prefetch={false}>Export CSV</Link>
          </nav>
          <form action={signOut} className="flex items-center gap-3">
            <span className="text-muted">{user.email}</span>
            <button className="underline">Esci</button>
          </form>
        </div>
      )}
      {user && !isStaff ? (
        <p role="alert" className="rounded-md border border-err/30 bg-white p-4 text-err">
          Utente autenticato ma non autorizzato. Un amministratore deve aggiungerlo alla tabella admin_users.
        </p>
      ) : (
        children
      )}
    </div>
  );
}
