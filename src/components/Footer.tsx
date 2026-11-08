import Link from "next/link";
import { site } from "@/config/site";
import { servicePages } from "@/config/services";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-stone bg-ink text-paper/85">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-paper">
            <Logo />
            <span className="text-lg font-semibold">{site.name}</span>
          </div>
          <p className="text-sm leading-relaxed">
            Raccogliamo richieste di preventivo per lavori edili e ristrutturazioni a {site.city} e le inoltriamo a imprese e
            artigiani locali indipendenti. Non eseguiamo direttamente i lavori.
          </p>
        </div>
        <div>
          <h2 className="mb-3 font-sans text-sm font-bold uppercase tracking-wider text-paper">Servizi</h2>
          <ul className="space-y-2 text-sm">
            {servicePages.map((s) => (
              <li key={s.id}>
                <Link href={s.path} className="hover:text-white hover:underline">
                  {s.cardTitle} a {site.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-sans text-sm font-bold uppercase tracking-wider text-paper">Informazioni</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/come-funziona/" className="hover:text-white hover:underline">Come funziona</Link></li>
            <li><Link href="/come-selezioniamo-i-professionisti/" className="hover:text-white hover:underline">Come selezioniamo i professionisti</Link></li>
            <li><Link href="/chi-siamo/" className="hover:text-white hover:underline">Chi siamo</Link></li>
            <li><Link href="/guide/" className="hover:text-white hover:underline">Guide</Link></li>
            <li><Link href="/diventa-partner/" className="hover:text-white hover:underline">Sei un&apos;impresa? Diventa partner</Link></li>
            <li><Link href="/contatti/" className="hover:text-white hover:underline">Contatti</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-sans text-sm font-bold uppercase tracking-wider text-paper">Legale</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy/" className="hover:text-white hover:underline">Informativa privacy</Link></li>
            <li><Link href="/cookie/" className="hover:text-white hover:underline">Cookie policy</Link></li>
            <li><Link href="/termini/" className="hover:text-white hover:underline">Termini del servizio</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-paper/60 sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}
            {site.legal.ownerName ? ` · ${site.legal.ownerName}` : ""}
            {site.legal.vatNumber ? ` · P.IVA ${site.legal.vatNumber}` : ""}
          </p>
          <p>Servizio gratuito per chi richiede un preventivo.</p>
        </div>
      </div>
    </footer>
  );
}
