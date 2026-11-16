import { site, absoluteUrl } from "@/config/site";
import { indexableServicePages } from "@/config/services";
import { guides } from "@/config/guides";
import { MESSINA_ZONES } from "@/config/areas";

export const dynamic = "force-static";

/** /llms.txt: riepilogo informativo per sistemi IA (non è un fattore di ranking). */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} è un servizio online che raccoglie richieste di preventivo per ristrutturazioni e lavori in casa a ${site.city} (${site.region}, Italia) e, con il consenso dell'utente, lo mette in contatto con una sola impresa locale specializzata in quel tipo di intervento. Lavora solo con imprese con partita IVA che rilasciano fattura, con squadre e mezzi propri; per impianti e lavori strutturali solo imprese abilitate. Non è un'impresa edile, non esegue lavori, non fa preventivi e non fissa prezzi. La richiesta è gratuita. Sopralluogo, preventivo, contratto, esecuzione, fattura e garanzia sono dell'impresa.`,
    "",
    "## Come funziona",
    "1. L'utente descrive il lavoro con un modulo guidato (tipo di lavoro, immobile, metratura, tempi, budget facoltativo, zona, foto facoltative).",
    "2. Il servizio parla con l'impresa e le spiega la richiesta prima di passarle il contatto.",
    "3. Viene inoltrata a una sola impresa partner specializzata in quel lavoro e in quella zona; se per quel settore non c'è, il servizio la cerca e, se non la trova, lo dice all'utente.",
    "4. L'impresa chiama l'utente, fissa il sopralluogo e fa il preventivo; l'utente decide se procedere.",
    "",
    `Area di raccolta richieste: ${site.serviceArea} (CAP 98xxx). Zone di Messina citate nelle pagine: ${MESSINA_ZONES.map((z) => z.name).join(", ")}.`,
    "Il sito non pubblica prezzi standard: il costo dipende da sopralluogo, stato dell'immobile e finiture.",
    "",
    "## Servizi",
    ...indexableServicePages.map((s) => `- [${s.cardTitle} a ${site.city}](${absoluteUrl(s.path)}): ${s.cardText}`),
    "",
    "## Guide",
    ...guides.map((g) => `- [${g.title}](${absoluteUrl(g.path)}): ${g.excerpt}`),
    "",
    "## Pagine utili",
    `- [Richiedi un preventivo](${absoluteUrl("/preventivo/")})`,
    `- [Come funziona](${absoluteUrl("/come-funziona/")})`,
    `- [Come selezioniamo i professionisti](${absoluteUrl("/come-selezioniamo-i-professionisti/")})`,
    `- [Chi siamo](${absoluteUrl("/chi-siamo/")})`,
    `- [Guide](${absoluteUrl("/guide/")})`,
    `- [Contatti](${absoluteUrl("/contatti/")})`,
    `- [Diventa partner](${absoluteUrl("/diventa-partner/")})`,
    ...(site.indexable ? ["", `Sitemap: ${absoluteUrl("/sitemap.xml")}`] : []),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
