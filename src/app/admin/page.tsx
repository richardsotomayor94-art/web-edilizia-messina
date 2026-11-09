import Link from "next/link";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/supabase/server";
import { funnelServiceLabels, type FunnelService } from "@/config/services";
import { pendingBusinessData } from "@/config/site";
import { STATUS_LABELS, TIER_STYLE } from "./labels";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  created_at: string;
  service: FunnelService;
  city: string;
  zone: string | null;
  name: string;
  status: string;
  lead_tier: string | null;
  lead_score: number | null;
  source: string | null;
  landing_page: string | null;
  attachments_count: number;
};

function daysAgoIso(days: number): string {
  return new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
}

export default async function AdminLeads(props: PageProps<"/admin">) {
  const { supabase, user, isStaff } = await requireStaff();
  if (!user) redirect("/admin/login/");
  if (!isStaff) return null;
  const sp = await props.searchParams;
  const status = typeof sp.status === "string" ? sp.status : "";
  const service = typeof sp.service === "string" ? sp.service : "";
  const tier = typeof sp.tier === "string" ? sp.tier : "";

  let q = supabase
    .from("leads")
    .select("id, created_at, service, city, zone, name, status, lead_tier, lead_score, source, landing_page, attachments_count")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status) q = q.eq("status", status);
  if (service) q = q.eq("service", service);
  if (tier) q = q.eq("lead_tier", tier);
  const { data: leads, error } = await q;

  // KPI ultimi 30 giorni (asset value)
  const since = daysAgoIso(30);
  const { data: daily } = await supabase.from("v_lead_daily").select("*").gte("day", since);
  const sum = (k: string) => (daily ?? []).reduce((a, r) => a + Number((r as Record<string, unknown>)[k] ?? 0), 0);
  const kpi = [
    ["Lead (30g)", sum("leads")],
    ["Validi", sum("valid_leads")],
    ["Qualificati", sum("qualified_leads")],
    ["Assegnati", sum("assigned_leads")],
    ["Vinti", sum("won_leads")],
    ["Ricavi €", sum("revenue").toFixed(0)],
  ] as const;

  return (
    <div>
      <h1 className="text-3xl">Lead</h1>
      {pendingBusinessData().length > 0 && (
        <p role="status" className="mt-3 rounded-md border border-stone bg-sand p-3 text-sm">
          <strong>Dati da completare prima del lancio:</strong> {pendingBusinessData().join(", ")}.
        </p>
      )}
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {kpi.map(([k, v]) => (
          <div key={k} className="rounded-lg border border-stone bg-white p-3">
            <dt className="text-xs text-muted">{k}</dt>
            <dd className="text-2xl font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <form className="mt-6 flex flex-wrap gap-2 text-sm" method="get">
        <select name="status" defaultValue={status} className="input !min-h-10 !w-auto">
          <option value="">Tutti gli stati</option>
          {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select name="service" defaultValue={service} className="input !min-h-10 !w-auto">
          <option value="">Tutti i servizi</option>
          {Object.entries(funnelServiceLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select name="tier" defaultValue={tier} className="input !min-h-10 !w-auto">
          <option value="">Tutte le priorità</option>
          <option value="hot">HOT</option><option value="warm">WARM</option><option value="cold">COLD</option>
        </select>
        <button className="btn btn-sea !min-h-10">Filtra</button>
        <a className="btn btn-secondary !min-h-10" href={`/admin/export/?status=${status}&service=${service}&tier=${tier}`}>CSV</a>
      </form>

      {error && <p className="mt-4 text-err">Errore: {error.message}</p>}
      <div className="mt-4 overflow-x-auto rounded-lg border border-stone bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-sand text-xs uppercase tracking-wide text-muted">
            <tr><th className="p-3">Data</th><th className="p-3">Priorità</th><th className="p-3">Servizio</th><th className="p-3">Luogo</th><th className="p-3">Nome</th><th className="p-3">Stato</th><th className="p-3">Fonte</th></tr>
          </thead>
          <tbody>
            {(leads as Row[] | null)?.map((l) => (
              <tr key={l.id} className="border-t border-stone hover:bg-paper">
                <td className="p-3 whitespace-nowrap"><Link className="text-sea underline" href={`/admin/leads/${l.id}/`}>{new Date(l.created_at).toLocaleString("it-IT", { dateStyle: "short", timeStyle: "short" })}</Link></td>
                <td className="p-3"><span className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${TIER_STYLE[l.lead_tier ?? "cold"]}`}>{l.lead_tier ?? "-"} {l.lead_score ?? ""}</span></td>
                <td className="p-3">{funnelServiceLabels[l.service] ?? l.service}{l.attachments_count > 0 ? ` · 📎${l.attachments_count}` : ""}</td>
                <td className="p-3">{l.city}{l.zone ? ` · ${l.zone}` : ""}</td>
                <td className="p-3">{l.name}</td>
                <td className="p-3">{STATUS_LABELS[l.status] ?? l.status}</td>
                <td className="p-3 text-muted">{l.source ?? "-"}</td>
              </tr>
            ))}
            {!leads?.length && <tr><td className="p-6 text-muted" colSpan={7}>Nessun lead.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
