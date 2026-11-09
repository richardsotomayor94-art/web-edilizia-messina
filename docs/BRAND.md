# Marca MessinaCasa360

Reset del 2026-11-09. Sostituisce integralmente l'identità precedente.

## Direzioni valutate

| Criterio (1-5) | A. Architectural Editorial | B. Contemporary Mediterranean | C. Technical Premium |
|---|---|---|---|
| Fiducia | 4 | 3 | 5 |
| Modernità | 5 | 3 | 4 |
| Rilevanza locale | 3 | 5 | 2 |
| Differenziazione | 4 | 3 | 3 |
| Conversione | 4 | 3 | 4 |
| Mobile | 4 | 4 | 4 |
| Performance | 4 | 3 | 5 |
| Durata | 5 | 3 | 4 |
| **Totale** | **33** | 27 | 31 |

**Scelta:** A come struttura, con la materia di B (pietra lavica, calce, cotto) e il rigore di C (tavole numerate, righello). Scartati: terracotta rustica ovunque, estetica da software tecnico.

## Marchio

Una **M** tracciata come muro di una pianta, con al centro il simbolo architettonico della **porta aperta**: un arco di 90°. Quattro archi fanno i 360 del nome. Niente cerchio generico: il simbolo è leggibile come M e come pianta.

- Logotipo: *Messina* corsivo + Casa tondo + 360 piccolo, in cotto. La parola *Messina* in corsivo è la firma ricorrente.
- File: `src/components/Logo.tsx`, `src/app/icon.svg`, `src/app/og.png/route.tsx`.

## Tipografia

Due famiglie, servite dal dominio. Peso precaricato: 77 KB.

| Ruolo | Font | Regola |
|---|---|---|
| Display, H1, H2, H3, numeri | Instrument Serif | Stretto: l'unico tra sei provati in cui "Ristrutturazioni" resta grande a 360 px |
| Testo, etichette, pulsanti | Schibsted Grotesk | Neutro, tecnico, ottima leggibilità |

Scala in `globals.css`: `.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-step`, `.t-lead`, `.t-label`.

## Colore

| Token | Valore | Materia | Uso |
|---|---|---|---|
| `paper` | #f1ece2 | Intonaco | Superficie principale |
| `calce` | #faf7f1 | Calce | Superficie chiara, modulo |
| `sand` / `stone` | #e7e0d2 / #d6cdbc | Travertino | Fondi, linee |
| `ink` | #1c1b19 | Pietra lavica | Testo, sezioni scure |
| `muted` | #665f55 | Cemento | Testo secondario |
| `sea-dark` | #0f2c31 | Lo Stretto | Sezione di fiducia |
| `clay` | #b4431e | Cotto | CTA, focus |
| `cotto-light` / `citrus` | #e0703f / #e8b45a | Cotto al sole, ocra | Accenti su scuro |
| `ok` / `warn` / `err` | #2f6b3a / #8a5a00 / #a12a1c | | Stati |

Contrasto verificato con axe (WCAG 2.1 AA) sulle pagine chiave.

## Griglia e ritmo

12 colonne, margini `clamp(1.25rem, 4.5vw, 4.5rem)`, immagini che escono dalla griglia a destra. Sezioni alterne: fotografia, intonaco, lavica, calce, Stretto. Le sezioni sono numerate come tavole di progetto (`Tav. 01`). Niente card: linee sottili, angoli vivi. Unico ornamento ricorrente: il righello da tavola.

## Movimento

Token in `@theme`: `--motion-fast` 160 ms, `--motion-normal` 360 ms, `--motion-slow` 900 ms (500 ms su mobile), `--motion-ease`, `--motion-distance` 28 px (10 px su mobile), `--motion-stagger` 80 ms.

| Effetto | Tecnica |
|---|---|
| Comparsa allo scorrimento | Un solo IntersectionObserver (`RevealRoot`) |
| Maschera immagini (solo desktop) | CSS `clip-path` |
| Cambio immagine nell'indice servizi | Solo CSS, `:has()` |
| Riga di processo, deriva hero (solo desktop) | CSS `animation-timeline`, miglioramento progressivo |
| Passaggi del modulo | Animazione CSS al cambio di passo |

Senza JS o con `prefers-reduced-motion: reduce` tutto è visibile da subito. **Librerie aggiunte: nessuna.**

## Immagini

Regole e licenze in [IMAGE-PLAN.md](./IMAGE-PLAN.md).
