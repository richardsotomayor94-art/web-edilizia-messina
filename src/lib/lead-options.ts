import type { FunnelService } from "@/config/services";
import { MESSINA_ZONES, MUNICIPALITIES } from "@/config/areas";

export const SERVICE_OPTIONS: { value: FunnelService; label: string; hint?: string }[] = [
  { value: "ristrutturazione-completa", label: "Ristrutturazione completa", hint: "Appartamento o casa" },
  { value: "bagno", label: "Bagno" },
  { value: "cucina", label: "Cucina" },
  { value: "cartongesso", label: "Cartongesso", hint: "Pareti, controsoffitti" },
  { value: "pittura", label: "Pittura" },
  { value: "impianti", label: "Impianti", hint: "Elettrico, idraulico" },
  { value: "pavimenti", label: "Pavimenti" },
  { value: "facciata", label: "Facciata" },
  { value: "impermeabilizzazione", label: "Impermeabilizzazioni", hint: "Terrazzi, lastrici" },
  { value: "altro", label: "Altro" },
];

export const PROPERTY_OPTIONS = [
  { value: "appartamento", label: "Appartamento" },
  { value: "villa", label: "Villa" },
  { value: "casa_indipendente", label: "Casa indipendente" },
  { value: "negozio", label: "Negozio" },
  { value: "ufficio", label: "Ufficio" },
  { value: "condominio", label: "Condominio (parti comuni)" },
  { value: "altro", label: "Altro" },
] as const;

export const SIZE_OPTIONS = [
  { value: "lt50", label: "Meno di 50 m²" },
  { value: "50_100", label: "50 – 100 m²" },
  { value: "100_150", label: "100 – 150 m²" },
  { value: "gt150", label: "Oltre 150 m²" },
  { value: "unknown", label: "Non lo so" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "info", label: "Sto raccogliendo informazioni" },
  { value: "quotes", label: "Voglio ricevere preventivi" },
  { value: "soon", label: "Voglio iniziare presto (entro 3 mesi)" },
  { value: "urgent", label: "Lavoro urgente" },
] as const;

/**
 * Fasce di budget indicative scelte dall'utente (NON sono nostri prezzi).
 * Ampie di proposito: servono solo a orientare il professionista.
 */
export const BUDGET_OPTIONS = [
  { value: "lt5k", label: "Fino a 5.000 €" },
  { value: "5k_15k", label: "5.000 – 15.000 €" },
  { value: "15k_30k", label: "15.000 – 30.000 €" },
  { value: "30k_60k", label: "30.000 – 60.000 €" },
  { value: "gt60k", label: "Oltre 60.000 €" },
  { value: "undisclosed", label: "Preferisco non indicarlo" },
] as const;

export const CONTACT_PREF_OPTIONS = [
  { value: "phone", label: "Telefono" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
] as const;

/** Suggerimenti del modulo, dalla fonte unica del territorio (non implicano copertura verificata) */
export const CITY_SUGGESTIONS = MUNICIPALITIES.map((m) => m.name);
export const ZONE_SUGGESTIONS = MESSINA_ZONES.map((z) => z.name);

export { resolveAreaSlug, isKnownMunicipality } from "@/config/areas";

export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"];
/**
 * Valore dell'attributo `accept`: senza HEIC, così iOS converte da solo le foto
 * in JPEG e la ricodifica lato client può eliminare i metadati GPS.
 */
export const FILE_INPUT_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";
