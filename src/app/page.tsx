import Link from "next/link";
import { site } from "@/config/site";
import { servicePages } from "@/config/services";
import { guides, LOCAL_GUIDE_PATH } from "@/config/guides";
import { pageMetadata, graph, organizationNode, websiteNode, webPageNode, faqNode, offerCatalogNode, serviceNode, breadcrumbNode } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ServicePlan } from "@/components/ServicePlan";
import { HowItWorks } from "@/components/HowItWorks";
import { FaqList } from "@/components/FaqList";
import { CtaBanner } from "@/components/CtaBanner";
import { Icon } from "@/components/Icon";

const title = "Ristrutturazioni e lavori in casa a Messina";
const description =
  "Ristrutturazioni, bagni, cucine, cartongesso, pittura, impianti e pavimenti a Messina. Una sola richiesta, gratuita, per un massimo di 3 professionisti locali.";

export const metadata = { ...pageMetadata({ title, description, path: "/" }), title: { absolute: `${title} | ${site.name}` } };

const faqs = [
  {
    q: `Come funziona ${site.name}?`,
    a: "Compili una richiesta guidata con lavoro, immobile, metratura, tempi e zona. La verifichiamo e, con il tuo consenso, la inoltriamo a un massimo di 3 imprese o artigiani locali disponibili, che ti contattano per un sopralluogo e un preventivo.",
  },
  {
    q: "Quanto costa il servizio?",
    a: "Per chi richiede il preventivo è gratuito e senza impegno. Il servizio è sostenuto dai professionisti partner, come spiegato nella pagina Come funziona.",
  },
  {
    q: "Siete un'impresa edile?",
    a: "No. Non eseguiamo lavori: raccogliamo e qualifichiamo le richieste e le inoltriamo a imprese e artigiani indipendenti. Il contratto per i lavori lo firmi direttamente con il professionista che scegli.",
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

const promises = [
  { big: "0 €", t: "per chi chiede il preventivo", d: "Il servizio è sostenuto dai professionisti partner." },
  { big: "Max 3", t: "professionisti per richiesta", d: "Solo per quel servizio e quella zona. Mai liste infinite." },
  { big: "Nessun", t: "obbligo di accettare", d: "Confronti i preventivi e decidi tu, anche di non scegliere nessuno." },
];

const localNotes = [
  { t: "Zona sismica 1", d: "Il Comune di Messina è classificato in zona sismica 1: ogni intervento su muri portanti o solai richiede un tecnico abilitato e la pratica adeguata." },
  { t: "La città ricostruita dopo il 1908", d: "Il centro è stato ricostruito sulla maglia a isolati del Piano Borzì. Prima di progettare, fai verificare lo stato reale di impianti e solai." },
  { t: "Costa, laghi e Riserva", d: "A Ganzirri, Torre Faro e nelle aree costiere possono servire autorizzazione paesaggistica e, nella Riserva di Capo Peloro, il parere dell'ente gestore." },
  { t: "Rischio idrogeologico", d: "Dopo l'alluvione del 2009 nella zona sud, il promemoria vale per tutti: prima dei lavori il tecnico verifica nel PAI la pericolosità del lotto." },
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

      <section className="blueprint-dark text-white">
        <div className="container-page grid gap-6 py-6 sm:py-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14 lg:py-16">
          <div>
            <h1 className="text-[1.9rem] sm:text-5xl">Ristrutturazioni a Messina: descrivi il lavoro una volta sola</h1>
            <p className="mt-3 max-w-xl text-white/85 sm:text-lg">
              Inoltriamo la tua richiesta a un massimo di 3 imprese o artigiani della zona, per un sopralluogo e un preventivo scritto.
            </p>
          </div>
          <div data-hero-cta>
            <h2 className="mb-2 text-lg font-bold tracking-normal">Che lavoro devi fare?</h2>
            <ServicePlan location="home_plan" />
            <p className="mt-3 flex items-center gap-2 text-sm text-white/85">
              <Icon name="check" size={18} className="shrink-0 text-citrus" /> Gratis e senza impegno per chi chiede il preventivo
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Cosa puoi aspettarti" className="border-b border-stone bg-white">
        <dl className="container-page grid gap-6 py-8 sm:grid-cols-3 sm:gap-10">
          {promises.map((p) => (
            <div key={p.t}>
              <dt>
                <span className="block text-3xl font-bold text-sea">{p.big}</span>
                <span className="font-semibold">{p.t}</span>
              </dt>
              <dd className="mt-1 text-[0.95rem] text-muted">{p.d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="container-page">
        <section id="servizi" className="section" aria-labelledby="servizi-title">
          <h2 id="servizi-title" className="section-title">Lavori per cui puoi chiedere un preventivo</h2>
          <p className="mb-6 mt-2 max-w-2xl text-ink-soft">
            Ogni pagina spiega cosa comprende il lavoro, cosa fa variare il costo e cosa sapere sui permessi a Messina.
          </p>
          <ServiceGrid />
        </section>

        <section className="pb-12 lg:pb-16" aria-labelledby="come-title">
          <h2 id="come-title" className="section-title">Come funziona, in 4 passaggi</h2>
          <div className="mt-6">
            <HowItWorks />
          </div>
          <p className="mt-6">
            <Link href="/come-funziona/" className="font-semibold text-sea underline underline-offset-2">Leggi nel dettaglio come funziona</Link>
          </p>
        </section>
      </div>

      <section className="border-y border-stone bg-sand/60" aria-labelledby="locale-title">
        <div className="container-page section grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div>
            <h2 id="locale-title" className="section-title">Ristrutturare a Messina ha regole proprie</h2>
            <p className="mt-3 text-ink-soft">Quattro cose da sapere prima di aprire il cantiere, con le verifiche da fare zona per zona.</p>
            <Link href={LOCAL_GUIDE_PATH} className="mt-4 inline-block font-semibold text-sea underline underline-offset-2">Leggi la guida sulla città</Link>
          </div>
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {localNotes.map((n) => (
              <li key={n.t} className="border-t-2 border-sea pt-3">
                <h3 className="text-lg font-bold">{n.t}</h3>
                <p className="mt-1 text-[0.95rem] text-ink-soft">{n.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-page">
        <section className="section grid gap-8 lg:grid-cols-2 lg:gap-14" aria-labelledby="trasp-title">
          <div>
            <h2 id="trasp-title" className="section-title">Chi siamo, senza giri di parole</h2>
            <p className="mt-3 text-ink-soft">
              {site.name} ti aiuta a trovare imprese e artigiani per il tuo progetto a {site.city}. Non siamo un&apos;impresa edile e non eseguiamo lavori: raccogliamo la tua richiesta, la verifichiamo e la condividiamo con professionisti indipendenti.
            </p>
            <p className="mt-3 text-ink-soft">
              Non pubblichiamo recensioni, numeri o foto di lavori che non possiamo dimostrare. Quando avremo lavori reali documentati, con il consenso dei clienti, li mostreremo qui.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Prima di inviare sai sempre</h3>
            <ul className="mt-3 space-y-3 text-ink-soft">
              {[
                "Quante imprese riceveranno la richiesta: al massimo 3.",
                "Chi sostiene il servizio: i professionisti partner, non tu.",
                "Con chi firmi il contratto: direttamente con il professionista.",
                "Che i tuoi dati non vengono venduti a terzi per pubblicità.",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <Icon name="check" className="mt-1 shrink-0 text-ok" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pb-12 lg:pb-16" aria-labelledby="guide-title">
          <h2 id="guide-title" className="section-title">Prima di chiedere un preventivo</h2>
          <ul className="mt-6 grid gap-x-10 border-b border-stone md:grid-cols-2">
            {guides.map((g) => (
              <li key={g.path} className="border-t border-stone">
                <Link href={g.path} className="group block h-full py-5">
                  <span className="block text-lg font-bold leading-snug group-hover:underline">{g.title}</span>
                  <span className="mt-1 block text-[0.95rem] text-muted">{g.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="pb-12 lg:pb-16" aria-labelledby="faq-title">
          <h2 id="faq-title" className="section-title">Domande frequenti</h2>
          <div className="mt-5">
            <FaqList faqs={faqs} />
          </div>
        </section>

        <CtaBanner location="home_bottom" />

        <section className="mt-6 flex flex-col gap-3 border-b border-stone pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-normal">Sei un&apos;impresa o un artigiano di Messina?</h2>
            <p className="text-sm text-muted">Candidati per ricevere richieste di lavoro nella tua zona.</p>
          </div>
          <Link href="/diventa-partner/" className="btn btn-secondary">Diventa partner</Link>
        </section>
      </div>
    </>
  );
}
