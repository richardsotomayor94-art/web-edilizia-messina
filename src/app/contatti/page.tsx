import Link from "next/link";
import { site, phoneHref, whatsappLink } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { TrackedLink } from "@/components/TrackedLink";

const description = `Contatta ${site.name} per informazioni sul servizio di richiesta preventivi per lavori edili a Messina.`;
const path = "/contatti/";

export const metadata = pageMetadata({ title: "Contatti", description, path });

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
      {hasAny ? (
        <>
        <h2>Come raggiungerci</h2>
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
        </>
      ) : (
        <>
          <h2>Come chiederci un preventivo</h2>
          <p>Descrivi il lavoro nel modulo: bastano un paio di minuti, è gratuito e senza impegno. Verifichiamo la richiesta e la inoltriamo fino a 3 professionisti della tua zona, che ti contattano per sopralluogo e preventivo.</p>
          <p className="not-prose mt-4">
            <TrackedLink href="/preventivo/" event="cta_click" location="contatti" className="btn btn-primary">Richiedi un preventivo</TrackedLink>
          </p>
          <p>Hai una domanda sul servizio? Leggi <Link href="/come-funziona/">come funziona</Link> o le nostre <Link href="/guide/">guide</Link>; per altro scrivilo nella descrizione del modulo.</p>
        </>
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
