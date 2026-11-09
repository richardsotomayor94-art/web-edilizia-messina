import Link from "next/link";
import { site, phoneHref, whatsappLink } from "@/config/site";
import { servicePages } from "@/config/services";
import { IMAGE_NOTE } from "@/config/media";
import { LogoMark } from "./Logo";

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

const linkClass = "link-grow";

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
    <footer className="on-dark mt-16 bg-ink text-paper lg:mt-24">
      <div className="wrap pb-8 pt-12 lg:pt-20">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="t-h3 max-w-md text-paper">
              Richieste di preventivo per la casa a <em>Messina</em> e provincia.
            </p>
            <p className="mt-4 max-w-md text-sm text-paper/70">
              Raccogliamo le richieste e le inoltriamo a imprese e artigiani locali indipendenti. Non eseguiamo direttamente i lavori.
            </p>
            {contacts.length > 0 && (
              <ul className="mt-5 space-y-1 text-sm">
                {contacts.map((c) => (
                  <li key={c.href}><a href={c.href} className={linkClass}>{c.label}</a></li>
                ))}
              </ul>
            )}
          </div>
          <FooterColumn title="Servizi" className="col-span-6 lg:col-span-3 lg:col-start-6" items={servicePages.map((s) => ({ href: s.path, label: s.cardTitle }))} />
          <FooterColumn title="Informazioni" className="col-span-6 lg:col-span-3" items={info} />
          <FooterColumn title="Legale" className="col-span-6 lg:col-span-1" items={legal} />
        </div>

        <div className="mt-12 flex items-end gap-3 border-t border-paper/20 pt-6 sm:gap-5 lg:mt-20" aria-hidden="true">
          <span className="block w-[13vw] max-w-[9.5rem] shrink-0 [&>svg]:h-auto [&>svg]:w-full"><LogoMark size={152} arc="#e0703f" /></span>
          <span className="truncate font-display text-[15.5vw] leading-[0.8] tracking-[-0.02em] xl:text-[12rem]">
            <em>Messina</em>Casa
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-1 text-xs text-paper/60 sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}
            {site.legal.ownerName ? ` · ${site.legal.ownerName}` : ""}
            {site.legal.vatNumber ? ` · P.IVA ${site.legal.vatNumber}` : ""}
          </p>
          <p>{IMAGE_NOTE}</p>
        </div>
      </div>
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
            <Link href={i.href} className={linkClass}>{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
