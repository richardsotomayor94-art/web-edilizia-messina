import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { servicePages } from "@/config/services";
import { guides } from "@/config/guides";

/**
 * Solo URL canoniche e indicizzabili (niente funnel, grazie, legali in bozza, admin).
 * `lastModified` solo dove la data è reale: le guide hanno il proprio aggiornamento.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", ...servicePages.map((s) => s.path), "/guide/", "/come-funziona/", "/come-selezioniamo-i-professionisti/", "/chi-siamo/", "/contatti/", "/diventa-partner/"];
  return [...staticPaths.map((p) => ({ url: absoluteUrl(p) })), ...guides.map((g) => ({ url: absoluteUrl(g.path), lastModified: new Date(g.updated) }))];
}
