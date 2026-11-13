import { afterEach, describe, expect, it, vi } from "vitest";
import { servicePages } from "@/config/services";
import { guides } from "@/config/guides";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("landing di servizio", () => {
  it("title, H1, meta e percorso sono unici", () => {
    for (const k of ["title", "h1", "metaDescription", "path"] as const) {
      const all = servicePages.map((s) => s[k]);
      expect(new Set(all).size, k).toBe(all.length);
    }
  });
  it("ogni title sta nello spazio del risultato con il suffisso del marchio", () => {
    // Orientativo: il modello aggiunge " | MessinaCasa360" (17 caratteri)
    for (const s of servicePages) expect(s.title.length + 17, s.path).toBeLessThanOrEqual(62);
  });
  it("ogni meta description ha una lunghezza utile", () => {
    for (const s of servicePages) {
      expect(s.metaDescription.length, s.path).toBeGreaterThanOrEqual(110);
      expect(s.metaDescription.length, s.path).toBeLessThanOrEqual(165);
    }
  });
  it("i servizi correlati esistono e non puntano a sé stessi", () => {
    const ids = new Set(servicePages.map((s) => s.id));
    for (const s of servicePages) for (const r of s.related) expect(ids.has(r) && r !== s.id, `${s.id} -> ${r}`).toBe(true);
  });
});

describe("sitemap e robots", () => {
  it("la sitemap contiene tutte le landing e le guide, con le date reali delle guide", async () => {
    const sitemap = (await import("@/app/sitemap")).default();
    const urls = sitemap.map((e) => new URL(e.url).pathname);
    for (const s of servicePages) expect(urls).toContain(s.path);
    for (const g of guides) {
      const entry = sitemap.find((e) => new URL(e.url).pathname === g.path);
      // Ricostruire senza modifiche di contenuto non cambia le date: vengono dal contenuto, non dalla build
      expect(entry?.lastModified).toEqual(new Date(g.updated));
    }
    expect(urls.some((u) => u.startsWith("/admin") || u.startsWith("/api") || u.includes("grazie"))).toBe(false);
  });
  it("demo e anteprime: robots senza sitemap", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_INDEXABLE", "false");
    const robots = (await import("@/app/robots")).default();
    expect(robots.sitemap).toBeUndefined();
  });
  it("non è indicizzabile su *.vercel.app né in modalità demo, anche se richiesto", async () => {
    const indexable = async (env: Record<string, string>) => {
      vi.resetModules();
      for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
      return (await import("@/config/site")).site.indexable;
    };
    expect(await indexable({ NEXT_PUBLIC_SITE_INDEXABLE: "true", VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://x.vercel.app" })).toBe(false);
    expect(await indexable({ NEXT_PUBLIC_SITE_INDEXABLE: "true", VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://www.dominio.it", NEXT_PUBLIC_DEMO_MODE: "true" })).toBe(false);
    expect(await indexable({ NEXT_PUBLIC_SITE_INDEXABLE: "true", VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://www.dominio.it", NEXT_PUBLIC_DEMO_MODE: "" })).toBe(true);
  });
});
