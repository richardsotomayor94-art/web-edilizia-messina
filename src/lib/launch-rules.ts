/**
 * Regole di lancio condivise tra il sito e `scripts/launch-check.mjs`.
 * Nessun import: deve funzionare anche eseguito direttamente da Node (type stripping).
 */

/** Recapiti sintetici per rivedere il design in demo: numero non valido e dominio riservato (RFC 2606). */
export const DEMO_CONTACT = {
  phone: "+39 000 000 0000",
  whatsapp: "390000000000",
  email: "contatti@messinacasa360.example",
} as const;

/** Valori di prova, segnaposto o di esempio: non possono finire in produzione né nei dati strutturati. */
export const PLACEHOLDER_RE = /(\.example\b|\bexample\.(com|org|net|it)\b|\besempio\b|0{7,}|\+39\s?000\b|\btest\b|lorem|\bxxx\b|da definire|placeholder)/i;

export function isPlaceholder(v?: string | null): boolean {
  return !!v && PLACEHOLDER_RE.test(v);
}

/** Numero italiano plausibile: +39 seguito da 6-11 cifre, prima cifra 0 (fisso) o 3 (mobile). */
export function isItalianPhone(v: string): boolean {
  const d = v.replace(/[\s.\-()]/g, "");
  return /^\+39[03]\d{5,10}$/.test(d) && !isPlaceholder(v);
}

export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v) && !isPlaceholder(v);
}

/** Partita IVA italiana: 11 cifre con cifra di controllo valida. */
export function isItalianVat(v: string): boolean {
  const d = v.replace(/^IT/i, "").replace(/\s/g, "");
  if (!/^\d{11}$/.test(d)) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    let n = Number(d[i]);
    if (i % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  }
  return (10 - (sum % 10)) % 10 === Number(d[10]);
}

export type Level = "blocker" | "warning";
export interface Finding {
  level: Level;
  code: string;
  message: string;
}

type Env = Record<string, string | undefined>;
const val = (env: Env, k: string) => env[k]?.trim() || undefined;

/**
 * Blocchi reali di produzione a partire dalla configurazione.
 * `verified` = verifiche manuali registrate in `launch/verifications.json` (nome -> data o null).
 */
