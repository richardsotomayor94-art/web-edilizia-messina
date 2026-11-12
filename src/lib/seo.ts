import type { Metadata } from "next";
import { site, absoluteUrl } from "@/config/site";
import type { Faq, ServicePage } from "@/config/services";

interface MetaInput {
  title: string;
  description: string;
  path: string;
  /** forza noindex anche in produzione (es. pagine di servizio del funnel) */
  noindex?: boolean;
  ogType?: "website" | "article";
}

/** Metadata coerenti: canonical, OG e Twitter derivano tutti da SITE_URL. */
export function pageMetadata({ title, description, path, noindex, ogType = "website" }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const index = site.indexable && !noindex;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
      : { index: false, follow: !noindex ? true : false, nocache: true },
    openGraph: {
      type: ogType,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: `${site.name} – ristrutturazioni e lavori in casa a ${site.city}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: absoluteUrl("/og.png"), alt: `${site.name} – lavori in casa a ${site.city}` }] },
  };
}

// ---------------------------------------------------------------------
// Entity graph (Schema.org) — ID stabili basati su SITE_URL
// ---------------------------------------------------------------------
export const ids = {
  organization: () => `${site.url}/#organization`,
  website: () => `${site.url}/#website`,
  service: (id: string) => `${site.url}/#service-${id}`,
  faq: (path: string) => `${absoluteUrl(path)}#faq`,
  webpage: (path: string) => `${absoluteUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
};

/**
 * Organization (NON LocalBusiness / GeneralContractor): la piattaforma
 * non esegue direttamente i lavori, quindi non si dichiara impresa edile.
 */
export function organizationNode() {
  const contactPoint = [] as Record<string, unknown>[];
  if (site.contact.phone || site.contact.email) {
    contactPoint.push({
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["it"],
      areaServed: "IT",
      ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
      ...(site.contact.email ? { email: site.contact.email } : {}),
    });
  }
  return {
    "@type": "Organization",
    "@id": ids.organization(),
    name: site.name,
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/logo-512.png"), width: 512, height: 512 },
    description:
      "Servizio online che raccoglie richieste di preventivo per ristrutturazioni e lavori in casa a Messina e le inoltra a imprese e artigiani locali indipendenti.",
    areaServed: { "@type": "City", name: site.city, containedInPlace: { "@type": "AdministrativeArea", name: site.region } },
    knowsAbout: ["Ristrutturazioni", "Cartongesso", "Ristrutturazione bagno", "Impianti", "Pavimenti", "Pittura edile", "Facciate", "Impermeabilizzazioni", "Cappotto termico"],
    ...(contactPoint.length ? { contactPoint } : {}),
    ...(site.legal.vatNumber ? { vatID: site.legal.vatNumber } : {}),
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website(),
    url: site.url,
    name: site.name,
    inLanguage: "it-IT",
    publisher: { "@id": ids.organization() },
  };
}

/**
 * Service: il servizio offerto dalla piattaforma è l'intermediazione /
 * messa in contatto per quel tipo di lavoro. provider = Organization.
 */
export function serviceNode(s: ServicePage) {
  return {
    "@type": "Service",
    "@id": ids.service(s.id),
    name: `${s.cardTitle} a ${site.city}: richiesta preventivi`,
    serviceType: s.cardTitle,
    description: s.metaDescription,
    url: absoluteUrl(s.path),
    provider: { "@id": ids.organization() },
    areaServed: { "@type": "City", name: site.city },
    audience: { "@type": "Audience", audienceType: "Privati e condomini" },
    termsOfService: absoluteUrl("/termini/"),
  };
}

export function offerCatalogNode(services: ServicePage[]) {
  return {
    "@type": "OfferCatalog",
    "@id": `${site.url}/#catalog`,
    name: `Servizi per la casa a ${site.city}`,
    itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@id": ids.service(s.id) } })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbNode(path: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": ids.breadcrumb(path),
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqNode(path: string, faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    "@id": ids.faq(path),
    mainEntityOfPage: { "@id": ids.webpage(path) },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPageNode(path: string, name: string, description: string, extra: Record<string, unknown> = {}) {
  return {
    "@type": "WebPage",
    "@id": ids.webpage(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "it-IT",
    isPartOf: { "@id": ids.website() },
    publisher: { "@id": ids.organization() },
    breadcrumb: { "@id": ids.breadcrumb(path) },
    ...extra,
  };
}

export function articleNode(path: string, headline: string, description: string, dateModified: string) {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline,
    description,
    inLanguage: "it-IT",
    dateModified,
    datePublished: dateModified,
    mainEntityOfPage: { "@id": ids.webpage(path) },
    image: [absoluteUrl("/og.png")],
    author: { "@id": ids.organization() },
    publisher: { "@id": ids.organization() },
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
