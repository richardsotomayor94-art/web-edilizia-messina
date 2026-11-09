import Image from "next/image";
import type { Media } from "@/config/media";
import { IMAGE_NOTE } from "@/config/media";

/** Pausa a tutta larghezza dentro un testo lungo: una foto e, se serve, una sola idea. */
export function ProseBreak({ img, insight }: { img: Media; insight: string }) {
  return (
    <figure className="prose-break not-prose on-dark">
      <div className="absolute inset-0 fx-scale">
        <Image src={img.src} alt={img.alt} fill sizes="100vw" quality={60} />
      </div>
      <figcaption>
        <div className="wrap">
          <p className="t-insight max-w-4xl !text-[clamp(2.1rem,4.6vw,4.75rem)]">{insight}</p>
          <p className="caption mt-3 !text-white/75">{IMAGE_NOTE}</p>
        </div>
      </figcaption>
    </figure>
  );
}
