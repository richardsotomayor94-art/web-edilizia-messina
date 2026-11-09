import Image from "next/image";
import Link from "next/link";
import { servicePages } from "@/config/services";
import { IMAGE_NOTE, serviceMedia } from "@/config/media";
import { TavLabel } from "../TavLabel";
import { Title } from "../service/Band";

/**
 * Indice dei lavori. Da desktop l'immagine cambia al passaggio (solo CSS, :has);
 * da mobile ogni riga ha già la sua immagine e nessuna informazione è nascosta.
 */
export function ServiceIndex() {
  return (
    <section id="servizi" aria-labelledby="servizi-title" className="scroll-mt-16" style={{ background: "var(--g-intonaco)" }}>
      <div className="g-lava on-dark seam-door relative py-20 lg:py-32">
      <div className="wrap">
        <TavLabel n="02" label="I lavori" dark />
        <Title id="servizi-title" className="t-h2 mt-4 max-w-4xl" text="Sette lavori, spiegati *prima* di chiedere un prezzo." />

        <div className="idx grid-12 mt-10 lg:mt-16">
          <ol className="col-span-12 lg:col-span-6">
            {servicePages.map((s, i) => {
              const m = serviceMedia[s.id];
              return (
                <li key={s.id} className="idx-item">
                  <Link href={s.path} className="idx-row group">
                    <span className="t-label pt-2 tabular-nums text-cotto-light lg:pt-3">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="idx-name">{s.cardTitle}</span>
                      <span className="mt-1.5 block max-w-lg text-[0.95rem] text-paper/75">{s.cardText}</span>
                    </span>
                    <span className="idx-thumb lg:hidden">
                      <Image src={m.src} alt="" fill sizes="168px" className="object-cover" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="col-span-5 col-start-8 -mr-[clamp(1.25rem,4.5vw,4.5rem)] hidden lg:block" aria-hidden="true">
            <div className="idx-panel">
              {servicePages.map((s) => (
                <div key={s.id} className="absolute inset-0">
                  <Image src={serviceMedia[s.id].src} alt="" fill sizes="50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-paper/20 pt-4 text-sm text-paper/70">
          Raccogliamo richieste anche per facciate, cappotto e opere murarie: sceglile nel{" "}
          <Link href="/preventivo/" className="link text-paper">modulo di richiesta</Link>. {IMAGE_NOTE}
        </p>
      </div>
      </div>
    </section>
  );
}
