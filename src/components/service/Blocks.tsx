import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { ServicePage } from "@/config/services";
import type { Media } from "@/config/media";
import { IMAGE_NOTE } from "@/config/media";
import { LOCAL_GUIDE_PATH } from "@/config/guides";
import { MESSINA_ZONES } from "@/config/areas";
import type { Fact, ServiceExperience } from "@/config/service-experience";
import { CTA_LABEL, site } from "@/config/site";
import { FaqList } from "../FaqList";
import { HowItWorks } from "../HowItWorks";
import { Icon } from "../Icon";
import { TrackedLink } from "../TrackedLink";
import { Num, Quota, Title } from "./Band";
import { ServiceMotif } from "./Motif";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Apertura editoriale: la risposta diretta (AEO) trattata come manifesto, con i numeri in scala. */
export function Answer({ id, s, facts }: { id: string; s: ServicePage; facts: Fact[] }) {
  // Parole come "Assemblea" non reggono la scala dei numeri
  const long = facts.some((f) => f.big.length > 4);
  return (
    <div className="wrap pb-14 pt-20 lg:pb-28 lg:pt-40">
      <div className="grid-12 gap-y-4">
        <h2 id={`${id}-t`} className="t-label c-accent col-span-12 font-sans lg:col-span-2 lg:pt-3">In breve</h2>
        <p data-reveal="words" className="t-statement col-span-12 lg:col-span-10">{s.answer}</p>
      </div>
      <dl className={`ar-facts mt-10 lg:mt-24 ${long ? "ar-facts-long" : ""}`}>
        {facts.map((f, i) => (
          <div key={f.big} data-reveal="fact" style={stagger(i)} className="ar-fact">
            <dd className="ar-fact-big"><Num value={f.big} /></dd>
            <dt className="c-sub max-w-xs text-[0.95rem] leading-snug">{f.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Cosa comprende: immagine ferma mentre scorrono le voci numerate. */
export function Scope({ id, s, img, n, flip = false, surface = false }: { id: string; s: ServicePage; img: Media; n: number; flip?: boolean; surface?: boolean }) {
  return (
    <div className="wrap grid-12 gap-y-8 py-16 lg:py-32">
      <div className={`col-span-12 lg:col-span-5 ${flip ? "lg:order-last lg:col-start-8" : ""}`}>
        <div className="stick">
          <Quota n={n} label="Il lavoro" />
          <Title id={`${id}-t`} text="Cosa comprende" className="t-h2 mt-4" />
          <div data-reveal="cover" data-tiles={surface ? "5x4" : undefined} className={`frame ar-parallax mt-6 aspect-[3/2] lg:mt-10 ${flip ? "lg:-mr-[clamp(1.25rem,4.5vw,4.5rem)]" : "lg:-ml-[clamp(1.25rem,4.5vw,4.5rem)]"}`}>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" quality={60} />
          </div>
        </div>
      </div>
      <ol className={`ar-list col-span-12 lg:col-span-6 ${flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"}`}>
        {s.includes.map((item, i) => (
          <li key={item} data-reveal="row" style={stagger(Math.min(i, 3))} className="scope-row ar-row b-rule">
            <span className="c-accent t-label pt-[0.45em] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-[clamp(1.6rem,2.7vw,2.6rem)] leading-[1.1]">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Pausa a tutto schermo con una sola idea: da desktop la scena si apre e resta ferma mentre il righello avanza. */
export function Visual({ visual }: { visual: ServiceExperience["visual"] }) {
  const { img, insight } = visual;
  return (
    <figure data-dark="true" className="ar-visual on-dark">
      <div className="ar-visual-pin">
        <div className="ar-visual-media">
          {/* 100vw anche su mobile: una versione più grande parte insieme all'immagine principale e peggiora il LCP */}
          <Image src={img.src} alt={img.alt} fill sizes="100vw" quality={60} />
        </div>
        <div aria-hidden="true" className="visual-light" />
        <figcaption className="visual-cap">
          <div className="wrap">
            <Title as="p" text={insight} className="t-insight max-w-4xl" />
            <p className="caption mt-3 !text-white/70">{IMAGE_NOTE}</p>
            <div aria-hidden="true" data-reveal="rule" className="ar-mm mt-5 lg:mt-8" />
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

/** Da grezzo a finito: l'immagine si apre come un pannello mentre si scorre. Schema, non un lavoro reale. */
export function Transform({ id, t, n }: { id: string; t: NonNullable<ServiceExperience["transform"]>; n: number }) {
  return (
    <div className="py-16 lg:py-32">
      <div className="wrap">
        <Quota n={n} label="Trasformazione" />
        <div className="grid-12 mt-4 items-end gap-y-4">
          <div className="col-span-12 lg:col-span-8">
            <Title id={`${id}-t`} text={t.title} className="t-h2" />
          </div>
          <p data-reveal className="c-sub col-span-12 lg:col-span-4">{t.text}</p>
        </div>
      </div>
      <div className="transform mt-8 lg:mt-14">
        <figure className="transform-a">
          <Image src={t.raw.src} alt={t.raw.alt} fill sizes="100vw" quality={60} />
          <figcaption className="t-label transform-tag">Grezzo</figcaption>
        </figure>
        <figure className="transform-b">
          <Image src={t.done.src} alt={t.done.alt} fill sizes="100vw" quality={60} />
          <figcaption className="t-label transform-tag transform-tag-b">Finito</figcaption>
        </figure>
      </div>
    </div>
  );
}

/** Approfondimento su una formula del servizio, come il chiavi in mano. */
export function Feature({ id, feature, n }: { id: string; feature: NonNullable<ServiceExperience["feature"]>; n: number }) {
  return (
    <div className="wrap py-16 lg:py-32">
      <Quota n={n} label={feature.label} />
      <div className="grid-12 mt-4 gap-y-8">
        <div className="col-span-12 lg:col-span-6">
          <Title id={`${id}-t`} text={feature.title} className="t-h2" />
          <p data-reveal className="t-lead c-sub mt-5 max-w-xl">{feature.text}</p>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <h3 className="t-label c-accent font-sans">{feature.listTitle}</h3>
          <ul className="mt-3">
            {feature.items.map((item, i) => (
              <li key={item} data-reveal="row" style={stagger(Math.min(i, 3))} className="ar-row b-rule border-t py-3.5 text-[1.05rem]"><span className="block">{item}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const layerClass = (name: string) => {
  if (name.startsWith("Nuovo pavimento")) return "ar-l-floor";
  if (name.startsWith("Adesivo") || name.startsWith("Protettivo") || name.startsWith("Impermeabilizzazione")) return "ar-l-glue";
  if (name.startsWith("Pavimento esistente")) return "ar-l-old";
  return name.includes("esistente") ? "ar-l-base-old" : "ar-l-base";
};

/** "Quando" in due forme: confronto a due vie, con le sezioni costruite dal basso, o segnali in grande. */
export function Decision({ id, s, compare, layers, n }: { id: string; s: ServicePage; compare?: [string, string]; layers?: [string[], string[]]; n: number }) {
  return (
    <div className="wrap py-16 lg:py-32">
      <Quota n={n} label={compare ? "La decisione" : "Quando"} />
      <Title id={`${id}-t`} text={s.whenTitle} className="t-h2 mt-4 max-w-4xl" />
      {compare ? (
        <>
          <div className="compare ar-compare mt-8 lg:mt-14">
            {compare.map((word, i) => (
              <div key={word} data-reveal={i === 0 ? "left" : "right"} className="compare-side b-rule">
                <h3 className="t-compare"><em>{word}</em></h3>
                <p className="c-sub mt-3 max-w-md text-[1.05rem]">{s.when[i]}</p>
              </div>
            ))}
          </div>
          {layers && (
            <figure data-reveal="section" className="ar-section mt-10 lg:mt-16">
              <figcaption className="t-label c-sub">Stratigrafia, schema indicativo</figcaption>
              <div className="ar-stacks mt-3">
                {layers.map((list, i) => (
                  <div key={compare[i]} className="ar-stack">
                    {list.length < layers[0].length && (
                      <div aria-hidden="true" className="ar-ghost">
                        <i />
                      </div>
                    )}
                    <ol className="ar-layers">
                      {list.map((l, j) => (
                        <li key={l} className={`ar-layer ${layerClass(l)}`} style={stagger(list.length - 1 - j)}>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="t-label mt-2">{compare[i]}</p>
                  </div>
                ))}
                <i aria-hidden="true" className="ar-ground" />
              </div>
            </figure>
          )}
        </>
      ) : (
        <ol className="mt-8 lg:mt-14">
          {s.when.map((w, i) => (
            <li key={w} data-reveal="row" style={stagger(i)} className="signal ar-row b-rule">
              <span className="c-accent font-display text-[clamp(2rem,4vw,3.75rem)] leading-none">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.5rem,3vw,3rem)] leading-[1.12]">{w}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/** Scheda tecnica e documento: i fattori di costo accanto alla lista del preventivo. */
export function Cost({ id, s, guides, n, href }: { id: string; s: ServicePage; guides: { path: string; title: string }[]; n: number; href: string }) {
  return (
    <div className="wrap grid-12 gap-y-10 py-16 lg:py-32">
      <div className="col-span-12 lg:col-span-6">
        <Quota n={n} label="Costi" />
        <Title id={`${id}-t`} text="Da cosa dipende il costo" className="t-h2 mt-4" />
        <p data-reveal className="c-sub mt-4 max-w-lg">Non pubblichiamo prezzi standard: il costo reale dipende da variabili che solo un sopralluogo può valutare. Ecco le principali.</p>
        <ul className="mt-6 lg:mt-10">
          {s.costFactors.map((c, i) => (
            <li key={c} data-reveal="row" style={stagger(Math.min(i, 3))} className="cost-row ar-row b-rule">
              <span aria-hidden="true" className="cost-tick" />
              <span className="text-[1.05rem]">{c}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <div data-reveal="sheet" className="sheet ar-sheet">
          <p className="t-label flex justify-between text-muted"><span>Scheda</span><span className="tabular-nums">{s.navLabel}</span></p>
          <h2 className="t-h3 mt-3 text-ink">Cosa deve contenere il preventivo</h2>
          <p className="mt-2 text-[0.95rem] text-ink-soft">Prima di firmare, controlla che siano indicati per iscritto:</p>
          <ul className="mt-4">
            {s.quoteChecklist.map((c, i) => (
              <li key={c} style={stagger(Math.min(i, 6))} className="ar-check flex gap-3 border-t border-stone py-3 text-[0.95rem] text-ink">
                <Icon name="check" size={18} className="mt-0.5 shrink-0 text-clay" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <TrackedLink href={href} event="cta_click" location="service_cost" service={s.funnelService} className="ar-inline-cta mt-3 text-clay-dark">
            <span>{CTA_LABEL}</span> <Icon name="arrow" size={18} />
          </TrackedLink>
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

/** Conoscenza locale: Messina è il contenuto, non un'etichetta. */
export function Local({ id, s, n }: { id: string; s: ServicePage; n: number }) {
  return (
    <div className="relative overflow-hidden">
      <p aria-hidden="true" className="local-word ar-drift"><em>Messina</em></p>
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
                <li key={note} data-reveal="row" style={stagger(i)} className="ar-row b-rule border-t py-5 font-display text-[clamp(1.45rem,2.2vw,2.15rem)] leading-[1.18]"><span className="block">{note}</span></li>
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

export function Process({ id, n }: { id: string; n: number }) {
  return (
    <div className="wrap py-16 lg:py-32">
      <Quota n={n} label="La richiesta" />
      <Title id={`${id}-t`} text="Come funziona la richiesta" className="t-h2 mt-4" />
      <div className="mt-10 lg:mt-20">
        <HowItWorks />
      </div>
    </div>
  );
}

function RelatedNav({ related, className }: { related: ServicePage[]; className: string }) {
  return (
    <nav aria-label="Lavori collegati" className={className}>
      <p className="t-label c-sub">Lavori collegati</p>
      <ul className="mt-2">
        {related.map((r) => (
          <li key={r.id} className="b-rule border-t">
            <Link href={r.path} className="ar-related flex min-h-11 items-center justify-between gap-2 py-1.5 font-display text-xl">
              {r.cardTitle} <Icon name="arrow" size={16} className="c-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Faqs({ id, s, related, n }: { id: string; s: ServicePage; related: ServicePage[]; n: number }) {
  return (
    <div className="wrap grid-12 gap-y-8 py-16 lg:py-32">
      <div className="col-span-12 lg:col-span-4">
        <div className="stick">
          <Quota n={n} label="Domande" />
          <Title id={`${id}-t`} text="Domande frequenti" className="t-h2 mt-4" />
          {related.length > 0 && <RelatedNav related={related} className="mt-8 hidden lg:block" />}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 lg:col-start-6">
        <FaqList faqs={s.faqs} />
        {related.length > 0 && <RelatedNav related={related} className="mt-10 lg:hidden" />}
      </div>
    </div>
  );
}

/** Chiusura delle landing: la porta si disegna e l'azione sta sulla soglia. */
export function ServiceClosing({ closing, href, service, surface = false, flip = false, motif }: { closing: ServiceExperience["closing"]; href: string; service: string; surface?: boolean; flip?: boolean; motif: ServiceExperience["motif"] }) {
  const { title, bring, img, cta, door } = closing;
  return (
    <section aria-labelledby="chiusura-t" data-chapter="fine" data-dark="true" className={`closing ar-closing cv-auto on-dark ${flip ? "ar-closing-flip" : ""}`}>
      <div data-reveal="cover" data-tiles={surface ? "10x5" : undefined} className="closing-media fx-drift">
        <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 100vw, 640px" quality={60} />
      </div>
      {door ? (
        <svg data-reveal="draw" className="ar-door" viewBox="0 0 520 480" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
          <path d="M0 479H60" pathLength="1" style={{ "--d": 0 } as CSSProperties} />
          <path d="M460 479H520" pathLength="1" style={{ "--d": 0 } as CSSProperties} />
          <path d="M60 479V79" pathLength="1" style={{ "--d": 6 } as CSSProperties} />
          <path d="M60 79A400 400 0 0 1 460 479" pathLength="1" style={{ "--d": 14 } as CSSProperties} />
        </svg>
      ) : (
        <ServiceMotif name={motif} className="ar-door ar-door-motif" />
      )}
      <div className="wrap grid-12 relative items-end gap-y-8 py-20 lg:py-32">
        <div className={`col-span-12 ${flip ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-8"}`}>
          <Title id="chiusura-t" text={title} className="t-display !text-[clamp(3.5rem,9.4vw,9.5rem)]" />
          <p className="t-lead mt-5 max-w-xl text-white/90">Una sola richiesta, gratis e senza impegno. La inoltriamo a un massimo di 3 professionisti locali.</p>
          <div data-closing-cta className="mt-8">
            <TrackedLink href={href} event="cta_click" location="service_bottom" service={service} className="btn btn-primary btn-lg ar-cta w-full sm:w-auto">
              {cta} <Icon name="arrow" />
            </TrackedLink>
          </div>
        </div>
        <div className={`col-span-12 ${flip ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-7"}`}>
          <p className="t-label text-white/70">Tieni a portata di mano</p>
          <ul className="ar-bring mt-2">
            {bring.map((b, i) => (
              <li key={b} data-reveal="row" style={stagger(i)} className="ar-row ar-row-light py-2.5 text-[0.95rem] text-white/95"><span className="block">{b}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
