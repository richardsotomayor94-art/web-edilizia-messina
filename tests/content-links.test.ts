import { describe, expect, it } from "vitest";
import { servicePages } from "@/config/services";
import { guides } from "@/config/guides";
import { plainText } from "@/lib/rich-text";

const ROUTES = new Set(["/", "/guide/", "/preventivo/", "/come-funziona/", "/contatti/", ...servicePages.map((s) => s.path), ...guides.map((g) => g.path)]);
const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
const OFFICIAL = /^https:\/\/(www\.)?(normattiva\.it|regione\.sicilia\.it|www2\.regione\.sicilia\.it|agenziaentrate\.gov\.it|gazzettaufficiale\.it)\//;

describe("link contestuali nelle FAQ", () => {
  const links = servicePages.flatMap((s) => s.faqs.flatMap((f) => [...f.a.matchAll(LINK)].map((m) => ({ from: s.path, to: m[2] }))));
  it("ci sono link verso guide e servizi collegati", () => {
    expect(links.length).toBeGreaterThanOrEqual(8);
  });
  it.each(links.map((l) => [l.from, l.to]))("%s → %s esiste", (_from, to) => {
    expect(ROUTES.has(to)).toBe(true);
  });
  it("nessuna pagina linka sé stessa", () => {
    expect(links.filter((l) => l.from === l.to)).toEqual([]);
  });
  it("i dati strutturati ricevono il testo senza markup", () => {
    expect(plainText("Vedi la [guida](/guide/)."), "Vedi la guida.");
    for (const s of servicePages) for (const f of s.faqs) expect(plainText(f.a)).not.toMatch(/\]\(/);
  });
});

describe("fonti e date delle landing", () => {
  it.each(servicePages.map((s) => [s.path, s]))("%s cita solo fonti ufficiali in HTTPS", (_p, s) => {
    expect(s.sources.length).toBeGreaterThanOrEqual(2);
    for (const src of s.sources) expect(src.href).toMatch(OFFICIAL);
  });
  it("la data di aggiornamento è una data ISO reale, non futura", () => {
    for (const s of servicePages) {
      expect(s.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(s.updated).getTime()).toBeLessThanOrEqual(Date.now());
    }
  });
  it("la sitemap usa la data reale di ogni landing", async () => {
    const sitemap = (await import("@/app/sitemap")).default();
    for (const s of servicePages) {
      const e = sitemap.find((x) => new URL(x.url).pathname === s.path);
      expect(e?.lastModified).toEqual(new Date(s.updated));
    }
  });
});
