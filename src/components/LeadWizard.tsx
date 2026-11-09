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
  ZONE_SUGGESTIONS,
  MAX_FILES,
  MAX_FILE_BYTES,
  ALLOWED_MIME,
  FILE_INPUT_ACCEPT,
} from "@/lib/lead-options";
import { readAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { uploadLeadFiles, prepareFile, type PreparedFile } from "@/lib/upload-client";
import { EMPTY_WIZARD, LAST_STEP, WIZARD_STEPS, stepIndexOfField, validateWizardStep, type WizardData } from "@/lib/wizard";
import { Icon, type IconName } from "./Icon";
import { ChoiceGroup, Field, FieldError } from "./wizard/parts";
import { ProgressRing } from "./wizard/ProgressRing";

const DRAFT_KEY = "mc360_wizard_draft";
const SERVICE_ICONS: Record<string, IconName> = {
  "ristrutturazione-completa": "home",
  bagno: "bath",
  cucina: "kitchen",
  cartongesso: "wall",
  pittura: "roller",
  impianti: "bolt",
  pavimenti: "floor",
  facciata: "building",
  altro: "more",
};
const DRAFT_VERSION = 2;
const TITLE_ID = "wizard-title";
const TAP_GUARD_MS = 250; // ignora il secondo tocco di un doppio tap sullo step successivo

const DEMO_NOTICE = "Versione dimostrativa: la richiesta non viene inviata né salvata.";
const GENERIC_SEND_ERROR = "Non siamo riusciti a inviare la richiesta. Riprova tra poco.";
const SERVER_ERRORS: Record<string, string> = {
  rate_limited: "Hai inviato troppe richieste in poco tempo. Riprova tra un'ora.",
  validation: "Controlla i campi evidenziati: alcuni dati non sono validi.",
  captcha: "La verifica anti-spam non è riuscita. Riprova.",
  not_configured: "Al momento non possiamo ricevere richieste, quindi la tua non è stata inviata. Riprova più tardi.",
};

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void };
  }
}

function labelOf(opts: readonly { value: string; label: string }[], v: string) {
  return opts.find((o) => o.value === v)?.label ?? "—";
}

