import { z } from "zod";
import { normalizePhone } from "./phone";

const SERVICES = [
  "ristrutturazione-completa",
  "bagno",
  "cucina",
  "cartongesso",
  "pittura",
  "impianti",
  "pavimenti",
  "facciata",
  "isolamento",
  "opere-murarie",
  "altro",
] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const phoneField = z
  .string()
  .trim()
  .min(6, "Inserisci un numero di telefono valido")
  .max(30)
  .transform((v, ctx) => {
    const n = normalizePhone(v);
    if (!n) {
      ctx.addIssue({ code: "custom", message: "Numero di telefono non valido" });
      return z.NEVER;
    }
    return n;
  });

export const attributionSchema = z
  .object({
    utm_source: optionalText(120),
    utm_medium: optionalText(120),
    utm_campaign: optionalText(160),
    utm_content: optionalText(160),
    utm_term: optionalText(160),
    gclid: optionalText(255),
    landing_page: optionalText(500),
    referrer: optionalText(500),
  })
  .partial()
  .default({});

export const leadSchema = z.object({
  service: z.enum(SERVICES, { message: "Scegli il tipo di lavoro" }),
  property_type: z.enum(["appartamento", "villa", "casa_indipendente", "negozio", "ufficio", "condominio", "altro"], {
    message: "Scegli il tipo di immobile",
  }),
  square_meters: z.enum(["lt50", "50_100", "100_150", "gt150", "unknown"], { message: "Scegli la dimensione" }),
  timeline: z.enum(["info", "quotes", "soon", "urgent"], { message: "Scegli lo stato del progetto" }),
  budget_range: z.enum(["lt5k", "5k_15k", "15k_30k", "30k_60k", "gt60k", "undisclosed"]).optional(),
  city: z.string().trim().min(2, "Indica il comune").max(80),
  postal_code: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => v === undefined || /^\d{5}$/.test(v), "CAP non valido (5 cifre)"),
  zone: optionalText(120),
  name: z.string().trim().min(2, "Indica il tuo nome").max(120),
  phone: phoneField,
  whatsapp: z
    .string()
    .trim()
    .optional()
    .transform((v, ctx) => {
      if (!v) return undefined;
      const n = normalizePhone(v);
      if (!n) {
        ctx.addIssue({ code: "custom", message: "Numero WhatsApp non valido" });
        return z.NEVER;
      }
      return n;
    }),
  email: z
    .string()
    .trim()
    .max(254)
    .optional()
    .transform((v) => (v ? v.toLowerCase() : undefined))
    .refine((v) => v === undefined || z.email().safeParse(v).success, "Email non valida"),
  preferred_contact: z.enum(["phone", "whatsapp", "email"]).default("phone"),
  description: optionalText(2000),
  consent_privacy: z.literal(true, { message: "Per inviare la richiesta devi accettare l'informativa privacy" }),
  consent_marketing: z.boolean().default(false),
  attachments_expected: z.number().int().min(0).max(5).default(0),
  // anti-spam
  website: z.string().max(200).optional(), // honeypot
  started_at: z.number().int().positive().optional(),
  turnstile_token: z.string().max(4096).optional(),
  form_page: optionalText(500),
  attribution: attributionSchema,
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;

export const partnerSchema = z.object({
  business_name: z.string().trim().min(2, "Indica la ragione sociale").max(160),
  contact_name: z.string().trim().min(2, "Indica un referente").max(120),
  phone: phoneField,
  email: z
    .string()
    .trim()
    .max(254)
    .optional()
    .transform((v) => (v ? v.toLowerCase() : undefined))
    .refine((v) => v === undefined || z.email().safeParse(v).success, "Email non valida"),
  vat_number: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v.replace(/\s/g, "").toUpperCase() : undefined))
    .refine((v) => v === undefined || /^(IT)?\d{11}$/.test(v), "Partita IVA non valida (11 cifre)"),
  services: z.array(z.enum(SERVICES)).min(1, "Seleziona almeno un servizio").max(11),
  areas_text: optionalText(500),
  message: optionalText(2000),
  consent_privacy: z.literal(true, { message: "Devi accettare l'informativa privacy" }),
  website: z.string().max(200).optional(),
  started_at: z.number().int().positive().optional(),
});

export type PartnerData = z.output<typeof partnerSchema>;

/** Mappa gli errori zod in { campo: messaggio } per la UI */
export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "_form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
