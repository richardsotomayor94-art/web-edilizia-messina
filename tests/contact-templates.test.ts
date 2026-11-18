import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const t = await import("@/lib/contact-templates");
const { formatEmailHtml, formatEmailText } = await import("@/lib/notify");

const lead = {
  id: "00000000-0000-4000-8000-000000000003",
  name: "Mario Rossi",
  phone: "+393331234567",
  whatsapp: undefined as string | undefined,
  email: "mario.rossi@example.org",
  service: "bagno",
  city: "Messina",
  zone: "Centro",
  property_type: "appartamento",
  square_meters: "50_100",
  timeline: "quotes",
  budget_range: "5k_15k",
  description: "Vorrei sostituire la vasca con una doccia e rifare le piastrelle.",
  tier: "warm",
  score: 60,
  attachments: 2,
};

describe("messaggi pronti per il cliente", () => {
  it("il WhatsApp saluta per nome e riprende lavoro, luogo e descrizione", () => {
    const m = t.whatsappMessage(lead);
    expect(m).toMatch(/^Buongiorno Mario,/);
    expect(m).toContain("bagno");
    expect(m).toContain("Centro, Messina");
    expect(m).toContain("vasca con una doccia");
    expect(m).not.toContain("+39333");
    expect(m).not.toContain(".».");
  });

  it("le descrizioni lunghe si accorciano", () => {
    const m = t.whatsappMessage({ ...lead, description: "parola ".repeat(80) });
    expect(m).toContain("…»");
    expect(m.length).toBeLessThan(500);
  });

  it("il link WhatsApp usa solo cifre e il numero WhatsApp se diverso", () => {
    expect(t.whatsappHref(lead)).toMatch(/^https:\/\/wa\.me\/393331234567\?text=Buongiorno/);
    expect(t.whatsappHref({ ...lead, whatsapp: "+39 340 111 2222" })).toMatch(/^https:\/\/wa\.me\/393401112222\?/);
  });

  it("l'email ha oggetto e testo pronti; senza email del cliente niente link", () => {
    const href = t.mailtoHref(lead)!;
    expect(href).toMatch(/^mailto:mario\.rossi@example\.org\?subject=/);
    expect(decodeURIComponent(href)).toContain("Buongiorno Mario,");
    expect(t.mailtoHref({ ...lead, email: undefined })).toBeUndefined();
  });

  it("il promemoria per la chiamata contiene le parole chiave e salta i valori vuoti", () => {
    const n = t.callNotes(lead);
    expect(n).toContain("Lavoro: ");
    expect(n).toContain("Tempistica: ");
    expect(n).toContain("Foto: 2");
    expect(t.callNotes({ ...lead, budget_range: "undisclosed", attachments: 0 })).not.toMatch(/Budget|Foto/);
  });

  it("nei servizi specialistici usa i dettagli al posto di immobile e metratura", () => {
    const kw = t.contactKeywords({
      ...lead,
      service: "restauro-legno",
      details: { line: "restauro", object: "porta", material: "legno", condition: "rovinato", intervention: "restauro", size: "piccolo", movable: "si" },
    });
    expect(kw.map(([k]) => k)).not.toContain("Immobile");
  });
});

describe("email di avviso con i pulsanti", () => {
  it("l'HTML ha i tre pulsanti e protegge i caratteri speciali", () => {
    const html = formatEmailHtml({ ...lead, name: "Mario <b>Rossi</b>" });
    expect(html).toContain('href="tel:+393331234567"');
    expect(html).toContain("https://wa.me/393331234567?text=");
    expect(html).toContain("mailto:mario.rossi@example.org");
    expect(html).not.toContain("<b>Rossi</b>");
    expect(html).toContain("&lt;b&gt;");
  });

  it("senza email del cliente l'HTML non mostra il pulsante email", () => {
    expect(formatEmailHtml({ ...lead, email: undefined })).not.toContain("mailto:");
  });

  it("il testo semplice contiene i collegamenti e il messaggio pronto", () => {
    const text = formatEmailText(lead);
    expect(text).toContain("CONTATTA IL CLIENTE");
    expect(text).toContain("https://wa.me/393331234567");
    expect(text).toContain("Messaggio WhatsApp pronto:");
  });
});
