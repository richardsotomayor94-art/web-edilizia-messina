import { MAX_PARTNERS_PER_LEAD } from "@/config/site";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireStaff } from "@/lib/supabase/server";
import { serviceLabel } from "@/config/services";
import { describeDetails } from "@/config/specialist";
import { PROPERTY_OPTIONS, SIZE_OPTIONS, TIMELINE_OPTIONS, BUDGET_OPTIONS } from "@/lib/lead-options";
import { callNotes, emailDraft, mailtoHref, telHref, whatsappHref, whatsappMessage, type ContactLead } from "@/lib/contact-templates";
import { STATUS_LABELS, TIER_STYLE } from "../../labels";
import { updateLead, addNote, assignPartner, resendNotification } from "../../actions";

export const dynamic = "force-dynamic";

const lab = (opts: readonly { value: string; label: string }[], v?: string | null) => opts.find((o) => o.value === v)?.label ?? v ?? "-";

export default async function LeadDetail(props: PageProps<"/admin/leads/[id]">) {
  const { id } = await props.params;
  const limitReached = (await props.searchParams)?.errore === "limite";
  const { supabase, user, isStaff, isAdmin } = await requireStaff();
  if (!user) redirect("/admin/login/");
  if (!isStaff) return null;

  const { data: lead } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();
  if (!lead) notFound();

  const [{ data: notes }, { data: events }, { data: atts }, { data: assignments }, { data: suggested }] = await Promise.all([
    supabase.from("lead_notes").select("*").eq("lead_id", id).order("created_at"),
    supabase.from("lead_events").select("*").eq("lead_id", id).order("created_at"),
    supabase.from("lead_attachments").select("*").eq("lead_id", id),
    supabase.from("lead_assignments").select("*, partners(business_name)").eq("lead_id", id),
    supabase.rpc("suggest_partners", { p_lead_id: id }),
  ]);

  // URL firmati validi 10 minuti (bucket privato)
  const signed = await Promise.all(
    (atts ?? []).map(async (a) => {
      const { data } = await supabase.storage.from("lead-uploads").createSignedUrl(a.path, 600);
      return { ...a, url: data?.signedUrl };
    }),
  );

  const contact: ContactLead = {
    name: lead.name,
    phone: lead.phone,
    whatsapp: lead.whatsapp,
    email: lead.email,
    service: lead.service,
    details: lead.details,
    city: lead.city,
    zone: lead.zone,
    property_type: lead.property_type,
    square_meters: lead.square_meters,
    timeline: lead.timeline,
    budget_range: lead.budget_range,
    description: lead.description,
    attachments: signed.length,
  };
  const mailto = mailtoHref(contact);

  const rows: [string, string][] = [
    ["Servizio", serviceLabel(lead.service)],
    // Servizi specialistici: oggetto, materiale e intervento al posto di immobile e metratura
    ...(describeDetails(lead.details).length
      ? describeDetails(lead.details)
      : ([
          ["Immobile", lab(PROPERTY_OPTIONS, lead.property_type)],
          ["Metratura", lab(SIZE_OPTIONS, lead.square_meters)],
        ] as [string, string][])),
    ["Tempistica", lab(TIMELINE_OPTIONS, lead.timeline)],
    ["Budget", lab(BUDGET_OPTIONS, lead.budget_range)],
    ["Luogo", [lead.city, lead.zone, lead.postal_code].filter(Boolean).join(" · ")],
    ["Nome", lead.name],
    ["Telefono", lead.phone],
    ["WhatsApp", lead.whatsapp ?? "-"],
    ["Email", lead.email ?? "-"],
    ["Contatto preferito", lead.preferred_contact],
    ["Marketing", lead.consent_marketing ? "Sì" : "No"],
    ["Fonte", `${lead.source ?? "-"} · ${[lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / ") || "no utm"}`],
    ["Landing", lead.landing_page ?? "-"],
    ["Spam", `${lead.spam_score} ${lead.spam_reasons?.join(", ") ?? ""}`],
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <Link href="/admin/" className="text-sm text-sea underline">← Tutti i lead</Link>
        <h1 className="mt-2 text-3xl">
          {lead.name} <span className={`ml-2 rounded px-2 py-0.5 align-middle font-sans text-sm font-bold uppercase ${TIER_STYLE[lead.lead_tier ?? "cold"]}`}>{lead.lead_tier} {lead.lead_score}</span>
        </h1>
        <p className="text-sm text-muted">{new Date(lead.created_at).toLocaleString("it-IT")} · {STATUS_LABELS[lead.status]}</p>
        {lead.status === "new" && !lead.notified_at && (
          <div role="alert" className="mt-3 flex flex-wrap items-center gap-3 border-l-2 border-clay bg-sand p-3 text-sm">
            <span>Notifica non confermata{lead.notify_attempts ? ` dopo ${lead.notify_attempts} tentativi` : ""}: la richiesta è salvata, ma il canale di avviso non ha risposto.</span>
            {isAdmin && (
              <form action={resendNotification}>
                <input type="hidden" name="id" value={id} />
                <button className="underline">Reinvia notifica</button>
              </form>
            )}
          </div>
        )}
        <section aria-labelledby="contatta" className="mt-4 rounded-lg border border-stone bg-white p-4 text-sm">
          <h2 id="contatta" className="font-sans text-lg font-bold">Contatta il cliente</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={telHref(lead.phone)} className="btn btn-primary">Chiama {lead.name}</a>
            <a href={whatsappHref(contact)} target="_blank" rel="noopener noreferrer" className="btn btn-sea">Scrivi su WhatsApp</a>
            {mailto && <a href={mailto} className="btn btn-sea">Scrivi un&apos;email</a>}
          </div>
          <p className="mt-3 text-xs text-muted">I pulsanti aprono WhatsApp o l&apos;email con il messaggio già scritto: controllalo prima di inviare.</p>
          <p className="mt-3"><span className="font-semibold">Promemoria per la chiamata:</span> {callNotes(contact)}</p>
          <details className="mt-3">
            <summary className="cursor-pointer font-semibold">Vedi i messaggi pronti</summary>
            <p className="mt-2 font-semibold">WhatsApp</p>
            <p className="whitespace-pre-wrap rounded-md bg-sand p-3">{whatsappMessage(contact)}</p>
            {mailto && (
              <>
                <p className="mt-2 font-semibold">Email · {emailDraft(contact).subject}</p>
                <p className="whitespace-pre-wrap rounded-md bg-sand p-3">{emailDraft(contact).body}</p>
              </>
            )}
          </details>
        </section>

        <dl className="mt-4 grid gap-x-4 gap-y-1 rounded-lg border border-stone bg-white p-4 text-sm sm:grid-cols-[160px_1fr]">
          {rows.map(([k, v]) => (<div key={k} className="contents"><dt className="font-semibold">{k}</dt><dd className="break-words">{v}</dd></div>))}
        </dl>
        {lead.description && <div className="mt-4 rounded-lg border border-stone bg-white p-4 text-sm whitespace-pre-wrap">{lead.description}</div>}

        {signed.length > 0 && (
          <section className="mt-6">
            <h2 className="font-sans text-lg font-bold">Allegati</h2>
            <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {signed.map((a) => (
                <li key={a.id} className="rounded-lg border border-stone bg-white p-2 text-xs">
                  {a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-sea underline">{a.mime_type === "application/pdf" ? "PDF" : "Immagine"} ({Math.round(a.size_bytes / 1024)} KB)</a> : "Non disponibile"}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-6">
          <h2 className="font-sans text-lg font-bold">Note</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {(notes ?? []).map((n) => (<li key={n.id} className="rounded-md bg-white p-3 ring-1 ring-stone"><span className="text-xs text-muted">{new Date(n.created_at).toLocaleString("it-IT")}</span><p className="whitespace-pre-wrap">{n.body}</p></li>))}
          </ul>
          {isAdmin && (
            <form action={addNote} className="mt-3 flex gap-2">
              <input type="hidden" name="id" value={id} />
              <input name="body" required maxLength={4000} placeholder="Aggiungi nota" className="input" />
              <button className="btn btn-sea">Salva</button>
            </form>
          )}
        </section>

        <section className="mt-6">
          <h2 className="font-sans text-lg font-bold">Cronologia</h2>
          <ol className="mt-2 space-y-1 text-xs text-muted">
            {(events ?? []).map((e) => (<li key={e.id}>{new Date(e.created_at).toLocaleString("it-IT")} · {e.type}{e.to_status ? ` → ${e.to_status}` : ""}</li>))}
          </ol>
        </section>
      </div>

      <aside className="space-y-6">
        {isAdmin && (
          <form action={updateLead} className="space-y-3 rounded-lg border border-stone bg-white p-4 text-sm">
            <h2 className="font-sans text-lg font-bold">Stato</h2>
            <input type="hidden" name="id" value={id} />
            <select name="status" defaultValue={lead.status} className="input">
              {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <input name="lost_reason" defaultValue={lead.lost_reason ?? ""} placeholder="Motivo (se perso/non valido)" className="input" />
            <label className="block">Valore lavoro (€)<input name="job_value" inputMode="decimal" defaultValue={lead.job_value ?? ""} className="input mt-1" /></label>
            <label className="block">Ricavo piattaforma (€)<input name="revenue" inputMode="decimal" defaultValue={lead.revenue ?? ""} className="input mt-1" /></label>
            <button className="btn btn-sea w-full">Aggiorna</button>
          </form>
        )}

        <div className="rounded-lg border border-stone bg-white p-4 text-sm">
          <h2 className="font-sans text-lg font-bold">Assegnazioni</h2>
          <ul className="mt-2 space-y-1">
            {(assignments ?? []).map((a) => (<li key={a.id}>{(a.partners as { business_name?: string } | null)?.business_name ?? a.partner_id} · {a.status}{a.price_charged ? ` · €${a.price_charged}` : ""}</li>))}
            {!assignments?.length && <li className="text-muted">Nessuna.</li>}
          </ul>
          {limitReached && <p role="alert" className="mt-2 text-sm text-err">Limite raggiunto: una richiesta va a {MAX_PARTNERS_PER_LEAD === 1 ? "una sola impresa" : `al massimo ${MAX_PARTNERS_PER_LEAD} imprese`}. Per cambiarla, annulla prima l&apos;assegnazione attuale.</p>}
          {isAdmin && (assignments ?? []).filter((a) => a.status !== "cancelled").length < MAX_PARTNERS_PER_LEAD && (
            <form action={assignPartner} className="mt-3 space-y-2">
              <input type="hidden" name="id" value={id} />
              <select name="partner_id" required className="input">
                <option value="">Partner suggeriti…</option>
                {(suggested ?? []).map((p: { partner_id: string; business_name: string; match_area: boolean; leads_today: number }) => (
                  <option key={p.partner_id} value={p.partner_id}>{p.business_name}{p.match_area ? " ✓zona" : ""} · oggi {p.leads_today}</option>
                ))}
              </select>
              <input name="price_charged" inputMode="decimal" placeholder="Prezzo lead € (opzionale)" className="input" />
              <button className="btn btn-primary w-full">Assegna</button>
              <p className="text-xs text-muted">Prima di inoltrare dati reali a un partner verifica contratto e accordo privacy.</p>
            </form>
          )}
        </div>
      </aside>
    </div>
  );
}
