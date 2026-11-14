import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { servicePages } from "@/config/services";
import { guides } from "@/config/guides";

/** Pagine istituzionali in sitemap: i test verificano che non entrino pagine noindex. */
const STATIC_SITEMAP_PATHS = ["/", "/guide/", "/come-funziona/", "/come-selezioniamo-i-professionisti/", "/chi-siamo/", "/contatti/", "/diventa-partner/"];

/**
 * Solo URL canoniche e indicizzabili (niente funnel, grazie, legali in bozza, admin).
 * `lastmod` solo dove la data è reale (landing e guide), come data semplice AAAA-MM-GG.
 * L'indice delle guide prende la data della guida aggiornata più di recente.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const latestGuide = guides.map((g) => g.updated).sort().at(-1);
  return [
    ...STATIC_SITEMAP_PATHS.map((p) => ({ url: absoluteUrl(p), ...(p === "/guide/" && latestGuide ? { lastModified: latestGuide } : {}) })),
    ...servicePages.map((s) => ({ url: absoluteUrl(s.path), lastModified: s.updated })),
    ...guides.map((g) => ({ url: absoluteUrl(g.path), lastModified: g.updated })),
  ];
}
