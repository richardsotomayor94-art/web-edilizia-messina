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
  "Ristrutturazioni, bagni, cucine, pavimenti, impianti, facciate e terrazzi a Messina: richiesta gratuita, un'impresa specializzata con partita IVA e fattura.";

export const metadata = { ...pageMetadata({ title, description, path: "/" }), title: { absolute: `${title} | ${site.name}` } };

const faqs = [
  {
    q: `Che cos'è ${site.name}?`,
    a: `${site.name} è un servizio di contatto gratuito: ci racconti il lavoro che serve a casa tua e ti mettiamo in comunicazione con un'impresa specializzata in quel tipo di intervento, a Messina e provincia. Non è un'impresa edile, non esegue lavori e non fa preventivi.`,
  },
  // FAQ del proprietario (2026-11-14), più lavori e zone per chi cerca
  {
    q: "Quanto costa la richiesta?",
    a: "Niente. Il servizio di contatto è gratuito e senza impegno; paghi solo il lavoro all'impresa, se accetti il suo preventivo.",
  },
  { q: "Chi fa il preventivo?", a: "L'impresa, dopo il sopralluogo. Noi non facciamo preventivi e non abbiamo listini." },
  {
    q: "Le imprese rilasciano fattura?",
    a: "Sì, sempre. È il primo requisito per collaborare con noi: solo imprese con partita IVA che emettono regolare fattura, anche per poter usare le detrazioni fiscali quando spettano.",
  },
  {
    q: "Le imprese sono verificate?",
    a: "Le selezioniamo per specializzazione, zona e requisito di fattura, e parliamo con loro prima di passarti il contatto. Abilitazioni, DURC, assicurazioni e garanzie te li mostra direttamente l'impresa: chiedili sempre prima di firmare il preventivo.",
  },
  {
    q: "Mandate anche piccoli artigiani o tuttofare?",
    a: "No. Solo imprese e artigiani con partita IVA, specializzati nel lavoro richiesto e con squadre e attrezzature proprie.",
  },
  {
    q: "E se non avete nessuno per il mio lavoro?",
    a: "Lo cerchiamo noi: un nostro collaboratore sul territorio individua un'impresa di quel settore e ti ricontattiamo. Se non la troviamo, te lo diciamo chiaramente.",
  },
  {
    q: "Quanto tempo ci vuole?",
    a: "Dipende dalla disponibilità dell'impresa: te la confermiamo al primo contatto, senza promettere tempi che non dipendono da noi.",
  },
  {
    q: "Chi riceve i miei dati?",
    a: "Il nostro collaboratore sul territorio di Messina, che gestisce le richieste e ti ricontatta, e l'impresa che prende in carico il lavoro, che li usa come titolare autonomo per il sopralluogo e il preventivo. Nessun altro: non vendiamo, non cediamo e non usiamo i tuoi dati per pubblicità.",
  },
  {
    q: "Quali lavori posso richiedere?",
    a: "Ristrutturazioni complete, bagni, cucine, cartongesso, pittura, impianti, pavimenti, facciate, impermeabilizzazione di terrazzi e cappotto termico. Per altri lavori in casa scegli «Altro» e descrivili nel modulo.",
  },
  {
    q: "In quali zone raccogliete richieste?",
    a: `A ${site.serviceArea}. Se per il tuo lavoro in zona non abbiamo un'impresa, la cerchiamo noi; se non la troviamo, te lo diciamo.`,
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
