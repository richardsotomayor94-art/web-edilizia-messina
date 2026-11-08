import { describe, it, expect } from "vitest";
import { normalizePhone, looksFakePhone } from "@/lib/phone";

describe("normalizePhone", () => {
  it("normalizza cellulari italiani", () => {
    expect(normalizePhone("333 123 4567")).toBe("+393331234567");
    expect(normalizePhone("+39 333-123-4567")).toBe("+393331234567");
    expect(normalizePhone("0039 3331234567")).toBe("+393331234567");
    expect(normalizePhone("393331234567")).toBe("+393331234567");
  });
  it("normalizza fissi di Messina", () => {
    expect(normalizePhone("090 123456")).toBe("+39090123456");
  });
  it("rifiuta numeri non validi", () => {
    expect(normalizePhone("12345")).toBeNull();
    expect(normalizePhone("abc")).toBeNull();
    expect(normalizePhone("")).toBeNull();
    expect(normalizePhone("5551234567")).toBeNull();
  });
  it("accetta esteri solo con prefisso", () => {
    expect(normalizePhone("+44 7911 123456")).toBe("+447911123456");
  });
  it("rileva sequenze finte", () => {
    expect(looksFakePhone("+393333333333")).toBe(true);
    expect(looksFakePhone("+393456789012")).toBe(true);
    expect(looksFakePhone("+393471829305")).toBe(false);
  });
});
