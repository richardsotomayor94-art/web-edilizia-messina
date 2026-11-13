import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { FORBIDDEN_PATTERNS } from "@/config/claims";
import { checkCap, capMessage, coverageOf, MUNICIPALITIES } from "@/config/areas";

const SRC = join(process.cwd(), "src");
const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(f) ? [p] : [];
  });

describe("promesse commerciali", () => {
  // claims.ts contiene gli esempi vietati; admin e pagine legali non sono testi commerciali
  const scanned = files(SRC).filter((f) => !/config[\\/]claims\.ts$|[\\/]admin[\\/]|privacy|termini|cookie/.test(f));
  it.each(FORBIDDEN_PATTERNS.map((p) => [p.source, p]))("nessun testo usa «%s»", (_s, pattern) => {
    const hits = scanned.filter((f) => pattern.test(readFileSync(f, "utf8"))).map((f) => relative(SRC, f));
    expect(hits).toEqual([]);
  });
});

describe("copertura e CAP", () => {
  it("oggi nessuna area è confermata: la disponibilità si conferma caso per caso", () => {
    expect(MUNICIPALITIES.every((m) => coverageOf(m) === "pending")).toBe(true);
  });
  it("riconosce Messina città dal CAP", () => {
    expect(checkCap("98122")).toEqual({ kind: "province", municipality: "Messina", coverage: "pending" });
  });
  it("riconosce un comune in elenco", () => {
    expect(checkCap("98057")).toMatchObject({ kind: "province", municipality: "Milazzo" });
  });
  it("distingue un CAP della provincia non in elenco da uno fuori provincia", () => {
    expect(checkCap("98060")).toEqual({ kind: "province", coverage: "pending" });
    expect(checkCap("95100")).toEqual({ kind: "outside" });
    expect(capMessage(checkCap("95100"))).toMatch(/non è in provincia di Messina/);
    expect(capMessage(checkCap("98060"))).toMatch(/disponibilità .* si conferma/);
  });
  it("non dice nulla finché il CAP è incompleto", () => {
    expect(capMessage(checkCap("981"))).toBeNull();
  });
});
