import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicePages, getServiceById } from "@/config/services";
import { guides, LOCAL_GUIDE_PATH } from "@/config/guides";
import { IMAGE_NOTE, serviceMedia } from "@/config/media";
import { CTA_LABEL, site } from "@/config/site";
import { pageMetadata, graph, organizationNode, websiteNode, webPageNode, serviceNode, breadcrumbNode, faqNode, ids } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { HowItWorks } from "@/components/HowItWorks";
import { CtaBanner } from "@/components/CtaBanner";
import { TrackedLink } from "@/components/TrackedLink";
import { TrackView } from "@/components/TrackView";
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
  const number = String(servicePages.indexOf(s) + 1).padStart(2, "0");
  const img = serviceMedia[s.id];

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
      <TrackView service={s.funnelService} />

      <section className="border-b border-ink">
        <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="frame order-first aspect-[16/9] lg:order-last lg:aspect-auto lg:min-h-[38rem]">
            <Image src={img.src} alt={img.alt} fill priority sizes={img.src.width > img.src.height ? "(min-width: 1024px) 85vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"} quality={70} />
          </div>
          <div className="px-[clamp(1.25rem,4.5vw,4.5rem)] pb-8 pt-5 lg:flex lg:flex-col lg:justify-end lg:pb-14 lg:pt-16">
            <Breadcrumbs items={crumbs} />
            <p className="t-label mt-5 text-clay-dark">Lavoro {number} · <em className="not-italic">{site.city}</em></p>
            <h1 className="t-h1 mt-3 lg:!text-[clamp(3rem,5.2vw,5rem)]">{s.h1}</h1>
            <p className="t-lead mt-4 max-w-xl text-ink-soft">{s.lead}</p>
            <div data-hero-cta className="mt-6">
              <TrackedLink href={ctaHref} event="cta_click" location="service_hero" service={s.funnelService} className="btn btn-primary w-full text-lg sm:w-auto">
                {CTA_LABEL} <Icon name="arrow" />
              </TrackedLink>
              <p className="mt-2 text-sm text-muted">Gratis e senza impegno · puoi allegare foto del lavoro</p>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap py-10 lg:py-16">
        <div className="grid-12 gap-y-10">
          <aside aria-label="Azioni e lavori collegati" className="order-last col-span-12 lg:order-first lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="hidden lg:block">
                <p className="font-display text-2xl leading-tight">Vuoi un preventivo?</p>
                <p className="mt-1 text-sm text-muted">Poche domande, fino a 3 professionisti di zona.</p>
                <TrackedLink href={ctaHref} event="cta_click" location="service_sidebar" service={s.funnelService} className="btn btn-primary mt-3 w-full">
                  {CTA_LABEL}
                </TrackedLink>
              </div>
              {related.length > 0 && (
                <nav aria-labelledby="rel-title" className="lg:mt-10">
                  <h2 id="rel-title" className="t-label font-sans text-muted">Lavori collegati</h2>
                  <ul className="mt-2 border-b border-stone">
                    {related.map((r) => (
                      <li key={r.id} className="border-t border-stone">
                        <Link href={r.path} className="flex min-h-11 items-center justify-between gap-2 py-1 font-display text-xl hover:text-clay-dark">
                          {r.cardTitle} <Icon name="arrow" size={16} className="text-clay" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </aside>

          <article className="prose-page col-span-12 min-w-0 lg:col-span-7 lg:col-start-5">
            <div className="not-prose border-t-2 border-ink pt-3">
              <h2 className="t-label font-sans text-clay-dark">In breve</h2>
              <p className="mt-3 font-display text-[1.65rem] leading-[1.22] text-ink lg:text-[2.1rem]">{s.answer}</p>
            </div>

            <div className="prose-chapters">
              <h2>Cosa comprende</h2>
              <ul className="sm:columns-2 sm:gap-8">
                {s.includes.map((i) => (
                  <li key={i} className="break-inside-avoid">{i}</li>
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

              <h2>Cosa sapere a <em>{site.city}</em></h2>
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
            </div>
            <p className="caption mt-6">{IMAGE_NOTE}</p>
          </article>
        </div>
      </div>

      <div className="wrap">
        <CtaBanner title="Pronto a partire?" text="Una sola richiesta, nessun costo per te. La inoltriamo solo a professionisti locali per questo servizio." service={s.funnelService} location="service_bottom" />
      </div>
    </>
  );
}
