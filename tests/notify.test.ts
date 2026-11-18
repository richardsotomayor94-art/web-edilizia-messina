import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { formatTelegramMessage, formatEmailSubject, formatEmailText, notifyNewLead, RESEND_DEFAULT_FROM } = await import("@/lib/notify");

const full = {
  id: "00000000-0000-4000-8000-000000000002",
  service: "bagno",
  zone: "Centro",
  city: "Messina",
  property_type: "appartamento",
  square_meters: "50_100",
  timeline: "quotes",
  name: "Mario Rossi",
  phone: "+393331234567",
  description: "Bagno al secondo piano",
  tier: "warm",
  score: 60,
  attachments: 1,
};

describe("notifica email (Resend)", () => {
  it("l'oggetto non contiene dati personali", () => {
    const s = formatEmailSubject(full);
    expect(s).toContain("Centro");
    expect(s).not.toContain("Mario");
    expect(s).not.toContain("333");
  });

  it("il testo contiene la richiesta completa e il collegamento all'area riservata", () => {
    const t = formatEmailText(full);
    expect(t).toContain("Nome: Mario Rossi");
    expect(t).toContain("Telefono: +393331234567");
    expect(t).toContain(`/admin/leads/${full.id}/`);
  });

  it("invia con la chiave e registra il canale «email»", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("LEAD_NOTIFY_EMAIL", "titolare@example.org");
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "");
    vi.stubEnv("LEAD_WEBHOOK_URL", "");
    try {
      expect(await notifyNewLead(full)).toEqual(["email"]);
      const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
      expect(url).toBe("https://api.resend.com/emails");
      const body = JSON.parse(String(init.body));
      expect(body.to).toEqual(["titolare@example.org"]);
      expect(body.from).toContain(RESEND_DEFAULT_FROM);
      expect((init.headers as Record<string, string>).authorization).toBe("Bearer re_test");
    } finally {
      vi.unstubAllEnvs();
      vi.unstubAllGlobals();
    }
  });

  it("un invio per destinatario: se uno fallisce, gli altri arrivano lo stesso", async () => {
    const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
      const to = JSON.parse(String(init.body)).to[0];
      return new Response("{}", { status: to === "collaboratore@example.org" ? 403 : 200 });
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("LEAD_NOTIFY_EMAIL", "titolare@example.org, collaboratore@example.org");
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "");
    vi.stubEnv("LEAD_WEBHOOK_URL", "");
    try {
      expect(await notifyNewLead(full)).toEqual(["email"]);
      expect(fetchMock).toHaveBeenCalledTimes(2);
    } finally {
      vi.unstubAllEnvs();
      vi.unstubAllGlobals();
    }
  });

  it("senza chiave non invia nulla", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("LEAD_NOTIFY_EMAIL", "titolare@example.org");
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "");
    vi.stubEnv("LEAD_WEBHOOK_URL", "");
    try {
      expect(await notifyNewLead(full)).toEqual([]);
      expect(fetchMock).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllEnvs();
      vi.unstubAllGlobals();
    }
  });
});

describe("notifica Telegram", () => {
  const lead = {
    id: "00000000-0000-4000-8000-000000000001",
    service: "ristrutturazione-bagno" as never,
    zone: "Centro",
    city: "Messina",
    tier: "hot",
    attachments: 2,
    // campi personali che NON devono finire su Telegram
    name: "Mario Rossi",
    phone: "+393331234567",
    description: "Bagno al secondo piano, via Garibaldi 10",
  };

  it("non contiene nome, telefono né descrizione", () => {
    const text = formatTelegramMessage(lead);
    expect(text).not.toContain("Mario");
    expect(text).not.toContain("333");
    expect(text).not.toContain("Garibaldi");
  });

  it("contiene lavoro, zona e il collegamento all'area riservata", () => {
    const text = formatTelegramMessage(lead);
    expect(text).toContain("Zona: Centro");
    expect(text).toContain(`/admin/leads/${lead.id}/`);
  });
});
