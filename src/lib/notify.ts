import "server-only";
import { createHmac } from "node:crypto";
import { serviceLabel } from "@/config/services";
import { site } from "@/config/site";
import { PROPERTY_OPTIONS, SIZE_OPTIONS, TIMELINE_OPTIONS } from "./lead-options";
import { callNotes, contactKeywords, emailDraft, mailtoHref, telHref, whatsappHref, whatsappMessage } from "./contact-templates";

export interface LeadNotification {
  id: string;
  /** Servizio salvato nel database, comprese le sottocategorie specialistiche */
  service: string;
  zone?: string;
  city: string;
  property_type: string;
  square_meters: string;
  timeline: string;
  budget_range?: string;
  name: string;
  phone: string;
  /** Recapiti facoltativi del cliente: servono per i pulsanti WhatsApp ed email */
  whatsapp?: string;
  email?: string;
  /** Dettagli dei servizi specialistici (oggetto, materiale…) */
  details?: Record<string, unknown> | null;
  description?: string;
  landing_page?: string;
  utm?: string;
  tier: string;
  score: number;
  attachments: number;
}

const label = <T extends { value: string; label: string }>(opts: readonly T[], v: string) =>
  opts.find((o) => o.value === v)?.label ?? v;

/** Messaggio nel formato concordato (solo i dati necessari al contatto). */
export function formatLeadMessage(l: LeadNotification): string {
  const lines = [
    `NUOVO LEAD (${l.tier.toUpperCase()} · ${l.score}/100)`,
    "",
    `Servizio: ${serviceLabel(l.service)}`,
    `Zona: ${l.zone ?? "-"}`,
    `Comune: ${l.city}`,
    `Tipologia immobile: ${label(PROPERTY_OPTIONS, l.property_type)}`,
    `Metratura: ${label(SIZE_OPTIONS, l.square_meters)}`,
    `Tempistica: ${label(TIMELINE_OPTIONS, l.timeline)}`,
    `Nome: ${l.name}`,
    `Telefono: ${l.phone}`,
    `Descrizione: ${l.description ? l.description.slice(0, 600) : "-"}`,
    `Allegati: ${l.attachments}`,
    `Landing: ${l.landing_page ?? "-"}`,
    `UTM: ${l.utm ?? "-"}`,
    "",
    `ID: ${l.id}`,
  ];
  return lines.join("\n");
}

/**
 * Messaggio Telegram SENZA dati personali (informativa 2026-11-15): Telegram non offre un contratto
 * da responsabile (art. 28) né garanzie per i trasferimenti, quindi riceve solo tipo di lavoro, zona e
 * il collegamento all'area riservata. Nome, telefono e descrizione si leggono solo dopo l'accesso.
 */
export function formatTelegramMessage(l: Pick<LeadNotification, "id" | "service" | "zone" | "city" | "tier" | "attachments">): string {
  return [
    `NUOVA RICHIESTA (${l.tier.toUpperCase()})`,
    `Lavoro: ${serviceLabel(l.service)}`,
    `Zona: ${l.zone ?? l.city}`,
    `Allegati: ${l.attachments}`,
    `Apri: ${site.url}/admin/leads/${l.id}/`,
  ].join("\n");
}

/** Oggetto dell'email interna: tipo di lavoro, zona e priorità, senza dati personali. */
export function formatEmailSubject(l: Pick<LeadNotification, "service" | "zone" | "city" | "tier">): string {
  return `Nuova richiesta: ${serviceLabel(l.service)} – ${l.zone ?? l.city} (${l.tier.toUpperCase()})`;
}

const adminUrl = (id: string) => `${site.url}/admin/leads/${id}/`;

