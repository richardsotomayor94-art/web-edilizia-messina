/**
 * Configurazione centrale del sito.
 *
 * TUTTO ciò che dipende da brand, dominio o contatti passa da qui.
 * Per migrare da *.vercel.app al dominio definitivo basta cambiare le
 * variabili d'ambiente (vedi DEPLOYMENT.md), senza toccare il codice.
 */

import { DEMO_CONTACT, isPlaceholder } from "@/lib/launch-rules";

function clean(v: string | undefined): string | undefined {
  const t = v?.trim();
  return t ? t : undefined;
}

function resolveSiteUrl(): string {
  const explicit = clean(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercelProd = clean(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProd) return `https://${vercelProd}`;
  const vercel = clean(process.env.VERCEL_URL);
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

const siteUrl = resolveSiteUrl();

/**
 * Promessa pubblica: ogni richiesta va a UNA sola impresa specializzata (scelta del proprietario,
 * 2026-11-14). Applicata anche dall'area admin e dal database.
 */
export const MAX_PARTNERS_PER_LEAD = 1;

/** Invito principale: un solo testo in tutto il sito. */
export const CTA_LABEL = "Richiedi un preventivo";

const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
/**
 * In demo, per rivedere il design, i recapiti mancanti sono sostituiti da valori sintetici non chiamabili.
 * Solo su richiesta esplicita: NEXT_PUBLIC_DEMO_CONTACTS=true. Fuori dalla demo non succede mai.
 */
const demoContacts = demoMode && process.env.NEXT_PUBLIC_DEMO_CONTACTS === "true";

const realPhone = clean(process.env.NEXT_PUBLIC_CONTACT_PHONE);
/** Numero WhatsApp: solo cifre con prefisso internazionale, es. 393331234567 */
const realWhatsapp = clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, "");
const realEmail = clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const phone = realPhone ?? (demoContacts ? DEMO_CONTACT.phone : undefined);
const whatsapp = realWhatsapp ?? (demoContacts ? DEMO_CONTACT.whatsapp : undefined);
const email = realEmail ?? (demoContacts ? DEMO_CONTACT.email : undefined);

export const site = {
  name: clean(process.env.NEXT_PUBLIC_SITE_NAME) ?? "MessinaCasa360",
  url: siteUrl,
  domain: new URL(siteUrl).host,
  locale: "it_IT",
  language: "it",
  /** Area di raccolta richieste. NON equivale a copertura verificata dei partner. */
  serviceArea: clean(process.env.NEXT_PUBLIC_SERVICE_AREA) ?? "Messina e provincia",
  city: "Messina",
  region: "Sicilia",
  country: "IT",
  tagline: "Lavori in casa a Messina: una sola richiesta, un'impresa specializzata nel tuo lavoro.",
  description:
    "Servizio di contatto gratuito per ristrutturazioni, bagni, cucine, cartongesso, pittura, impianti, pavimenti, facciate e impermeabilizzazioni a Messina: ci racconti il lavoro e ti mettiamo in comunicazione con un'impresa specializzata, con partita IVA e fattura.",
  contact: {
    phone,
    whatsapp,
    email,
    privacyEmail: clean(process.env.NEXT_PUBLIC_PRIVACY_EMAIL) ?? realEmail,
    /** true se anche un solo recapito è sintetico o di prova: niente link reali, niente dati strutturati */
    demo: [phone, whatsapp, email].some((v) => v && (isPlaceholder(v) || Object.values(DEMO_CONTACT).includes(v as never))),
  },
  /** Dati del titolare: da NON pubblicare finché il proprietario non li fornisce. */
  legal: {
    ownerName: clean(process.env.NEXT_PUBLIC_LEGAL_OWNER_NAME),
    vatNumber: clean(process.env.NEXT_PUBLIC_LEGAL_VAT),
    address: clean(process.env.NEXT_PUBLIC_LEGAL_ADDRESS),
    pec: clean(process.env.NEXT_PUBLIC_LEGAL_PEC),
  },
  /**
   * Indicizzazione: TRUE solo sul dominio definitivo in produzione.
   * Su *.vercel.app e sui preview resta FALSE => noindex ovunque.
   */
  indexable:
    process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true" &&
    (process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production") &&
    !!clean(process.env.NEXT_PUBLIC_SITE_URL) &&
    !new URL(siteUrl).host.endsWith(".vercel.app") &&
    !isPlaceholder(siteUrl) &&
    !demoMode,
  analytics: {
    ga4Id: clean(process.env.NEXT_PUBLIC_GA4_ID),
  },
  /**
   * Profili ufficiali del brand (sameAs nei dati strutturati): URL https separati da virgola
   * in NEXT_PUBLIC_SAME_AS. Vuoto finché i profili non esistono davvero.
   */
  sameAs: (clean(process.env.NEXT_PUBLIC_SAME_AS) ?? "")
    .split(",")
    .map((u) => u.trim())
    .filter((u) => /^https:\/\/[^\s]+\.[^\s]+/.test(u) && !isPlaceholder(u)),
  turnstileSiteKey: clean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
  /** Copia dimostrativa pubblica: i moduli non inviano né salvano nulla. */
  demoMode,
  /** Versione dell'informativa privacy accettata nel funnel (salvata con il lead) */
  // 2026-11-14: la richiesta va a una sola impresa (cambia il destinatario indicato nel consenso)
  // 2026-11-17: titolare in Spagna (AEPD), rappresentante per Messina, canale di notifica interno
  // 2026-11-18: notifica via email interna con Resend (responsabile del trattamento)
  // 2026-11-18 (2): contatto solo telefono/WhatsApp, email facoltativa per i documenti dell'impresa
  privacyVersion: "2026-11-18-bozza-5",
  foundingYear: 2026,
} as const;

/**
 * Dati aziendali ancora da fornire. Tutto passa da qui: l'interfaccia pubblica
 * si limita a non mostrare ciò che manca, l'elenco compare solo in area admin.
 */
export function pendingBusinessData(): string[] {
  // Il sito raccoglie solo richieste: niente Partita IVA, PEC né email aziendale (decisione del proprietario, 2026-11-18).
  const missing: [unknown, string][] = [
    [site.legal.ownerName, "Nome del titolare"],
    [site.legal.address, "Indirizzo del titolare"],
    [site.contact.privacyEmail || process.env.PRIVACY_CONTACT_EMAIL?.trim(), "Recapito per la privacy"],
    [realPhone, "Telefono"],
    [realWhatsapp, "WhatsApp"],
  ];
  return missing.filter(([value]) => !value || isPlaceholder(String(value))).map(([, label]) => label);
}

/**
 * In produzione non si raccolgono dati personali senza un'informativa che
 * identifichi il titolare e dica come esercitare i diritti (art. 13 GDPR).
 * Preview e sviluppo restano liberi per poter provare il modulo.
 */
export function intakeBlockedByLegalData(): boolean {
  if (site.demoMode) return true;
  // Recapito privacy: o pubblico (NEXT_PUBLIC_*) o solo lato server (PRIVACY_CONTACT_EMAIL, mai scritto nelle pagine).
  const privacyContact = site.contact.privacyEmail || process.env.PRIVACY_CONTACT_EMAIL?.trim();
  const complete = site.legal.ownerName && site.legal.address && privacyContact;
  return process.env.VERCEL_ENV === "production" && !complete;
}

export function absoluteUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${p}`;
}

export function whatsappLink(text?: string): string | undefined {
  if (!site.contact.whatsapp) return undefined;
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${site.contact.whatsapp}${q}`;
}

export function phoneHref(): string | undefined {
  return site.contact.phone ? `tel:${site.contact.phone.replace(/[^\d+]/g, "")}` : undefined;
}
