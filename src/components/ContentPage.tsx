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
      <section className="blueprint border-b border-stone">
        <div className="container-page py-8 sm:py-12">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 max-w-3xl text-[2rem] sm:text-5xl">{title}</h1>
          {intro && <div className="mt-4 max-w-2xl text-lg text-ink-soft">{intro}</div>}
          {article && (
            <p className="mt-4 text-sm text-muted">
              Aggiornato il{" "}
              <time dateTime={article.updated}>
                {new Date(article.updated).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </p>
          )}
        </div>
      </section>
      <div className="container-page py-10">
        <article className="prose-page max-w-3xl">{children}</article>
      </div>
    </>
  );
}
