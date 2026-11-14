import { site } from "@/config/site";
import { servicePages } from "@/config/services";
import { pageMetadata, graph, organizationNode, websiteNode, webPageNode, faqNode, offerCatalogNode, serviceNode } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { Hero } from "@/components/home/Hero";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { Coverage, FinalCta, Guides, Manifesto, Process, ProjectTypes, Transparency } from "@/components/home/Sections";
import { TavLabel } from "@/components/TavLabel";

// "Ristrutturazioni" resta riservato alla landing dedicata: vedi docs/LOCAL-SEO-EXPANSION.md
const title = "Preventivi per lavori in casa a Messina";
const description =
  "Ristrutturazioni, bagni, cucine, pavimenti, impianti, facciate e terrazzi a Messina. Una sola richiesta, gratuita, per un massimo di 3 professionisti locali.";

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
    a: "Per chi richiede il preventivo è gratuito e senza impegno. Preventivi, prezzi e contratti dei lavori riguardano te e il professionista che scegli.",
  },
  {
    q: "Quali lavori posso richiedere?",
    a: "Ristrutturazioni complete, bagni, cucine, cartongesso, pittura, impianti, pavimenti, facciate, impermeabilizzazione di terrazzi e cappotto termico. Per altri lavori in casa scegli «Altro» e descrivili nel modulo.",
  },
  {
    q: "Chi fa il sopralluogo e il preventivo?",
    a: `I professionisti a cui inoltriamo la richiesta: concordano con te sopralluogo e preventivo scritto. Chiedi prima se il sopralluogo è gratuito. ${site.name} non fa sopralluoghi e non emette preventivi.`,
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
          // In home un breadcrumb di un solo elemento non aggiunge nulla
          webPageNode("/", title, description, { about: { "@id": `${site.url}/#organization` }, breadcrumb: undefined }),
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
      <section aria-labelledby="faq-title" className="cv-auto pb-16 lg:pb-28">
        <div className="wrap grid-12 gap-y-6">
          <div className="col-span-12 lg:col-span-4">
            <div className="stick">
              <TavLabel n="08" label="Domande" />
              <h2 id="faq-title" className="t-h2 mt-4">Domande frequenti</h2>
            </div>
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
