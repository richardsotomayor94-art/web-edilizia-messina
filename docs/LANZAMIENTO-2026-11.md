# Preparación de lanzamiento: MessinaCasa360

Auditoría del 2026-11-09 sobre la demo. Nada de lo que sigue se ha ejecutado: `main`, producción, `noindex`, GSC, GBP y Ads siguen sin tocar. Base técnica y fuentes de buscadores: [AUDITORIA-SEO-GEO-2026-11.md](./AUDITORIA-SEO-GEO-2026-11.md) §11–12, documentación oficial consultada el 2026-11-09.

## Puntuaciones

| Área | Nota | Motivo |
|---|---|---|
| LOCAL SEO | 62 | Contenido local real y verificable. Sin NAP, sin GBP posible, sin partners, sin casos reales |
| ITALIAN SEARCH INTENT | 78 | Una intención clara por landing, léxico natural. Sin datos de volumen: es juicio cualitativo |
| MESSINA LOCALIZATION | 76 | Piano Borzì, zona sísmica 1, salsedine, condominios, topónimos. La provincia es poco específica |
| GEO/AI READINESS | 66 | Entidad y respuestas directas claras. Sin indexar y sin citas externas |
| TECHNICAL SEO | 86 | Canonical, sitemap, robots, SSR y 0 enlaces rotos. Falta dominio definitivo |
| INTERNAL LINKING | 80 | Sin huérfanas y con relación lógica. Facciate recibe pocos enlaces desde otras landings |
| CONVERSION | 68 | CTA inicial, intermedio, final y barra móvil. Sin teléfono, WhatsApp, partners ni prueba social real |
| MOBILE | 88 | Sin desbordes a 360–768. Pendiente iPhone físico |

Las notas son criterio propio del auditor, no una métrica externa.

## Formulario: flujo de Impermeabilizzazioni

`landing → /preventivo/?servizio=impermeabilizzazione → LeadWizard → POST /api/leads → lead-schema → RPC de alta → leads.service (FK a services.slug) → notify (funnelServiceLabels) → admin → asignación por partners.services`

| Landing | Valor enviado | Resultado |
|---|---|---|
| Ristrutturazioni | `ristrutturazione-completa` | PASS |
| Bagno | `bagno` | PASS |
| Cucina | `cucina` | PASS |
| Cartongesso | `cartongesso` | PASS |
| Imbianchino | `pittura` | PASS |
| Impianti | `impianti` | PASS |
| Pavimenti | `pavimenti` | PASS |
| Facciate | `facciata` | PASS |
| Impermeabilizzazioni | `impermeabilizzazione` | PASS |

Probado desde el CTA inicial y el final de cada landing (18 recorridos), con nombre `TEST NON REALE` y envío interceptado: ninguna petición llegó al servidor. `tests/service-routing.test.ts` impide que una landing vuelva a caer en `Altro`.

**Sin verificar:** notificación y asignación reales, porque la demo no tiene base de datos.

**Antes de leads reales:** aplicar `supabase/migrations/20261109000001_add_impermeabilizzazione_service.sql`.

## Mapa de enlaces entre landings

| Landing | Entrantes | Relacionadas salientes |
|---|---|---|
| Ristrutturazioni | home + 8 landings + guía | Bagno, Cucina, Impianti, Pavimenti, Cartongesso |
| Bagno | home, Ristrutturazioni, Impianti, Pavimenti, guía | Impianti, Pavimenti, Ristrutturazioni |
| Cucina | home, Ristrutturazioni, Impianti, guía | Impianti, Ristrutturazioni, Pavimenti |
| Cartongesso | home, Ristrutturazioni, Imbianchino, guía | Imbianchino, Ristrutturazioni, Impianti |
| Imbianchino | home, Cartongesso, Pavimenti, Facciate, guía | Cartongesso, Facciate, Ristrutturazioni, Pavimenti |
| Impianti | home, Ristrutturazioni, Bagno, Cucina, Cartongesso, guía | Ristrutturazioni, Bagno, Cucina |
| Pavimenti | home, Ristrutturazioni, Bagno, Cucina, Imbianchino, Impermeabilizzazioni, guía | Ristrutturazioni, Bagno, Impermeabilizzazioni, Imbianchino |
| Facciate | home, Imbianchino, Impermeabilizzazioni, guía | Impermeabilizzazioni, Imbianchino, Ristrutturazioni |
| Impermeabilizzazioni | home, Pavimenti, Facciate, guía | Facciate, Pavimenti, Ristrutturazioni |

