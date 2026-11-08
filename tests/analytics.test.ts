import { describe, it, expect } from "vitest";
import { sanitizeParams } from "@/lib/analytics";

describe("sanitizeParams (no PII)", () => {
  it("scarta parametri non in whitelist", () => {
    expect(sanitizeParams({ name: "Mario", phone: "3331234567", service: "bagno" })).toEqual({ service: "bagno" });
  });
  it("scarta valori che sembrano email o telefoni", () => {
    expect(sanitizeParams({ label: "mario@x.it", location: "+393331234567" })).toEqual({});
  });
});
