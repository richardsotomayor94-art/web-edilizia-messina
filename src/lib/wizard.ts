import { normalizePhone } from "./phone";
import { isFunerary, isSpecialistLine } from "@/config/specialist";

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
  // Solo servizi specialistici
  object_type: string;
  material: string;
  intervention: string;
  item_size: string;
  movable: string;
  cemetery: string;
  access: string;
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
  object_type: "",
  material: "",
  intervention: "",
  item_size: "",
  movable: "",
  cemetery: "",
  access: "",
};

export type WizardStepKey = "service" | "property" | "size" | "timeline" | "where" | "details" | "contact" | "object" | "material" | "intervention" | "dimensions";
export type WizardStep = { key: WizardStepKey; title: string };

/**
 * Prima le scelte con un tocco, poi la zona, i dettagli facoltativi e infine
 * i dati personali, chiesti solo quando l'utente ha già investito nel modulo.
 */
export const WIZARD_STEPS: WizardStep[] = [
  { key: "service", title: "Che lavoro devi fare?" },
  { key: "property", title: "Che tipo di immobile è?" },
  { key: "size", title: "Quanto è grande l'area dei lavori?" },
  { key: "timeline", title: "A che punto è il progetto?" },
  { key: "where", title: "Dove si trova l'immobile?" },
  { key: "details", title: "Vuoi aggiungere qualche dettaglio?" },
  { key: "contact", title: "Come possiamo ricontattarti?" },
];

/** Restauro e pulizia specialistica: si chiede l'oggetto, non l'immobile; le scelte restano con un tocco. */
export const SPECIALIST_STEPS: WizardStep[] = [
  { key: "service", title: "Che lavoro devi fare?" },
  { key: "object", title: "Che cosa va trattato?" },
  { key: "material", title: "Di che materiale è?" },
  { key: "intervention", title: "Che cosa serve?" },
  { key: "dimensions", title: "Quanto è grande?" },
  { key: "timeline", title: "A che punto sei?" },
  { key: "where", title: "Dove si trova?" },
  { key: "details", title: "Ci mandi qualche foto?" },
  { key: "contact", title: "Come possiamo ricontattarti?" },
];

/** Titoli adattati per i servizi che usano il percorso normale ma non sono lavori edili. */
const TITLE_OVERRIDES: Partial<Record<string, Partial<Record<WizardStepKey, string>>>> = {
  traslochi: { size: "Quanto è grande la casa da traslocare?", where: "Da dove parte il trasloco?" },
  "sgomberi-smaltimento": { size: "Quanto è grande lo spazio da sgomberare?" },
  giardinaggio: { property: "Dove si trova il giardino?", size: "Quanto è grande il giardino?" },
};

export function stepsFor(service: string): WizardStep[] {
  if (isSpecialistLine(service)) return SPECIALIST_STEPS;
  const o = TITLE_OVERRIDES[service];
  return o ? WIZARD_STEPS.map((s) => ({ ...s, title: o[s.key] ?? s.title })) : WIZARD_STEPS;
}

/** Il passo dei contatti è l'ultimo in entrambi i percorsi. */
export const LAST_STEP = WIZARD_STEPS.length - 1;

const STEP_FIELDS: Record<WizardStepKey, string[]> = {
  service: ["service"],
  property: ["property_type"],
  size: ["square_meters"],
  timeline: ["timeline"],
  where: ["city", "postal_code", "zone", "cemetery", "access"],
  details: ["budget_range", "description"],
  contact: ["name", "phone", "whatsapp", "email", "preferred_contact", "consent_privacy", "consent_marketing"],
  object: ["object_type", "object"],
  material: ["material"],
  intervention: ["intervention"],
  dimensions: ["item_size", "size", "movable"],
};

/** Indice dello step che contiene il campo (per tornare sull'errore segnalato dal server). */
export function stepIndexOfField(field: string, service = ""): number {
  return stepsFor(service).findIndex((s) => STEP_FIELDS[s.key].includes(field));
}

/** Nomi dei campi del server (dettagli specialistici) → campi del modulo, per evidenziare l'errore giusto. */
export const SERVER_FIELD_ALIASES: Record<string, string> = { object: "object_type", size: "item_size" };

export function validateWizardStep(key: WizardStepKey, d: WizardData): Record<string, string> {
  const e: Record<string, string> = {};
  if (key === "service" && !d.service) e.service = "Scegli il tipo di lavoro";
  if (key === "property" && !d.property_type) e.property_type = "Scegli il tipo di immobile";
  if (key === "size" && !d.square_meters) e.square_meters = "Scegli una dimensione (anche «Non lo so»)";
  if (key === "timeline" && !d.timeline) e.timeline = "Scegli lo stato del progetto";
  if (key === "object" && !d.object_type) e.object_type = "Scegli che cosa va trattato";
  if (key === "material" && !d.material) e.material = "Scegli il materiale (anche «Non lo so»)";
  if (key === "intervention" && !d.intervention) e.intervention = "Scegli che cosa serve (anche «Non lo so»)";
  if (key === "dimensions") {
    if (!d.item_size) e.item_size = "Scegli una dimensione (anche «Non lo so»)";
    if (!d.movable) e.movable = "Indica se si può spostare (anche «Non lo so»)";
  }
  if (key === "where") {
    if (d.city.trim().length < 2) e.city = "Indica il comune";
    if (d.postal_code && !/^\d{5}$/.test(d.postal_code.trim())) e.postal_code = "Il CAP ha 5 cifre";
    if (isFunerary(d.service, d.object_type) && d.cemetery.length > 120) e.cemetery = "Massimo 120 caratteri";
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