/** Testo dell'email interna: contatti rapidi con i messaggi pronti, la richiesta completa e il link all'area riservata. */
export function formatEmailText(l: LeadNotification): string {
  const mail = mailtoHref(l);
  const contact = [
    "CONTATTA IL CLIENTE",
    `Chiama: ${telHref(l.phone)}`,
    `WhatsApp (messaggio già scritto): ${whatsappHref(l)}`,
    ...(mail ? [`Email (testo già scritto): ${mail}`] : []),
    "",
    `Promemoria per la chiamata: ${callNotes(l)}`,
    "",
    `Messaggio WhatsApp pronto:\n${whatsappMessage(l)}`,
  ];
  return `${contact.join("\n")}\n\n${formatLeadMessage(l)}\n\nApri nell'area riservata: ${adminUrl(l.id)}\n\n— ${site.name}, notifica automatica interna. Non inoltrare: contiene dati personali.`;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const button = (href: string, text: string, bg: string) =>
  `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 18px;border-radius:8px;background:${bg};color:#ffffff;font:600 15px/1.2 Arial,Helvetica,sans-serif;text-decoration:none">${esc(text)}</a>`;

/** Versione HTML: tre pulsanti (chiama, WhatsApp, email) con i messaggi pronti, poi i dati della richiesta. */
export function formatEmailHtml(l: LeadNotification): string {
  const mail = mailtoHref(l);
  const rows = [...contactKeywords(l), ["Nome", l.name], ["Telefono", l.phone], ...(l.whatsapp && l.whatsapp !== l.phone ? [["WhatsApp", l.whatsapp]] : []), ...(l.email ? [["Email", l.email]] : [])]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b6760;vertical-align:top">${esc(k)}</td><td style="padding:4px 0;color:#1c1b19">${esc(v)}</td></tr>`)
    .join("");
  const draft = emailDraft(l);
  return `<!doctype html><html lang="it"><body style="margin:0;padding:0;background:#f1ece2">
<div style="max-width:600px;margin:0 auto;padding:24px 16px;font:15px/1.5 Arial,Helvetica,sans-serif;color:#1c1b19">
<p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#b4532a">${esc(site.name)} · nuova richiesta (${esc(l.tier.toUpperCase())})</p>
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3">${esc(serviceLabel(l.service))} – ${esc(l.zone ?? l.city)}</h1>
<div style="margin:0 0 16px">
${button(telHref(l.phone), `Chiama ${l.name}`, "#1c1b19")}${button(whatsappHref(l), "Scrivi su WhatsApp", "#1f7a45")}${mail ? button(mail, "Scrivi un'email", "#b4532a") : ""}
</div>
<p style="margin:0 0 6px;font-weight:600">Messaggio WhatsApp già pronto (si apre col pulsante, puoi modificarlo prima di inviare):</p>
<p style="margin:0 0 16px;padding:12px;border-left:3px solid #1f7a45;background:#ffffff">${esc(whatsappMessage(l))}</p>
<table style="border-collapse:collapse;margin:0 0 16px">${rows}</table>
${l.description ? `<p style="margin:0 0 6px;font-weight:600">Descrizione del cliente</p><p style="margin:0 0 16px;padding:12px;background:#ffffff;white-space:pre-wrap">${esc(l.description.slice(0, 2000))}</p>` : ""}
${mail ? `<p style="margin:0 0 16px;font-size:13px;color:#6b6760">Oggetto dell'email pronta: ${esc(draft.subject)}</p>` : ""}
<p style="margin:0 0 16px"><a href="${esc(adminUrl(l.id))}" style="color:#1c1b19">Apri la richiesta nell'area riservata</a> per aggiornare lo stato e aggiungere note.</p>
<p style="margin:0;font-size:12px;color:#6b6760">Notifica automatica interna di ${esc(site.name)}. Non inoltrare: contiene dati personali.</p>
</div></body></html>`;
}

/** Mittente predefinito di Resend: funziona senza dominio verificato, ma solo verso l'email dell'account Resend. */
export const RESEND_DEFAULT_FROM = "onboarding@resend.dev";

/**
 * Invia la notifica sui canali configurati (tutti opzionali):
 *  - Email interna via Resend (RESEND_API_KEY + LEAD_NOTIFY_EMAIL, mittente LEAD_NOTIFY_FROM), con la richiesta completa
 *  - Telegram Bot API ufficiale (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID), senza dati personali
 *  - Webhook generico n8n/Make (LEAD_WEBHOOK_URL), firmato HMAC-SHA256. Invia la richiesta completa:
 *    attivarlo solo dopo aver indicato il fornitore nell'informativa privacy.
 *    con LEAD_WEBHOOK_SECRET nell'header x-signature.
 * Mai token nel client. Errori non bloccano il salvataggio del lead.
 */
export async function notifyNewLead(l: LeadNotification): Promise<string[]> {
  const sent: string[] = [];
  const text = formatLeadMessage(l);
  const tasks: Promise<void>[] = [];

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  if (resendKey && notifyTo.length) {
    const from = process.env.LEAD_NOTIFY_FROM?.trim() || `${site.name} <${RESEND_DEFAULT_FROM}>`;
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
        body: JSON.stringify({ from, to: notifyTo, subject: formatEmailSubject(l), html: formatEmailHtml(l), text: formatEmailText(l) }),
        signal: AbortSignal.timeout(8000),
      })
        .then((r) => {
          if (r.ok) sent.push("email");
          else console.error("email notify failed", r.status);
        })
        .catch(() => console.error("email notify failed")),
    );
  }

  const tgToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const tgChat = process.env.TELEGRAM_CHAT_ID?.trim();
  if (tgToken && tgChat) {
    tasks.push(
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text: formatTelegramMessage(l), disable_web_page_preview: true }),
        signal: AbortSignal.timeout(5000),
      })
        .then((r) => {
          if (r.ok) sent.push("telegram");
        })
        .catch(() => undefined),
    );
  }

  const hook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (hook) {
    const payload = JSON.stringify({ type: "lead.created", lead: l, text });
    const sig = createHmac("sha256", process.env.LEAD_WEBHOOK_SECRET ?? "").update(payload).digest("hex");
    tasks.push(
      fetch(hook, {
        method: "POST",
        headers: { "content-type": "application/json", "x-signature": sig },
        body: payload,
        signal: AbortSignal.timeout(5000),
      })
        .then((r) => {
          if (r.ok) sent.push("webhook");
        })
        .catch(() => undefined),
    );
  }

  await Promise.all(tasks);
  return sent;
}
