import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { servicePages } from "@/config/services";
import { absoluteUrl } from "@/config/site";

const APP = join(process.cwd(), "src", "app");

/** Tutte le pagine del sito con il percorso pubblico e se dichiarano noindex. */
function pages(dir = APP): { path: string; noindex: boolean }[] {
  const out: { path: string; noindex: boolean }[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...pages(full));
    else if (name === "page.tsx") {
      const rel = relative(APP, dir).split(sep).join("/");
      out.push({ path: rel ? `/${rel}/` : "/", noindex: /noindex:\s*true/.test(readFileSync(full, "utf8")) });
    }
  }
  return out;
}

describe("sitemap", () => {
  const urls = sitemap().map((e) => e.url);
  const all = pages().filter((p) => !p.path.startsWith("/admin/"));

  it("contiene ogni pagina indicizzabile e nessuna pagina noindex", () => {
    for (const p of all) {
      if (p.path === "/[service]/") {
        for (const s of servicePages) expect(urls, s.path).toContain(absoluteUrl(s.path));
        continue;
      }
      if (p.noindex) expect(urls, p.path).not.toContain(absoluteUrl(p.path));
      else expect(urls, p.path).toContain(absoluteUrl(p.path));
    }
  });

  it("non ha doppioni e ogni URL finisce con la barra, come il canonical", () => {
    expect(new Set(urls).size).toBe(urls.length);
    for (const u of urls) expect(u.endsWith("/"), u).toBe(true);
  });

  it("lastmod, dove presente, è una data reale nel formato AAAA-MM-GG", () => {
    for (const e of sitemap()) {
      if (e.lastModified === undefined) continue;
      expect(String(e.lastModified), e.url).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(String(e.lastModified))), e.url).toBe(false);
    }
  });
});
