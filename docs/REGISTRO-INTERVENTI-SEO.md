# Registro interventi SEO

Un blocco per ciascuna modifica reale. Stato: **preparato** = nel branch, non pubblicato; **verificato** = test e lint passano; **pubblicato** = in produzione; **osservato** = visto nei motori (Search Console, Bing o SERP).

## 2026-11-19 · branch `seo/audit-2026-11`
| ID | Modifica | File | Scelta | Stato | Come tornare indietro |
|---|---|---|---|---|---|
| R1 | `/contatti/`: title «Contatti e richiesta preventivo a Messina» (58 caratteri con marchio) e description di circa 140 caratteri, senza promettere canali non configurati | `src/app/contatti/page.tsx` | correggere | preparato, verificato (test e lint) | `git revert` del commit |
| R2 | Description di cucina (146) e imbianchino (155) accorciate; nuovo test: max 160 caratteri per le landing indicizzabili | `src/config/services.ts`, `tests/seo-config.test.ts` | correggere | preparato, verificato | `git revert` |
| R3 | Documenti: audit, mappa servizi, piano 90 giorni, registro, stato | `docs/` | creare | preparato | eliminare i file |

Nessuna modifica a `lastmod` (le correzioni non cambiano il contenuto sostanziale), né a URL, sitemap, robots, dati strutturati o modulo.

Non pubblicato, non osservato nei motori. `next build` non eseguito qui (vedi AUDIT P3): lo eseguirà l'anteprima Vercel della PR.
