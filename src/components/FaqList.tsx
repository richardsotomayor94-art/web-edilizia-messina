import type { Faq } from "@/config/services";

/** FAQ in <details>: contenuto nel DOM (estraibile da crawler e IA), accessibile. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-stone border-y border-stone">
      {faqs.map((f, i) => (
        <details key={f.q} open={i === 0} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-12 list-none items-center justify-between gap-4 py-2 font-semibold">
            <h3 className="text-base font-bold tracking-normal">{f.q}</h3>
            <span aria-hidden="true" className="text-2xl leading-none text-clay transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-4 text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