export function checkLaunchEnv(env: Env, verified: Record<string, string | null> = {}): Finding[] {
  const out: Finding[] = [];
  const block = (code: string, message: string) => out.push({ level: "blocker", code, message });
  const warn = (code: string, message: string) => out.push({ level: "warning", code, message });

  // Dominio
  const url = val(env, "NEXT_PUBLIC_SITE_URL");
  if (!url) block("DOMAIN_MISSING", "NEXT_PUBLIC_SITE_URL non impostato: manca il dominio definitivo.");
  else {
    let host = "";
    try {
      const u = new URL(url);
      host = u.host;
      if (u.protocol !== "https:") block("DOMAIN_NOT_HTTPS", `Il dominio deve usare HTTPS: ${url}`);
      if (u.pathname !== "/" && u.pathname !== "") block("DOMAIN_HAS_PATH", "NEXT_PUBLIC_SITE_URL deve essere solo l'origine, senza percorso.");
    } catch {
      block("DOMAIN_INVALID", `NEXT_PUBLIC_SITE_URL non è un URL valido: ${url}`);
    }
    if (host.endsWith(".vercel.app")) block("DOMAIN_IS_VERCEL", "Il dominio è ancora *.vercel.app.");
    if (isPlaceholder(url)) block("DOMAIN_PLACEHOLDER", "Il dominio è un valore di esempio.");
  }

  // Modalità e indicizzazione
  if (val(env, "NEXT_PUBLIC_DEMO_MODE") === "true") block("DEMO_MODE_ON", "NEXT_PUBLIC_DEMO_MODE=true: moduli disattivati e recapiti di prova.");
  if (val(env, "NEXT_PUBLIC_DEMO_CONTACTS") === "true") block("DEMO_CONTACTS_ON", "NEXT_PUBLIC_DEMO_CONTACTS=true: recapiti sintetici attivi.");
  if (val(env, "NEXT_PUBLIC_SITE_INDEXABLE") !== "true") block("INDEXING_OFF", "NEXT_PUBLIC_SITE_INDEXABLE non è true: il sito resterebbe noindex (va attivato solo con autorizzazione).");

  // Dati legali
  const legal: [string, string][] = [
    ["NEXT_PUBLIC_LEGAL_OWNER_NAME", "Ragione sociale del titolare"],
    ["NEXT_PUBLIC_LEGAL_VAT", "Partita IVA"],
    ["NEXT_PUBLIC_LEGAL_ADDRESS", "Sede legale"],
    ["NEXT_PUBLIC_LEGAL_PEC", "PEC"],
    ["NEXT_PUBLIC_PRIVACY_EMAIL", "Email per la privacy"],
  ];
  for (const [k, label] of legal) {
    const v = val(env, k);
    if (!v) block(`LEGAL_MISSING:${k}`, `${label} mancante (${k}).`);
    else if (isPlaceholder(v)) block(`LEGAL_PLACEHOLDER:${k}`, `${label} contiene un valore di prova.`);
  }
  const vat = val(env, "NEXT_PUBLIC_LEGAL_VAT");
  if (vat && !isPlaceholder(vat) && !isItalianVat(vat)) block("LEGAL_VAT_INVALID", "La Partita IVA non supera il controllo formale.");
  for (const k of ["NEXT_PUBLIC_LEGAL_PEC", "NEXT_PUBLIC_PRIVACY_EMAIL"]) {
    const v = val(env, k);
    if (v && !isPlaceholder(v) && !isEmail(v)) block(`EMAIL_INVALID:${k}`, `${k} non è un indirizzo email valido.`);
  }

  // Recapiti commerciali
  const phone = val(env, "NEXT_PUBLIC_CONTACT_PHONE");
  const wa = val(env, "NEXT_PUBLIC_WHATSAPP_NUMBER");
  const email = val(env, "NEXT_PUBLIC_CONTACT_EMAIL");
  if (!phone && !wa && !email) block("CONTACTS_DISABLED", "Nessun recapito commerciale configurato (telefono, WhatsApp, email).");
  if (phone && !isItalianPhone(phone)) block("PHONE_INVALID", "NEXT_PUBLIC_CONTACT_PHONE non è un numero italiano valido o è di prova.");
  if (wa && !isItalianPhone(`+${wa.replace(/\D/g, "")}`)) block("WHATSAPP_INVALID", "NEXT_PUBLIC_WHATSAPP_NUMBER non è un numero valido (solo cifre con 39) o è di prova.");
  if (email && !isEmail(email)) block("EMAIL_INVALID:NEXT_PUBLIC_CONTACT_EMAIL", "NEXT_PUBLIC_CONTACT_EMAIL non è valido o è di prova.");
  if (!phone) warn("PHONE_MISSING", "Telefono non configurato: le chiamate dirette non saranno disponibili.");
  if (!wa) warn("WHATSAPP_MISSING", "WhatsApp non configurato.");

  // Ricezione richieste
  if (!val(env, "NEXT_PUBLIC_SUPABASE_URL") || !val(env, "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")) block("INTAKE_DB_MISSING", "Supabase non configurato: le richieste non verrebbero salvate.");
  if ((val(env, "LEAD_INGEST_SECRET") ?? "").length < 32) block("INTAKE_SECRET_WEAK", "LEAD_INGEST_SECRET assente o più corto di 32 caratteri.");
  if ((val(env, "IP_HASH_SALT") ?? "").length < 16) block("IP_SALT_WEAK", "IP_HASH_SALT assente o più corto di 16 caratteri.");
  const tg = val(env, "TELEGRAM_BOT_TOKEN") && val(env, "TELEGRAM_CHAT_ID");
  if (!tg && !val(env, "LEAD_WEBHOOK_URL")) block("NOTIFY_MISSING", "Nessun canale di notifica: nessuno saprebbe di una nuova richiesta.");
  if (!val(env, "NEXT_PUBLIC_TURNSTILE_SITE_KEY") || !val(env, "TURNSTILE_SECRET_KEY")) block("ANTISPAM_MISSING", "Turnstile non configurato: restano solo honeypot e limiti di frequenza.");
  if (!val(env, "NEXT_PUBLIC_GA4_ID")) warn("ANALYTICS_MISSING", "GA4 non configurato: le conversioni non saranno misurate.");

  // Verifiche end-to-end registrate a mano
  const required: [string, string][] = [
    ["db_migrations_applied", "Migrazioni applicate al database di produzione"],
    ["lead_intake_roundtrip", "Richiesta di prova ricevuta e visibile in area admin"],
    ["notification_delivery", "Notifica della richiesta di prova arrivata"],
    ["attachments_upload", "Foto della richiesta di prova caricate e consultabili"],
    ["partner_intake_roundtrip", "Candidatura partner di prova ricevuta"],
    ["test_data_cleaned", "Richieste di prova eliminate dal database"],
  ];
  for (const [k, label] of required) if (!verified[k]) block(`UNVERIFIED:${k}`, `${label}: verifica non registrata.`);
  return out;
}
