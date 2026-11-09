import { site } from "@/config/site";
import { servicePages } from "@/config/services";
import { pageMetadata, graph, organizationNode, websiteNode, webPageNode, faqNode, offerCatalogNode, serviceNode, breadcrumbNode } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { Hero } from "@/components/home/Hero";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { Coverage, FinalCta, Guides, Manifesto, Process, ProjectTypes, Transparency } from "@/components/home/Sections";
import { TavLabel } from "@/components/TavLabel";

// "Ristrutturazioni" resta riservato alla landing dedicata: vedi docs/LOCAL-SEO-EXPANSION.md
const title = "Preventivi per lavori in casa a Messina";
const description =
  "Ristrutturazioni, bagni, cucine, cartongesso, pittura, impianti e pavimenti a Messina. Una sola richiesta, gratuita, per un massimo di 3 professionisti locali.";

export const metadata = { ...pageMetadata({ title, description, path: "/" }), title: { absolute: `${title} | ${site.name}` } };

const faqs = [
  {
    q: `Che cos'è ${site.name}?`,
    a: `${site.name} è un servizio online che raccoglie richieste di preventivo per lavori in casa a Messina e provincia e le inoltra a imprese e artigiani locali indipendenti. Non è un'impresa edile e non esegue lavori.`,
  },
  {
    q: "Come funziona la richiesta?",
    a: "Compili un modulo guidato con lavoro, immobile, metratura, tempi e zona. Lo verifichiamo e, con il tuo consenso, lo inoltriamo a un massimo di 3 imprese o artigiani locali disponibili, che ti contattano per un sopralluogo e un preventivo.",
  },
  {
    q: "Quanto costa il servizio?",
    a: "Per chi richiede il preventivo è gratuito e senza impegno. Il servizio è sostenuto dai professionisti partner, come spiegato nella pagina Come funziona.",
  },
  {
    q: "Chi può fare una ristrutturazione a Messina?",
    a: "Imprese edili e artigiani iscritti alla Camera di Commercio. Per gli impianti servono imprese abilitate ai sensi del DM 37/2008 e, per i lavori soggetti a pratica edilizia, un tecnico abilitato.",
  },
  {
    q: "Quanto costa ristrutturare un appartamento a Messina?",
    a: "Dipende da metratura, stato degli impianti, finiture e pratiche necessarie: un preventivo affidabile si ottiene solo dopo un sopralluogo. Nella guida dedicata spieghiamo quali voci fanno variare il costo.",
  },
  {
    q: "In quali zone raccogliete richieste?",
    a: `Raccogliamo richieste per ${site.serviceArea}. La disponibilità di professionisti può variare da zona a zona: se per la tua non ce ne sono, te lo diciamo con chiarezza.`,
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          websiteNode(),
          webPageNode("/", title, description, { about: { "@id": `${site.url}/#organization` } }),
          breadcrumbNode("/", [{ name: "Home", path: "/" }]),
          offerCatalogNode(servicePages),
          ...servicePages.map(serviceNode),
          faqNode("/", faqs),
        )}
      />
      <Hero />
      <Manifesto />
      <ServiceIndex />
      <div className="h-16 lg:h-28" aria-hidden="true" />
      <ProjectTypes />
      <Process />
      <Coverage />
      <Transparency />
      <Guides />
      <section aria-labelledby="faq-title" className="pb-16 lg:pb-28">
        <div className="wrap grid-12 gap-y-6">
          <div className="col-span-12 lg:col-span-4">
            <TavLabel n="08" label="Domande" />
            <h2 id="faq-title" className="t-h2 mt-4">Domande frequenti</h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
