import type { MetadataRoute } from "next";
import { site, absoluteUrl } from "@/config/site";

/**
 * Staging (*.vercel.app / preview): crawling consentito ma TUTTE le pagine
 * hanno noindex (meta + header X-Robots-Tag), così eventuali URL scoperti
 * vengono esclusi dall'indice. Nessuna sitemap dichiarata.
 * Produzione (dominio definitivo + NEXT_PUBLIC_SITE_INDEXABLE=true):
 * crawling consentito, aree private escluse, sitemap dichiarata.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/admin/", "/preventivo/grazie/"];
  if (!site.indexable) {
    return { rules: [{ userAgent: "*", allow: "/", disallow }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