export function LeadWizard({ initialService, turnstileSiteKey, demo = false }: { initialService?: string; turnstileSiteKey?: string; demo?: boolean }) {
  const router = useRouter();
  const validInitial = SERVICE_OPTIONS.some((o) => o.value === initialService) ? initialService! : "";
  const [data, setData] = useState<WizardData>({ ...EMPTY_WIZARD, service: validInitial });
  const [step, setStep] = useState(validInitial ? 1 : 0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<PreparedFile[]>([]);
  const [fileMsg, setFileMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "uploading" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const startedAt = useRef(0);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);
  const turnstileWidget = useRef<string | undefined>(undefined);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepChangedAt = useRef(0);

  // Ripristino bozza (stessa scheda) — mai i file né il consenso
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    startedAt.current = Date.now();
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const d = JSON.parse(raw) as { v?: number; data: WizardData; step: number; startedAt?: number };
      if (d.v !== DRAFT_VERSION) return; // bozza di una versione precedente del modulo
      if (typeof d.startedAt === "number") startedAt.current = d.startedAt;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- ripristino one-shot da sessionStorage
      setData((prev) => ({ ...d.data, service: validInitial || d.data.service || prev.service, consent_privacy: false, consent_marketing: false, website: "" }));
      if (!validInitial && typeof d.step === "number") setStep(Math.min(Math.max(d.step, 0), LAST_STEP));
    } catch {
      /* ignore */
    }
  }, [validInitial]);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ v: DRAFT_VERSION, data: { ...data, consent_privacy: false, consent_marketing: false }, step, startedAt: startedAt.current }));
    } catch {
      /* ignore */
    }
  }, [data, step]);

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    [],
  );

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
    if (!turnstileSiteKey || step !== LAST_STEP || !turnstileRef.current) return;
    const render = () => {
      const el = turnstileRef.current; // l'elemento attuale: lo step può essere stato riaperto
      if (!window.turnstile || !el || el.dataset.rendered) return;
      el.dataset.rendered = "1";
      setTurnstileToken("");
      turnstileWidget.current = window.turnstile.render(el, {
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
      s.onerror = () => {
        s.remove();
        setServerError("Non riusciamo a caricare la verifica anti-spam. Controlla la connessione e ricarica la pagina.");
      };
      document.head.appendChild(s);
    }
  }, [step, turnstileSiteKey]);

  const markStart = useCallback(() => {
    if (started.current) return;
    started.current = true;
    track("start_quote", { page: typeof window !== "undefined" ? window.location.pathname : undefined });
  }, []);

  const set = <K extends keyof WizardData>(k: K, v: WizardData[K]) => {
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
    stepChangedAt.current = Date.now();
    setStep(n);
    setServerError("");
    track("quote_step", { step: n + 1, step_name: WIZARD_STEPS[n].key, service: data.service || undefined });
  };

  const current = WIZARD_STEPS[step];

  /** Valida lo step corrente e porta il focus sul primo errore. true = valido. */
  const checkStep = () => {
    const e = validateWizardStep(current.key, data);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) requestAnimationFrame(() => document.getElementById(`f-${first}`)?.focus());
    return !first;
  };

  const next = () => {
    if (checkStep() && step < LAST_STEP) goTo(step + 1);
  };

  const back = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = null;
    if (step > 0) goTo(step - 1);
  };

  // Avanzamento automatico per le scelte con un tocco
  const choose = (k: keyof WizardData, v: string) => {
    if (advanceTimer.current || Date.now() - stepChangedAt.current < TAP_GUARD_MS) return;
    set(k, v as never);
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      goTo(Math.min(step + 1, LAST_STEP));
    }, 160);
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
        setFileMsg(`«${f.name}»: formato non supportato. Usa una foto JPG o PNG oppure un PDF.`);
        continue;
      }
      const p = await prepareFile(f);
      if (!p) {
        setFileMsg(`Non riusciamo a elaborare «${f.name}» da questo browser. Prova con una foto in JPG o PNG.`);
        continue;
      }
      if (p.blob.size > MAX_FILE_BYTES) {
        setFileMsg(`«${f.name}» supera 10 MB.`);
        continue;
      }
      accepted.push(p);
    }
    if (accepted.length) {
      setFiles((prev) => [...prev, ...accepted].slice(0, MAX_FILES));
      track("upload_added", { count: accepted.length });
    }
  };

  const submit = async () => {
    if (!checkStep()) return;
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
      fill_ms: Date.now() - startedAt.current,
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
        // I token Turnstile valgono una sola volta: ogni tentativo fallito ne richiede uno nuovo
        if (turnstileSiteKey) {
          setTurnstileToken("");
          window.turnstile?.reset(turnstileWidget.current);
        }
        const idx = json.fields ? stepIndexOfField(Object.keys(json.fields)[0]) : -1;
        if (json.fields) setErrors(json.fields);
        setStatus("error");
        setServerError(demo ? DEMO_NOTICE : (json.error !== "validation" || idx >= 0) && SERVER_ERRORS[json.error ?? ""] || GENERIC_SEND_ERROR);
        if (idx >= 0 && idx !== step) setStep(idx);
        return;
      }
      let uploaded = files.length;
      if (json.id && json.uploadToken && files.length) {
        setStatus("uploading");
        // La richiesta è già salvata: un errore qui non deve farla reinviare
        uploaded = await uploadLeadFiles(json.id, json.uploadToken, files).catch(() => 0);
      }
      track("lead_submit", { service: data.service, tier: json.tier });
      track("quote_complete", { service: data.service });
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      router.push(uploaded < files.length ? "/preventivo/grazie/?foto=parziale" : "/preventivo/grazie/");
    } catch {
      setStatus("error");
      setServerError("Connessione non riuscita. Controlla la rete e riprova: i dati inseriti non sono andati persi.");
    }
  };

  const summary = useMemo(
    () => [
      ["Lavoro", labelOf(SERVICE_OPTIONS, data.service)],
      ["Immobile", labelOf(PROPERTY_OPTIONS, data.property_type)],
      ["Dimensione", labelOf(SIZE_OPTIONS, data.square_meters)],
      ["Stato", labelOf(TIMELINE_OPTIONS, data.timeline)],
      ["Luogo", [data.city, data.zone, data.postal_code].filter(Boolean).join(" · ")],
      ["Budget", data.budget_range ? labelOf(BUDGET_OPTIONS, data.budget_range) : "Non indicato"],
      ["Allegati", files.length ? `${files.length} file` : "Nessuno"],
    ],
    [data, files.length],
  );

  const busy = status === "sending" || status === "uploading";
  const isTapStep = current.key === "service" || current.key === "property" || current.key === "size" || current.key === "timeline";
  const tapValue = { service: data.service, property: data.property_type, size: data.square_meters, timeline: data.timeline }[current.key as string];
  const hasDetails = !!(data.budget_range || data.description.trim() || files.length);
  const stepOf = `Passo ${step + 1} di ${WIZARD_STEPS.length}`;

  return (
    <div className="wizard">
      <div className="flex items-center gap-3 p-4 pb-0 sm:px-7 sm:pt-6">
        <div role="progressbar" aria-label="Avanzamento della richiesta" aria-valuemin={1} aria-valuemax={WIZARD_STEPS.length} aria-valuenow={step + 1} aria-valuetext={stepOf} className="flex items-center gap-3">
          <ProgressRing value={step + 1} total={WIZARD_STEPS.length} />
          <span className="t-label text-muted">{stepOf}</span>
        </div>
        {step > 0 && (
          <button type="button" onClick={back} disabled={busy} className="ml-auto inline-flex min-h-11 items-center gap-1.5 px-1 text-sm font-medium">
            <Icon name="arrow" size={16} className="rotate-180" /> Indietro
          </button>
        )}
      </div>

      <form
        className="p-4 sm:p-7"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step === LAST_STEP) submit();
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

        <h2 id={TITLE_ID} ref={headingRef} tabIndex={-1} className="text-[2rem] leading-none outline-none sm:text-[2.75rem]">
          {current.title}
        </h2>

        <div key={step} className="wizard-step mt-5">
          {current.key === "service" && <ChoiceGroup name="service" labelledBy={TITLE_ID} options={SERVICE_OPTIONS} icons={SERVICE_ICONS} value={data.service} onChoose={(v) => choose("service", v)} error={errors.service} />}
          {current.key === "property" && <ChoiceGroup name="property_type" labelledBy={TITLE_ID} options={PROPERTY_OPTIONS} value={data.property_type} onChoose={(v) => choose("property_type", v)} error={errors.property_type} />}
          {current.key === "size" && <ChoiceGroup name="square_meters" labelledBy={TITLE_ID} options={SIZE_OPTIONS} value={data.square_meters} onChoose={(v) => choose("square_meters", v)} error={errors.square_meters} />}
          {current.key === "timeline" && <ChoiceGroup name="timeline" labelledBy={TITLE_ID} options={TIMELINE_OPTIONS} value={data.timeline} onChoose={(v) => choose("timeline", v)} error={errors.timeline} columns={1} />}

          {current.key === "where" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="city" label="Comune" error={errors.city} className="sm:col-span-2">
                <input id="f-city" list="city-list" autoComplete="address-level2" enterKeyHint="next" value={data.city} onChange={(e) => set("city", e.target.value)} className="input" aria-invalid={!!errors.city} aria-describedby={errors.city ? "e-city" : undefined} />
                <datalist id="city-list">
                  {CITY_SUGGESTIONS.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>
              <Field id="zone" label="Zona o quartiere" hint="facoltativo">
                <input id="f-zone" list="zone-list" enterKeyHint="next" value={data.zone} onChange={(e) => set("zone", e.target.value)} className="input" maxLength={120} />
                <datalist id="zone-list">
                  {ZONE_SUGGESTIONS.map((z) => (
                    <option key={z} value={z} />
                  ))}
                </datalist>
              </Field>
              <Field id="postal_code" label="CAP" hint="facoltativo" error={errors.postal_code}>
                <input id="f-postal_code" inputMode="numeric" autoComplete="postal-code" enterKeyHint="next" maxLength={5} value={data.postal_code} onChange={(e) => set("postal_code", e.target.value.replace(/\D/g, ""))} className="input" aria-invalid={!!errors.postal_code} aria-describedby={errors.postal_code ? "e-postal_code" : undefined} />
              </Field>
              <p className="text-sm text-muted sm:col-span-2">Non serve l&apos;indirizzo esatto: lo concorderai direttamente con il professionista.</p>
            </div>
          )}

          {current.key === "details" && (
            <div className="space-y-5">
              <p className="-mt-1 text-sm text-muted">Tutto facoltativo: se vuoi, passa pure avanti. Con qualche foto il professionista capisce meglio il lavoro.</p>
              <div>
                <p className="text-sm font-semibold">Foto o planimetria</p>
                <label className="mt-1 flex min-h-14 cursor-pointer items-center justify-center gap-2 border border-dashed border-ink/50 px-4 py-3 text-sm font-semibold focus-within:border-ink hover:border-ink">
                  <Icon name="camera" /> Aggiungi foto o file
                  <input
                    type="file"
                    multiple
                    accept={FILE_INPUT_ACCEPT}
                    className="sr-only"
                    onChange={(e) => {
                      onFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
                <p className="mt-1.5 text-xs text-muted">
                  Fino a {MAX_FILES} file (foto o PDF, max 10 MB). Dalle foto togliamo i dati di posizione. Le vedono solo lo staff e i professionisti a cui inoltriamo la richiesta.
                </p>
                {fileMsg && (
                  <p className="mt-2 text-sm font-medium text-err" role="status">
                    {fileMsg}
                  </p>
                )}
                {files.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {files.map((f, i) => (
                      <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2 rounded-md bg-sand px-3 py-1 text-sm">
                        <span className="truncate">
                          {f.name} · {(f.blob.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                        <button type="button" className="min-h-11 shrink-0 px-1 text-err underline" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} aria-label={`Rimuovi ${f.name}`}>
                          Rimuovi
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Field id="description" label="Descrivi il lavoro" hint="cosa vuoi fare, stato attuale">
                <textarea id="f-description" rows={3} maxLength={2000} value={data.description} onChange={(e) => set("description", e.target.value)} className="input min-h-24" aria-describedby="description-note" />
                <p id="description-note" className="mt-1 text-xs text-muted">Non inserire dati sanitari o altri dati personali non necessari.</p>
              </Field>
              <fieldset>
                <legend className="text-sm font-semibold">Budget indicativo</legend>
                <p className="text-xs text-muted">Serve solo a orientare il professionista: non è un impegno.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BUDGET_OPTIONS.map((o) => (
                    <label key={o.value} className={`pill ${data.budget_range === o.value ? "pill-on" : ""}`}>
                      <input type="radio" name="budget_range" value={o.value} checked={data.budget_range === o.value} onChange={() => set("budget_range", o.value)} className="sr-only" />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {current.key === "contact" && (
            <div className="space-y-4">
              {demo && (
                <p className="border-l-2 border-clay bg-sand p-3 text-sm font-medium">{DEMO_NOTICE} Non inserire dati reali.</p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Nome" error={errors.name}>
                  <input id="f-name" autoComplete="given-name" enterKeyHint="next" value={data.name} onChange={(e) => set("name", e.target.value)} className="input" maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
                </Field>
                <Field id="phone" label="Telefono" error={errors.phone}>
                  <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" value={data.phone} onChange={(e) => set("phone", e.target.value)} className="input" maxLength={30} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
                </Field>
                <Field id="email" label="Email" hint="facoltativa" error={errors.email} className="sm:col-span-2">
                  <input id="f-email" type="email" autoComplete="email" enterKeyHint="next" value={data.email} onChange={(e) => set("email", e.target.value)} className="input" maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
                </Field>
              </div>
              <fieldset>
                <legend className="mb-2 text-sm font-semibold">Come preferisci essere contattato?</legend>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_PREF_OPTIONS.map((o) => (
                    <label key={o.value} className={`pill ${data.preferred_contact === o.value ? "pill-on" : ""}`}>
                      <input type="radio" name="preferred_contact" value={o.value} checked={data.preferred_contact === o.value} onChange={() => set("preferred_contact", o.value)} className="sr-only" />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="flex min-h-11 items-center gap-2 text-sm">
                <input type="checkbox" checked={data.whatsapp_different} onChange={(e) => set("whatsapp_different", e.target.checked)} className="h-5 w-5 accent-[var(--color-sea)]" />
                Il mio numero WhatsApp è diverso
              </label>
              {data.whatsapp_different && (
                <Field id="whatsapp" label="Numero WhatsApp" error={errors.whatsapp}>
                  <input id="f-whatsapp" type="tel" inputMode="tel" value={data.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className="input" maxLength={30} aria-invalid={!!errors.whatsapp} aria-describedby={errors.whatsapp ? "e-whatsapp" : undefined} />
                </Field>
              )}

              <details className="bg-sand px-4 py-1 text-sm">
                <summary className="flex min-h-11 cursor-pointer items-center font-semibold">Rivedi la tua richiesta</summary>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 pb-3">
                  {summary.map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="font-semibold">{k}</dt>
                      <dd className="text-ink-soft">{v}</dd>
                    </div>
                  ))}
                </dl>
              </details>

              <div className="space-y-3">
                <div>
                  <label className={`flex gap-3 border p-3 text-sm ${errors.consent_privacy ? "border-err" : "border-stone"}`}>
                    <input id="f-consent_privacy" type="checkbox" checked={data.consent_privacy} onChange={(e) => set("consent_privacy", e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-clay)]" aria-invalid={!!errors.consent_privacy} aria-describedby={errors.consent_privacy ? "e-consent_privacy" : undefined} />
                    <span>
                      Ho letto l&apos;
                      <Link href="/privacy/" target="_blank" className="underline">
                        informativa privacy
                      </Link>{" "}
                      e chiedo che la mia richiesta sia inoltrata a un massimo di 3 imprese o professionisti, scelti per servizio e zona, perché mi ricontattino per sopralluogo e preventivo.
                    </span>
                  </label>
                  {errors.consent_privacy && <FieldError id="e-consent_privacy">{errors.consent_privacy}</FieldError>}
                </div>
                <label className="flex gap-3 border border-stone p-3 text-sm">
                  <input type="checkbox" checked={data.consent_marketing} onChange={(e) => set("consent_marketing", e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-sea)]" />
                  <span>
                    <strong>Facoltativo.</strong> Acconsento a ricevere comunicazioni informative e promozionali su servizi per la casa da parte di questo sito. Puoi revocare il consenso in qualsiasi momento. Non condividiamo questo consenso con terzi.
                  </span>
                </label>
              </div>
              {turnstileSiteKey && <div ref={turnstileRef} />}
            </div>
          )}
        </div>

        {serverError && (
          <p role="alert" className="mt-5 rounded-md border border-err/30 bg-err/5 p-3 text-sm font-medium text-err">
            {serverError}
          </p>
        )}

        {/* Nelle scelte con un tocco il pulsante serve solo tornando su uno step già compilato */}
        {(!isTapStep || tapValue) && (
          <div className="mt-5">
            {step === LAST_STEP ? (
              <button type="submit" className="btn btn-primary w-full text-lg" disabled={busy}>
                {status === "sending" ? "Invio in corso…" : status === "uploading" ? "Caricamento foto…" : "Invia la richiesta"}
              </button>
            ) : (
              <button type="submit" className="btn btn-sea w-full">
                {current.key === "details" && !hasDetails ? "Salta e continua" : "Avanti"} <Icon name="arrow" />
              </button>
            )}
          </div>
        )}
        <p className="mt-3 text-center text-xs text-muted">Gratuito e senza impegno: non sei obbligato ad accettare i preventivi.</p>
      </form>
    </div>
  );
}
