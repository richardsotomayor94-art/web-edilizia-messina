import { NextResponse, after } from "next/server";
import { leadSchema, fieldErrors } from "@/lib/lead-schema";
import { scoreLead, spamCheck, deriveSource } from "@/lib/scoring";
import { resolveAreaSlug, CITY_TO_AREA } from "@/lib/lead-options";
import { clientIp, hashIp, sameOrigin } from "@/lib/request";
import { verifyTurnstile } from "@/lib/turnstile";
import { ingestClient, ingestSecret } from "@/lib/supabase/public";
import { notifyNewLead } from "@/lib/notify";
import { site } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(req: Request) {
  if (!sameOrigin(req.headers)) return json({ ok: false, error: "forbidden" }, 403);
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > 20_000) return json({ ok: false, error: "payload_too_large" }, 413);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return json({ ok: false, error: "validation", fields: fieldErrors(parsed.error) }, 422);
  const lead = parsed.data;

  const ip = clientIp(req.headers);
  const spam = spamCheck({
    honeypot: lead.website,
    startedAt: lead.started_at,
    now: Date.now(),
    name: lead.name,
    description: lead.description,
    phone: lead.phone,
    email: lead.email,
  });
  // Bot evidenti: risposta di successo finta, nessun salvataggio
  if (spam.block) return json({ ok: true, id: null });

  if (!(await verifyTurnstile(lead.turnstile_token, ip))) {
    return json({ ok: false, error: "captcha" }, 400);
  }

  const supabase = ingestClient();
  const secret = ingestSecret();
  if (!supabase || !secret) return json({ ok: false, error: "not_configured" }, 503);

  const area = resolveAreaSlug(lead.city, lead.zone);
  const inArea = !!area || !!CITY_TO_AREA[lead.city.toLowerCase()];
  const { score, tier } = scoreLead(lead, { inServiceArea: inArea, attachments: lead.attachments_expected });
  const a = lead.attribution ?? {};
  const source = deriveSource(a);

  const payload = {
    source,
    ...a,
    form_page: lead.form_page,
    service: lead.service,
    property_type: lead.property_type,
    square_meters: lead.square_meters,
    timeline: lead.timeline,
    budget_range: lead.budget_range,
    description: lead.description,
    city: lead.city,
    postal_code: lead.postal_code,
    zone: lead.zone,
    area_slug: area,
    name: lead.name,
    phone: lead.phone,
    whatsapp: lead.whatsapp,
    email: lead.email,
    preferred_contact: lead.preferred_contact,
    consent_privacy: true,
    privacy_version: site.privacyVersion,
    consent_marketing: lead.consent_marketing,
    lead_score: score,
    lead_tier: tier,
    spam_score: spam.score,
    spam_reasons: spam.reasons,
    ip_hash: hashIp(ip),
    user_agent: req.headers.get("user-agent")?.slice(0, 300),
    form_duration_ms: lead.started_at ? Math.min(Date.now() - lead.started_at, 2_000_000_000) : null,
    attachments_expected: lead.attachments_expected,
  };

  const { data, error } = await supabase.rpc("submit_lead", { p_secret: secret, p_lead: payload });
  if (error) {
    console.error("submit_lead failed", error.code, error.message);
    return json({ ok: false, error: "server" }, 500);
  }
  const res = data as { ok: boolean; id?: string; status?: string; upload_token?: string | null; error?: string };
  if (!res.ok) return json({ ok: false, error: res.error ?? "server" }, res.error === "rate_limited" ? 429 : 500);

  if (res.status === "new") {
    const utm = [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(" / ") || undefined;
    after(() =>
      notifyNewLead({
        id: res.id!,
        service: lead.service,
        zone: lead.zone,
        city: lead.city,
        property_type: lead.property_type,
        square_meters: lead.square_meters,
        timeline: lead.timeline,
        name: lead.name,
        phone: lead.phone,
        description: lead.description,
        landing_page: a.landing_page,
        utm,
        tier,
        score,
        attachments: lead.attachments_expected,
      }).then(() => undefined),
    );
  }

  return json({ ok: true, id: res.id, uploadToken: res.upload_token ?? null, tier });
}
