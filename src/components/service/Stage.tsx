import Image from "next/image";
import type { CSSProperties } from "react";
import type { ServiceExperience } from "@/config/service-experience";
import { Tav, Title } from "./Band";

/**
 * Selettore visivo di materiali o interventi: radio + :has(), zero JavaScript.
 * Tutte le opzioni restano nel DOM; senza :has() compaiono una sotto l'altra.
 */
export function Stage({ id, stage, n, flip = false }: { id: string; stage: ServiceExperience["stage"]; n: number; flip?: boolean }) {
  return (
    <div className="wrap py-16 lg:py-28">
      <div className="grid-12 items-end gap-y-5">
        <div className="col-span-12 lg:col-span-8">
          <Tav n={n} label={stage.label} />
          <Title id={`${id}-t`} text={stage.title} className="t-h2 mt-4" />
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

        <div className="stage-media frame">
          {stage.options.map((o, i) => (
            <div key={o.name} data-o={i + 1} className="stage-shot">
              <Image src={o.img.src} alt={o.img.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" quality={60} />
            </div>
          ))}
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
            </article>
          ))}
        </div>
      </div>
      {stage.note && <p className="c-sub mt-6 text-[0.8rem]">{stage.note}</p>}
    </div>
  );
}
