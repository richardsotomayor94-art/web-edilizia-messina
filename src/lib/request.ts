import "server-only";
import { createHash } from "node:crypto";

/** IP del client dietro Vercel (x-forwarded-for / x-real-ip) */
export function clientIp(headers: Headers): string | null {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || null;
  return headers.get("x-real-ip");
}

/** Hash salato dell'IP: usato solo per rate limit / anti-abuso, mai l'IP in chiaro */
export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 40);
}

/** Accetta POST solo dal proprio sito (difesa CSRF basilare per route pubbliche) */
export function sameOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