Todas enlazan además a sus guías (CILA, verificaciones por zona, cómo elegir impresa). Header y footer enlazan las nueve desde cualquier página. Los anchors son los nombres del servicio.

## Afirmaciones comerciales

| Afirmación | Clase | Nota |
|---|---|---|
| «Non eseguiamo direttamente i lavori» | VERIFIED | Es el modelo real |
| Art. 1126 y 1136 c.c., DM 37/2008, L.R. 16/2016 | VERIFIED | Comprobados en su texto |
| Zona sísmica 1, Piano Borzì (1911) | VERIFIED | Con fuentes en la auditoría |
| No se publican reseñas ni cifras | VERIFIED | No hay ninguna en el sitio |
| Sin años de experiencia, certificaciones, garantías propias, plazos ni nº de clientes | VERIFIED | Ausentes; «garanzia» solo como algo a pedir al profesional |
| Costes del baño (Cronoshare, Money.it) | VERIFIED | Citados como estimaciones nacionales, con fecha |
| Sopralluogo no prometido como gratuito | VERIFIED | El texto dice que se pregunte antes |
| «Gratis e senza impegno», «0 € per chi chiede» | SUPPORTED | Cierto hoy para la solicitud; revisar si cambia el modelo |
| «Richiesta gratuita» | SUPPORTED | Ídem |
| Criterios de `/come-selezioniamo-i-professionisti/` | SUPPORTED | Intención declarada; aún sin partners a los que aplicarla |
| «A un massimo di 3 professionisti» | UNVERIFIED | No hay partners hoy |
| «Professionisti / imprese locali», oficios de la zona | UNVERIFIED | Ídem |
| «Verifichiamo la richiesta» | UNVERIFIED | Proceso aún sin operar |
| Cobertura de la provincia | UNVERIFIED | `coverageVerified` sigue pendiente |
| «Preventivo gratuito» (metas de Bagno, Cucina, Pavimenti, Facciate, Impermeabilizzazioni, y texto) | RISKY | Promete que el profesional no cobra; otra parte del sitio dice que se pregunte. Preferible «richiesta gratuita» |
| «Trova l'impresa giusta» (H1 Ristrutturazioni) | RISKY | Promesa de resultado |
| «Imprese disponibili a fare un sopralluogo» | RISKY | Promete disponibilidad |
| «Richieste qualificate» (`/diventa-partner/`) | RISKY | Sin datos que lo respalden |

## Schema

**PASS con avisos.** Organization, WebSite, WebPage, Service, BreadcrumbList, FAQPage, Article y CollectionPage presentes. Sin LocalBusiness, reseñas, ratings, dirección, geo ni horarios, y debe seguir así mientras no exista negocio real.

Avisos:
- `Service.offers` con `price: 0`: se refiere a la solicitud, pero puede leerse como obra gratuita. Revisar antes de indexar.
- `Organization` sin identidad legal: no existe todavía.
- Las FAQ ya no dan resultado enriquecido en Google; se mantienen por semántica.

## Checklist de lanzamiento (solo lectura)

### Google

