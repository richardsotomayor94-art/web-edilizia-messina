import Image from "next/image";
import Link from "next/link";
import { CLUSTER_LABELS, MESSINA_ZONES, provinceByCluster } from "@/config/areas";
import { guides, LOCAL_GUIDE_PATH } from "@/config/guides";
import { media } from "@/config/media";
import { CTA_LABEL, site } from "@/config/site";
import { HowItWorks } from "../HowItWorks";
import { Icon } from "../Icon";
import { TavLabel } from "../TavLabel";
import { TrackedLink } from "../TrackedLink";

const FACTS = [
  { big: "0 €", label: "per chi chiede il preventivo" },
  { big: "3", label: "professionisti al massimo per richiesta" },
  { big: "7", label: "passaggi, circa due minuti" },
];

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="overflow-hidden py-16 lg:py-28">
      <div className="wrap grid-12 gap-y-8 lg:gap-y-10">
        <div className="col-span-12 lg:col-span-9 lg:row-start-1">
          <TavLabel n="01" label="Il metodo" />
          <h2 id="manifesto-title" data-reveal className="t-h1 mt-4">
            Prima di aprire un cantiere serve una richiesta <em>chiara</em>.
          </h2>
        </div>
        <div className="col-span-12 sm:col-span-9 lg:col-span-5 lg:row-start-2">
          <p data-reveal className="t-lead text-ink-soft">
            Descrivi il lavoro una volta sola. La verifichiamo e, se in zona ci sono professionisti disponibili, la inoltriamo a un massimo di tre. Non siamo un&apos;impresa edile: il contratto lo firmi con chi scegli tu.
          </p>
        </div>
        <div data-reveal="mask" className="frame col-span-12 aspect-[3/2] lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-2 lg:-mr-[clamp(1.25rem,4.5vw,4.5rem)] lg:aspect-[4/3]">
          <Image src={media.materia.src} alt={media.materia.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" />
        </div>
        <dl className="col-span-12 grid grid-cols-3 gap-4 border-t border-ink pt-4 lg:col-span-5 lg:row-start-3 lg:self-end">
          {FACTS.map((f, i) => (
            <div key={f.big} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="t-step block">{f.big}</span>
                <span className="mt-1 block text-[0.8rem] leading-snug text-muted lg:text-sm">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const LEVELS = [
  {
    n: "A",
    title: "Rinnovare le finiture",
    text: "Pavimenti, rivestimenti, sanitari nella stessa posizione, tinteggiatura. Di norma rientrano nell'edilizia libera: il tema è scegliere bene materiali e posa.",
    tag: "Di norma edilizia libera",
    img: media.materia,
  },
  {
    n: "B",
    title: "Rifare impianti e distribuzione",
    text: "Spostare tramezzi non portanti, rifare impianti, unire due ambienti. In genere serve una CILA, con un tecnico abilitato che segue la pratica.",
    tag: "In genere CILA con tecnico",
    img: media.cantiere,
  },
  {
    n: "C",
    title: "Toccare strutture e involucro",
    text: "Muri portanti, solai, facciate e terrazzi. A Messina, zona sismica 1, servono progetto e titolo adeguato; sulla costa vanno controllati anche i vincoli.",
    tag: "SCIA, progetto, vincoli",
    img: media.facciata,
  },
];

/** Tipologie di intervento: aiuta a capire che richiesta si sta facendo, senza fingere lavori eseguiti. */
export function ProjectTypes() {
  return (
    <section aria-labelledby="tipi-title" className="pb-16 lg:pb-28">
      <div className="wrap">
        <TavLabel n="03" label="Tipologie di intervento" />
        <h2 id="tipi-title" data-reveal className="t-h2 mt-4 max-w-4xl">
          Tre livelli di intervento, tre percorsi diversi.
        </h2>
        <p data-reveal className="t-lead mt-4 max-w-2xl text-ink-soft">
          Capire in quale ricade il tuo lavoro cambia tempi, pratiche e professionisti. Nel dubbio decide un tecnico abilitato.{" "}
          <Link href="/guide/cila-quando-serve/" className="link">Quando serve la CILA</Link>
        </p>
      </div>
      <ol className="wrap mt-10 grid-12 gap-y-12 lg:mt-16">
        {LEVELS.map((l, i) => (
          <li key={l.n} className={`col-span-12 ${i === 0 ? "lg:col-span-7" : i === 1 ? "lg:col-span-5 lg:mt-40" : "lg:col-span-9 lg:col-start-3"}`}>
            <div data-reveal="mask" className={`frame frame-zoom ${i === 2 ? "aspect-[4/3] lg:aspect-[16/9]" : i === 0 ? "aspect-[3/2]" : "aspect-[4/3]"}`}>
              <Image src={l.img.src} alt={l.img.alt} fill sizes={i === 1 ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 70vw, 100vw"} placeholder="blur" className={i === 2 ? "object-[50%_20%]" : ""} />
            </div>
            <div data-reveal className="mt-4 grid grid-cols-[2.5rem_1fr] gap-x-2">
              <span className="font-display text-4xl leading-none text-clay">{l.n}</span>
              <div>
                <h3 className="t-h3">{l.title}</h3>
                <p className="mt-2 max-w-xl text-ink-soft">{l.text}</p>
                <p className="t-label mt-3 text-clay-dark">{l.tag}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Process() {
  return (
    <section aria-labelledby="come-title" className="border-y border-stone bg-calce py-16 lg:py-28">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <TavLabel n="04" label="Come funziona" />
            <h2 id="come-title" data-reveal className="t-h2 mt-4">
              Dalla tua richiesta al sopralluogo.
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-4">
            <Link href="/come-funziona/" className="link font-semibold">Leggi nel dettaglio come funziona</Link>
          </p>
        </div>
        <div className="ruler mt-8 lg:mt-12" aria-hidden="true" />
        <div className="mt-8 lg:mt-12">
          <HowItWorks />
        </div>
        <TrackedLink href="/preventivo/" event="cta_click" location="home_process" className="btn btn-primary mt-10 w-full sm:w-auto">
          {CTA_LABEL} <Icon name="arrow" />
        </TrackedLink>
      </div>
    </section>
  );
}

const SPECS = [
  { big: "Zona 1", text: "La classificazione sismica del Comune di Messina: ogni intervento su muri portanti o solai richiede un tecnico abilitato." },
  { big: "1911", text: "Il Piano Borzì ridisegna il centro dopo il terremoto del 1908. Prima di progettare, fai verificare impianti e solai." },
  { big: "300 m", text: "La fascia tutelata da costa e laghi: a Ganzirri e Torre Faro possono servire autorizzazione paesaggistica e parere della Riserva." },
  { big: "PAI", text: "Il piano che segnala la pericolosità idrogeologica. Dopo l'alluvione del 2009, il tecnico deve controllare il lotto." },
];

export function Coverage() {
  return (
    <section id="zone" aria-labelledby="zone-title" className="scroll-mt-20 py-16 lg:py-28">
      <div className="wrap grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <TavLabel n="05" label="Dove" />
          <h2 id="zone-title" data-reveal className="t-h1 mt-4">
            <em>Messina</em>, prima di tutto.
          </h2>
          <p data-reveal className="t-lead mt-5 text-ink-soft">
            Raccogliamo richieste in città e in provincia. La disponibilità dei professionisti cambia da zona a zona: se nella tua non ce ne sono, te lo diciamo.
          </p>
          <div className="mt-8 border-t border-ink pt-3">
            <h3 className="t-label font-sans">{CLUSTER_LABELS.messina}</h3>
            <p className="mt-1 font-display text-2xl leading-snug">{MESSINA_ZONES.map((z) => z.name).join(" · ")} e villaggi</p>
          </div>
          <dl className="mt-4">
            {provinceByCluster().map((c) => (
              <div key={c.cluster} className="border-t border-stone py-2.5 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="t-label pt-1 text-muted">{c.label}</dt>
                <dd className="text-[0.95rem] text-ink-soft">{c.names.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div data-reveal="mask" className="frame aspect-[3/2] lg:aspect-[5/4]">
            <Image src={media.porta.src} alt={media.porta.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" placeholder="blur" />
          </div>
          <dl className="mt-8">
            {SPECS.map((s, i) => (
              <div key={s.big} data-reveal style={{ "--i": i } as React.CSSProperties} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3 border-t border-stone py-3 lg:grid-cols-[9rem_1fr]">
                <dt className="font-display text-[2.1rem] leading-none lg:text-5xl">{s.big}</dt>
                <dd className="text-[0.95rem] text-ink-soft">{s.text}</dd>
              </div>
            ))}
          </dl>
          <Link href={LOCAL_GUIDE_PATH} className="link mt-3 inline-block font-semibold">Cosa controllare zona per zona</Link>
        </div>
      </div>
    </section>
  );
}

const DO = ["Verifichiamo che la richiesta sia completa", "La inoltriamo a un massimo di 3 professionisti", "Ti diciamo se in zona non c'è nessuno disponibile", "Teniamo private foto e contatti"];
const DONT = ["Non eseguiamo lavori e non siamo un'impresa edile", "Non firmiamo contratti al posto tuo", "Non vendiamo i tuoi dati per pubblicità", "Non pubblichiamo recensioni o numeri che non possiamo dimostrare"];

export function Transparency() {
  return (
    <section aria-labelledby="trasp-title" className="on-dark bg-sea-dark py-16 text-paper lg:py-24">
      <div className="wrap grid-12 gap-y-8">
        <div className="col-span-12 lg:col-span-4">
          <TavLabel n="06" label="Chi siamo" dark />
          <h2 id="trasp-title" data-reveal className="t-h2 mt-4">Senza giri di parole.</h2>
          <p className="mt-4 text-paper/75">{site.name} è un servizio che mette in contatto chi deve fare lavori in casa con imprese e artigiani indipendenti.</p>
        </div>
        <TickList title="Cosa facciamo" items={DO} icon="check" className="col-span-12 sm:col-span-6 lg:col-span-4" />
        <TickList title="Cosa non facciamo" items={DONT} icon="close" className="col-span-12 sm:col-span-6 lg:col-span-4" />
      </div>
    </section>
  );
}

function TickList({ title, items, icon, className }: { title: string; items: string[]; icon: "check" | "close"; className: string }) {
  return (
    <div className={className}>
      <h3 className="t-label border-b border-paper/30 pb-2 font-sans text-paper/70">{title}</h3>
      <ul>
        {items.map((t) => (
          <li key={t} className="flex gap-3 border-b border-paper/15 py-3">
            <Icon name={icon} size={18} className="mt-0.5 shrink-0 text-citrus" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Guides() {
  const [first, ...rest] = guides;
  return (
    <section aria-labelledby="guide-title" className="py-16 lg:py-28">
      <div className="wrap">
        <TavLabel n="07" label="Prima di chiedere" />
        <h2 id="guide-title" data-reveal className="t-h2 mt-4">Arriva preparato al sopralluogo.</h2>
        <div className="grid-12 mt-10 gap-y-6">
          <Link href={first.path} className="group col-span-12 lg:col-span-5">
            <div className="frame frame-zoom aspect-[3/2]">
              <Image src={media.progetto.src} alt={media.progetto.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" />
            </div>
            <span className="t-h3 mt-4 block group-hover:underline">{first.title}</span>
            <span className="mt-2 block text-ink-soft">{first.excerpt}</span>
          </Link>
          <ul className="col-span-12 border-b border-stone lg:col-span-6 lg:col-start-7">
            {rest.map((g) => (
              <li key={g.path} className="border-t border-stone">
                <Link href={g.path} className="group flex items-start justify-between gap-4 py-5">
                  <span>
                    <span className="block font-display text-[1.65rem] leading-tight group-hover:underline">{g.title}</span>
                    <span className="mt-1 block text-[0.95rem] text-muted">{g.excerpt}</span>
                  </span>
                  <Icon name="arrow" className="mt-2 shrink-0 text-clay transition-transform duration-[var(--motion-normal)] group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="fine-title" className="on-dark relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <Image src={media.ombra.src} alt="" fill sizes="100vw" quality={60} className="object-cover opacity-60" />
      </div>
      <div className="wrap py-20 lg:py-36">
        <h2 id="fine-title" data-reveal className="t-display max-w-5xl !text-[clamp(3.25rem,9vw,9rem)]">
          Raccontaci il <em>lavoro</em>.
        </h2>
        <p className="t-lead mt-5 max-w-xl text-white/90">Ci vogliono un paio di minuti. Gratis e senza impegno: decidi tu se e chi scegliere.</p>
        <TrackedLink href="/preventivo/" event="cta_click" location="home_bottom" className="btn btn-primary mt-8 w-full text-lg sm:w-auto">
          {CTA_LABEL} <Icon name="arrow" />
        </TrackedLink>
      </div>
    </section>
  );
}
