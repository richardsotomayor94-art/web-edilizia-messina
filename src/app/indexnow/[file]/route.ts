/**
 * File di verifica IndexNow (Bing, Yandex, Seznam…): /indexnow/<chiave>.txt restituisce la chiave.
 * La chiave è pubblica per definizione (serve a provare che chi invia gli URL controlla il sito);
 * si imposta in INDEXNOW_KEY e la usa `scripts/indexnow.mjs` come keyLocation.
 */
export const dynamic = "force-dynamic";

const VALID = /^[A-Za-z0-9-]{8,128}$/;

export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params;
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key || !VALID.test(key) || file !== `${key}.txt`) return new Response("Not found", { status: 404 });
  return new Response(key, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
