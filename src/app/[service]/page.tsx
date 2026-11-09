import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicePages, getServiceById } from "@/config/services";
import { guides, LOCAL_GUIDE_PATH } from "@/config/guides";
import { site } from "@/config/site";
import { pageMetadata, graph, organizationNode, websiteNode, webPageNode, serviceNode, breadcrumbNode, faqNode, ids } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { HowItWorks } from "@/components/HowItWorks";
import { CtaBanner } from "@/components/CtaBanner";
import { TrackedLink } from "@/components/TrackedLink";
import { Icon } from "@/components/Icon";

export const dynamicParams = false;

const slugOf = (path: string) => path.replace(/^\/|\/$/g, "");

export function generateStaticParams() {
  return servicePages.map((s) => ({ service: slugOf(s.path) }));
}

function find(slug: string) {
  return servicePages.find((s) => slugOf(s.path) === slug);
}

export async function generateMetadata(props: PageProps<"/[service]">): Promise<Metadata> {
  const { service } = await props.params;
  const s = find(service);
  if (!s) return {};
  return pageMetadata({ title: s.title, description: s.metaDescription, path: s.path });
}

export default async function ServicePageView(props: PageProps<"/[service]">) {
  const { service } = await props.params;
  const s = find(service);
  if (!s) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: s.cardTitle, path: s.path },
  ];
  const related = s.related.map(getServiceById).filter((r): r is NonNullable<typeof r> => !!r);
  const guide = s.guide ? guides.find((g) => g.path === s.guide) : undefined;
  const ctaHref = `/preventivo/?servizio=${s.funnelService}`;

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          websiteNode(),
          webPageNode(s.path, s.title, s.metaDescription, { mainEntity: { "@id": ids.service(s.id) } }),
          serviceNode(s),
          breadcrumbNode(s.path, crumbs),
          faqNode(s.path, s.faqs),
        )}
      />
      <section className="blueprint border-b border-stone">
        <div className="container-page py-6 sm:py-12">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-3 max-w-3xl text-[1.9rem] sm:text-5xl">{s.h1}</h1>
          <p className="mt-3 max-w-2xl text-ink-soft sm:text-lg">{s.lead}</p>
          <div data-hero-cta className="mt-5">
            <TrackedLink href={ctaHref} event="cta_click" location="service_hero" service={s.funnelService} className="btn btn-primary w-full text-lg sm:w-auto">
              {s.ctaLabel} <Icon name="arrow" />
            </TrackedLink>
            <p className="mt-2 text-sm text-muted">Gratis e senza impegno · puoi allegare foto del lavoro</p>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-10 py-8 lg:grid-cols-[1fr_320px] lg:gap-14 lg:py-12">
        <article className="prose-page min-w-0">
          <div className="not-prose border-l-4 border-sea bg-white p-4 sm:p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-sea">In breve</h2>
            <p className="mt-2 text-ink">{s.answer}</p>
          </div>

          <h2>Cosa comprende</h2>
          <ul className="!list-none !pl-0 grid gap-2 sm:grid-cols-2">
            {s.includes.map((i) => (
              <li key={i} className="flex gap-2">
                <Icon name="check" className="mt-1 shrink-0 text-ok" /> <span>{i}</span>
              </li>
            ))}
          </ul>

          <h2>{s.whenTitle}</h2>
          <ul>
            {s.when.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>

          <h2>Da cosa dipende il costo</h2>
          <p>Non pubblichiamo prezzi standard: il costo reale dipende da variabili che solo un sopralluogo può valutare. Ecco le principali.</p>
          <ul>
            {s.costFactors.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          <h2>Cosa deve contenere il preventivo</h2>
          <p>Prima di firmare, controlla che siano indicati per iscritto:</p>
          <ul>
            {s.quoteChecklist.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          {guide && (
            <p>
              Approfondisci: <Link href={guide.path}>{guide.title}</Link>.
            </p>
          )}

          <h2>Cosa sapere a {site.city}</h2>
          <ul>
            {s.messinaNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p>
            Vincoli e verifiche cambiano da zona a zona: leggi <Link href={LOCAL_GUIDE_PATH}>cosa controllare prima dei lavori a Messina</Link>.
          </p>

          <h3>Permessi e pratiche</h3>
          <p>{s.permitsNote}</p>
          <p className="text-sm">
            Vedi anche la guida <Link href="/guide/cila-quando-serve/">CILA: quando serve</Link>. Le informazioni hanno carattere generale e non sostituiscono il parere di un tecnico abilitato.
          </p>

          <h2>Come funziona la richiesta</h2>
          <div className="not-prose">
            <HowItWorks compact />
          </div>

          <h2>Domande frequenti</h2>
          <div className="not-prose">
            <FaqList faqs={s.faqs} />
          </div>
        </article>

        <aside aria-label="Azioni e lavori collegati" className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="hidden rounded-[var(--radius-card)] border border-stone bg-white p-5 lg:block">
            <h2 className="text-lg font-bold tracking-normal">Vuoi un preventivo?</h2>
            <p className="mt-1 text-sm text-muted">Rispondi a poche domande. Inoltriamo la richiesta a un massimo di 3 professionisti di zona.</p>
            <TrackedLink href={ctaHref} event="cta_click" location="service_sidebar" service={s.funnelService} className="btn btn-primary mt-4 w-full">
              Inizia ora
            </TrackedLink>
          </div>
          {related.length > 0 && (
            <nav aria-labelledby="rel-title">
              <h2 id="rel-title" className="text-sm font-bold uppercase tracking-wider text-muted">Lavori collegati</h2>
              <ul className="mt-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link href={r.path} className="flex min-h-11 items-center text-sea underline-offset-2 hover:underline">
                      {r.cardTitle} a {site.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>

      <div className="container-page">
        <CtaBanner title="Pronto a partire?" text="Una sola richiesta, nessun costo per te. La inoltriamo solo a professionisti locali per questo servizio." label={s.ctaLabel} service={s.funnelService} location="service_bottom" />
      </div>
    </>
  );
}
