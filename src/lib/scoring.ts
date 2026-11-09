/**
 * Lead scoring semplice e trasparente (solo priorità commerciale).
 *
 * Usa ESCLUSIVAMENTE caratteristiche del progetto e completezza dei dati.
 * Non usa mai attributi personali o sensibili (nome, genere, età, origine,
 * quartiere come proxy socio-economico, ecc.).
 */
import type { LeadData } from "./lead-schema";
import { looksFakePhone } from "./phone";

export type LeadTier = "hot" | "warm" | "cold";

const TIMELINE_POINTS: Record<LeadData["timeline"], number> = {
  urgent: 30,
  soon: 25,
  quotes: 18,
  info: 6,
};

const SIZE_POINTS: Record<LeadData["square_meters"], number> = {
  gt150: 20,
  "100_150": 18,
  "50_100": 15,
  lt50: 10,
  unknown: 6,
};

const SERVICE_POINTS: Partial<Record<LeadData["service"], number>> = {
  "ristrutturazione-completa": 20,
  bagno: 16,
  cucina: 16,
  impianti: 14,
  pavimenti: 13,
  facciata: 14,
  isolamento: 14,
  cartongesso: 11,
  pittura: 10,
  "opere-murarie": 11,
  altro: 6,
};

export interface ScoreResult {
  score: number;
  tier: LeadTier;
  breakdown: Record<string, number>;
}

export function scoreLead(
  lead: Pick<LeadData, "timeline" | "square_meters" | "service" | "description" | "email" | "postal_code" | "budget_range">,
  opts: { inServiceArea: boolean; attachments: number },
): ScoreResult {
  const breakdown: Record<string, number> = {
    tempistica: TIMELINE_POINTS[lead.timeline] ?? 0,
    dimensione: SIZE_POINTS[lead.square_meters] ?? 0,
    servizio: SERVICE_POINTS[lead.service] ?? 8,
    zona: opts.inServiceArea ? 12 : 0,
    descrizione: (lead.description?.length ?? 0) >= 40 ? 8 : (lead.description?.length ?? 0) >= 10 ? 4 : 0,
    completezza:
      (lead.email ? 3 : 0) +
      (lead.postal_code ? 2 : 0) +
      (lead.budget_range && lead.budget_range !== "undisclosed" ? 3 : 0) +
      (opts.attachments > 0 ? 4 : 0),
  };
  const score = Math.max(0, Math.min(100, Object.values(breakdown).reduce((a, b) => a + b, 0)));
  const tier: LeadTier = score >= 70 ? "hot" : score >= 45 ? "warm" : "cold";
  return { score, tier, breakdown };
}

export interface SpamInput {
  honeypot?: string;
  startedAt?: number;
  /** Durata misurata dal browser: non risente della differenza tra orologi */
  fillMs?: number;
  now: number;
  name: string;
  description?: string;
  phone: string;
  email?: string;
}

export interface SpamResult {
  score: number;
  reasons: string[];
  block: boolean; // da scartare silenziosamente: solo se è certamente un bot
}

const URL_RE = /(https?:\/\/|www\.)/i;
export const MIN_FILL_MS = 6000;

export function spamCheck(i: SpamInput): SpamResult {
  const reasons: string[] = [];
  let score = 0;
  if (i.honeypot && i.honeypot.trim() !== "") {
    reasons.push("honeypot");
    score += 100;
  }
  const elapsed = i.fillMs ?? (i.startedAt ? i.now - i.startedAt : undefined);
  if (elapsed === undefined) {
    reasons.push("no_start_time");
    score += 20;
  } else {
    if (elapsed < MIN_FILL_MS) {
      reasons.push("too_fast");
      score += 50;
    } else if (elapsed > 1000 * 60 * 60 * 24) {
      reasons.push("stale_form");
      score += 10;
    }
  }
  if (URL_RE.test(i.description ?? "")) {
    reasons.push("link_in_description");
    score += 25;
  }
  if (URL_RE.test(i.name) || /\d{3,}/.test(i.name)) {
    reasons.push("suspicious_name");
    score += 30;
  }
  if (looksFakePhone(i.phone)) {
    reasons.push("fake_phone_pattern");
    score += 40;
  }
  if (i.email && /@(mailinator|guerrillamail|10minutemail|yopmail|tempmail)\./i.test(i.email)) {
    reasons.push("disposable_email");
    score += 15;
  }
  score = Math.min(100, score);
  // "too_fast" alza il punteggio ma non scarta: una persona vera non deve mai perdere la richiesta
  return { score, reasons, block: reasons.includes("honeypot") };
}

/** Canale di acquisizione dedotto da UTM/gclid/referrer */
export function deriveSource(a: {
  utm_source?: string;
  utm_medium?: string;
  gclid?: string;
  referrer?: string;
}): "organic" | "paid" | "social" | "referral" | "email" | "direct" | "ai" | "other" {
  const medium = a.utm_medium?.toLowerCase() ?? "";
  const source = a.utm_source?.toLowerCase() ?? "";
  if (a.gclid || /^(cpc|ppc|paid|paidsearch|display)$/.test(medium)) return "paid";
  if (medium === "email" || source === "newsletter") return "email";
  if (/social/.test(medium) || /(facebook|instagram|tiktok|linkedin)/.test(source)) return "social";
  if (/(chatgpt|perplexity|gemini|copilot|claude)/.test(source)) return "ai";
  if (medium === "organic") return "organic";
  const ref = a.referrer?.toLowerCase() ?? "";
  if (!ref) return source ? "other" : "direct";
  if (/(google\.|bing\.|duckduckgo\.|yahoo\.|ecosia\.)/.test(ref)) return "organic";
  if (/(chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google|copilot\.microsoft|claude\.ai)/.test(ref)) return "ai";
  if (/(facebook\.|instagram\.|t\.co|twitter\.|x\.com|linkedin\.|tiktok\.)/.test(ref)) return "social";
  return "referral";
}
