import type { Faq } from "@/config/services";
import { richText } from "@/lib/rich-text";

/** FAQ in <details>: contenuto nel DOM (estraibile da crawler e IA), accessibile. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-b border-stone">
      {faqs.map((f, i) => (
        <details key={f.q} open={i === 0} className="group border-t border-stone [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-14 list-none items-center justify-between gap-4 py-3">
            <h3 className="font-display text-[1.45rem] leading-tight">{f.q}</h3>
            <span aria-hidden="true" className="relative h-4 w-4 shrink-0 text-clay">
              <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-[var(--motion-normal)] group-open:rotate-90" />
            </span>
          </summary>
          <p className="max-w-2xl pb-5 text-ink-soft">{richText(f.a)}</p>
        </details>
      ))}
    </div>
  );
}
