"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SERVICE_OPTIONS } from "@/lib/lead-options";

export function PartnerForm() {
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [services, setServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      business_name: String(fd.get("business_name") ?? ""),
      contact_name: String(fd.get("contact_name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? "") || undefined,
      vat_number: String(fd.get("vat_number") ?? "") || undefined,
      services,
      areas_text: String(fd.get("areas_text") ?? "") || undefined,
      message: String(fd.get("message") ?? "") || undefined,
      consent_privacy: fd.get("consent_privacy") === "on",
      website: String(fd.get("website") ?? ""),
      started_at: startedAt.current,
      fill_ms: Date.now() - startedAt.current,
    };
    setState("sending");
    const res = await fetch("/api/partners/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    const json = (await res?.json().catch(() => ({}))) as { ok?: boolean; fields?: Record<string, string> } | undefined;
    if (res?.ok && json?.ok) {
      setState("done");
      return;
    }
    setErrors(json?.fields ?? {});
    setState("error");
  }

  if (state === "done")
    return (
      <div role="status" className="rounded-[var(--radius-card)] border border-ok/30 bg-white p-6">
        <h2 className="font-sans text-xl font-bold">Candidatura ricevuta</h2>
        <p className="mt-2 text-ink-soft">Grazie! Ti contatteremo per verificare documenti, servizi e zone coperte.</p>
      </div>
    );

  const err = (k: string) => errors[k] && <p id={`pe-${k}`} className="mt-1 text-sm text-err">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-[var(--radius-card)] border border-stone bg-white p-5 sm:grid-cols-2 sm:p-6">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Sito web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="p-business" className="block text-sm font-semibold">Ragione sociale</label>
        <input id="p-business" name="business_name" required className="input mt-1" autoComplete="organization" aria-invalid={!!errors.business_name} />
        {err("business_name")}
      </div>
      <div>
        <label htmlFor="p-contact" className="block text-sm font-semibold">Referente</label>
        <input id="p-contact" name="contact_name" required className="input mt-1" autoComplete="name" aria-invalid={!!errors.contact_name} />
        {err("contact_name")}
      </div>
      <div>
        <label htmlFor="p-phone" className="block text-sm font-semibold">Telefono</label>
        <input id="p-phone" name="phone" type="tel" required className="input mt-1" autoComplete="tel" aria-invalid={!!errors.phone} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="p-email" className="block text-sm font-semibold">Email <span className="font-normal text-muted">(facoltativa)</span></label>
        <input id="p-email" name="email" type="email" className="input mt-1" autoComplete="email" aria-invalid={!!errors.email} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="p-vat" className="block text-sm font-semibold">Partita IVA <span className="font-normal text-muted">(facoltativa)</span></label>
        <input id="p-vat" name="vat_number" inputMode="numeric" className="input mt-1" aria-invalid={!!errors.vat_number} />
        {err("vat_number")}
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-semibold">Servizi che offri</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {SERVICE_OPTIONS.filter((o) => o.value !== "altro").map((o) => {
            const on = services.includes(o.value);
            return (
              <label key={o.value} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm ${on ? "border-sea bg-sea-soft" : "border-stone"}`}>
                <input type="checkbox" checked={on} onChange={() => setServices((s) => (on ? s.filter((x) => x !== o.value) : [...s, o.value]))} className="accent-[var(--color-sea)]" />
                {o.label}
              </label>
            );
          })}
        </div>
        {err("services")}
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="p-areas" className="block text-sm font-semibold">Zone coperte</label>
        <input id="p-areas" name="areas_text" placeholder="es. Messina città, zona sud, Milazzo" className="input mt-1" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="p-msg" className="block text-sm font-semibold">Messaggio <span className="font-normal text-muted">(facoltativo)</span></label>
        <textarea id="p-msg" name="message" rows={3} maxLength={2000} className="input mt-1" />
      </div>
      <label className="flex gap-3 text-sm sm:col-span-2">
        <input type="checkbox" name="consent_privacy" required className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-sea)]" aria-invalid={!!errors.consent_privacy} />
        <span>Ho letto l&apos;<Link href="/privacy/" target="_blank" className="underline">informativa privacy</Link> e chiedo di essere ricontattato per valutare la collaborazione.</span>
      </label>
      {err("consent_privacy")}
      {state === "error" && !Object.keys(errors).length && <p role="alert" className="text-sm text-err sm:col-span-2">Invio non riuscito. Riprova tra poco.</p>}
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-sea w-full sm:w-auto" disabled={state === "sending"}>
          {state === "sending" ? "Invio…" : "Invia candidatura"}
        </button>
      </div>
    </form>
  );
}
