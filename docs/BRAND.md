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

## Sistema delle landing

Una sola route (`app/[service]`), sezioni condivise (`components/service/`), regia in `config/service-experience.ts`: ordine, fondo e taglio di ogni sezione, tema, motivo tecnico, opzioni del selettore, immagini e chiusura. Per aggiungere o riordinare si cambiano i dati, non i componenti.

| Sezione | Componente | Funzione |
|---|---|---|
| Apertura | `ServiceHero` | Materia a tutta altezza, H1 grande, disegno tecnico che si completa |
| In breve | `Answer` | La risposta diretta (AEO) trattata come manifesto, con tre fatti tecnici |
| Selettore | `Stage` | Materiali o interventi: radio + `:has()`, zero JavaScript, opzioni sempre nel DOM |
| Cosa comprende | `Scope` | Immagine ferma, voci numerate che scorrono |
| Pausa visiva | `Visual` | Immagine a tutto schermo con una sola idea |
| Da grezzo a finito | `Transform` | Schema illustrativo che si apre scorrendo, solo Ristrutturazioni |
| Quando | `Decision` | Confronto a due vie con stratigrafia, oppure segnali in grande |
| Costi | `Cost` | Fattori e scheda del preventivo |
| Territorio | `Local` | Note su Messina, permessi, link alla guida locale |
| Processo, FAQ | `Process`, `Faqs` | Linea numerata, titolo fermo accanto alle domande |
| Chiusura | `ConversionBlock` | Grande, materica, una sola azione, a filo col footer |

Ogni servizio ha sequenza, fondi e motivo propri: Pavimenti superficie, Bagno acqua, Cucina spazio, Cartongesso geometria, Impianti sistemi, Pittura luce, Ristrutturazioni trasformazione.

### Fondi e transizioni

Sei fondi come materie: `lava`, `sea`, `cotto`, `intonaco`, `calce`, `travertino`. Ogni fondo definisce `--accent`, `--sub`, `--rule`: i componenti funzionano su tutti. Il cambio segue il contenuto, con tre soli strumenti:

- **Taglio ad arco** (`seam="door"`): l'arco della porta del marchio entra nella sezione successiva; al massimo due o tre per pagina.
- **Righello** (`seam="ruler"`): tra materie vicine.
- **Dissolvenza legata allo scorrimento**: solo tra fondi della stessa famiglia. Tra chiaro e scuro passerebbe da un grigio sporco, quindi è esclusa.

### Livelli di movimento

| Effetto | Desktop | Mobile | Ridotto |
|---|---|---|---|
| Comparsa | 28 px, 900 ms | 10 px, 500 ms | Nessuna |
| Titoli parola per parola | Sì | Dissolvenza semplice | Nessuna |
| Maschere e pannelli immagine | Sì | No | Nessuna |
| Numeri dalla maschera, disegno tecnico | Sì | Sì (solo `transform`/tratto) | Nessuna |
| Ingressi laterali | Sì | No | Nessuna |
| Scala immagini, deriva, lama di luce, apertura grezzo-finito | Sì | No | Nessuna |
| Dissolvenza tra fondi | Sì | No | Nessuna |
| Immagine e titolo fermi | Sì | No | Sì (non è animazione) |
| Indice a tacche | Da 1280 px | No | Sì, senza transizione |
| Avanzamento di lettura | Sì | Sì | No |

Gli effetti legati allo scorrimento usano `animation-timeline`: li esegue il browser, senza JavaScript, e dove non sono supportati resta lo stato finale. Nessuna libreria aggiunta: IntersectionObserver, CSS e SVG bastano.

### Marchio in movimento

Alla prima pagina della sessione: tratto della M, porta che si apre, logotipo. Meno di un secondo, solo CSS, nessun blocco del caricamento.

## Immagini

Regole e licenze in [IMAGE-PLAN.md](./IMAGE-PLAN.md).
