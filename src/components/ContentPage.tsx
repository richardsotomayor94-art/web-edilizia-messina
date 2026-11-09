import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { ServiceMotif } from "./service/Motif";
import { ReadProgress } from "./service/ChapterRail";
import { graph, organizationNode, websiteNode, webPageNode, breadcrumbNode, articleNode, faqNode, type Crumb } from "@/lib/seo";
import type { Faq } from "@/config/services";

interface Props {
  title: string; // H1
  description: string;
  path: string;
  crumbs: Crumb[];
  children: ReactNode;
  intro?: ReactNode;
  article?: { updated: string };
  faqs?: Faq[];
  pageType?: string; // es. AboutPage, ContactPage
  /** Pagine di servizio (legali, contatti): apertura chiara e sobria */
  plain?: boolean;
  /** I titoli hanno già una numerazione propria */
  unnumbered?: boolean;
}

export function ContentPage({ title, description, path, crumbs, children, intro, article, faqs, pageType, plain = false, unnumbered = false }: Props) {
  const nodes: Record<string, unknown>[] = [
    organizationNode(),
    websiteNode(),
    { ...webPageNode(path, title, description), ...(pageType ? { "@type": pageType } : {}) },
    breadcrumbNode(path, crumbs),
  ];
  if (article) nodes.push(articleNode(path, title, description, article.updated));
  if (faqs?.length) nodes.push(faqNode(path, faqs));
  return (
    <>
      <JsonLd data={graph(...nodes)} />
      {article && <ReadProgress />}
      <section className={plain ? "g-intonaco border-b border-ink" : "g-lava on-dark header-offset relative overflow-hidden"}>
        {!plain && <ServiceMotif name="plan" className="content-motif c-accent" />}
        <div className={`wrap relative ${plain ? "pb-8 pt-8 lg:pb-14 lg:pt-14" : "pb-12 pt-[6.25rem] lg:pb-20 lg:pt-44"}`}>
          <Breadcrumbs items={crumbs} />
          <h1 className="t-h1 mt-5 max-w-5xl">{title}</h1>
          {intro && <div className="t-lead c-sub mt-5 max-w-3xl">{intro}</div>}
          {article && (
            <p className="t-label c-accent mt-6">
              Aggiornato il{" "}
              <time dateTime={article.updated}>
                {new Date(article.updated).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </p>
          )}
        </div>
      </section>
      <div className="wrap pb-16 pt-10 lg:pb-28 lg:pt-16">
        <div className="grid-12">
          <article className={`prose-page prose-chapters col-span-12 lg:col-span-8 lg:col-start-3 ${unnumbered ? "prose-unnumbered" : ""}`}>{children}</article>
        </div>
      </div>
    </>
  );
}
