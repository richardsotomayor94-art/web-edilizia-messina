import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Richiesta inviata",
  description: "Abbiamo ricevuto la tua richiesta di preventivo.",
  path: "/preventivo/grazie/",
  noindex: true,
});

const NEXT_STEPS = [
  "Controlliamo che la richiesta sia completa: potremmo contattarti per un chiarimento.",
  "La inoltriamo a un massimo di 3 imprese o artigiani per quel servizio e quella zona.",
  "I professionisti disponibili ti contattano per un sopralluogo e un preventivo scritto.",
  "Confronti le proposte e decidi liberamente, anche di non accettarne nessuna.",
];

export default async function GraziePage(props: PageProps<"/preventivo/grazie">) {
  const sp = await props.searchParams;
  const fotoParziale = sp.foto === "parziale";
  const giaRicevuta = sp.stato === "gia-ricevuta";
  return (
    <div className="wrap grid-12 gap-y-8 py-10 lg:py-20">
      <div className="col-span-12 lg:col-span-6">
        <span aria-hidden="true" className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-clay text-white"><Icon name="check" size={34} strokeWidth={2} /></span>
        <h1 className="t-h1 mt-4">Richiesta <em>inviata</em>, grazie.</h1>
        <p className="t-lead mt-4 max-w-xl text-ink-soft">
          Ora la controlliamo e cerchiamo i professionisti adatti al tuo lavoro e alla tua zona. Se in zona non ce ne sono di disponibili, te lo comunichiamo.
        </p>
        {giaRicevuta && (
          <p role="status" className="mt-4 border-l-2 border-clay bg-sand p-3 text-sm">
            Avevamo già ricevuto una tua richiesta per lo stesso lavoro negli ultimi giorni: non serve inviarla di nuovo, la stiamo già gestendo.
          </p>
        )}
        {fotoParziale && (
          <p role="status" className="mt-4 border-l-2 border-clay bg-sand p-3 text-sm">
            La richiesta è arrivata, ma non siamo riusciti a caricare tutte le foto. Potrai mostrarle direttamente al professionista.
          </p>
        )}
        <Link href="/" className="btn btn-secondary mt-7">Torna alla home</Link>
      </div>
      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <h2 className="t-label border-b border-ink pb-2 font-sans">Cosa succede ora</h2>
        <ol>
          {NEXT_STEPS.map((t, i) => (
            <li key={t} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-stone py-3">
              <span className="font-display text-3xl leading-none text-clay">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-ink-soft">{t}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">
          Consiglio: chiedi sempre un preventivo scritto e dettagliato voce per voce. Leggi{" "}
          <Link href="/guide/costo-ristrutturazione-casa-messina/" className="link">come leggere un preventivo</Link>.
        </p>
      </div>
    </div>
  );
}
