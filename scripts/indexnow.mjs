#!/usr/bin/env node
/**
 * Invia a IndexNow (Bing e motori collegati) tutti gli URL della sitemap pubblicata.
 * Uso: node scripts/indexnow.mjs https://www.messinacasa360.it <chiave>
 * La chiave è pubblica per definizione ed è il file statico public/<chiave>.txt, servito alla radice
 * del sito: IndexNow accetta solo URL sotto la cartella del file chiave, quindi deve stare alla radice.
 * Da lanciare dopo un deploy che aggiunge o cambia pagine indicizzabili.
 */
const [, , origin, key] = process.argv;
if (!origin || !key) {
  console.error("Uso: node scripts/indexnow.mjs <origine https> <chiave>");
  process.exit(2);
}
const base = origin.replace(/\/+$/, "");
const host = new URL(base).host;
const keyLocation = `${base}/${key}.txt`;

const check = await fetch(keyLocation);
if (!check.ok || (await check.text()).trim() !== key) {
  console.error(`Il file della chiave non risponde correttamente: ${keyLocation} (${check.status})`);
  process.exit(1);
}

const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()).filter((u) => new URL(u).host === host);
if (!urlList.length) {
  console.error("Nessun URL nella sitemap: il sito è indicizzabile?");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});
console.log(`IndexNow: ${urlList.length} URL inviati → HTTP ${res.status} ${res.statusText}`);
if (res.status >= 300) {
  console.error(await res.text());
  process.exit(1);
}
