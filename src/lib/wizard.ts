import { normalizePhone } from "./phone";

export type WizardData = {
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

export const EMPTY_WIZARD: WizardData = {
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

/**
 * Prima le scelte con un tocco, poi la zona, i dettagli facoltativi e infine
 * i dati personali, chiesti solo quando l'utente ha già investito nel modulo.
 */
export const WIZARD_STEPS = [
  { key: "service", title: "Che lavoro devi fare?" },
  { key: "property", title: "Che tipo di immobile è?" },
  { key: "size", title: "Quanto è grande l'area dei lavori?" },
  { key: "timeline", title: "A che punto è il progetto?" },
  { key: "where", title: "Dove si trova l'immobile?" },
  { key: "details", title: "Vuoi aggiungere qualche dettaglio?" },
  { key: "contact", title: "Come possiamo ricontattarti?" },
] as const;

export type WizardStepKey = (typeof WIZARD_STEPS)[number]["key"];
export const LAST_STEP = WIZARD_STEPS.length - 1;

const STEP_FIELDS: Record<WizardStepKey, string[]> = {
  service: ["service"],
  property: ["property_type"],
  size: ["square_meters"],
  timeline: ["timeline"],
  where: ["city", "postal_code", "zone"],
  details: ["budget_range", "description"],
  contact: ["name", "phone", "whatsapp", "email", "preferred_contact", "consent_privacy", "consent_marketing"],
};

/** Indice dello step che contiene il campo (per tornare sull'errore segnalato dal server). */
export function stepIndexOfField(field: string): number {
  return WIZARD_STEPS.findIndex((s) => STEP_FIELDS[s.key].includes(field));
}

export function validateWizardStep(key: WizardStepKey, d: WizardData): Record<string, string> {
  const e: Record<string, string> = {};
  if (key === "service" && !d.service) e.service = "Scegli il tipo di lavoro";
  if (key === "property" && !d.property_type) e.property_type = "Scegli il tipo di immobile";
  if (key === "size" && !d.square_meters) e.square_meters = "Scegli una dimensione (anche «Non lo so»)";
  if (key === "timeline" && !d.timeline) e.timeline = "Scegli lo stato del progetto";
  if (key === "where") {
    if (d.city.trim().length < 2) e.city = "Indica il comune";
    if (d.postal_code && !/^\d{5}$/.test(d.postal_code.trim())) e.postal_code = "Il CAP ha 5 cifre";
  }
  if (key === "contact") {
    if (d.name.trim().length < 2) e.name = "Indica il tuo nome";
    if (!normalizePhone(d.phone)) e.phone = "Inserisci un numero valido, es. 333 1234567";
    if (d.whatsapp_different && !normalizePhone(d.whatsapp)) e.whatsapp = "Inserisci un numero WhatsApp valido";
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Controlla l'indirizzo email";
    if (d.preferred_contact === "email" && !d.email.trim()) e.email = "Indica l'email se preferisci essere contattato via email";
    if (!d.consent_privacy) e.consent_privacy = "Per inviare la richiesta serve questa conferma";
  }
  return e;
}
