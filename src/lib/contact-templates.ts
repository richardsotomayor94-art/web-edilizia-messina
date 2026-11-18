/**
 * Messaggi pronti per ricontattare il cliente (telefono, WhatsApp, email).
 *
 * Usati nell'email di avviso e nella scheda della richiesta in area riservata: il collaboratore
 * apre WhatsApp o l'email con un testo già scritto che riprende la richiesta, così non deve
 * ricopiare nulla. Nessun invio automatico al cliente: è sempre una persona a premere «invia».
 */
import { serviceLabel } from "@/config/services";
import { site } from "@/config/site";
import { describeDetails } from "@/config/specialist";
import { BUDGET_OPTIONS, PROPERTY_OPTIONS, SIZE_OPTIONS, TIMELINE_OPTIONS } from "./lead-options";

export interface ContactLead {
  name: string;
  phone: string;
  whatsapp?: string | null;
  email?: string | null;
  service: string;
  details?: Record<string, unknown> | null;
  city: string;
  zone?: string | null;
  property_type?: string | null;
  square_meters?: string | null;
  timeline?: string | null;
  budget_range?: string | null;
  description?: string | null;
  attachments?: number;
}

const label = (opts: readonly { value: string; label: string }[], v?: string | null) =>
  v ? (opts.find((o) => o.value === v)?.label ?? v) : undefined;

/** Valori che non aggiungono nulla al messaggio per il cliente. */
const isVague = (v?: string) => !v || /^(altro|non lo so|non so|unknown|-)$/i.test(v.trim());

export const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? name.trim();

/** Luogo leggibile: zona e comune senza ripetizioni. */
export function placeOf(l: Pick<ContactLead, "city" | "zone">): string {
  const city = l.city.trim();
  const zone = l.zone?.trim();
  return zone && zone.toLowerCase() !== city.toLowerCase() ? `${zone}, ${city}` : city;
}

/** Parole chiave della richiesta (per il promemoria della chiamata e il riassunto). */
export function contactKeywords(l: ContactLead): [string, string][] {
  const specialist = describeDetails(l.details ?? null);
  const rows: [string, string | undefined][] = [
    ["Lavoro", serviceLabel(l.service)],
    ...(specialist.length
      ? specialist
      : ([
          ["Immobile", label(PROPERTY_OPTIONS, l.property_type)],
          ["Metratura", label(SIZE_OPTIONS, l.square_meters)],
        ] as [string, string | undefined][])),
    ["Tempistica", label(TIMELINE_OPTIONS, l.timeline)],
    ["Budget", l.budget_range && l.budget_range !== "undisclosed" ? label(BUDGET_OPTIONS, l.budget_range) : undefined],
    ["Luogo", placeOf(l)],
    ["Foto", l.attachments ? String(l.attachments) : undefined],
  ];
  return rows.filter((r): r is [string, string] => !isVague(r[1]));
}

/** Dettaglio breve tra parentesi: immobile e metratura, oppure oggetto e materiale nei servizi specialistici. */
function shortDetail(l: ContactLead): string {
  const specialist = describeDetails(l.details ?? null)
    .slice(0, 2)
    .map(([, v]) => v)
    .filter((v) => !isVague(v));
  const parts = specialist.length
    ? specialist
    : [label(PROPERTY_OPTIONS, l.property_type), label(SIZE_OPTIONS, l.square_meters)].filter((v): v is string => !isVague(v));
  return parts.length ? ` (${parts.join(", ").toLowerCase()})` : "";
}

/** Riferimento breve alla descrizione del cliente, se c'è (una riga, max ~140 caratteri). */
function descriptionHint(l: ContactLead): string {
  const d = l.description?.replace(/\s+/g, " ").trim();
  if (!d) return "";
  const cut = d.length > 140 ? `${d.slice(0, 137).replace(/\s+\S*$/, "")}…` : d.replace(/[.!;,\s]+$/, "");
  return ` Ho letto la sua descrizione: «${cut}».`;
}

/** Messaggio WhatsApp pronto per il cliente. */
export function whatsappMessage(l: ContactLead): string {
  return (
    `Buongiorno ${firstName(l.name)}, la contatto da ${site.name} per la sua richiesta di ${serviceLabel(l.service).toLowerCase()} ` +
    `a ${placeOf(l)}${shortDetail(l)}.${descriptionHint(l)} ` +
    `Per capire meglio il lavoro e organizzare un sopralluogo con un'impresa specializzata, quando le è comodo sentirci?`
  );
}

/** Email pronta per il cliente (oggetto e testo). */
export function emailDraft(l: ContactLead): { subject: string; body: string } {
  const subject = `La sua richiesta per ${serviceLabel(l.service).toLowerCase()} a ${placeOf(l)} – ${site.name}`;
  const body = [
    `Buongiorno ${firstName(l.name)},`,
    "",
    `la contatto da ${site.name} per la richiesta che ci ha inviato: ${serviceLabel(l.service).toLowerCase()} a ${placeOf(l)}${shortDetail(l)}.${descriptionHint(l)}`,
    "",
    "Per capire meglio il lavoro e organizzare un sopralluogo con un'impresa specializzata della zona, mi può indicare un orario in cui sentirci al telefono?",
    "",
    "Cordiali saluti,",
    site.name,
  ].join("\n");
  return { subject, body };
}

/** Promemoria per la telefonata: le parole chiave in una riga. */
export function callNotes(l: ContactLead): string {
  return contactKeywords(l)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" · ");
}

/** Solo cifre con prefisso internazionale (formato richiesto da wa.me). */
export const waDigits = (phone: string) => phone.replace(/\D/g, "");

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(l: ContactLead): string {
  return `https://wa.me/${waDigits(l.whatsapp || l.phone)}?text=${encodeURIComponent(whatsappMessage(l))}`;
}

export function mailtoHref(l: ContactLead): string | undefined {
  if (!l.email) return undefined;
  const { subject, body } = emailDraft(l);
  return `mailto:${l.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
