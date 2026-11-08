import { describe, it, expect } from "vitest";
import { scoreLead, spamCheck, deriveSource, MIN_FILL_MS } from "@/lib/scoring";

const base = {
  timeline: "soon" as const,
  square_meters: "50_100" as const,
  service: "ristrutturazione-completa" as const,
  description: "Ristrutturazione completa appartamento anni 70, bagno e cucina da rifare",
  email: "a@b.it",
  postal_code: "98121",
  budget_range: "30k_60k" as const,
};

describe("scoreLead", () => {
  it("lead completo e urgente = HOT", () => {
    const r = scoreLead({ ...base, timeline: "urgent" }, { inServiceArea: true, attachments: 2 });
    expect(r.tier).toBe("hot");
    expect(r.score).toBeLessThanOrEqual(100);
  });
  it("lead informativo minimo = COLD", () => {
    const r = scoreLead(
      { timeline: "info", square_meters: "unknown", service: "altro", description: undefined, email: undefined, postal_code: undefined, budget_range: undefined },
      { inServiceArea: false, attachments: 0 },
    );
    expect(r.tier).toBe("cold");
  });
  it("è deterministico e limitato 0-100", () => {
    const a = scoreLead(base, { inServiceArea: true, attachments: 5 });
    const b = scoreLead(base, { inServiceArea: true, attachments: 5 });
    expect(a).toEqual(b);
    expect(a.score).toBeGreaterThanOrEqual(0);
  });
});

describe("spamCheck", () => {
  const now = Date.now();
  const ok = { now, startedAt: now - MIN_FILL_MS - 1000, name: "Mario", phone: "+393471829305" };
  it("passa un invio normale", () => {
    const r = spamCheck(ok);
    expect(r.block).toBe(false);
    expect(r.score).toBe(0);
  });
  it("blocca honeypot", () => expect(spamCheck({ ...ok, honeypot: "http://x" }).block).toBe(true));
  it("blocca compilazioni troppo veloci", () => expect(spamCheck({ ...ok, startedAt: now - 1000 }).block).toBe(true));
  it("segnala link nella descrizione", () => expect(spamCheck({ ...ok, description: "visita www.spam.com" }).reasons).toContain("link_in_description"));
});

describe("deriveSource", () => {
  it("gclid = paid", () => expect(deriveSource({ gclid: "x" })).toBe("paid"));
  it("google referrer = organic", () => expect(deriveSource({ referrer: "https://www.google.com/" })).toBe("organic"));
  it("chatgpt = ai", () => expect(deriveSource({ referrer: "https://chatgpt.com/" })).toBe("ai"));
  it("nessun dato = direct", () => expect(deriveSource({})).toBe("direct"));
  it("facebook = social", () => expect(deriveSource({ utm_source: "facebook", utm_medium: "social" })).toBe("social"));
});
