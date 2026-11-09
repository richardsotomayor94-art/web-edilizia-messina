import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";

const description = `${site.name} è un servizio che aiuta chi vive a Messina a trovare imprese e artigiani per ristrutturazioni e lavori in casa. Non siamo un'impresa edile.`;
const path = "/chi-siamo/";

export const metadata = pageMetadata({ title: `Chi siamo – ${site.name}`, description, path });

export default function ChiSiamoPage() {
  return (
    <ContentPage
      title={`Chi è ${site.name}`}
      description={description}
      path={path}
      pageType="AboutPage"
      crumbs={[{ name: "Home", path: "/" }, { name: "Chi siamo", path }]}
      intro={<p>Un servizio dedicato a {site.city}, con un obiettivo semplice: rendere più facile trovare il professionista giusto per i lavori in casa.</p>}
    >
      <h2>Cosa facciamo</h2>
      <p>
        Raccogliamo richieste di preventivo per ristrutturazioni e lavori edili a {site.serviceArea}, le qualifichiamo con
        poche domande mirate e le inoltriamo a imprese e artigiani locali indipendenti, selezionati per servizio e zona.
      </p>
      <h2>Cosa non facciamo</h2>
      <ul>
        <li>Non eseguiamo lavori e non abbiamo operai o artigiani dipendenti.</li>
        <li>Non firmiamo contratti d&apos;appalto al posto tuo e non incassiamo pagamenti per i lavori.</li>
        <li>Non vendiamo i tuoi dati a terzi per pubblicità.</li>
        <li>Non pubblichiamo recensioni, numeri o lavori che non possiamo dimostrare.</li>
      </ul>
      <h2>Perché trasparenza</h2>
      <p>
        Molti portali di preventivi non spiegano chiaramente chi riceve i tuoi dati e quante imprese ti chiameranno. Noi lo
        diciamo prima dell&apos;invio: al massimo 3 professionisti, solo per la tua richiesta. Trovi tutti i dettagli in{" "}
        <Link href="/come-funziona/">Come funziona</Link> e nell&apos;<Link href="/privacy/">informativa privacy</Link>.
      </p>
      {site.legal.ownerName && (
        <>
          <h2>Dati societari</h2>
          <p>
            {site.legal.ownerName}
            {site.legal.vatNumber ? ` – P.IVA ${site.legal.vatNumber}` : ""}
            {site.legal.address ? ` – ${site.legal.address}` : ""}
          </p>
        </>
      )}
    </ContentPage>
  );
}
