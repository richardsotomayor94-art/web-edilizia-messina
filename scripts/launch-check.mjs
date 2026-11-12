#!/usr/bin/env node
/**
 * Controllo di lancio di MessinaCasa360.
 *
 *   npm run launch:check                                    configurazione dalle variabili d'ambiente correnti
 *   npm run launch:check -- --env .env.production.local     configurazione da un file
 *   npm run launch:check -- --url https://www.dominio.it --expect production   controllo del sito pubblicato
 *   npm run launch:check -- --url https://messinacasa360-demo.vercel.app --expect demo
 *
 * Esce con codice 1 solo con --strict e almeno un blocco: la demo si può sviluppare liberamente.
 * Le regole sono le stesse usate dal sito (src/lib/launch-rules.ts).
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { checkLaunchEnv, PLACEHOLDER_RE } from "../src/lib/launch-rules.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const strict = args.includes("--strict");

function loadEnvFile(file) {
  const env = {};
  for (const line of readFileSync(resolve(root, file), "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
  }
  return env;
}

const env = opt("env") ? loadEnvFile(opt("env")) : process.env;
const verifiedFile = resolve(root, "launch/verifications.json");
const verified = existsSync(verifiedFile) ? JSON.parse(readFileSync(verifiedFile, "utf8")) : {};
const findings = [];
const url = opt("url");
const expect = opt("expect") ?? (url ? "production" : undefined);

if (!url || expect === "production") findings.push(...checkLaunchEnv(env, verified));

async function get(path, init = {}) {
  const res = await fetch(new URL(path, url), { redirect: "manual", signal: AbortSignal.timeout(15000), ...init });
  return { res, text: res.status < 300 ? await res.text() : "" };
}

if (url) {
  const origin = new URL(url).origin;
  const block = (code, message) => findings.push({ level: "blocker", code, message });
  const warn = (code, message) => findings.push({ level: "warning", code, message });
  const pages = ["/", "/ristrutturazioni-messina/", "/preventivo/", "/guide/"];
  for (const p of pages) {
    const { res, text } = await get(p);
    if (res.status !== 200) {
      block(`HTTP_${res.status}`, `${p} risponde ${res.status}`);
      continue;
    }
    const header = res.headers.get("x-robots-tag") ?? "";
    const meta = text.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? "";
    const noindex = /noindex/.test(header) || /noindex/.test(meta);
    const canonical = text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (expect === "demo") {
      if (!noindex) block("DEMO_INDEXABLE", `${p}: la demo NON è noindex`);
    } else {
      if (noindex && p !== "/preventivo/") block("NOINDEX_IN_PRODUCTION", `${p}: noindex in produzione`);
      if (p !== "/preventivo/" && (!canonical || !canonical.startsWith(origin))) block("CANONICAL_MISMATCH", `${p}: canonical ${canonical ?? "assente"} non è su ${origin}`);
      if (text.includes(".vercel.app")) block("VERCEL_HOST_IN_HTML", `${p}: riferimenti a *.vercel.app nell'HTML`);
      const placeholder = text.replace(/<script[^>]*>[\s\S]*?<\/script>/g, (s) => (s.includes("application/ld+json") ? s : "")).match(PLACEHOLDER_RE);
      if (placeholder) block("PLACEHOLDER_IN_HTML", `${p}: valore di prova nel contenuto o nei dati strutturati («${placeholder[0]}»)`);
    }
    const ld = [...text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("");
    if (/contactPoint/.test(ld) && PLACEHOLDER_RE.test(ld)) block("PLACEHOLDER_IN_JSONLD", `${p}: recapiti di prova nei dati strutturati`);
  }
  const robots = await get("/robots.txt");
  const sitemapLine = robots.text.match(/^Sitemap:\s*(\S+)/m)?.[1];
  if (expect === "demo") {
    if (sitemapLine) block("DEMO_SITEMAP_DECLARED", "La demo dichiara una sitemap in robots.txt");
  } else {
    if (/^Disallow:\s*\/\s*$/m.test(robots.text)) block("ROBOTS_DISALLOW_ALL", "robots.txt blocca tutto il sito");
    if (sitemapLine !== `${origin}/sitemap.xml`) block("ROBOTS_SITEMAP", `robots.txt dichiara ${sitemapLine ?? "nessuna sitemap"} invece di ${origin}/sitemap.xml`);
    const sm = await get("/sitemap.xml");
    const locs = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (!locs.length) block("SITEMAP_EMPTY", "Sitemap vuota o non raggiungibile");
    const foreign = locs.filter((l) => !l.startsWith(`${origin}/`));
    if (foreign.length) block("SITEMAP_FOREIGN_HOST", `${foreign.length} URL della sitemap non sono su ${origin} (es. ${foreign[0]})`);
    if (origin.startsWith("https://")) {
      const http = await fetch(origin.replace("https://", "http://"), { redirect: "manual", signal: AbortSignal.timeout(15000) }).catch(() => null);
      if (!http || ![301, 308].includes(http.status)) warn("HTTP_NOT_REDIRECTED", "http:// non reindirizza in modo permanente a https://");
    }
    const host = new URL(origin).host;
    const twin = host.startsWith("www.") ? host.slice(4) : `www.${host}`;
    const alt = await fetch(`https://${twin}/`, { redirect: "manual", signal: AbortSignal.timeout(15000) }).catch(() => null);
    if (alt && ![301, 308].includes(alt.status)) warn("WWW_NOT_REDIRECTED", `https://${twin}/ non reindirizza in modo permanente a ${origin}`);
  }
}

const blockers = findings.filter((f) => f.level === "blocker");
const warnings = findings.filter((f) => f.level === "warning");
const line = (f) => `  - [${f.code}] ${f.message}`;
console.log(`\nControllo di lancio${url ? ` di ${url} (${expect})` : " della configurazione"}`);
console.log(`\nBLOCCHI (${blockers.length})`);
blockers.forEach((f) => console.log(line(f)));
console.log(`\nAVVISI (${warnings.length})`);
warnings.forEach((f) => console.log(line(f)));
console.log(`\nESITO: ${blockers.length ? "NON PRONTO PER IL LANCIO" : expect === "demo" ? "DEMO PROTETTA" : "PRONTO PER IL LANCIO"}\n`);
if (strict && blockers.length) process.exit(1);
