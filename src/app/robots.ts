import type { MetadataRoute } from "next";
import { site, absoluteUrl } from "@/config/site";

/** Motori di ricerca e assistenti IA che cercano o aprono pagine per rispondere a un utente: sempre ammessi. */
const SEARCH_AND_USER_AGENTS = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User"];

/**
 * Crawler che raccolgono testi per addestrare modelli. Non servono per comparire nei risultati
 * (né su Google né negli assistenti): bloccarli è una scelta del proprietario, tramite
 * NEXT_PUBLIC_BLOCK_AI_TRAINING=true. Finché non decide restano ammessi, come gli altri.
 */
const TRAINING_AGENTS = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot", "meta-externalagent"];

/**
 * Staging (*.vercel.app / preview): crawling consentito ma TUTTE le pagine
 * hanno noindex (meta + header X-Robots-Tag), così eventuali URL scoperti
 * vengono esclusi dall'indice. Nessuna sitemap dichiarata.
 * Produzione (dominio definitivo + NEXT_PUBLIC_SITE_INDEXABLE=true):
 * crawling consentito, aree private escluse, sitemap dichiarata.
 * Un gruppo dedicato sostituisce quello generale per quel bot: le esclusioni vanno ripetute.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/admin/", "/preventivo/grazie/"];
  if (!site.indexable) {
    return { rules: [{ userAgent: "*", allow: "/", disallow }] };
  }
  const blockTraining = process.env.NEXT_PUBLIC_BLOCK_AI_TRAINING === "true";
  return {
    rules: [
      { userAgent: SEARCH_AND_USER_AGENTS, allow: "/", disallow },
      ...(blockTraining ? [{ userAgent: TRAINING_AGENTS, disallow: "/" }] : []),
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
