import { describe, expect, it } from "vitest";
import { allServicePages, servicePages, specialistPages } from "@/config/services";
import { GROUP_LABELS, navGroups } from "@/config/service-catalog";
import { pageMetadata, serviceNode } from "@/lib/seo";
import { generateStaticParams } from "@/app/og/[file]/route";

const groups = navGroups([...servicePages, ...specialistPages]);
const items = groups.flatMap((g) => g.items);

describe("menu Servizi per gruppi", () => {
  it("ogni landing compare una sola volta, in un gruppo del catalogo", () => {
    expect(items.map((i) => i.path).sort()).toEqual(allServicePages.map((s) => s.path).sort());
    expect(new Set(items.map((i) => i.path)).size).toBe(items.length);
    for (const g of groups) expect(GROUP_LABELS[g.key]).toBe(g.label);
  });

  it("i gruppi seguono l'ordine del catalogo e nessuno è vuoto", () => {
    expect(groups.map((g) => g.key)).toEqual(["casa", "superfici", "restauro", "spazi"]);
    expect(groups.every((g) => g.items.length > 0 && g.blurb.length > 0)).toBe(true);
  });

  it("le due linee nuove stanno nel gruppo giusto", () => {
    const where = (path: string) => groups.find((g) => g.items.some((i) => i.path === path))?.key;
    expect(where("/restauro-e-pulizia-messina/")).toBe("restauro");
    expect(where("/sabbiatura-messina/")).toBe("superfici");
  });

  it("ogni voce ha un sottotitolo breve (una riga nel menu)", () => {
    for (const i of items) {
      expect(i.hint, i.path).toBeTruthy();
      expect(i.hint!.length, i.hint).toBeLessThanOrEqual(40);
    }
  });
});

describe("SEO di ogni servizio", () => {
  it("un'immagine social per ogni landing", () => {
    const files = generateStaticParams().map((p) => p.file);
    expect(files.sort()).toEqual(allServicePages.map((s) => `${s.id}.png`).sort());
  });

  it("i metadata usano l'immagine propria della pagina, altrimenti quella generale", () => {
    const own = pageMetadata({ title: "T", description: "D", path: "/sabbiatura-messina/", image: { path: "/og/sabbiatura.png", alt: "A" } });
    const ogImages = own.openGraph?.images as { url: string; width: number }[];
    expect(ogImages[0].url).toMatch(/\/og\/sabbiatura\.png$/);
    expect(ogImages[0].width).toBe(1200);
    const generic = pageMetadata({ title: "T", description: "D", path: "/" });
    expect((generic.openGraph?.images as { url: string }[])[0].url).toMatch(/\/og\.png$/);
  });

  it("titoli, descrizioni e immagini non si ripetono tra i servizi", () => {
    const uniq = (xs: string[]) => new Set(xs).size === xs.length;
    expect(uniq(allServicePages.map((s) => s.title))).toBe(true);
    expect(uniq(allServicePages.map((s) => s.metaDescription))).toBe(true);
    expect(uniq(allServicePages.map((s) => String(serviceNode(s).image)))).toBe(true);
  });
});
