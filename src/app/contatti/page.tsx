import Link from "next/link";
import { site, phoneHref, whatsappLink } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { TrackedLink } from "@/components/TrackedLink";

const description = `Contatta ${site.name} per informazioni sul servizio di richiesta preventivi per lavori edili a Messina.`;
const path = "/contatti/";

export const metadata = pageMetadata({ title: `Contatti – ${site.name}`, description, path });

export default function ContattiPage() {
  const tel = phoneHref();
  const wa = whatsappLink("Ciao, vorrei informazioni");
  const hasAny = tel || wa || site.contact.email;
  return (
    <ContentPage plain
      title="Contatti"
      description={description}
      path={path}
      pageType="ContactPage"
      crumbs={[{ name: "Home", path: "/" }, { name: "Contatti", path }]}
      intro={<p>Per un preventivo il modo più rapido è il <Link href="/preventivo/" className="underline">modulo di richiesta</Link>: ci dà subito le informazioni che servono ai professionisti.</p>}
    >
      <h2>Come raggiungerci</h2>
      {hasAny ? (
        <ul>
          {tel && (
            <li>
              Telefono: <TrackedLink href={tel} event="phone_click" location="contatti">{site.contact.phone}</TrackedLink>
            </li>
          )}
          {wa && (
            <li>
              WhatsApp: <TrackedLink href={wa} event="whatsapp_click" location="contatti" external>scrivici su WhatsApp</TrackedLink>
            </li>
          )}
          {site.contact.email && (
            <li>
              Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
          )}
        </ul>
      ) : (
        <p>Puoi scriverci attraverso il <Link href="/preventivo/">modulo di richiesta</Link>: indica nella descrizione di cosa hai bisogno.</p>
      )}
      <h2>Sei un&apos;impresa o un artigiano?</h2>
      <p>
        Se vuoi ricevere richieste di lavoro nella tua zona, compila la <Link href="/diventa-partner/">candidatura partner</Link>.
      </p>
      <h2>Privacy</h2>
      <p>
        Per esercitare i tuoi diritti sui dati personali (accesso, cancellazione, opposizione) consulta l&apos;
        <Link href="/privacy/">informativa privacy</Link>.
      </p>
    </ContentPage>
  );
}
