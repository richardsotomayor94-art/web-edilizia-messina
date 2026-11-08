import type { FunnelService } from "@/config/services";

export const SERVICE_OPTIONS: { value: FunnelService; label: string; hint?: string }[] = [
  { value: "ristrutturazione-completa", label: "Ristrutturazione completa", hint: "Appartamento o casa" },
  { value: "bagno", label: "Bagno" },
  { value: "cucina", label: "Cucina" },
  { value: "cartongesso", label: "Cartongesso", hint: "Pareti, controsoffitti" },
  { value: "pittura", label: "Pittura" },
  { value: "impianti", label: "Impianti", hint: "Elettrico, idraulico" },
  { value: "pavimenti", label: "Pavimenti" },
  { value: "facciata", label: "Facciata" },
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

/** Comuni suggeriti nel campo "Comune" (non implica copertura verificata) */
export const CITY_SUGGESTIONS = [
  "Messina",
  "Milazzo",
  "Barcellona Pozzo di Gotto",
  "Taormina",
  "Villafranca Tirrena",
  "Scaletta Zanclea",
  "Santa Teresa di Riva",
  "Giardini-Naxos",
  "Spadafora",
  "Rometta",
];

/** Zone/quartieri di Messina mappati agli slug di service_areas */
export const ZONE_TO_AREA: Record<string, string> = {
  "messina centro": "messina-centro",
  centro: "messina-centro",
  ganzirri: "ganzirri",
  "torre faro": "torre-faro",
  giostra: "giostra",
  tremestieri: "tremestieri",
  galati: "galati",
};

export const CITY_TO_AREA: Record<string, string> = {
  messina: "messina",
  milazzo: "milazzo",
  "barcellona pozzo di gotto": "barcellona-pozzo-di-gotto",
  taormina: "taormina",
};

export function resolveAreaSlug(city: string, zone?: string): string | undefined {
  const z = zone?.trim().toLowerCase();
  if (z && ZONE_TO_AREA[z] && city.trim().toLowerCase() === "messina") return ZONE_TO_AREA[z];
  return CITY_TO_AREA[city.trim().toLowerCase()];
}

export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"];
