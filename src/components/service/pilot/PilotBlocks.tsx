import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactElement } from "react";
import type { ServicePage } from "@/config/services";
import type { Media } from "@/config/media";
import { IMAGE_NOTE } from "@/config/media";
import { LOCAL_GUIDE_PATH } from "@/config/guides";
import { MESSINA_ZONES } from "@/config/areas";
import type { Fact, ServiceExperience } from "@/config/service-experience";
import { site } from "@/config/site";
import { FaqList } from "../../FaqList";
import { HowItWorks } from "../../HowItWorks";
import { Icon } from "../../Icon";
import { TrackedLink } from "../../TrackedLink";
import { Num, Title } from "../Band";

/**
 * Pass visivo pilota, solo per /pavimenti-messina/: la pagina è un pavimento che si posa.
 * Stessi testi e stessa struttura semantica delle landing condivise; cambiano regia e movimento.
 * Se il pass viene approvato, ciò che merita passa in components/service/Blocks.tsx e questa cartella sparisce.
 */

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Giunto tra due materie: una fila di piastrelle della materia precedente si ritira in sequenza. Finisce a filo. */
export function Tooth() {
  return (
    <div aria-hidden="true" data-reveal="tooth" className="pp-tooth">
      {Array.from({ length: 16 }, (_, i) => (
        <i key={i} style={{ "--i": i } as CSSProperties} />
      ))}
    </div>
  );
}

/** Quota di tavola: la linea si disegna tra il numero e il nome del capitolo. */
export function Quota({ n, label }: { n: number; label: string }) {
  return (
    <p data-reveal="quota" className="pp-quota t-label c-sub">
      <span className="c-accent tabular-nums">Tav. {String(n).padStart(2, "0")}</span>
      <i aria-hidden="true" className="pp-quota-line" />
      <span>{label}</span>
    </p>
  );
}