| Punto | Valor |
|---|---|
| OFFICIAL REGISTRATION | YES (propiedad en Search Console) |
| WEBMASTER TOOL | Google Search Console |
| SITEMAP SUPPORT | YES |
| CRAWLER | Googlebot; `Google-Extended` es un token, no un crawler |
| ROBOTS REQUIREMENT | Permitir Googlebot; quitar `noindex` solo con autorización |
| ACTION AT LAUNCH | Dominio y DNS, verificar propiedad, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_INDEXABLE=true`, enviar sitemap, inspeccionar home y landings, revisar cobertura. GBP solo si existe un negocio real elegible; un portal de captación no lo es |

### Microsoft / Bing

| Punto | Valor |
|---|---|
| OFFICIAL REGISTRATION | YES (Bing Webmaster Tools) |
| WEBMASTER TOOL | Bing Webmaster Tools, con informe AI Performance en vista previa |
| SITEMAP SUPPORT | YES |
| CRAWLER | Bingbot |
| ROBOTS REQUIREMENT | Permitir Bingbot |
| ACTION AT LAUNCH | Verificar sitio y enviar sitemap. La importación desde GSC: confirmarla en la propia herramienta. IndexNow es opcional |

### IA / motores de respuesta

| Motor | OFFICIAL REGISTRATION | WEBMASTER TOOL | SITEMAP SUPPORT | CRAWLER | ROBOTS REQUIREMENT | ACTION AT LAUNCH |
|---|---|---|---|---|---|---|
| ChatGPT Search | NO | Ninguna | No documentado | `OAI-SearchBot`, `ChatGPT-User`, `GPTBot` (entrenamiento) | Permitir `OAI-SearchBot` | Comprobar que el firewall no lo bloquee |
| Copilot | Vía Bing | Bing Webmaster Tools | Vía Bing | Bingbot | Permitir Bingbot | Lo mismo que Bing |
| Gemini / AI Overviews | NO específico | Search Console (indirecto) | Vía Google | Googlebot + token `Google-Extended` | Permitir | Ninguna acción especial |
| Perplexity | NO | Ninguna | No documentado | `PerplexityBot`, `Perplexity-User` | Permitir `PerplexityBot` | Revisar firewall |
| Claude | NO | Ninguna | No documentado | `Claude-SearchBot`, `Claude-User`, `ClaudeBot` (entrenamiento) | Grupos independientes | Ninguna |
| Apple | NO para web | Ninguna | No documentado | `Applebot`; `Applebot-Extended` no rastrea | Sigue a Googlebot si no hay reglas propias | Ninguna |

## robots para producción (recomendación, sin aplicar)

| Tipo | Crawlers | Recomendación |
|---|---|---|
| Búsqueda | Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot, Applebot | Permitir |
| Activado por usuario | ChatGPT-User, Perplexity-User, Claude-User | Permitir |
| Entrenamiento | GPTBot, ClaudeBot, Applebot-Extended | Decisión del propietario; bloquearlos no afecta a la búsqueda |
| Control mixto | Google-Extended | Permitir: también gobierna el grounding de Gemini |

Si se añaden grupos por bot hay que repetir los `Disallow` de `/api/`, `/admin/` y `/preventivo/grazie/`: un grupo con nombre sustituye al grupo `*`.

**llms.txt:** existe, es experimental y no es un estándar de los motores citados. Google ha dicho que no lo usa en su búsqueda. No es requisito ni palanca: mantenerlo solo porque no cuesta nada.

## Pruebas manuales

- iPhone físico: PENDING MANUAL TEST.
- Lector de pantalla real: PENDING MANUAL TEST.
- Core Web Vitals reales, incluido INP: pendientes de tráfico.

## Bloqueos antes de producción

1. Dominio definitivo.
2. Titular del tratamiento y datos legales.
3. Partners reales con sus condiciones, o redactar sin prometer contacto.
4. Aplicar la migración de Impermeabilizzazioni.
5. Probar notificación y asignación con base de datos real en entorno controlado.
6. Resolver las afirmaciones RISKY y UNVERIFIED.
7. Canales de contacto reales, si van a existir.
8. Decidir la política de crawlers de entrenamiento y el área de servicio real.
9. Autorización expresa para quitar `noindex`.
10. Pruebas manuales en iPhone y lector de pantalla.
