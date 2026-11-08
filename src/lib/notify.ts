import "server-only";
import { createHmac } from "node:crypto";
import { funnelServiceLabels, type FunnelService } from "@/config/services";
import { PROPERTY_OPTIONS, SIZE_OPTIONS, TIMELINE_OPTIONS } from "./lead-options";

export interface LeadNotification {
  id: string;
  service: FunnelService;
  zone?: string;
  city: string;
  property_type: string;
  square_meters: string;
  timeline: string;
  name: string;
  phone: string;
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
    `Servizio: ${funnelServiceLabels[l.service] ?? l.service}`,
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
 * Invia la notifica sui canali configurati (tutti opzionali):
 *  - Telegram Bot API ufficiale (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID)
 *  - Webhook generico n8n/Make (LEAD_WEBHOOK_URL), firmato HMAC-SHA256
 *    con LEAD_WEBHOOK_SECRET nell'header x-signature.
 * Mai token nel client. Errori non bloccano il salvataggio del lead.
 */
export async function notifyNewLead(l: LeadNotification): Promise<string[]> {
  const sent: string[] = [];
  const text = formatLeadMessage(l);
  const tasks: Promise<void>[] = [];

  const tgToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const tgChat = process.env.TELEGRAM_CHAT_ID?.trim();
  if (tgToken && tgChat) {
    tasks.push(
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text, disable_web_page_preview: true }),
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
