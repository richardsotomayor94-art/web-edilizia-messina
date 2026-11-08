import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { servicePages } from "@/config/services";
import { guides } from "@/config/guides";

const LAST_UPDATE = new Date("2026-11-08");

/** Solo URL canoniche e indicizzabili (niente funnel, grazie, legali in bozza, admin). */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: LAST_UPDATE, changeFrequency: "weekly", priority: 1 },
    ...servicePages.map((s) => ({ url: absoluteUrl(s.path), lastModified: LAST_UPDATE, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: absoluteUrl("/guide/"), lastModified: LAST_UPDATE, changeFrequency: "monthly", priority: 0.5 },
    ...guides.map((g) => ({ url: absoluteUrl(g.path), lastModified: new Date(g.updated), changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: absoluteUrl("/come-funziona/"), lastModified: LAST_UPDATE, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/come-selezioniamo-i-professionisti/"), lastModified: LAST_UPDATE, changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/chi-siamo/"), lastModified: LAST_UPDATE, changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/contatti/"), lastModified: LAST_UPDATE, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/diventa-partner/"), lastModified: LAST_UPDATE, changeFrequency: "yearly", priority: 0.3 },
  ];
  return entries;
}
