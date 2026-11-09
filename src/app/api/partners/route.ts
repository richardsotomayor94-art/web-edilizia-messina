import { NextResponse } from "next/server";
import { partnerSchema, fieldErrors } from "@/lib/lead-schema";
import { MIN_FILL_MS } from "@/lib/scoring";
import { clientIp, hashIp, sameOrigin } from "@/lib/request";
import { ingestClient, ingestSecret } from "@/lib/supabase/public";
import { site, intakeBlockedByLegalData } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!sameOrigin(req.headers)) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  if (intakeBlockedByLegalData()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  const body = await req.text().catch(() => "");
  if (body.length > 20_000) return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  let raw: unknown = null;
  try {
    raw = JSON.parse(body);
  } catch {
    /* gestito dalla validazione */
  }
  const parsed = partnerSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation", fields: fieldErrors(parsed.error) }, { status: 422 });
  }
  const p = parsed.data;
  const elapsed = p.fill_ms ?? (p.started_at ? Date.now() - p.started_at : 0);
  if (p.website || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true }); // bot: scarto silenzioso
  }
  const supabase = ingestClient();
  const secret = ingestSecret();
  if (!supabase || !secret) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  const { data, error } = await supabase.rpc("submit_partner_application", {
    p_secret: secret,
    p_app: {
      business_name: p.business_name,
      contact_name: p.contact_name,
      phone: p.phone,
      email: p.email,
      vat_number: p.vat_number,
      services: p.services,
      areas_text: p.areas_text,
      message: p.message,
      consent_privacy: true,
      privacy_version: site.privacyVersion,
      ip_hash: hashIp(clientIp(req.headers)),
    },
  });
  if (error) return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  const res = data as { ok: boolean; error?: string };
  return NextResponse.json(res, { status: res.ok ? 200 : res.error === "rate_limited" ? 429 : 500 });
}
