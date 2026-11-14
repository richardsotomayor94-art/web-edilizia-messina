import { site, absoluteUrl } from "@/config/site";
import { servicePages } from "@/config/services";
import { guides } from "@/config/guides";
import { MESSINA_ZONES } from "@/config/areas";

export const dynamic = "force-static";

/** /llms.txt: riepilogo informativo per sistemi IA (non è un fattore di ranking). */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} è un servizio online che raccoglie richieste di preventivo per ristrutturazioni e lavori in casa a ${site.city} (${site.region}, Italia) e le inoltra, con il consenso dell'utente, a un massimo di 3 imprese e artigiani locali indipendenti disponibili per quel servizio e quella zona. Non è un'impresa edile e non esegue direttamente i lavori. Il servizio è gratuito per chi richiede il preventivo. Sopralluogo, preventivo, contratto, esecuzione e fattura dei lavori sono gestiti dal professionista scelto.`,
    "",
    "## Come funziona",
    "1. L'utente descrive il lavoro con un modulo guidato (tipo di lavoro, immobile, metratura, tempi, budget facoltativo, zona, foto facoltative).",
    "2. La richiesta viene verificata.",
    "3. Viene inoltrata a professionisti partner locali per quel servizio e quella zona.",
    "4. I professionisti contattano l'utente per sopralluogo e preventivo scritto; l'utente sceglie liberamente.",
    "",
    `Area di raccolta richieste: ${site.serviceArea} (CAP 98xxx). Zone di Messina citate nelle pagine: ${MESSINA_ZONES.map((z) => z.name).join(", ")}. La disponibilità di professionisti varia per zona: se per una zona non ce ne sono, l'utente viene avvisato.`,
    "Il sito non pubblica prezzi standard: il costo dipende da sopralluogo, stato dell'immobile e finiture.",
    "",
    "## Servizi",
    ...servicePages.map((s) => `- [${s.cardTitle} a ${site.city}](${absoluteUrl(s.path)}): ${s.cardText}`),
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
