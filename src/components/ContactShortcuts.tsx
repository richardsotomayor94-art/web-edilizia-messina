import { phoneHref, site, whatsappLink } from "@/config/site";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedLink";

/**
 * Canali diretti accanto all'invito principale: compaiono solo se il numero è configurato
 * (NEXT_PUBLIC_CONTACT_PHONE, NEXT_PUBLIC_WHATSAPP_NUMBER). Senza dati reali non si mostra nulla.
 */
export function ContactShortcuts({ location, service, label, className = "" }: { location: string; service?: string; label?: string; className?: string }) {
  const tel = phoneHref();
  const wa = whatsappLink(label ? `Ciao, vorrei informazioni per ${label} a ${site.city}` : `Ciao, vorrei informazioni per un lavoro a ${site.city}`);
  if (!tel && !wa) return null;
  return (
    <p className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.95rem] ${className}`}>
      <span className="c-sub">Preferisci parlarne?</span>
      {tel && (
        <TrackedLink href={tel} event="phone_click" location={location} service={service} className="link inline-flex min-h-11 items-center gap-2 font-semibold">
          <Icon name="phone" size={18} /> {site.contact.phone}
        </TrackedLink>
      )}
      {wa && (
        <TrackedLink href={wa} event="whatsapp_click" location={location} service={service} className="link inline-flex min-h-11 items-center gap-2 font-semibold">
          <Icon name="chat" size={18} /> WhatsApp
        </TrackedLink>
      )}
    </p>
  );
}