export function PilotAnswer({ id, s, facts }: { id: string; s: ServicePage; facts: Fact[] }) {
  return (
    <div className="wrap pb-14 pt-20 lg:pb-28 lg:pt-40">
      <div className="grid-12 gap-y-4">
        <h2 id={`${id}-t`} className="t-label c-accent col-span-12 font-sans lg:col-span-2 lg:pt-3">In breve</h2>
        <p data-reveal="words" className="t-statement col-span-12 lg:col-span-10">{s.answer}</p>
      </div>
      <dl className="pp-facts mt-10 lg:mt-24">
        {facts.map((f, i) => (
          <div key={f.big} data-reveal="fact" style={stagger(i)} className="pp-fact">
            <dd className="pp-fact-big"><Num value={f.big} /></dd>
            <dt className="c-sub max-w-xs text-[0.95rem] leading-snug">{f.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Lo schema di posa di ogni materiale, disegnato sulla fotografia quando lo scegli. Solo decorazione. */
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
        <path key={x} d={`M${x + 25} 20V120`} pathLength="1" strokeDasharray="1" opacity="0.45" />
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

export function PilotStage({ id, stage, n, href, service }: { id: string; stage: ServiceExperience["stage"]; n: number; href: string; service: string }) {
  return (
    <div className="wrap py-16 lg:py-32">
      <Quota n={n} label={stage.label} />
      <div className="grid-12 mt-4 items-end gap-y-5">
        <div className="col-span-12 lg:col-span-8">
          <Title id={`${id}-t`} text={stage.title} className="t-h2" />
        </div>
        <p data-reveal className="t-lead c-sub col-span-12 lg:col-span-4">{stage.intro}</p>
      </div>

      <div className="stage mt-8 lg:mt-14">
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

        <div data-reveal="tiles" data-tiles="6x5" className="stage-media frame">
          {stage.options.map((o, i) => (
            <div key={o.name} data-o={i + 1} className="stage-shot">
              <Image src={o.img.src} alt={o.img.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" quality={60} />
            </div>
          ))}
          <div aria-hidden="true" className="pp-plate">
            {stage.options.map((o, i) => {
              const Pattern = PATTERNS[i % PATTERNS.length];
              return (
                <svg key={o.name} data-o={i + 1} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" focusable="false">
                  <Pattern />
                </svg>
              );
            })}
          </div>
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
              <TrackedLink href={href} event="cta_click" location={`service_stage_${i + 1}`} service={service} className="pp-inline-cta c-accent mt-5">
                <span>Preventivo per {o.name.toLowerCase()}</span> <Icon name="arrow" size={18} />
              </TrackedLink>
            </article>
          ))}
        </div>
      </div>
      {stage.note && <p className="c-sub mt-6 text-[0.8rem]">{stage.note}</p>}
    </div>
  );
}

export function PilotScope({ id, s, img, n }: { id: string; s: ServicePage; img: Media; n: number }) {
  return (
    <div className="wrap grid-12 gap-y-8 py-16 lg:py-32">
      <div className="col-span-12 lg:col-span-5">
        <div className="stick">
          <Quota n={n} label="Il lavoro" />
          <Title id={`${id}-t`} text="Cosa comprende" className="t-h2 mt-4" />
          <div data-reveal="tiles" data-tiles="5x4" className="frame pp-parallax mt-6 aspect-[3/2] lg:-ml-[clamp(1.25rem,4.5vw,4.5rem)] lg:mt-10">
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" quality={60} />
          </div>
        </div>
      </div>
      <ol className="pp-list col-span-12 lg:col-span-6 lg:col-start-7">
        {s.includes.map((item, i) => (
          <li key={item} data-reveal="row" style={stagger(Math.min(i, 3))} className="scope-row pp-row b-rule">
            <span className="c-accent t-label pt-[0.45em] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-[clamp(1.6rem,2.7vw,2.6rem)] leading-[1.1]">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Il momento dei millimetri: la scena si apre e resta ferma mentre il righello avanza. */
export function PilotVisual({ visual }: { visual: ServiceExperience["visual"] }) {
  const { img, insight } = visual;
  return (
    <figure data-dark="true" className="pp-visual on-dark">
      <div className="pp-visual-pin">
        <div className="pp-visual-media">
          <Image src={img.src} alt={img.alt} fill sizes="100vw" quality={60} />
        </div>
        <div aria-hidden="true" className="visual-light" />
        <figcaption className="visual-cap">
          <div className="wrap">
            <Title as="p" text={insight} className="t-insight max-w-4xl" />
            <p className="caption mt-3 !text-white/70">{IMAGE_NOTE}</p>
            <div aria-hidden="true" data-reveal="rule" className="pp-mm mt-5 lg:mt-8" />
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

const layerClass = (name: string) => {
  if (name.startsWith("Nuovo pavimento")) return "pp-l-floor";
  if (name.startsWith("Adesivo")) return "pp-l-glue";
  if (name.startsWith("Pavimento esistente")) return "pp-l-old";
  return name.includes("esistente") ? "pp-l-base-old" : "pp-l-base";
};

/** Sovrapporre o demolire: le due sezioni costruite dal basso, a confronto sulla stessa linea di terra. */
export function PilotDecision({ id, s, compare, layers, n }: { id: string; s: ServicePage; compare: [string, string]; layers: [string[], string[]]; n: number }) {
  return (
    <div className="wrap py-16 lg:py-32">
      <Quota n={n} label="La decisione" />
      <Title id={`${id}-t`} text={s.whenTitle} className="t-h2 mt-4 max-w-4xl" />
      <div className="compare pp-compare mt-8 lg:mt-14">
        {compare.map((word, i) => (
          <div key={word} data-reveal={i === 0 ? "left" : "right"} className="compare-side b-rule">
            <h3 className="t-compare"><em>{word}</em></h3>
            <p className="c-sub mt-3 max-w-md text-[1.05rem]">{s.when[i]}</p>
          </div>
        ))}
      </div>
      <figure data-reveal="section" className="pp-section mt-10 lg:mt-16">
        <figcaption className="t-label c-sub">Stratigrafia, schema indicativo</figcaption>
        <div className="pp-stacks mt-3">
          {layers.map((list, i) => (
            <div key={compare[i]} className="pp-stack">
              {i === 1 && (
                <div aria-hidden="true" className="pp-ghost">
                  <i />
                </div>
              )}
              <ol className="pp-layers">
                {list.map((l, j) => (
                  <li key={l} className={`pp-layer ${layerClass(l)}`} style={stagger(list.length - 1 - j)}>
                    <span>{l}</span>
                  </li>
                ))}
              </ol>
              <p className="t-label mt-2">{compare[i]}</p>
            </div>
          ))}
          <i aria-hidden="true" className="pp-ground" />
        </div>
      </figure>
    </div>
  );
}

export function PilotCost({ id, s, guides, n }: { id: string; s: ServicePage; guides: { path: string; title: string }[]; n: number }) {
  return (
    <div className="wrap grid-12 gap-y-10 py-16 lg:py-32">
      <div className="col-span-12 lg:col-span-6">
        <Quota n={n} label="Costi" />
        <Title id={`${id}-t`} text="Da cosa dipende il costo" className="t-h2 mt-4" />
        <p data-reveal className="c-sub mt-4 max-w-lg">Non pubblichiamo prezzi standard: il costo reale dipende da variabili che solo un sopralluogo può valutare. Ecco le principali.</p>
        <ul className="mt-6 lg:mt-10">
          {s.costFactors.map((c, i) => (
            <li key={c} data-reveal="row" style={stagger(Math.min(i, 3))} className="cost-row pp-row b-rule">
              <span aria-hidden="true" className="cost-tick" />
              <span className="text-[1.05rem]">{c}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <div data-reveal="sheet" className="sheet pp-sheet">
          <p className="t-label flex justify-between text-muted"><span>Scheda</span><span className="tabular-nums">{s.navLabel}</span></p>
          <h2 className="t-h3 mt-3 text-ink">Cosa deve contenere il preventivo</h2>
          <p className="mt-2 text-[0.95rem] text-ink-soft">Prima di firmare, controlla che siano indicati per iscritto:</p>
          <ul className="mt-4">
            {s.quoteChecklist.map((c, i) => (
              <li key={c} style={stagger(i)} className="pp-check flex gap-3 border-t border-stone py-3 text-[0.95rem] text-ink">
                <Icon name="check" size={18} className="mt-0.5 shrink-0 text-clay" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          {guides.length > 0 && (
            <div className="mt-4 border-t border-stone pt-4 text-[0.95rem] text-ink-soft">
              <p className="t-label text-muted">Approfondisci</p>
              <ul className="mt-2 space-y-1.5">
                {guides.map((g) => (
                  <li key={g.path}><Link href={g.path} className="link font-semibold text-ink">{g.title}</Link></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PilotLocal({ id, s, n }: { id: string; s: ServicePage; n: number }) {
  return (
    <div className="relative overflow-hidden">
      <p aria-hidden="true" className="local-word pp-drift"><em>Messina</em></p>
      <div className="wrap relative py-16 lg:py-32">
        <Quota n={n} label="Sul territorio" />
        <div className="grid-12 mt-4 gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <h2 id={`${id}-t`} data-reveal className="t-h1">Cosa sapere a <em>{site.city}</em></h2>
            <p className="c-sub mt-6 text-sm">{MESSINA_ZONES.map((z) => z.name).join(" · ")}</p>
            <p className="mt-4 max-w-md">
              Vincoli e verifiche cambiano da zona a zona: leggi <Link href={LOCAL_GUIDE_PATH} className="link font-semibold">cosa controllare prima dei lavori a Messina</Link>.
            </p>
            <p className="mt-2"><Link href="/#zone" className="link">Le zone in cui raccogliamo richieste</Link></p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <ul>
              {s.messinaNotes.map((note, i) => (
                <li key={note} data-reveal="row" style={stagger(i)} className="pp-row b-rule border-t py-5 font-display text-[clamp(1.45rem,2.2vw,2.15rem)] leading-[1.18]"><span className="block">{note}</span></li>
              ))}
            </ul>
            <div className="b-rule border-t pt-5">
              <h3 className="t-label c-accent font-sans">Permessi e pratiche</h3>
              <p className="c-sub mt-3">{s.permitsNote}</p>
              <p className="c-sub mt-3 text-sm">
                Vedi anche la guida <Link href="/guide/cila-quando-serve/" className="link">CILA: quando serve</Link>. Le informazioni hanno carattere generale e non sostituiscono il parere di un tecnico abilitato.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PilotProcess({ id, n }: { id: string; n: number }) {
  return (
    <div className="wrap pp-process py-16 lg:py-32">
      <Quota n={n} label="La richiesta" />
      <Title id={`${id}-t`} text="Come funziona la richiesta" className="t-h2 mt-4" />
      <div className="mt-10 lg:mt-20">
        <HowItWorks />
      </div>
    </div>
  );
}

export function PilotFaqs({ id, s, related, n }: { id: string; s: ServicePage; related: ServicePage[]; n: number }) {
  const list = (cls: string, hover: boolean) => (
    <nav aria-label="Lavori collegati" className={cls}>
      <p className="t-label c-sub">Lavori collegati</p>
      <ul className="mt-2">
        {related.map((r) => (
          <li key={r.id} className="b-rule border-t">
            <Link href={r.path} className={`pp-related flex min-h-11 items-center justify-between gap-2 py-1.5 font-display text-xl ${hover ? "group" : ""}`}>
              {r.cardTitle} <Icon name="arrow" size={16} className="c-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
  return (
    <div className="wrap grid-12 gap-y-8 py-16 lg:py-32">
      <div className="col-span-12 lg:col-span-4">
        <div className="stick">
          <Quota n={n} label="Domande" />
          <Title id={`${id}-t`} text="Domande frequenti" className="t-h2 mt-4" />
          {related.length > 0 && list("mt-8 hidden lg:block", true)}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 lg:col-start-6">
        <FaqList faqs={s.faqs} />
        {related.length > 0 && list("mt-10 lg:hidden", false)}
      </div>
    </div>
  );
}

/** Chiusura: la materia si posa, la porta si apre e l'azione sta sulla soglia. */
export function PilotClosing({ title, bring, img, href, service, label }: { title: string; bring: string[]; img: Media; href: string; service: string; label: string }) {
  return (
    <section aria-labelledby="chiusura-t" data-chapter="fine" data-dark="true" className="closing pp-closing cv-auto on-dark">
      <div data-reveal="tiles" data-tiles="10x5" className="closing-media fx-drift">
        <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 100vw, 640px" quality={60} />
      </div>
      <svg data-reveal="draw" className="pp-door" viewBox="0 0 520 480" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
        <path d="M0 479H60" pathLength="1" style={{ "--d": 0 } as CSSProperties} />
        <path d="M460 479H520" pathLength="1" style={{ "--d": 0 } as CSSProperties} />
        <path d="M60 479V79" pathLength="1" style={{ "--d": 6 } as CSSProperties} />
        <path d="M60 79A400 400 0 0 1 460 479" pathLength="1" style={{ "--d": 14 } as CSSProperties} />
      </svg>
      <div className="wrap grid-12 relative items-end gap-y-8 py-20 lg:py-32">
        <div className="col-span-12 lg:col-span-8">
          <Title id="chiusura-t" text={title} className="t-display !text-[clamp(3.5rem,9.4vw,9.5rem)]" />
          <p className="t-lead mt-5 max-w-xl text-white/90">Una sola richiesta, gratis e senza impegno. La inoltriamo a un massimo di 3 professionisti locali.</p>
          <div data-closing-cta className="mt-8">
            <TrackedLink href={href} event="cta_click" location="service_bottom" service={service} className="btn btn-primary btn-lg pp-cta w-full sm:w-auto">
              {label} <Icon name="arrow" />
            </TrackedLink>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <p className="t-label text-white/70">Tieni a portata di mano</p>
          <ul className="pp-bring mt-2">
            {bring.map((b, i) => (
              <li key={b} data-reveal="row" style={stagger(i)} className="pp-row pp-row-light py-2.5 text-[0.95rem] text-white/95"><span className="block">{b}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
