"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SERVICE_OPTIONS,
  PROPERTY_OPTIONS,
  SIZE_OPTIONS,
  TIMELINE_OPTIONS,
  BUDGET_OPTIONS,
  CONTACT_PREF_OPTIONS,
  CITY_SUGGESTIONS,
  MAX_FILES,
  MAX_FILE_BYTES,
  ALLOWED_MIME,
} from "@/lib/lead-options";
import { readAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { uploadLeadFiles, prepareFile, type PreparedFile } from "@/lib/upload-client";
import { Icon } from "./Icon";

type Data = {
  service: string;
  property_type: string;
  square_meters: string;
  timeline: string;
  budget_range: string;
  city: string;
  postal_code: string;
  zone: string;
  name: string;
  phone: string;
  whatsapp_different: boolean;
  whatsapp: string;
  email: string;
  preferred_contact: string;
  description: string;
  consent_privacy: boolean;
  consent_marketing: boolean;
  website: string; // honeypot
};

const EMPTY: Data = {
  service: "",
  property_type: "",
  square_meters: "",
  timeline: "",
  budget_range: "",
  city: "Messina",
  postal_code: "",
  zone: "",
  name: "",
  phone: "",
  whatsapp_different: false,
  whatsapp: "",
  email: "",
  preferred_contact: "phone",
  description: "",
  consent_privacy: false,
  consent_marketing: false,
  website: "",
};

const STEPS = [
  { key: "service", title: "Che lavoro devi fare?" },
  { key: "property", title: "Che tipo di immobile è?" },
  { key: "size", title: "Quanto è grande l'area dei lavori?" },
  { key: "timeline", title: "A che punto è il progetto?" },
  { key: "budget", title: "Hai un budget indicativo?" },
  { key: "where", title: "Dove si trova l'immobile?" },
  { key: "contact", title: "Come possiamo farti ricontattare?" },
  { key: "confirm", title: "Controlla e invia" },
] as const;

const DRAFT_KEY = "mc360_wizard_draft";

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void };
  }
}

function labelOf(opts: readonly { value: string; label: string }[], v: string) {
  return opts.find((o) => o.value === v)?.label ?? "—";
}

