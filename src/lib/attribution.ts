/**
 * Attribuzione first-touch per sessione (sessionStorage, solo prima parte).
 * Salva UTM, gclid, landing page e referrer al primo ingresso nella sessione.
 * Nessun cookie, nessun identificativo persistente.
 */
const KEY = "mc360_attr";
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"] as const;

export type Attribution = Partial<Record<(typeof UTM)[number] | "landing_page" | "referrer", string>>;

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const existing = sessionStorage.getItem(KEY);
    const hasUtm = UTM.some((k) => params.get(k));
    if (existing && !hasUtm) return;
    const data: Attribution = {};
    for (const k of UTM) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 255);
    }
    data.landing_page = window.location.pathname.slice(0, 500);
    const ref = document.referrer;
    if (ref) {
      try {
        const u = new URL(ref);
        // salva solo origin + path (niente query string con possibili dati personali)
        if (u.host !== window.location.host) data.referrer = `${u.origin}${u.pathname}`.slice(0, 500);
      } catch {
        /* ignore */
      }
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage non disponibile */
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
