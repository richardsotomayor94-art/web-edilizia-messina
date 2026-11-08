import Link from "next/link";
import { site, whatsappLink } from "@/config/site";
import { servicePages } from "@/config/services";
import { SERVICE_OPTIONS } from "@/lib/lead-options";
import { pageMetadata, graph, organizationNode, websiteNode, webPageNode, faqNode, offerCatalogNode, serviceNode, breadcrumbNode } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ServiceGrid } from "@/components/ServiceGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { FaqList } from "@/components/FaqList";
import { CtaBanner } from "@/components/CtaBanner";
import { TrustPoints } from "@/components/TrustPoints";
import { TrackedLink } from "@/components/TrackedLink";
import { Icon } from "@/components/Icon";
import { guides } from "@/config/guides";

const title = "Ristrutturazioni e lavori edili a Messina: richiedi un preventivo";
const description =
  "Trova professionisti per ristrutturazioni, bagni, cucine, cartongesso, pittura, impianti e pavimenti a Messina. Una sola richiesta, gratuita: ti mettiamo in contatto con imprese locali.";

export const metadata = { ...pageMetadata({ title, description, path: "/" }), title: { absolute: `${site.name} – ${title}` } };

const faqs = [
  {
    q: "Chi può fare una ristrutturazione a Messina?",
    a: "Imprese edili e artigiani regolarmente iscritti alla Camera di Commercio; per gli impianti servono imprese abilitate (DM 37/2008) e per i lavori soggetti a pratica edilizia un tecnico abilitato. Con una richiesta su questo sito ti mettiamo in contatto con professionisti locali disponibili per il tuo lavoro.",
  },
  {
    q: `Come funziona ${site.name}?`,
    a: "Compili una richiesta guidata (lavoro, immobile, metratura, tempi, zona). Verifichiamo la richiesta e, con il tuo consenso, la inoltriamo a un numero limitato di imprese o artigiani locali che ti ricontattano per un sopralluogo e un preventivo.",
  },
  {
    q: "Quanto costa il servizio?",
    a: "Per chi richiede il preventivo il servizio è gratuito e senza impegno. Il servizio è sostenuto dai professionisti partner, come spiegato nella pagina Come funziona.",
  },
  {
    q: "Siete un'impresa edile?",
    a: "No. Non eseguiamo direttamente i lavori: raccogliamo e qualifichiamo le richieste e le inoltriamo a imprese e artigiani indipendenti. Il contratto per i lavori lo firmi direttamente con il professionista che scegli.",
  },
  {
    q: "Quanto costa ristrutturare un appartamento a Messina?",
    a: "Non esiste un prezzo valido per tutti: dipende da metratura, stato degli impianti, finiture e pratiche necessarie. Un preventivo affidabile si ottiene solo dopo un sopralluogo. Nella guida dedicata spieghiamo quali voci fanno variare il costo.",
  },
  {
    q: "In quali zone raccogliete richieste?",
    a: `Raccogliamo richieste per ${site.serviceArea}. La disponibilità di professionisti può variare da zona a zona: se per la tua zona non abbiamo partner disponibili te lo diciamo con chiarezza.`,
  },
];

