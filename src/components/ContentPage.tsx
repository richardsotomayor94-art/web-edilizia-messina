import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
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
}

export function ContentPage({ title, description, path, crumbs, children, intro, article, faqs, pageType }: Props) {
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
      <section className="border-b border-ink">
        <div className="wrap pb-8 pt-8 lg:pb-14 lg:pt-14">
          <Breadcrumbs items={crumbs} />
          <h1 className="t-h1 mt-5 max-w-5xl">{title}</h1>
          {intro && <div className="t-lead mt-5 max-w-3xl text-ink-soft">{intro}</div>}
          {article && (
            <p className="t-label mt-6 text-muted">
              Aggiornato il{" "}
              <time dateTime={article.updated}>
                {new Date(article.updated).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </p>
          )}
        </div>
      </section>
      <div className="wrap py-8 lg:py-12">
        <div className="grid-12">
          <article className="prose-page prose-chapters col-span-12 lg:col-span-8 lg:col-start-3">{children}</article>
        </div>
      </div>
    </>
  );
}
