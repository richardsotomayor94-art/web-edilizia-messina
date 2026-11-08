import { NextResponse } from "next/server";
import { z } from "zod";
import { sameOrigin } from "@/lib/request";
import { ingestClient, ingestSecret } from "@/lib/supabase/public";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  leadId: z.uuid(),
  token: z.string().regex(/^[0-9a-f]{48}$/),
});

/** Conferma gli allegati caricati nello storage privato e li collega al lead. */
export async function POST(req: Request) {
  if (!sameOrigin(req.headers)) return NextResponse.json({ ok: false }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  const supabase = ingestClient();
  const secret = ingestSecret();
  if (!supabase || !secret) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  const { data, error } = await supabase.rpc("register_lead_attachments", {
    p_secret: secret,
    p_lead_id: parsed.data.leadId,
    p_token: parsed.data.token,
  });
  if (error) return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  return NextResponse.json(data, { headers: { "cache-control": "no-store" } });
}
