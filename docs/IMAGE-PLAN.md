# Piano immagini

Direzione: architettura italiana contemporanea, materia mediterranea, luce naturale, ristrutturazione realistica. Niente persone in posa, ville americane o render saturi.

**Regola:** tutte le immagini sono rappresentazioni illustrative. Mai "i nostri lavori", "i nostri cantieri" o prima/dopo reali. La nota è nel footer, nell'indice servizi e nelle landing (`IMAGE_NOTE`, `src/config/media.ts`).

Formati: AVIF/WebP con `srcset` e `sizes` tramite `next/image`; solo l'immagine principale è prioritaria, le altre sono lazy. Originali ottimizzati in `src/assets/images/`.

| File | Tipo | Uso | Fonte |
|---|---|---|---|
| hero, hero-mobile | HERO | Home | Higgsfield GPT Image 2.6 + upscale 2K |
| materia | BRAND | Home | Higgsfield |
| cantiere | EDITORIAL | Livelli di intervento | Higgsfield |
| progetto | PROCESS | Guide, preventivo | Higgsfield |
| facciata | EDITORIAL | Livelli di intervento | Higgsfield |
| terrazza | EDITORIAL | Disponibile, per la futura landing impermeabilizzazioni | Higgsfield |
| cucina, cartongesso, impianti, pavimenti | SERVICE | Servizi | Higgsfield: lo stock disponibile non era coerente |
| bagno | SERVICE | Servizi | [Peter Muniz, Unsplash](https://unsplash.com/photos/MkOMgDhLpqU) |
| demolizione | SERVICE | Servizi | [Milivoj Kuhar, Unsplash](https://unsplash.com/photos/Te48TPzdcU8) |
| ombra | BACKGROUND | Chiusura home | [Yanhao Fang, Unsplash](https://unsplash.com/photos/QbCcwYbiaQk) |
| porta | DETAIL | Zone | [Alan Jiang, Unsplash](https://unsplash.com/photos/pxdRgptCjeI) |
| pittura | SERVICE | Servizi | [Andrew Itaga, Unsplash](https://unsplash.com/photos/rMVjOX8nm2U) |

| `m-*` (34 file) | MATERIAL / SECTION | Sezioni delle landing: ogni immagine compare una sola volta nel corpo pagina | Higgsfield GPT Image 2.6, 2K qualità media |
| cucina, cartongesso, impianti, pavimenti (versione 1500 px) | SERVICE | Aperture landing | Stesso originale, ingrandimento Higgsfield 2K |

**Da grezzo a finito** (`m-grezzo`, `m-finito`): schema illustrativo generato, dichiarato tale in pagina. Non è un prima/dopo reale.

**Video.** Provati due clip da 5 s (Kling 4.0 Flash, immagine iniziale `m-pavimenti-wide`). In entrambi la luce restava quasi ferma: nessun guadagno rispetto alla foto e 1 MB di peso. Scartati. La stessa idea è resa da una lama di luce CSS legata allo scorrimento, solo desktop.

**Pass pilota Pavimenti.** `m-pav-finito` (generata, 1,25 crediti, da 214,4 a 213,15): stanza finita con porta aperta, usata solo nella chiusura di `/pavimenti-messina/` al posto della trama del gres. Illustrativa come le altre.

**Budget per landing.** Apertura prioritaria, le altre lazy: al massimo 7 immagini, AVIF/WebP con `sizes`. Nessun video.

**Licenze.** Foto Unsplash: "Free to use under the Unsplash License", verificato sulla pagina di ciascuna foto il 2026-11-09; escluse Unsplash+ e iStock.

**Crediti Higgsfield.** Reset di marca: da 305,9 a 301,4 (4,5). Pass landing del 2026-11-09: da 301,4 a 229,4 (72: 34 immagini da 1, 4 ingrandimenti da 2, 2 video scartati da 15). Landing Facciate e Impermeabilizzazioni: da 229,4 a 214,4 (15: 11 immagini da 1, 2 ingrandimenti da 2). Una foto mostrava un ponte sullo Stretto, che non esiste: rigenerata. Controllare sempre che le immagini generate non contraddicano la realtà locale.

**Da sostituire appena disponibili:** fotografie reali di lavori conclusi, con consenso scritto del cliente e del partner.
