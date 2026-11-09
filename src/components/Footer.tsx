import Link from "next/link";
import { site, phoneHref, whatsappLink } from "@/config/site";
import { servicePages } from "@/config/services";
import { CLUSTER_LABELS } from "@/config/areas";
import { IMAGE_NOTE } from "@/config/media";
import { LOCAL_GUIDE_PATH } from "@/config/guides";

const info = [
  { href: "/come-funziona/", label: "Come funziona" },
  { href: "/come-selezioniamo-i-professionisti/", label: "Come selezioniamo i professionisti" },
  { href: "/chi-siamo/", label: "Chi siamo" },
  { href: "/guide/", label: "Guide" },
  { href: "/contatti/", label: "Contatti" },
  { href: "/diventa-partner/", label: "Sei un'impresa? Diventa partner" },
];

const legal = [
  { href: "/privacy/", label: "Privacy" },
  { href: "/cookie/", label: "Cookie" },
  { href: "/termini/", label: "Termini" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const tel = phoneHref();
  const wa = whatsappLink("Ciao, vorrei informazioni per un lavoro a Messina");
  const contacts = [
    tel && site.contact.phone ? { href: tel, label: site.contact.phone } : null,
    wa ? { href: wa, label: "WhatsApp" } : null,
    site.contact.email ? { href: `mailto:${site.contact.email}`, label: site.contact.email } : null,
  ].filter((c): c is { href: string; label: string } => !!c);

  return (
    <footer className="on-dark site-footer">
      <svg data-reveal="draw" className="footer-plan" viewBox="0 0 240 120" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
        <path d="M0 120V0H240V120" pathLength="1" />
        <path d="M0 120H90M150 120H240" pathLength="1" />
        <path d="M90 120a60 60 0 0 1 60 -60" pathLength="1" />
        <path d="M150 120V60" pathLength="1" />
      </svg>

      <div className="wrap relative pt-14 lg:pt-24">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="t-label text-cotto-light">I lavori</p>
            <ul className="mt-3 border-b border-paper/15">
              {servicePages.map((s, i) => (
                <li key={s.id} className="border-t border-paper/15">
                  <Link href={s.path} className="footer-service">
                    <span className="text-xs tabular-nums text-paper/55">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.cardTitle}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:col-span-4 lg:col-start-9">
            <FooterColumn title="Informazioni" className="col-span-2 sm:col-span-1 lg:col-span-2" items={info} />
            <div className="col-span-2 sm:col-span-1 lg:col-span-2">
              <h2 className="t-label mb-3 font-sans text-paper/60">Dove</h2>
              <p className="text-[0.95rem] text-paper/90">
                {Object.values(CLUSTER_LABELS).join(" · ")}
              </p>
              <Link href={LOCAL_GUIDE_PATH} className="link-grow mt-2 inline-block text-[0.95rem]">Cosa controllare zona per zona</Link>
              {contacts.length > 0 && (
                <ul className="mt-5 space-y-1 text-sm">
                  {contacts.map((c) => (
                    <li key={c.href}><a href={c.href} className="link-grow">{c.label}</a></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-2xl font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.15] lg:mt-20">
          Raccogliamo le richieste e le inoltriamo a imprese e artigiani locali indipendenti. <em>Non eseguiamo direttamente i lavori.</em>
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-paper/20 pt-4 text-xs text-paper/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
            {site.legal.ownerName ? ` · ${site.legal.ownerName}` : ""}
            {site.legal.vatNumber ? ` · P.IVA ${site.legal.vatNumber}` : ""}
            {" · "}{IMAGE_NOTE}
          </p>
          <ul className="flex gap-5 text-sm">
            {legal.map((l) => (
              <li key={l.href}><Link href={l.href} className="link-grow inline-flex min-h-6 items-center">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer-word" aria-hidden="true">
        <span><em>Messina</em>Casa<sup>360</sup></span>
      </p>
    </footer>
  );
}

function FooterColumn({ title, items, className }: { title: string; items: { href: string; label: string }[]; className: string }) {
  return (
    <div className={className}>
      <h2 className="t-label mb-3 font-sans text-paper/60">{title}</h2>
      <ul className="space-y-1.5 text-[0.95rem]">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="link-grow">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
