import type { NextConfig } from "next";
import { isPlaceholder } from "./src/lib/launch-rules";

// Stessa regola di site.indexable: dominio dichiarato che non sia *.vercel.app, niente demo
const declaredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
const indexable =
  process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true" &&
  (process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production") &&
  !!declaredUrl &&
  !/\.vercel\.app$/.test(new URL(declaredUrl).host) &&
  !isPlaceholder(declaredUrl) &&
  process.env.NEXT_PUBLIC_DEMO_MODE !== "true";

/**
 * Dominio canonico: in produzione ogni altro host (*.vercel.app, www/apex secondario)
 * va con 308 al dominio dichiarato. Si risolve nell'instradamento, senza eseguire
 * funzioni a ogni richiesta (prima lo faceva il proxy).
 */
const canonicalHost = indexable && process.env.VERCEL_ENV === "production" ? new URL(declaredUrl!).host : undefined;

/** Logo, icone e immagine social cambiano di rado: un giorno in cache, poi rivalidati. */
const assetCache = { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ga = !!process.env.NEXT_PUBLIC_GA4_ID;
const turnstile = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${ga ? " https://www.googletagmanager.com" : ""}${turnstile ? " https://challenges.cloudflare.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${supabaseUrl ? ` ${supabaseUrl}` : ""}${ga ? " https://www.google-analytics.com https://www.googletagmanager.com" : ""}`,
  "font-src 'self'",
  `connect-src 'self'${supabaseUrl ? ` ${supabaseUrl}` : ""}${ga ? " https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com" : ""}`,
  `frame-src 'self'${turnstile ? " https://challenges.cloudflare.com" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  ...(process.env.NODE_ENV === "production" ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920, 2560],
    imageSizes: [84, 168, 256, 384],
  },
  async headers() {
    return [
      { source: "/:path*", headers: [...securityHeaders, ...(indexable ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }])] },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Cache-Control", value: "no-store" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/:file(logo-512\\.png|icon\\.svg|icon-192\\.png|og\\.png)", headers: [assetCache] },
    ];
  },
  async redirects() {
    return [
      ...(canonicalHost
        ? [
            {
              // (.*) conserva la barra finale: un solo salto fino all'URL canonico
              source: "/:path(.*)",
              missing: [{ type: "host" as const, value: canonicalHost.replace(/\./g, "\\.") }],
              destination: `${declaredUrl}/:path`,
              permanent: true,
            },
          ]
        : []),
      // varianti comuni verso le URL canoniche (evita duplicati)
      { source: "/ristrutturazione-appartamento-messina", destination: "/ristrutturazioni-messina/", permanent: true },
      { source: "/rifacimento-bagno-messina", destination: "/ristrutturazione-bagno-messina/", permanent: true },
      { source: "/pittura-messina", destination: "/imbianchino-messina/", permanent: true },
      { source: "/controsoffitti-messina", destination: "/cartongesso-messina/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
