import Link from "next/link";
import { servicePages } from "@/config/services";

export default function NotFound() {
  return (
    <div className="container-page max-w-2xl py-16">
      <p className="eyebrow">Errore 404</p>
      <h1 className="mt-2 text-4xl">Pagina non trovata</h1>
      <p className="mt-4 text-ink-soft">La pagina che cerchi non esiste o è stata spostata. Forse cercavi uno di questi servizi:</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {servicePages.map((s) => (
          <li key={s.id}><Link href={s.path} className="text-sea underline">{s.cardTitle} a Messina</Link></li>
        ))}
      </ul>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-secondary">Home</Link>
        <Link href="/preventivo/" className="btn btn-primary">Richiedi un preventivo</Link>
      </div>
    </div>
  );
}
