import type { Faq } from "@/config/services";

/** FAQ in <details>: contenuto nel DOM (estraibile da crawler e IA), accessibile. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-stone rounded-[var(--radius-card)] border border-stone bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
            <h3 className="font-sans text-base">{f.q}</h3>
            <span aria-hidden="true" className="mt-0.5 text-xl leading-none text-sea transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