export default function HomePage() {
  const wa = whatsappLink("Ciao, vorrei informazioni per un lavoro a Messina");
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

      {/* HERO */}
      <section className="blueprint border-b border-stone">
        <div className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-20">
          <div>
            <p className="eyebrow">Messina e provincia</p>
            <h1 className="mt-3 text-[2.15rem] sm:text-5xl lg:text-[3.4rem]">
              Trova professionisti per ristrutturazioni e lavori edili a Messina
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-soft">
              Ristrutturazioni, bagni, cucine, cartongesso, pittura, impianti e pavimenti. Descrivi il lavoro una volta: ti
              mettiamo in contatto con imprese e artigiani locali per un sopralluogo e un preventivo.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink href="/preventivo/" event="cta_click" location="hero" className="btn btn-primary text-lg">
                Richiedi un preventivo <Icon name="arrow" />
              </TrackedLink>
              {wa ? (
                <TrackedLink href={wa} event="whatsapp_click" location="hero" className="btn btn-secondary" external>
                  <Icon name="chat" /> Scrivici su WhatsApp
                </TrackedLink>
              ) : (
                <TrackedLink href="/come-funziona/" event="cta_click" location="hero_secondary" className="btn btn-secondary">
                  Come funziona
                </TrackedLink>
              )}
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Icon name="check" className="text-ok" /> Gratis per chi chiede il preventivo · senza impegno · 2 minuti
            </p>
          </div>

          {/* Avvio rapido del funnel: lo step 1 direttamente in pagina */}
          <div className="rounded-[var(--radius-card)] border border-stone bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold text-sea">Passo 1 di 8</p>
            <h2 className="mt-1 font-sans text-xl font-bold">Che lavoro devi fare?</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {SERVICE_OPTIONS.map((o) => (
                <li key={o.value}>
                  <Link
                    href={`/preventivo/?servizio=${o.value}`}
                    className="flex min-h-12 items-center rounded-lg border border-stone px-3 py-2 text-sm font-medium hover:border-sea hover:bg-sea-soft"
                  >
                    {o.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">Prosegui con immobile, metratura, tempi e zona. Puoi allegare foto.</p>
          </div>
        </div>
      </section>

      <div className="container-page">
        <section aria-label="Perché usare il servizio" className="py-10">
          <TrustPoints />
        </section>

        <section id="servizi" className="py-10" aria-labelledby="servizi-title">
          <p className="eyebrow">Servizi</p>
          <h2 id="servizi-title" className="mt-2 text-3xl sm:text-4xl">Lavori per cui puoi chiedere un preventivo</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Ogni pagina spiega cosa comprende il lavoro, cosa fa variare il costo e cosa sapere sui permessi a Messina.
          </p>
          <div className="mt-6">
            <ServiceGrid />
          </div>
        </section>

        <section className="py-10" aria-labelledby="come-title">
          <p className="eyebrow">Come funziona</p>
          <h2 id="come-title" className="mt-2 text-3xl sm:text-4xl">Dalla richiesta al sopralluogo in 4 passaggi</h2>
          <div className="mt-6">
            <HowItWorks />
          </div>
          <p className="mt-4 text-sm">
            <Link href="/come-funziona/" className="font-semibold text-sea underline underline-offset-2">
              Leggi nel dettaglio come funziona e come selezioniamo i professionisti
            </Link>
          </p>
        </section>

        <section className="grid gap-8 py-10 lg:grid-cols-2" aria-labelledby="trasp-title">
          <div>
            <p className="eyebrow">Trasparenza</p>
            <h2 id="trasp-title" className="mt-2 text-3xl">Chi siamo, in una frase</h2>
            <p className="mt-3 text-ink-soft">
              {site.name} è un servizio che ti aiuta a trovare professionisti e imprese locali per il tuo progetto a {site.city}.
              Non siamo un&apos;impresa edile e non eseguiamo lavori: raccogliamo la tua richiesta, la qualifichiamo e la
              condividiamo con professionisti indipendenti adatti al tuo lavoro.
            </p>
            <p className="mt-3 text-ink-soft">
              Non pubblichiamo recensioni, numeri o foto di lavori che non possiamo dimostrare. Quando avremo lavori reali
              documentati dai partner, con il consenso dei clienti, li mostreremo qui.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-stone bg-white p-6">
            <h3 className="font-sans text-lg font-bold">Cosa puoi aspettarti</h3>
            <ul className="mt-3 space-y-3 text-ink-soft">
              {[
                "Una richiesta unica invece di chiamare dieci imprese.",
                "Domande mirate, così il professionista arriva al sopralluogo già informato.",
                "Possibilità di allegare foto e planimetrie in modo riservato.",
                "Nessuna vendita dei tuoi dati a terzi per pubblicità.",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <Icon name="check" className="mt-1 shrink-0 text-ok" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-10" aria-labelledby="guide-title">
          <p className="eyebrow">Guide</p>
          <h2 id="guide-title" className="mt-2 text-3xl">Prima di chiedere un preventivo</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {guides.map((g) => (
              <li key={g.path}>
                <Link href={g.path} className="block h-full rounded-[var(--radius-card)] border border-stone bg-white p-5 hover:border-sea">
                  <span className="font-display text-lg">{g.title}</span>
                  <span className="mt-2 block text-sm text-muted">{g.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="py-10" aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-3xl">Domande frequenti</h2>
          <div className="mt-6">
            <FaqList faqs={faqs} />
          </div>
        </section>

        <CtaBanner location="home_bottom" />

        <section className="mt-10 rounded-[var(--radius-card)] border border-stone bg-white p-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="font-sans text-lg font-bold">Sei un&apos;impresa o un artigiano di Messina?</h2>
            <p className="text-sm text-muted">Ricevi richieste di lavoro qualificate nella tua zona.</p>
          </div>
          <Link href="/diventa-partner/" className="btn btn-secondary mt-4 sm:mt-0">
            Diventa partner
          </Link>
        </section>
      </div>
    </>
  );
}