export function LeadWizard({ initialService, turnstileSiteKey }: { initialService?: string; turnstileSiteKey?: string }) {
  const router = useRouter();
  const validInitial = SERVICE_OPTIONS.some((o) => o.value === initialService) ? initialService! : "";
  const [data, setData] = useState<Data>({ ...EMPTY, service: validInitial });
  const [step, setStep] = useState(validInitial ? 1 : 0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<PreparedFile[]>([]);
  const [fileMsg, setFileMsg] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "uploading" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const startedAt = useRef<number>(0);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  // Ripristino bozza (stessa scheda) — mai i file
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    startedAt.current = Date.now();
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw) as { data: Data; step: number };
        // eslint-disable-next-line react-hooks/set-state-in-effect -- ripristino one-shot da sessionStorage
        setData((prev) => ({ ...d.data, service: validInitial || d.data.service || prev.service, consent_privacy: false, website: "" }));
        if (!validInitial && typeof d.step === "number") setStep(Math.min(Math.max(d.step, 0), STEPS.length - 1));
      }
    } catch {
      /* ignore */
    }
  }, [validInitial]);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ data: { ...data, consent_privacy: false }, step }));
    } catch {
      /* ignore */
    }
  }, [data, step]);

  // Focus sul titolo dello step (accessibilità) — non al primo render
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  // Turnstile (solo se configurato) all'ultimo step
  useEffect(() => {
    if (!turnstileSiteKey || step !== STEPS.length - 1 || !turnstileRef.current) return;
    const el = turnstileRef.current;
    const render = () => {
      if (!window.turnstile || el.dataset.rendered) return;
      el.dataset.rendered = "1";
      window.turnstile.render(el, {
        sitekey: turnstileSiteKey,
        language: "it",
        callback: (t: string) => setTurnstileToken(t),
        "expired-callback": () => setTurnstileToken(""),
      });
    };
    if (window.turnstile) render();
    else if (!document.getElementById("cf-turnstile")) {
      const s = document.createElement("script");
      s.id = "cf-turnstile";
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = render;
      document.head.appendChild(s);
    }
  }, [step, turnstileSiteKey]);

  const markStart = useCallback(() => {
    if (started.current) return;
    started.current = true;
    track("form_start", { page: typeof window !== "undefined" ? window.location.pathname : undefined });
  }, []);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    markStart();
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => {
      if (!e[k as string]) return e;
      const n = { ...e };
      delete n[k as string];
      return n;
    });
  };

  const goTo = (n: number) => {
    setStep(n);
    track("form_step", { step: n + 1, step_name: STEPS[n].key, service: data.service || undefined });
  };

  const validateStep = (i: number): Record<string, string> => {
    const e: Record<string, string> = {};
    const k = STEPS[i].key;
    if (k === "service" && !data.service) e.service = "Scegli il tipo di lavoro";
    if (k === "property" && !data.property_type) e.property_type = "Scegli il tipo di immobile";
    if (k === "size" && !data.square_meters) e.square_meters = "Scegli una dimensione (anche «Non lo so»)";
    if (k === "timeline" && !data.timeline) e.timeline = "Scegli lo stato del progetto";
    if (k === "where") {
      if (data.city.trim().length < 2) e.city = "Indica il comune";
      if (data.postal_code && !/^\d{5}$/.test(data.postal_code.trim())) e.postal_code = "Il CAP ha 5 cifre";
    }
    if (k === "contact") {
      if (data.name.trim().length < 2) e.name = "Indica il tuo nome";
      const digits = data.phone.replace(/\D/g, "");
      if (digits.length < 6 || digits.length > 15) e.phone = "Inserisci un numero di telefono valido";
      if (data.whatsapp_different) {
        const w = data.whatsapp.replace(/\D/g, "");
        if (w.length < 6 || w.length > 15) e.whatsapp = "Inserisci un numero WhatsApp valido";
      }
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "Email non valida";
      if (data.preferred_contact === "email" && !data.email) e.email = "Indica l'email se preferisci essere contattato via email";
    }
    if (k === "confirm" && !data.consent_privacy) e.consent_privacy = "Per inviare la richiesta devi accettare l'informativa privacy";
    return e;
  };

  const next = () => {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      requestAnimationFrame(() => document.getElementById(`f-${first}`)?.focus());
      return;
    }
    if (step < STEPS.length - 1) goTo(step + 1);
  };

  const back = () => step > 0 && goTo(step - 1);

  const choose = (k: keyof Data, v: string) => {
    set(k, v as never);
    // avanzamento automatico per le scelte singole
    setTimeout(() => goTo(Math.min(step + 1, STEPS.length - 1)), 160);
  };

  const onFiles = async (list: FileList | null) => {
    if (!list) return;
    setFileMsg("");
    const incoming = Array.from(list);
    const room = MAX_FILES - files.length;
    if (incoming.length > room) setFileMsg(`Puoi allegare al massimo ${MAX_FILES} file.`);
    const accepted: PreparedFile[] = [];
    for (const f of incoming.slice(0, Math.max(room, 0))) {
      if (!ALLOWED_MIME.includes(f.type)) {
        setFileMsg(`«${f.name}»: formato non supportato (JPG, PNG, WebP, HEIC o PDF).`);
        continue;
      }
      const p = await prepareFile(f);
      if (p.blob.size > MAX_FILE_BYTES) {
        setFileMsg(`«${f.name}» supera 10 MB.`);
        continue;
      }
      accepted.push(p);
    }
    if (accepted.length) {
      setFiles((prev) => [...prev, ...accepted].slice(0, MAX_FILES));
      track("file_upload", { count: accepted.length });
    }
  };

  const submit = async () => {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (turnstileSiteKey && !turnstileToken) {
      setServerError("Attendi la verifica anti-spam qui sopra e riprova.");
      return;
    }
    setStatus("sending");
    setServerError("");
    const payload = {
      service: data.service,
      property_type: data.property_type,
      square_meters: data.square_meters,
      timeline: data.timeline,
      budget_range: data.budget_range || undefined,
      city: data.city.trim(),
      postal_code: data.postal_code.trim() || undefined,
      zone: data.zone.trim() || undefined,
      name: data.name.trim(),
      phone: data.phone.trim(),
      whatsapp: data.whatsapp_different ? data.whatsapp.trim() : undefined,
      email: data.email.trim() || undefined,
      preferred_contact: data.preferred_contact,
      description: data.description.trim() || undefined,
      consent_privacy: data.consent_privacy,
      consent_marketing: data.consent_marketing,
      attachments_expected: files.length,
      website: data.website,
      started_at: startedAt.current,
      turnstile_token: turnstileToken || undefined,
      form_page: window.location.pathname,
      attribution: readAttribution(),
    };
    try {
      const res = await fetch("/api/leads/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        id?: string | null;
        uploadToken?: string | null;
        tier?: string;
        error?: string;
        fields?: Record<string, string>;
      };
      if (!res.ok || !json.ok) {
        if (json.fields) setErrors(json.fields);
        setStatus("error");
        setServerError(
          json.error === "rate_limited"
            ? "Hai inviato troppe richieste in poco tempo. Riprova tra un'ora o contattaci."
            : json.error === "validation"
              ? "Controlla i campi evidenziati: alcuni dati non sono validi."
              : "Non siamo riusciti a inviare la richiesta. Riprova tra poco.",
        );
        if (json.fields) {
          const k = Object.keys(json.fields)[0];
          const idx = STEPS.findIndex((s) => stepFields[s.key]?.includes(k));
          if (idx >= 0 && idx !== step) setStep(idx);
        }
        return;
      }
      if (json.id && json.uploadToken && files.length) {
        setStatus("uploading");
        await uploadLeadFiles(json.id, json.uploadToken, files);
      }
      track("lead_submit", { service: data.service, tier: json.tier });
      track("form_complete", { service: data.service });
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      router.push("/preventivo/grazie/");
    } catch {
      setStatus("error");
      setServerError("Connessione non riuscita. Controlla la rete e riprova.");
    }
  };

  const progress = Math.round(((step + 1) / STEPS.length) * 100);
  const current = STEPS[step];

  const summary = useMemo(
    () => [
      ["Lavoro", labelOf(SERVICE_OPTIONS, data.service)],
      ["Immobile", labelOf(PROPERTY_OPTIONS, data.property_type)],
      ["Dimensione", labelOf(SIZE_OPTIONS, data.square_meters)],
      ["Stato", labelOf(TIMELINE_OPTIONS, data.timeline)],
      ["Budget", data.budget_range ? labelOf(BUDGET_OPTIONS, data.budget_range) : "Non indicato"],
      ["Luogo", [data.city, data.zone, data.postal_code].filter(Boolean).join(" · ")],
      ["Contatto", `${data.name} · ${data.phone}`],
      ["Allegati", files.length ? `${files.length} file` : "Nessuno"],
    ],
    [data, files.length],
  );

  return (
    <div className="rounded-[var(--radius-card)] border border-stone bg-white shadow-sm">
      {/* Progress */}
      <div className="border-b border-stone p-4 sm:px-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-sea">
            Passo {step + 1} di {STEPS.length}
          </span>
          <span className="text-muted">{step === 4 ? "Facoltativo" : `${progress}%`}</span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-sand"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-label="Avanzamento della richiesta"
        >
          <div className="h-full rounded-full bg-sea transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form
        className="p-4 sm:p-6"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step === STEPS.length - 1) submit();
          else next();
        }}
      >
        {/* Honeypot: invisibile a persone e screen reader */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Sito web
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
          </label>
        </div>

        <h2 ref={headingRef} tabIndex={-1} className="font-sans text-xl font-bold outline-none sm:text-2xl">
          {current.title}
        </h2>

        <div className="mt-5">
          {current.key === "service" && (
            <ChoiceGroup name="service" options={SERVICE_OPTIONS} value={data.service} onChoose={(v) => choose("service", v)} error={errors.service} />
          )}
          {current.key === "property" && (
            <ChoiceGroup name="property_type" options={PROPERTY_OPTIONS} value={data.property_type} onChoose={(v) => choose("property_type", v)} error={errors.property_type} />
          )}
          {current.key === "size" && (
            <ChoiceGroup name="square_meters" options={SIZE_OPTIONS} value={data.square_meters} onChoose={(v) => choose("square_meters", v)} error={errors.square_meters} />
          )}
          {current.key === "timeline" && (
            <ChoiceGroup name="timeline" options={TIMELINE_OPTIONS} value={data.timeline} onChoose={(v) => choose("timeline", v)} error={errors.timeline} columns={1} />
          )}
          {current.key === "budget" && (
            <>
              <p className="-mt-2 mb-4 text-sm text-muted">
                Facoltativo. Serve solo a orientare il professionista: non è un impegno e non influisce sul prezzo.
              </p>
              <ChoiceGroup name="budget_range" options={BUDGET_OPTIONS} value={data.budget_range} onChoose={(v) => choose("budget_range", v)} />
            </>
          )}
          {current.key === "where" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="city" label="Comune" error={errors.city} className="sm:col-span-2">
                <input
                  id="f-city"
                  list="city-list"
                  autoComplete="address-level2"
                  value={data.city}
                  onChange={(e) => set("city", e.target.value)}
                  className="input"
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? "e-city" : undefined}
                />
                <datalist id="city-list">
                  {CITY_SUGGESTIONS.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>
              <Field id="postal_code" label="CAP" hint="Facoltativo" error={errors.postal_code}>
                <input
                  id="f-postal_code"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={data.postal_code}
                  onChange={(e) => set("postal_code", e.target.value.replace(/\D/g, ""))}
                  className="input"
                  aria-invalid={!!errors.postal_code}
                  aria-describedby={errors.postal_code ? "e-postal_code" : undefined}
                />
              </Field>
              <Field id="zone" label="Zona o quartiere" hint="Facoltativo, es. Ganzirri, Centro">
                <input id="f-zone" value={data.zone} onChange={(e) => set("zone", e.target.value)} className="input" maxLength={120} />
              </Field>
              <p className="text-sm text-muted sm:col-span-2">
                Non serve l&apos;indirizzo esatto: lo concorderai direttamente con il professionista.
              </p>
            </div>
          )}
          {current.key === "contact" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Nome" error={errors.name}>
                <input id="f-name" autoComplete="given-name" value={data.name} onChange={(e) => set("name", e.target.value)} className="input" maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
              </Field>
              <Field id="phone" label="Telefono" error={errors.phone}>
                <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} className="input" maxLength={30} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
              </Field>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input type="checkbox" checked={data.whatsapp_different} onChange={(e) => set("whatsapp_different", e.target.checked)} className="h-5 w-5 accent-[var(--color-sea)]" />
                Il mio numero WhatsApp è diverso
              </label>
              {data.whatsapp_different && (
                <Field id="whatsapp" label="Numero WhatsApp" error={errors.whatsapp}>
                  <input id="f-whatsapp" type="tel" inputMode="tel" value={data.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className="input" maxLength={30} aria-invalid={!!errors.whatsapp} aria-describedby={errors.whatsapp ? "e-whatsapp" : undefined} />
                </Field>
              )}
              <Field id="email" label="Email" hint="Facoltativa" error={errors.email}>
                <input id="f-email" type="email" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} className="input" maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
              </Field>
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm font-semibold">Come preferisci essere contattato?</legend>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_PREF_OPTIONS.map((o) => (
                    <label key={o.value} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 ${data.preferred_contact === o.value ? "border-sea bg-sea-soft" : "border-stone"}`}>
                      <input type="radio" name="preferred_contact" value={o.value} checked={data.preferred_contact === o.value} onChange={() => set("preferred_contact", o.value)} className="accent-[var(--color-sea)]" />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field id="description" label="Descrivi il lavoro" hint="Facoltativo. Cosa vuoi fare, stato attuale. Non inserire dati sanitari o altri dati personali non necessari" className="sm:col-span-2">
                <textarea id="f-description" rows={4} maxLength={2000} value={data.description} onChange={(e) => set("description", e.target.value)} className="input min-h-28" />
              </Field>
              <div className="sm:col-span-2">
                <p className="text-sm font-semibold">Foto o planimetria</p>
                <p className="text-sm text-muted">Facoltativo. Fino a {MAX_FILES} file (JPG, PNG, HEIC, PDF; max 10 MB). Visibili solo allo staff e ai professionisti a cui inoltriamo la richiesta.</p>
                <label className="mt-2 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-stone px-4 py-3 text-sm font-medium hover:border-sea">
                  <Icon name="camera" /> Aggiungi foto o file
                  <input
                    type="file"
                    multiple
                    accept={ALLOWED_MIME.join(",")}
                    className="sr-only"
                    onChange={(e) => {
                      onFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
                {fileMsg && <p className="mt-2 text-sm text-err" role="status">{fileMsg}</p>}
                {files.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {files.map((f, i) => (
                      <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2 rounded-md bg-sand px-3 py-2 text-sm">
                        <span className="truncate">{f.name} · {(f.blob.size / 1024 / 1024).toFixed(1)} MB</span>
                        <button type="button" className="shrink-0 text-err underline" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} aria-label={`Rimuovi ${f.name}`}>
                          Rimuovi
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          {current.key === "confirm" && (
            <div className="space-y-5">
              <dl className="grid gap-x-4 gap-y-2 rounded-lg bg-sand p-4 text-sm sm:grid-cols-[auto_1fr]">
                {summary.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="font-semibold">{k}</dt>
                    <dd className="text-ink-soft">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="space-y-3">
                <label className={`flex gap-3 rounded-lg border p-3 text-sm ${errors.consent_privacy ? "border-err" : "border-stone"}`}>
                  <input
                    id="f-consent_privacy"
                    type="checkbox"
                    checked={data.consent_privacy}
                    onChange={(e) => set("consent_privacy", e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-sea)]"
                    aria-invalid={!!errors.consent_privacy}
                    aria-describedby="consent-privacy-text e-consent_privacy"
                  />
                  <span id="consent-privacy-text">
                    <strong>Obbligatorio.</strong> Ho letto l&apos;
                    <Link href="/privacy/" target="_blank" className="underline">informativa privacy</Link> e chiedo che la mia
                    richiesta sia inoltrata a un massimo di 3 imprese o professionisti partner, selezionati per servizio e
                    zona, perché mi ricontattino per sopralluogo e preventivo.
                  </span>
                </label>
                {errors.consent_privacy && <p id="e-consent_privacy" className="text-sm text-err">{errors.consent_privacy}</p>}

                <label className="flex gap-3 rounded-lg border border-stone p-3 text-sm">
                  <input
                    type="checkbox"
                    checked={data.consent_marketing}
                    onChange={(e) => set("consent_marketing", e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-sea)]"
                  />
                  <span>
                    <strong>Facoltativo.</strong> Acconsento a ricevere comunicazioni informative e promozionali su servizi per la casa da
                    parte di questo sito. Puoi revocare il consenso in qualsiasi momento. Non condividiamo questo consenso con terzi.
                  </span>
                </label>
              </div>

              {turnstileSiteKey && <div ref={turnstileRef} />}
            </div>
          )}
        </div>

        {serverError && (
          <p role="alert" className="mt-5 rounded-md border border-err/30 bg-err/5 p-3 text-sm text-err">
            {serverError}
          </p>
        )}

        {/* Navigazione */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-stone pt-4">
          <button type="button" onClick={back} className={`btn btn-secondary ${step === 0 ? "invisible" : ""}`} disabled={status === "sending" || status === "uploading"}>
            Indietro
          </button>
          {current.key === "budget" && !data.budget_range ? (
            <button type="button" onClick={() => goTo(step + 1)} className="btn btn-sea">
              Salta
            </button>
          ) : step === STEPS.length - 1 ? (
            <button type="submit" className="btn btn-primary" disabled={status === "sending" || status === "uploading"}>
              {status === "sending" ? "Invio in corso…" : status === "uploading" ? "Caricamento foto…" : "Invia la richiesta"}
            </button>
          ) : (
            <button type="submit" className="btn btn-sea">
              Avanti <Icon name="arrow" />
            </button>
          )}
        </div>
        <p className="mt-3 text-center text-xs text-muted">Gratuito e senza impegno. I tuoi dati sono trattati come descritto nell&apos;informativa privacy.</p>
      </form>
    </div>
  );
}

const stepFields: Record<string, string[]> = {
  service: ["service"],
  property: ["property_type"],
  size: ["square_meters"],
  timeline: ["timeline"],
  budget: ["budget_range"],
  where: ["city", "postal_code", "zone"],
  contact: ["name", "phone", "whatsapp", "email", "preferred_contact", "description"],
  confirm: ["consent_privacy", "consent_marketing"],
};

function ChoiceGroup({
  name,
  options,
  value,
  onChoose,
  error,
  columns = 2,
}: {
  name: string;
  options: readonly { value: string; label: string; hint?: string }[];
  value: string;
  onChoose: (v: string) => void;
  error?: string;
  columns?: 1 | 2;
}) {
  return (
    <div>
      <div role="radiogroup" aria-labelledby={undefined} aria-invalid={!!error} aria-describedby={error ? `e-${name}` : undefined} className={`grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
        {options.map((o, i) => {
          const selected = value === o.value;
          return (
            <button
              key={o.value}
              id={i === 0 ? `f-${name}` : undefined}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChoose(o.value)}
              className={`flex min-h-14 items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition ${
                selected ? "border-sea bg-sea-soft ring-1 ring-sea" : "border-stone hover:border-sea"
              }`}
            >
              <span>
                <span className="block font-medium">{o.label}</span>
                {o.hint && <span className="block text-xs text-muted">{o.hint}</span>}
              </span>
              <span aria-hidden="true" className={`h-5 w-5 shrink-0 rounded-full border-2 ${selected ? "border-sea bg-sea shadow-[inset_0_0_0_3px_white]" : "border-stone"}`} />
            </button>
          );
        })}
      </div>
      {error && (
        <p id={`e-${name}`} className="mt-2 text-sm text-err">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="block text-sm font-semibold">
        {label} {hint && <span className="font-normal text-muted">({hint})</span>}
      </label>
      <div className="mt-1">{children}</div>
      {error && (
        <p id={`e-${id}`} className="mt-1 text-sm text-err">
          {error}
        </p>
      )}
    </div>
  );
}
