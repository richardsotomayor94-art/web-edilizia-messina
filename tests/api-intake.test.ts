/**
 * Prove SIMULATE delle API di ricezione: il database è sostituito da un finto client.
 * Verificano il comportamento della route (validazione, errori, anti-abuso, duplicati),
 * NON la consegna reale delle richieste, che va verificata su un ambiente autorizzato.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const rpc = vi.fn();
let configured = true;
vi.mock("@/lib/supabase/public", () => ({
  ingestClient: () => (configured ? { rpc } : null),
  ingestSecret: () => (configured ? "x".repeat(40) : null),
}));
const notify = vi.fn(async () => undefined);
vi.mock("@/lib/notify", () => ({ notifyNewLead: notify }));
const afterQueue: (() => unknown)[] = [];
vi.mock("next/server", async (orig) => {
  const mod = await orig<typeof import("next/server")>();
  return { ...mod, after: (fn: () => unknown) => afterQueue.push(fn) };
});

const ORIGIN = "https://demo.test";
const req = (body: unknown, headers: Record<string, string> = {}) =>
  new Request(`${ORIGIN}/api/leads/`, {
    method: "POST",
    headers: { origin: ORIGIN, host: "demo.test", "content-type": "application/json", "x-forwarded-for": "203.0.113.7", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const now = Date.now();
const lead = (over: Record<string, unknown> = {}) => ({
  service: "impermeabilizzazione",
  property_type: "appartamento",
  square_meters: "lt50",
  timeline: "quotes",
  city: "Messina",
  name: "TEST NON REALE",
  phone: "+39 333 1234567",
  preferred_contact: "phone",
  consent_privacy: true,
  consent_marketing: false,
  attachments_expected: 0,
  website: "",
  started_at: now - 120_000,
  fill_ms: 120_000,
  form_page: "/preventivo/",
  ...over,
});

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_DEMO_MODE", "");
  vi.stubEnv("VERCEL_ENV", "preview");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "");
  configured = true;
  rpc.mockReset();
  notify.mockClear();
  afterQueue.length = 0;
});
afterEach(() => vi.unstubAllEnvs());

const leadsRoute = async () => (await import("@/app/api/leads/route")).POST;
const partnersRoute = async () => (await import("@/app/api/partners/route")).POST;

describe("POST /api/leads (simulato)", () => {
  it("rifiuta richieste da un'altra origine", async () => {
    const res = await (await leadsRoute())(req(lead(), { origin: "https://altro.example" }));
    expect(res.status).toBe(403);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("rifiuta corpi troppo grandi e JSON non valido", async () => {
    const POST = await leadsRoute();
    expect((await POST(req("x".repeat(20_001)))).status).toBe(413);
    expect((await POST(req("{non json"))).status).toBe(400);
  });

  it("restituisce gli errori di validazione per campo", async () => {
    const res = await (await leadsRoute())(req(lead({ phone: "12", consent_privacy: false })));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(Object.keys(json.fields)).toEqual(expect.arrayContaining(["phone", "consent_privacy"]));
  });

  it("scarta in silenzio i bot (honeypot) senza salvare", async () => {
    const res = await (await leadsRoute())(req(lead({ website: "https://spam.example" })));
    expect(await res.json()).toEqual({ ok: true, id: null });
    expect(rpc).not.toHaveBeenCalled();
  });

  it("in modalità demo non riceve nulla", async () => {
    vi.stubEnv("NEXT_PUBLIC_DEMO_MODE", "true");
    const res = await (await leadsRoute())(req(lead()));
    expect(res.status).toBe(503);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("senza database configurato risponde not_configured", async () => {
    configured = false;
    const res = await (await leadsRoute())(req(lead()));
    expect(res.status).toBe(503);
  });

  it("con Turnstile attivo e senza token rifiuta", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "segreto");
    const res = await (await leadsRoute())(req(lead()));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("captcha");
  });

  it("salva la richiesta con il servizio scelto, senza l'IP in chiaro, e notifica", async () => {
    rpc.mockResolvedValue({ data: { ok: true, id: "11111111-1111-4111-8111-111111111111", status: "new" }, error: null });
    const res = await (await leadsRoute())(req(lead()));
    expect(res.status).toBe(200);
    const [, args] = rpc.mock.calls[0];
    expect(args.p_lead.service).toBe("impermeabilizzazione");
    expect(args.p_lead.consent_privacy).toBe(true);
    expect(JSON.stringify(args.p_lead)).not.toContain("203.0.113.7");
    await Promise.all(afterQueue.map((f) => f()));
    expect(notify).toHaveBeenCalledOnce();
  });

  it("un reinvio duplicato risponde ok ma non notifica di nuovo", async () => {
    rpc.mockResolvedValue({ data: { ok: true, id: "22222222-2222-4222-8222-222222222222", status: "duplicate" }, error: null });
    const res = await (await leadsRoute())(req(lead()));
    expect((await res.json()).ok).toBe(true);
    await Promise.all(afterQueue.map((f) => f()));
    expect(notify).not.toHaveBeenCalled();
  });

  it("propaga il limite di frequenza come 429 e gli errori del database come 500", async () => {
    const POST = await leadsRoute();
    rpc.mockResolvedValueOnce({ data: { ok: false, error: "rate_limited" }, error: null });
    expect((await POST(req(lead()))).status).toBe(429);
    rpc.mockResolvedValueOnce({ data: null, error: { code: "XX000", message: "boom" } });
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect((await POST(req(lead()))).status).toBe(500);
  });
});

describe("POST /api/partners (simulato)", () => {
  const app = (over: Record<string, unknown> = {}) => ({
    business_name: "TEST NON REALE SRL",
    contact_name: "Prova",
    phone: "+39 333 7654321",
    services: ["impermeabilizzazione", "isolamento"],
    consent_privacy: true,
    website: "",
    started_at: now - 60_000,
    fill_ms: 60_000,
    ...over,
  });

  it("accetta i nuovi servizi e salva la candidatura", async () => {
    rpc.mockResolvedValue({ data: { ok: true }, error: null });
    const res = await (await partnersRoute())(req(app()));
    expect(res.status).toBe(200);
    expect(rpc.mock.calls[0][1].p_app.services).toEqual(["impermeabilizzazione", "isolamento"]);
  });

  it("scarta i bot e chi compila troppo in fretta", async () => {
    const POST = await partnersRoute();
    expect(await (await POST(req(app({ website: "x" })))).json()).toEqual({ ok: true });
    expect(await (await POST(req(app({ fill_ms: 500 })))).json()).toEqual({ ok: true });
    expect(rpc).not.toHaveBeenCalled();
  });

  it("valida i campi e rispetta origine e limiti", async () => {
    const POST = await partnersRoute();
    expect((await POST(req(app({ services: [] })))).status).toBe(422);
    expect((await POST(req(app(), { origin: "https://altro.example" }))).status).toBe(403);
    rpc.mockResolvedValueOnce({ data: { ok: false, error: "rate_limited" }, error: null });
    expect((await POST(req(app()))).status).toBe(429);
  });
});
