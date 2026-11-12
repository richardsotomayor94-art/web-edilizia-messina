/**
 * Eventi analytics SENZA PII.
 * - Solo nomi di evento ammessi e parametri in whitelist.
 * - I valori sono enum/slug, mai nome, telefono, email o testo libero.
 * - Inviati a GA4 solo se configurato E con consenso analytics.
 */
export type AnalyticsEvent =
  | "cta_click"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "view_service"
  | "start_quote"
  | "quote_step"
  | "quote_complete"
  | "lead_submit"
  | "upload_added";

const ALLOWED_PARAMS = new Set(["location", "service", "step", "step_name", "tier", "count", "page", "label"]);
const PII_RE = /(@|\+?\d{6,})/;

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
    __mc360Consent?: boolean;
  }
}

export function sanitizeParams(params: Record<string, string | number | undefined>): Record<string, string | number> {
  const out: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(params)) {
    if (!ALLOWED_PARAMS.has(k) || v === undefined) continue;
    if (typeof v === "string") {
      if (PII_RE.test(v) || v.length > 80) continue;
      out[k] = v;
    } else out[k] = v;
  }
  return out;
}

export function track(event: AnalyticsEvent, params: Record<string, string | number | undefined> = {}): void {
  if (typeof window === "undefined") return;
  const clean = sanitizeParams(params);
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, clean);
  if (window.__mc360Consent && typeof window.gtag === "function") {
    window.gtag("event", event, clean);
  }
}
