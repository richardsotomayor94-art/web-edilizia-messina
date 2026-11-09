import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicePages, getServiceById } from "@/config/services";
import { guides } from "@/config/guides";
import { serviceMedia } from "@/config/media";
import { DARK_GROUNDS, experience, type Ground, type Seam, type SectionKey } from "@/config/service-experience";
import { pageMetadata, graph, organizationNode, websiteNode, webPageNode, serviceNode, breadcrumbNode, faqNode, ids } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { TrackView } from "@/components/TrackView";
import { ServiceHero } from "@/components/service/ServiceHero";
import { Band } from "@/components/service/Band";
import { ChapterRail, ReadProgress } from "@/components/service/ChapterRail";
import { PilotAnswer, PilotClosing, PilotCost, PilotDecision, PilotFaqs, PilotLocal, PilotProcess, PilotScope, PilotStage, PilotVisual, Tooth } from "@/components/service/pilot/PilotBlocks";
import { PilotMotion } from "@/components/service/pilot/PilotMotion";
import finito from "@/assets/images/m-pav-finito.jpg";
import "./pilot.css";

/**
 * Pagina pilota del pass visivo: stessi contenuti della landing condivisa (`app/[service]`),
 * ma route propria perché CSS e JS del pass non arrivino alle altre 27 URL.
 */
const PATH = "/pavimenti-messina/";

const service = () => servicePages.find((p) => p.path === PATH);

export function generateMetadata(): Metadata {
  const s = service();
  if (!s) return {};
  return pageMetadata({ title: s.title, description: s.metaDescription, path: s.path });
}

const LABELS: Partial<Record<SectionKey, string>> = {
  answer: "In breve",
  scope: "Cosa comprende",
  decision: "Quando",
  cost: "Costi",
  local: "Messina",
  process: "La richiesta",
  faq: "Domande",
};

/** Ritmo delle materie: stesse sezioni della landing, una sola concessione al cotto nel tratto che era tutto chiaro. */
const PLAN: { key: SectionKey; ground: Ground; seam?: Seam; tooth?: boolean; grid?: boolean }[] = [
  { key: "answer", ground: "intonaco", tooth: true },
  { key: "stage", ground: "lava", seam: "door" },
  { key: "scope", ground: "intonaco" },
  { key: "visual", ground: "lava" },
  { key: "decision", ground: "travertino", tooth: true, grid: true },
  { key: "cost", ground: "calce", seam: "ruler" },
  { key: "local", ground: "sea", seam: "door" },
  { key: "process", ground: "cotto", tooth: true },
  { key: "faq", ground: "calce", tooth: true },
];

export default function PavimentiPage() {
  const s = service();
  if (!s) notFound();
  const x = experience[s.id];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: s.cardTitle, path: s.path },
  ];
  const related = s.related.map(getServiceById).filter((r): r is NonNullable<typeof r> => !!r);
  const serviceGuides = [s.guide, ...(s.moreGuides ?? [])].map((p) => guides.find((g) => g.path === p)).filter((g): g is NonNullable<typeof g> => !!g);
  const ctaHref = `/preventivo/?servizio=${s.funnelService}`;
  const number = String(servicePages.indexOf(s) + 1).padStart(2, "0");

  const idOf = (key: SectionKey) => (key === "stage" ? "scelta" : key);
  const labelOf = (key: SectionKey) => (key === "stage" ? x.stage.label : (LABELS[key] ?? key));
  const chapterKeys = PLAN.map((sec) => sec.key).filter((key) => key !== "visual");
  const chapters = chapterKeys.map((key) => ({ id: idOf(key), label: labelOf(key) }));
  const numbered: SectionKey[] = chapterKeys.filter((key) => key !== "answer");

  const body = PLAN.map(({ key, ground, seam, tooth, grid }, index) => {
    const from: Ground = index === 0 ? x.ground : PLAN[index - 1].ground;
    if (key === "visual") return <PilotVisual key={key} visual={x.visual} />;

    const id = idOf(key);
    const n = numbered.indexOf(key) + 1;
    const inner = {
      answer: <PilotAnswer id={id} s={s} facts={x.facts} />,
      stage: <PilotStage id={id} stage={x.stage} n={n} href={ctaHref} service={s.funnelService} />,
      scope: <PilotScope id={id} s={s} img={x.scopeImg} n={n} />,
      decision: <PilotDecision id={id} s={s} compare={x.compare!} layers={x.layers!} n={n} />,
      cost: <PilotCost id={id} s={s} guides={serviceGuides} n={n} />,
      local: <PilotLocal id={id} s={s} n={n} />,
      process: <PilotProcess id={id} n={n} />,
      faq: <PilotFaqs id={id} s={s} related={related} n={n} />,
    }[key as Exclude<SectionKey, "visual" | "transform" | "feature">];

    return (
      <Band key={key} id={id} ground={ground} prev={from} seam={seam} chapter={labelOf(key)} labelledBy={`${id}-t`} fade={!tooth && DARK_GROUNDS.includes(ground) === DARK_GROUNDS.includes(from)} className={grid ? "pp-ground-grid" : ""}>
        {tooth && <Tooth />}
        {inner}
      </Band>
    );
  });

  return (
    <div data-service={s.id} data-pp="">
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
      <PilotClosing title={x.closing.title} bring={x.closing.bring} img={{ src: finito, alt: "" }} href={ctaHref} service={s.funnelService} label="Inizia dal tuo pavimento" />
      <PilotMotion />
    </div>
  );
}
