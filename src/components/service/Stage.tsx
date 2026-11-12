import Image from "next/image";
import type { CSSProperties, ReactElement } from "react";
import type { ServiceExperience } from "@/config/service-experience";
import { Icon } from "../Icon";
import { TrackedLink } from "../TrackedLink";
import { Quota, Title } from "./Band";

/** Schema di posa di ogni materiale, disegnato sulla fotografia quando lo scegli. Solo decorazione. */
const PATTERNS: (() => ReactElement)[] = [
  // Grande formato: maglia regolare
  () => (
    <>
      <path d="M0 33.5H100" pathLength="1" />
      <path d="M0 66.5H100" pathLength="1" />
      <path d="M33.5 0V100" pathLength="1" />
      <path d="M66.5 0V100" pathLength="1" />
    </>
  ),
  // Spina di pesce
  () => (
    <>
      {[20, 45, 70, 95, 120].map((y) => (
        <path key={y} d={`M0 ${y}L25 ${y - 25}L50 ${y}L75 ${y - 25}L100 ${y}`} pathLength="1" />
      ))}
      {[0, 50].map((x) => (
        <path key={x} d={`M${x + 25} 20V120`} pathLength="1" opacity="0.45" />
      ))}
    </>
  ),
  // Superficie continua: nessuna fuga, solo il passaggio della spatola
  () => (
    <>
      <path d="M-4 72C24 40 62 92 104 48" pathLength="1" />
      <path d="M-4 42C30 16 66 62 104 22" pathLength="1" opacity="0.45" />
    </>
  ),
];

/**
 * Selettore visivo di materiali o interventi: radio + :has(), zero JavaScript.
 * Tutte le opzioni restano nel DOM; senza :has() compaiono una sotto l'altra.
 * `plate` aggiunge lo schema di posa e l'invito per materiale (solo Pavimenti).
 */
export function Stage({ id, stage, n, flip = false, surface = false, plate, service }: { id: string; stage: ServiceExperience["stage"]; n: number; flip?: boolean; surface?: boolean; plate?: string; service: string }) {
  return (
    <div className="wrap py-16 lg:py-32">
      <Quota n={n} label={stage.label} />
      <div className="grid-12 mt-4 items-end gap-y-5">
        <div className="col-span-12 lg:col-span-8">
          <Title id={`${id}-t`} text={stage.title} className="t-h2" />
        </div>
        <p data-reveal className="t-lead c-sub col-span-12 lg:col-span-4">{stage.intro}</p>
      </div>

      <div className={`stage mt-8 lg:mt-14 ${flip ? "stage-flip" : ""}`}>
        <fieldset className="stage-opts" style={{ "--n": stage.options.length } as CSSProperties}>
          <legend className="sr-only">{stage.legend}</legend>
          {stage.options.map((o, i) => (
            <label key={o.name} className="stage-opt">
              <input type="radio" name={`${id}-o`} defaultChecked={i === 0} className="sr-only" />
              <span className="stage-idx tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="stage-name">
                <span className="lg:hidden">{o.short}</span>
                <span className="hidden lg:inline">{o.name}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <div data-reveal="cover" data-tiles={surface ? "6x5" : undefined} className="stage-media frame">
          {stage.options.map((o, i) => (
            <div key={o.name} data-o={i + 1} className="stage-shot">
              <Image src={o.img.src} alt={o.img.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" quality={60} {...(i > 0 ? { loading: "eager" as const, fetchPriority: "low" as const } : {})} />
            </div>
          ))}
          {plate && (
            <div aria-hidden="true" className="ar-plate">
              {stage.options.map((o, i) => {
                const Pattern = PATTERNS[i % PATTERNS.length];
                return (
                  <svg key={o.name} data-o={i + 1} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" focusable="false">
                    <Pattern />
                  </svg>
                );
              })}
            </div>
          )}
        </div>

        <div className="stage-panels">
          {stage.options.map((o, i) => (
            <article key={o.name} data-o={i + 1} className="stage-panel">
              <h3 className="t-h3">{o.name}</h3>
              <p className="c-sub mt-3 max-w-xl text-[1.05rem]">{o.text}</p>
              <ul className="mt-4">
                {o.points.map((p) => (
                  <li key={p} className="b-rule flex gap-3 border-t py-2.5 text-[0.95rem]">
                    <span aria-hidden="true" className="c-accent mt-[0.7em] h-px w-4 shrink-0 bg-current" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              {plate && (
                <TrackedLink href={plate} event="cta_click" location={`service_stage_${i + 1}`} service={service} className="ar-inline-cta c-accent mt-5">
                  <span>Preventivo per {o.name.toLowerCase()}</span> <Icon name="arrow" size={18} />
                </TrackedLink>
              )}
            </article>
          ))}
        </div>
      </div>
      {stage.note && <p className="c-sub mt-6 text-[0.8rem]">{stage.note}</p>}
    </div>
  );
}
