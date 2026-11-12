import { describe, expect, it } from "vitest";
import { DEMO_CONTACT, checkLaunchEnv, isItalianPhone, isItalianVat, isPlaceholder } from "@/lib/launch-rules";

const READY: Record<string, string> = {
  NEXT_PUBLIC_SITE_URL: "https://www.messinacasa360.it",
  NEXT_PUBLIC_SITE_INDEXABLE: "true",
  NEXT_PUBLIC_LEGAL_OWNER_NAME: "Rossi Servizi S.r.l.",
  NEXT_PUBLIC_LEGAL_VAT: "01234567897",
  NEXT_PUBLIC_LEGAL_ADDRESS: "Via Garibaldi 1, 98122 Messina",
  NEXT_PUBLIC_LEGAL_PEC: "rossiservizi@pec.it",
  NEXT_PUBLIC_PRIVACY_EMAIL: "privacy@messinacasa360.it",
  NEXT_PUBLIC_CONTACT_PHONE: "+39 090 123 4567",
  NEXT_PUBLIC_WHATSAPP_NUMBER: "393331234567",
  NEXT_PUBLIC_CONTACT_EMAIL: "info@messinacasa360.it",
  NEXT_PUBLIC_SUPABASE_URL: "https://abc.supabase.co",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_x",
  LEAD_INGEST_SECRET: "s".repeat(40),
  IP_HASH_SALT: "t".repeat(20),
  TELEGRAM_BOT_TOKEN: "1:x",
  TELEGRAM_CHAT_ID: "1",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "k",
  TURNSTILE_SECRET_KEY: "s",
  NEXT_PUBLIC_GA4_ID: "G-X",
};
const ALL_VERIFIED = Object.fromEntries(
  ["db_migrations_applied", "lead_intake_roundtrip", "notification_delivery", "attachments_upload", "partner_intake_roundtrip", "test_data_cleaned"].map((k) => [k, "2026-12-01"]),
);
const blockers = (env: Record<string, string | undefined>, v = ALL_VERIFIED) => checkLaunchEnv(env, v).filter((f) => f.level === "blocker").map((f) => f.code);

describe("valori di prova", () => {
  it("riconosce i recapiti sintetici della demo", () => {
    for (const v of Object.values(DEMO_CONTACT)) expect(isPlaceholder(v)).toBe(true);
    expect(isItalianPhone(DEMO_CONTACT.phone)).toBe(false);
  });
  it("non scambia dati reali per segnaposto", () => {
    expect(isPlaceholder("+39 090 123 4567")).toBe(false);
    expect(isPlaceholder("info@messinacasa360.it")).toBe(false);
  });
  it("controlla la Partita IVA", () => {
    expect(isItalianVat("01234567897")).toBe(true);
    expect(isItalianVat("01234567890")).toBe(false);
  });
});

describe("controllo di lancio", () => {
  it("configurazione completa e verificata: nessun blocco", () => {
    expect(blockers(READY)).toEqual([]);
  });
  it("la demo attuale ha tutti i blocchi attesi", () => {
    const codes = blockers({ NEXT_PUBLIC_DEMO_MODE: "true" }, {});
    expect(codes).toEqual(expect.arrayContaining(["DOMAIN_MISSING", "DEMO_MODE_ON", "INDEXING_OFF", "CONTACTS_DISABLED", "INTAKE_DB_MISSING", "NOTIFY_MISSING", "UNVERIFIED:lead_intake_roundtrip"]));
  });
  it("blocca dominio vercel.app, http e recapiti di prova", () => {
    expect(blockers({ ...READY, NEXT_PUBLIC_SITE_URL: "https://x.vercel.app" })).toContain("DOMAIN_IS_VERCEL");
    expect(blockers({ ...READY, NEXT_PUBLIC_SITE_URL: "http://www.messinacasa360.it" })).toContain("DOMAIN_NOT_HTTPS");
    expect(blockers({ ...READY, NEXT_PUBLIC_CONTACT_PHONE: DEMO_CONTACT.phone })).toContain("PHONE_INVALID");
    expect(blockers({ ...READY, NEXT_PUBLIC_CONTACT_EMAIL: DEMO_CONTACT.email })).toContain("EMAIL_INVALID:NEXT_PUBLIC_CONTACT_EMAIL");
  });
  it("blocca le verifiche end-to-end non registrate", () => {
    expect(blockers(READY, {})).toContain("UNVERIFIED:notification_delivery");
  });
});
