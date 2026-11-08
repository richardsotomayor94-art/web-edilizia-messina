import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/supabase/server";
import { createPartner, togglePartner } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminPartners() {
  const { supabase, user, isStaff, isAdmin } = await requireStaff();
  if (!user) redirect("/admin/login/");
  if (!isStaff) return null;
  const [{ data: partners }, { data: apps }] = await Promise.all([
    supabase.from("partners").select("*").order("created_at", { ascending: false }),
    supabase.from("partner_applications").select("*").order("created_at", { ascending: false }).limit(100),
  ]);
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl">Partner</h1>
        <div className="mt-4 overflow-x-auto rounded-lg border border-stone bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-sand text-xs uppercase text-muted"><tr><th className="p-3">Impresa</th><th className="p-3">Servizi</th><th className="p-3">Zone</th><th className="p-3">Modello</th><th className="p-3">Stato</th></tr></thead>
            <tbody>
              {(partners ?? []).map((p) => (
                <tr key={p.id} className="border-t border-stone">
                  <td className="p-3"><strong>{p.business_name}</strong><br /><span className="text-muted">{p.contact_name} {p.phone}</span></td>
                  <td className="p-3">{p.services?.join(", ")}</td>
                  <td className="p-3">{p.areas?.join(", ")}</td>
                  <td className="p-3">{p.billing_model ?? "-"} {p.lead_price ? `€${p.lead_price}/lead` : ""} {p.commission_rate ? `${(p.commission_rate * 100).toFixed(1)}%` : ""}</td>
                  <td className="p-3">
                    {isAdmin ? (
                      <form action={togglePartner}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="active" value={p.active ? "false" : "true"} />
                        <button className={`rounded px-2 py-1 text-xs font-bold ${p.active ? "bg-ok text-white" : "bg-stone"}`}>{p.active ? "Attivo" : "Inattivo"}</button>
                      </form>
                    ) : p.active ? "Attivo" : "Inattivo"}
                  </td>
                </tr>
              ))}
              {!partners?.length && <tr><td colSpan={5} className="p-6 text-muted">Nessun partner. Aggiungine uno dopo le verifiche documentali.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      {isAdmin && (
        <section>
          <h2 className="font-sans text-xl font-bold">Nuovo partner</h2>
          <p className="text-sm text-muted">Servizi (slug separati da virgola): ristrutturazione-completa, bagno, cucina, cartongesso, pittura, impianti, pavimenti, facciata, isolamento, opere-murarie. Zone: messina, messina-centro, ganzirri, torre-faro, giostra, tremestieri, galati, milazzo, barcellona-pozzo-di-gotto, taormina.</p>
          <form action={createPartner} className="mt-3 grid gap-3 rounded-lg border border-stone bg-white p-4 text-sm sm:grid-cols-2">
            <input name="business_name" required placeholder="Ragione sociale" className="input" />
            <input name="contact_name" placeholder="Referente" className="input" />
            <input name="phone" placeholder="Telefono" className="input" />
            <input name="email" placeholder="Email" className="input" />
            <input name="vat_number" placeholder="P.IVA" className="input" />
            <input name="max_leads_day" inputMode="numeric" placeholder="Max lead/giorno" className="input" />
            <input name="services" placeholder="Servizi (slug, virgola)" className="input sm:col-span-2" />
            <input name="areas" placeholder="Zone (slug, virgola)" className="input sm:col-span-2" />
            <select name="billing_model" className="input"><option value="none">Modello: nessuno</option><option value="per_lead">Costo per lead</option><option value="commission">Commissione</option><option value="exclusive_fee">Esclusiva zona</option><option value="asset_rent">Affitto asset</option></select>
            <input name="lead_price" inputMode="decimal" placeholder="Prezzo lead €" className="input" />
            <input name="commission_rate" inputMode="decimal" placeholder="Commissione (0.05 = 5%)" className="input" />
            <button className="btn btn-sea sm:col-span-2">Crea (inattivo)</button>
          </form>
        </section>
      )}

      <section>
        <h2 className="font-sans text-xl font-bold">Candidature dal sito</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {(apps ?? []).map((a) => (
            <li key={a.id} className="rounded-lg border border-stone bg-white p-3">
              <strong>{a.business_name}</strong> · {a.contact_name} · {a.phone} {a.email ? `· ${a.email}` : ""} · {a.services?.join(", ")} <span className="text-muted">({new Date(a.created_at).toLocaleDateString("it-IT")}, {a.status})</span>
              {a.areas_text && <p className="text-muted">Zone: {a.areas_text}</p>}
              {a.message && <p className="text-muted">{a.message}</p>}
            </li>
          ))}
          {!apps?.length && <li className="text-muted">Nessuna candidatura.</li>}
        </ul>
      </section>
    </div>
  );
}
