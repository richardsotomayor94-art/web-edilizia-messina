import { getImageProps } from "next/image";
import { heroMobile, media } from "@/config/media";
import { CTA_LABEL } from "@/config/site";
import { SERVICE_OPTIONS } from "@/lib/lead-options";
import { Icon } from "../Icon";
import { TrackedLink } from "../TrackedLink";

const STRIP = SERVICE_OPTIONS.filter((o) => o.value !== "altro");

/** Quattro passaggi su 360°: il primo è evidenziato, perché inizia da chi scrive. */
function ProcessDial() {
  return (
    <div className="hidden items-center gap-4 lg:flex" aria-hidden="true">
      <svg width="76" height="76" viewBox="0 0 76 76" fill="none">
        <circle cx="38" cy="38" r="34" stroke="rgb(255 255 255 / 0.3)" strokeWidth="1" />
        <circle className="dial-arc" cx="38" cy="38" r="34" pathLength="400" stroke="#e0703f" strokeWidth="2" transform="rotate(-90 38 38)" style={{ strokeDasharray: "100 400" }} />
        {[0, 90, 180, 270].map((d) => (
          <path key={d} d="M38 0v8" stroke="#fff" strokeWidth="1" transform={`rotate(${d} 38 38)`} />
        ))}
        <text x="38" y="43" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="var(--font-editorial)">360°</text>
      </svg>
      <p className="t-label max-w-[12rem] text-white/80">Dalla richiesta al sopralluogo in 4 passaggi</p>
    </div>
  );
}

/** Due inquadrature, una sola richiesta: da mobile il taglio verticale sulla porta-finestra. */
function HeroPicture() {
  const common = { alt: media.hero.alt, fill: true, priority: true, quality: 70, sizes: "100vw" } as const;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: media.hero.src });
  const {
    props: { srcSet: mobileSet, ...img },
  } = getImageProps({ ...common, src: heroMobile });
  return (
    <>
      <link rel="preload" as="image" imageSrcSet={mobileSet} imageSizes="100vw" media="(max-width: 1023px)" fetchPriority="high" />
      <link rel="preload" as="image" imageSrcSet={desktopSet} imageSizes="100vw" media="(min-width: 1024px)" fetchPriority="high" />
      <picture>
      <source media="(min-width: 1024px)" srcSet={desktopSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt incluso nelle props di getImageProps */}
      <img {...img} srcSet={mobileSet} fetchPriority="high" />
      </picture>
    </>
  );
}

export function Hero() {
  return (
    <section className="hero on-dark header-offset">
      <div className="hero-media">
        <div className="hero-drift absolute inset-[-3%_0]">
          <HeroPicture />
        </div>
      </div>
      <div className="hero-shade" />

      <div className="wrap flex flex-1 flex-col justify-end pb-6 pt-28 lg:pb-10 lg:pt-36">
        <p className="t-label flex flex-wrap gap-x-4 text-white/85">
          <span>Messina e provincia</span>
          <span className="tabular-nums text-white/60">38°11′N 15°33′E</span>
        </p>
        <h1 className="mt-3 lg:mt-5">
          <span className="t-display block">
            Lavori in casa
            <br />a <em>Messina</em>
          </span>
          <span className="mt-4 block max-w-xl font-display text-[1.65rem] leading-[1.12] tracking-normal text-white/95 lg:mt-6 lg:text-[2.5rem]">
            Una sola richiesta, fino a tre professionisti locali.
          </span>
        </h1>
        <div className="mt-6 flex flex-col gap-5 lg:mt-9 lg:flex-row lg:items-center lg:justify-between">
          <div data-hero-cta className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <TrackedLink href="/preventivo/" event="cta_click" location="hero" className="btn btn-primary w-full text-lg sm:w-auto">
              {CTA_LABEL} <Icon name="arrow" />
            </TrackedLink>
            <p className="text-center text-sm text-white/80 sm:text-left">Gratis e senza impegno per chi lo chiede</p>
          </div>
          <ProcessDial />
        </div>
      </div>

      <nav aria-label="Inizia dal lavoro che devi fare" className="hero-strip hidden border-t border-white/25 lg:block">
        <ol className="wrap grid grid-cols-8">
          {STRIP.map((o, i) => (
            <li key={o.value}>
              <TrackedLink href={`/preventivo/?servizio=${o.value}`} event="cta_click" location="hero_strip" service={o.value}>
                <span className="text-xs tabular-nums text-white/60">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.95rem] leading-tight">{o.label}</span>
              </TrackedLink>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
