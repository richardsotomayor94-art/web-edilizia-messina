import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicePages, getServiceById } from "@/config/services";
import { guides } from "@/config/guides";
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
        <div className="container-page py-8 sm:py-12">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 max-w-3xl text-[2rem] sm:text-5xl">{s.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{s.lead}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href={ctaHref} event="cta_click" location="service_hero" service={s.funnelService} className="btn btn-primary">
              Richiedi un preventivo per {s.cardTitle.toLowerCase()} <Icon name="arrow" />
            </TrackedLink>
          </div>
          <p className="mt-3 text-sm text-muted">Gratuito e senza impegno · puoi allegare foto del lavoro</p>
        </div>
      </section>

      <div className="container-page grid gap-12 py-10 lg:grid-cols-[1fr_320px]">
        <article className="prose-page min-w-0">
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
          <p>
            Non pubblichiamo prezzi standard: per questo tipo di lavoro il costo reale dipende da molte variabili che solo un
            sopralluogo può valutare. Ecco le principali, utili anche per confrontare i preventivi:
          </p>
          <ul>
            {s.costFactors.map((c) => (
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

          <h3>Permessi e pratiche</h3>
          <p>{s.permitsNote}</p>
          <p className="text-sm">
            Vedi anche la guida <Link href="/guide/cila-quando-serve/">CILA: quando serve</Link>. Le informazioni hanno
            carattere generale e non sostituiscono il parere di un tecnico abilitato.
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

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-card)] border border-stone bg-white p-5">
            <h2 className="font-sans text-lg font-bold">Preventivo per {s.cardTitle.toLowerCase()}</h2>
            <p className="mt-1 text-sm text-muted">Rispondi a 7 brevi domande. Ti ricontattano professionisti di zona.</p>
            <TrackedLink href={ctaHref} event="cta_click" location="service_sidebar" service={s.funnelService} className="btn btn-primary mt-4 w-full">
              Inizia ora
            </TrackedLink>
          </div>
          {related.length > 0 && (
            <nav aria-labelledby="rel-title" className="rounded-[var(--radius-card)] border border-stone bg-white p-5">
              <h2 id="rel-title" className="font-sans text-sm font-bold uppercase tracking-wider text-muted">
                Lavori collegati
              </h2>
              <ul className="mt-3 space-y-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link href={r.path} className="text-sea underline-offset-2 hover:underline">
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
        <CtaBanner
          title={`Pronto a partire con ${s.cardTitle.toLowerCase()}?`}
          text="Una richiesta, nessun costo per te. Inoltriamo la richiesta solo a professionisti locali per questo servizio."
          service={s.funnelService}
          location="service_bottom"
        />
      </div>
    </>
  );
}
