import { afterEach, describe, expect, it, vi } from "vitest";
import { attributionSchema } from "@/lib/lead-schema";

describe("attribuzione", () => {
  it("accorcia i valori lunghi invece di rifiutare la richiesta", () => {
    const out = attributionSchema.parse({ utm_content: "x".repeat(255), utm_source: "google" });
    expect(out.utm_content).toHaveLength(160);
    expect(out.utm_source).toBe("google");
  });

  it("scarta i valori non validi", () => {
    expect(attributionSchema.parse({ gclid: 123 }).gclid).toBeUndefined();
    expect(attributionSchema.parse("rotto")).toEqual({});
  });
});

describe("blocco per dati legali mancanti", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  const load = async (env: Record<string, string>) => {
    vi.resetModules();
    for (const k of ["NEXT_PUBLIC_LEGAL_OWNER_NAME", "NEXT_PUBLIC_LEGAL_ADDRESS", "NEXT_PUBLIC_PRIVACY_EMAIL", "NEXT_PUBLIC_CONTACT_EMAIL"]) vi.stubEnv(k, "");
    for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
    return (await import("@/config/site")).intakeBlockedByLegalData();
  };

  it("blocca in produzione se manca il titolare", async () => {
    expect(await load({ VERCEL_ENV: "production" })).toBe(true);
  });

  it("consente le prove in preview", async () => {
    expect(await load({ VERCEL_ENV: "preview" })).toBe(false);
  });

  it("sblocca la produzione con i dati completi", async () => {
    expect(
      await load({ VERCEL_ENV: "production", NEXT_PUBLIC_LEGAL_OWNER_NAME: "Titolare", NEXT_PUBLIC_LEGAL_ADDRESS: "Via Esempio 1", NEXT_PUBLIC_PRIVACY_EMAIL: "privacy@esempio.it" }),
    ).toBe(false);
  });
});
