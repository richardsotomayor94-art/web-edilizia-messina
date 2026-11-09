import Image from "next/image";
import type { Media } from "@/config/media";
import { CTA_LABEL } from "@/config/site";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedLink";
import { Title } from "./service/Band";

/**
 * Chiusura delle pagine: grande e materica, con una sola azione.
 * Finisce a filo col footer: il sito si conclude senza una "card" appoggiata.
 */
export function ConversionBlock({
  title,
  text = "Una sola richiesta, gratis e senza impegno. La inoltriamo a un massimo di 3 professionisti locali.",
  bring,
  img,
  href = "/preventivo/",
  service,
  location,
}: {
  title: string;
  text?: string;
  bring?: string[];
  img: Media;
  href?: string;
  service?: string;
  location: string;
}) {
  return (
    <section aria-labelledby="chiusura-t" data-chapter="fine" data-dark="true" className="closing on-dark">
      <div className="closing-media fx-drift">
        <Image src={img.src} alt="" fill sizes="100vw" quality={55} />
      </div>
      <div className="wrap grid-12 relative items-end gap-y-8 py-20 lg:py-36">
        <div className="col-span-12 lg:col-span-8">
          <Title id="chiusura-t" text={title} className="t-display !text-[clamp(3.5rem,9.4vw,9.5rem)]" />
          <p className="t-lead mt-5 max-w-xl text-white/90">{text}</p>
          <TrackedLink href={href} event="cta_click" location={location} service={service} className="btn btn-primary btn-lg mt-8 w-full sm:w-auto">
            {CTA_LABEL} <Icon name="arrow" />
          </TrackedLink>
        </div>
        {bring && bring.length > 0 && (
          <div className="col-span-12 lg:col-span-3 lg:col-start-10">
            <p className="t-label text-white/70">Tieni a portata di mano</p>
            <ul className="mt-2">
              {bring.map((b) => (
                <li key={b} className="border-t border-white/25 py-2.5 text-[0.95rem] text-white/95">{b}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
