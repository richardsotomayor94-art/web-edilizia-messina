import { describe, it, expect } from "vitest";
import { leadSchema } from "@/lib/lead-schema";

const valid = {
  service: "bagno",
  property_type: "appartamento",
  square_meters: "lt50",
  timeline: "quotes",
  city: "Messina",
  name: "Giulia",
  phone: "347 182 9305",
  consent_privacy: true,
};

describe("leadSchema", () => {
  it("accetta un lead valido e normalizza il telefono", () => {
    const r = leadSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.phone).toBe("+393471829305");
      expect(r.data.consent_marketing).toBe(false); // mai preselezionato
    }
  });
  it("richiede il consenso privacy", () => {
    expect(leadSchema.safeParse({ ...valid, consent_privacy: false }).success).toBe(false);
  });
  it("rifiuta servizi sconosciuti", () => {
    expect(leadSchema.safeParse({ ...valid, service: "hacking" }).success).toBe(false);
  });
  it("valida CAP ed email", () => {
    expect(leadSchema.safeParse({ ...valid, postal_code: "981" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...valid, email: "non-email" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...valid, postal_code: "98121", email: "x@y.it" }).success).toBe(true);
  });
  it("limita la descrizione", () => {
    expect(leadSchema.safeParse({ ...valid, description: "a".repeat(2001) }).success).toBe(false);
  });
});
