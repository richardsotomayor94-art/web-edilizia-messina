import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { ServicePage } from "@/config/services";
import type { Media } from "@/config/media";
import { IMAGE_NOTE } from "@/config/media";
import { LOCAL_GUIDE_PATH } from "@/config/guides";
import { MESSINA_ZONES } from "@/config/areas";
import type { Fact, ServiceExperience } from "@/config/service-experience";
import { site } from "@/config/site";
import { FaqList } from "../FaqList";
import { HowItWorks } from "../HowItWorks";
import { Icon } from "../Icon";
import { Num, Tav, Title } from "./Band";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Apertura editoriale: la risposta diretta (AEO) trattata come manifesto. */
export function Answer({ id, s, facts }: { id: string; s: ServicePage; facts: Fact[] }) {
  return (
    <div className="wrap pb-14 pt-14 lg:pb-24 lg:pt-28">
      <div className="grid-12 gap-y-4">
        <h2 id={`${id}-t`} className="t-label c-accent col-span-12 font-sans lg:col-span-2 lg:pt-3">In breve</h2>
        <p data-reveal className="t-statement col-span-12 lg:col-span-10">{s.answer}</p>
      </div>
      <dl className="grid-12 mt-10 gap-y-6 lg:mt-20">
        {facts.map((f, i) => (
          <div key={f.big} data-reveal style={stagger(i)} className="b-rule col-span-12 border-t pt-3 sm:col-span-4">
            <dd className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.02em]"><Num value={f.big} /></dd>
            <dt className="c-sub mt-2 max-w-xs text-[0.95rem] leading-snug">{f.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Cosa comprende: immagine ferma mentre scorrono le voci numerate. */
export function Scope({ id, s, img, n, flip = false }: { id: string; s: ServicePage; img: Media; n: number; flip?: boolean }) {
  return (
    <div className="wrap grid-12 gap-y-8 py-16 lg:py-28">
      <div className={`col-span-12 lg:col-span-5 ${flip ? "lg:order-last lg:col-start-8" : ""}`}>
        <div className="stick">
          <Tav n={n} label="Il lavoro" />
          <Title id={`${id}-t`} text="Cosa comprende" className="t-h2 mt-4" />
          <div data-reveal="panel" className={`frame mt-6 aspect-[3/2] lg:mt-10 ${flip ? "lg:-mr-[clamp(1.25rem,4.5vw,4.5rem)]" : "lg:-ml-[clamp(1.25rem,4.5vw,4.5rem)]"}`}>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" quality={60} />
          </div>
        </div>
      </div>
      <ol className={`col-span-12 lg:col-span-6 ${flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"}`}>
        {s.includes.map((item, i) => (
          <li key={item} data-reveal style={stagger(Math.min(i, 3))} className="scope-row b-rule">
            <span className="c-accent t-label pt-[0.45em] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-[clamp(1.6rem,2.7vw,2.6rem)] leading-[1.1]">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Pausa visiva a tutto schermo con una sola idea; da desktop una lama di luce attraversa la scena scorrendo. */
export function Visual({ visual }: { visual: ServiceExperience["visual"] }) {
  const { img, insight } = visual;
  return (
    <figure className="visual on-dark">
      <div className="visual-media fx-scale">
        <Image src={img.src} alt={img.alt} fill sizes="100vw" quality={60} />
      </div>
      <div aria-hidden="true" className="visual-light" />
      <figcaption className="visual-cap">
        <div className="wrap">
          <Title as="p" text={insight} className="t-insight max-w-4xl" />
          <p className="caption mt-3 !text-white/70">{IMAGE_NOTE}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/** Da grezzo a finito: l'immagine si apre come un pannello mentre si scorre. Schema, non un lavoro reale. */
export function Transform({ id, t, n }: { id: string; t: NonNullable<ServiceExperience["transform"]>; n: number }) {
  return (
    <div className="py-16 lg:py-28">
      <div className="wrap grid-12 items-end gap-y-4">
        <div className="col-span-12 lg:col-span-8">
          <Tav n={n} label="Trasformazione" />
          <Title id={`${id}-t`} text={t.title} className="t-h2 mt-4" />
        </div>
        <p data-reveal className="c-sub col-span-12 lg:col-span-4">{t.text}</p>
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
    <div className="wrap grid-12 gap-y-8 py-16 lg:py-28">
      <div className="col-span-12 lg:col-span-6">
        <Tav n={n} label={feature.label} />
        <Title id={`${id}-t`} text={feature.title} className="t-h2 mt-4" />
        <p data-reveal className="t-lead c-sub mt-5 max-w-xl">{feature.text}</p>
      </div>
      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <h3 className="t-label c-accent font-sans">{feature.listTitle}</h3>
        <ul className="mt-3">
          {feature.items.map((item, i) => (
            <li key={item} data-reveal style={stagger(Math.min(i, 3))} className="b-rule border-t py-3.5 text-[1.05rem]">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** "Quando" in due forme: confronto a due vie o segnali in grande. */
export function Decision({ id, s, compare, layers, n }: { id: string; s: ServicePage; compare?: [string, string]; layers?: [string[], string[]]; n: number }) {
  return (
    <div className="wrap py-16 lg:py-28">
      <Tav n={n} label={compare ? "La decisione" : "Quando"} />
      <Title id={`${id}-t`} text={s.whenTitle} className="t-h2 mt-4 max-w-4xl" />
      {compare ? (
        <div className="compare mt-8 lg:mt-14">
          {compare.map((word, i) => (
            <div key={word} data-reveal={i === 0 ? "left" : "right"} className="compare-side b-rule">
              <h3 className="t-compare"><em>{word}</em></h3>
              <p className="c-sub mt-3 max-w-md text-[1.05rem]">{s.when[i]}</p>
              {layers && (
                <div className="mt-6">
                  <p className="t-label c-sub">Stratigrafia, schema indicativo</p>
                  <ol data-reveal="layers" className="layers mt-2">
                    {layers[i].map((l, j) => (
                      <li key={l} className={`layer layer-${l.includes("esistente") ? "old" : j === 0 ? "top" : "new"}`} style={stagger(j)}>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <ol className="mt-8 lg:mt-14">
          {s.when.map((w, i) => (
            <li key={w} data-reveal style={stagger(i)} className="signal b-rule">
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
export function Cost({ id, s, guides, n }: { id: string; s: ServicePage; guides: { path: string; title: string }[]; n: number }) {
  return (
    <div className="wrap grid-12 gap-y-10 py-16 lg:py-28">
      <div className="col-span-12 lg:col-span-6">
        <Tav n={n} label="Costi" />
        <Title id={`${id}-t`} text="Da cosa dipende il costo" className="t-h2 mt-4" />
        <p data-reveal className="c-sub mt-4 max-w-lg">Non pubblichiamo prezzi standard: il costo reale dipende da variabili che solo un sopralluogo può valutare. Ecco le principali.</p>
        <ul className="mt-6 lg:mt-10">
          {s.costFactors.map((c, i) => (
            <li key={c} data-reveal style={stagger(Math.min(i, 3))} className="cost-row b-rule">
              <span aria-hidden="true" className="cost-tick" />
              <span className="text-[1.05rem]">{c}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <div data-reveal="rise" className="sheet">
          <p className="t-label flex justify-between text-muted"><span>Scheda</span><span className="tabular-nums">{s.navLabel}</span></p>
          <h2 className="t-h3 mt-3 text-ink">Cosa deve contenere il preventivo</h2>
          <p className="mt-2 text-[0.95rem] text-ink-soft">Prima di firmare, controlla che siano indicati per iscritto:</p>
          <ul className="mt-4">
            {s.quoteChecklist.map((c) => (
              <li key={c} className="flex gap-3 border-t border-stone py-3 text-[0.95rem] text-ink">
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

/** Conoscenza locale: Messina è il contenuto, non un'etichetta. */
export function Local({ id, s, n }: { id: string; s: ServicePage; n: number }) {
  return (
    <div className="relative overflow-hidden">
      <p aria-hidden="true" className="local-word"><em>Messina</em></p>
      <div className="wrap grid-12 relative gap-y-8 py-16 lg:py-28">
        <div className="col-span-12 lg:col-span-5">
          <Tav n={n} label="Sul territorio" />
          <h2 id={`${id}-t`} data-reveal className="t-h1 mt-4">Cosa sapere a <em>{site.city}</em></h2>
          <p className="c-sub mt-6 text-sm">
            {MESSINA_ZONES.map((z) => z.name).join(" · ")}
          </p>
          <p className="mt-4 max-w-md">
            Vincoli e verifiche cambiano da zona a zona: leggi <Link href={LOCAL_GUIDE_PATH} className="link font-semibold">cosa controllare prima dei lavori a Messina</Link>.
          </p>
          <p className="mt-2"><Link href="/#zone" className="link">Le zone in cui raccogliamo richieste</Link></p>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <ul>
            {s.messinaNotes.map((note, i) => (
              <li key={note} data-reveal style={stagger(i)} className="b-rule border-t py-5 font-display text-[clamp(1.45rem,2.2vw,2.15rem)] leading-[1.18]">{note}</li>
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
  );
}

export function Process({ id, n }: { id: string; n: number }) {
  return (
    <div className="wrap py-16 lg:py-28">
      <Tav n={n} label="La richiesta" />
      <Title id={`${id}-t`} text="Come funziona la richiesta" className="t-h2 mt-4" />
      <div className="mt-10 lg:mt-16">
        <HowItWorks />
      </div>
    </div>
  );
}

export function Faqs({ id, s, related, n }: { id: string; s: ServicePage; related: ServicePage[]; n: number }) {
  return (
    <div className="wrap grid-12 gap-y-8 py-16 lg:py-28">
      <div className="col-span-12 lg:col-span-4">
        <div className="stick">
          <Tav n={n} label="Domande" />
          <Title id={`${id}-t`} text="Domande frequenti" className="t-h2 mt-4" />
          {related.length > 0 && (
            <nav aria-label="Lavori collegati" className="mt-8 hidden lg:block">
              <p className="t-label c-sub">Lavori collegati</p>
              <ul className="mt-2">
                {related.map((r) => (
                  <li key={r.id} className="b-rule border-t">
                    <Link href={r.path} className="group flex min-h-11 items-center justify-between gap-2 py-1.5 font-display text-xl">
                      {r.cardTitle} <Icon name="arrow" size={16} className="c-accent transition-transform duration-[var(--motion-normal)] group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 lg:col-start-6">
        <FaqList faqs={s.faqs} />
        {related.length > 0 && (
          <nav aria-label="Lavori collegati" className="mt-10 lg:hidden">
            <p className="t-label c-sub">Lavori collegati</p>
            <ul className="mt-2">
              {related.map((r) => (
                <li key={r.id} className="b-rule border-t">
                  <Link href={r.path} className="flex min-h-11 items-center justify-between gap-2 py-1.5 font-display text-xl">
                    {r.cardTitle} <Icon name="arrow" size={16} className="c-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
