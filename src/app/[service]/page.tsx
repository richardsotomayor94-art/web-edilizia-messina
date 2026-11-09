import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicePages, getServiceById } from "@/config/services";
import { guides } from "@/config/guides";
import { serviceMedia } from "@/config/media";
import { DARK_GROUNDS, experience, type Ground, type SectionKey } from "@/config/service-experience";
import { pageMetadata, graph, organizationNode, websiteNode, webPageNode, serviceNode, breadcrumbNode, faqNode, ids } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { TrackView } from "@/components/TrackView";
import { ServiceHero } from "@/components/service/ServiceHero";
import { Band } from "@/components/service/Band";
import { Stage } from "@/components/service/Stage";
import { ChapterRail, ReadProgress } from "@/components/service/ChapterRail";
import { Answer, Cost, Decision, Faqs, Feature, Local, Process, Scope, ServiceClosing, Transform, Visual } from "@/components/service/Blocks";

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

const LABELS: Partial<Record<SectionKey, string>> = {
  answer: "In breve",
  scope: "Cosa comprende",
  transform: "Trasformazione",
  feature: "Chiavi in mano",
  decision: "Quando",
  cost: "Costi",
  local: "Messina",
  process: "La richiesta",
  faq: "Domande",
};

export default async function ServicePageView(props: PageProps<"/[service]">) {
  const { service } = await props.params;
  const s = find(service);
  if (!s) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: s.cardTitle, path: s.path },
  ];
  const x = experience[s.id];
  const related = s.related.map(getServiceById).filter((r): r is NonNullable<typeof r> => !!r);
  const serviceGuides = [s.guide, ...(s.moreGuides ?? [])].map((p) => guides.find((g) => g.path === p)).filter((g): g is NonNullable<typeof g> => !!g);
  const ctaHref = `/preventivo/?servizio=${s.funnelService}`;
  const number = String(servicePages.indexOf(s) + 1).padStart(2, "0");

  const idOf = (key: SectionKey) => (key === "stage" ? "scelta" : key);
  const labelOf = (key: SectionKey) => (key === "stage" ? x.stage.label : key === "feature" && x.feature ? x.feature.label : (LABELS[key] ?? key));
  const chapterKeys = x.sections.map((sec) => sec.key).filter((key) => key !== "visual");
  const chapters = chapterKeys.map((key) => ({ id: idOf(key), label: labelOf(key) }));
  const numbered: SectionKey[] = chapterKeys.filter((key) => key !== "answer");

  const body = x.sections.map(({ key, ground, seam }, index) => {
    const from: Ground = index === 0 ? x.ground : x.sections[index - 1].ground;
    if (key === "visual") return <Visual key={key} visual={x.visual} />;

    const id = idOf(key);
    const label = labelOf(key);
    const n = numbered.indexOf(key) + 1;
    const title = `${id}-t`;

    const inner = {
      answer: <Answer id={id} s={s} facts={x.facts} />,
      stage: <Stage id={id} stage={x.stage} n={n} flip={x.flip} surface={x.surface} plate={x.plate ? ctaHref : undefined} service={s.funnelService} />,
      scope: <Scope id={id} s={s} img={x.scopeImg} n={n} flip={x.flip} surface={x.surface} />,
      transform: x.transform ? <Transform id={id} t={x.transform} n={n} /> : null,
      decision: <Decision id={id} s={s} compare={x.compare} layers={x.layers} n={n} />,
      feature: x.feature ? <Feature id={id} feature={x.feature} n={n} /> : null,
      cost: <Cost id={id} s={s} guides={serviceGuides} n={n} href={ctaHref} />,
      local: <Local id={id} s={s} n={n} />,
      process: <Process id={id} n={n} />,
      faq: <Faqs id={id} s={s} related={related} n={n} />,
    }[key];

    return (
      <Band key={key} id={id} ground={ground} prev={from} seam={seam} chapter={label} labelledBy={title} fade={seam !== "tooth" && DARK_GROUNDS.includes(ground) === DARK_GROUNDS.includes(from)} className={key === "decision" && x.layers ? "ar-ground-grid" : ""}>
        {inner}
      </Band>
    );
  });

  return (
    <div data-service={s.id}>
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
      <ReadProgress />
      <ServiceHero s={s} x={x} img={serviceMedia[s.id]} number={number} crumbs={crumbs} href={ctaHref} />
      {body}
      <ChapterRail items={chapters} />
      <ServiceClosing closing={x.closing} href={ctaHref} service={s.funnelService} surface={x.surface} flip={x.flip} motif={x.motif} />
    </div>
  );
}
