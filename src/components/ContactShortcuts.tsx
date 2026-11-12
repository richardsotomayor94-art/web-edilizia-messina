import { phoneHref, site, whatsappLink } from "@/config/site";
import { ContactAction } from "./ContactAction";
import { Icon } from "./Icon";

/**
 * Canali diretti accanto all'invito principale: compaiono solo se configurati
 * (NEXT_PUBLIC_CONTACT_PHONE, NEXT_PUBLIC_WHATSAPP_NUMBER). In demo sono recapiti di prova con avviso.
 */
export function ContactShortcuts({ location, service, label, className = "" }: { location: string; service?: string; label?: string; className?: string }) {
  const tel = phoneHref();
  const wa = whatsappLink(label ? `Ciao, vorrei informazioni per ${label} a ${site.city}` : `Ciao, vorrei informazioni per un lavoro a ${site.city}`);
  if (!tel && !wa) return null;
  const demo = site.contact.demo;
  return (
    <p className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.95rem] ${className}`}>
      <span className="c-sub">Preferisci parlarne?</span>
      {tel && (
        <ContactAction href={tel} kind="phone" demo={demo} location={location} service={service} className="link inline-flex min-h-11 items-center gap-2 font-semibold">
          <Icon name="phone" size={18} /> {site.contact.phone}
        </ContactAction>
      )}
      {wa && (
        <ContactAction href={wa} kind="whatsapp" demo={demo} location={location} service={service} className="link inline-flex min-h-11 items-center gap-2 font-semibold">
          <Icon name="chat" size={18} /> WhatsApp
        </ContactAction>
      )}
    </p>
  );
}
