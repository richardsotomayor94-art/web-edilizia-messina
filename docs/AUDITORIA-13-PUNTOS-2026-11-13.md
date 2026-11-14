# Auditoría de los 13 puntos: MessinaCasa360

Fecha: 2026-11-13. Rama `rebuild/master-2026-11`. Versión de partida `d1342ba`; la referencia recuperable es la etiqueta `baseline-2026-11-13`.

No existe un documento externo de especificación: los 13 puntos del encargo son la especificación.

Sin cambios de dirección artística, tema, tipografía, ilustraciones ni estructura visual. Comparación visual con 32 capturas de antes y después en 390 y 1440 px.

Estados: **I** = implementado · **P** = parcial · **N** = pendiente · **X** = inaplicable.

| # | Requisito | Estado inicial | Cambio aplicado | Evidencia | Bloqueo externo |
|---|---|---|---|---|---|
| 1 | Contexto, rama, commit, demo | I | Verificado: Next.js 16 + Supabase + Vercel; demo `noindex`; `0c7bd57` superado por `d1342ba` | `npm run launch:check -- --url <demo> --expect demo` → DEMO PROTETTA | — |
| 1 | Separación de otros proyectos | I | Nada compartido con Electroclima SAT ni otros | Repositorio, proyecto Vercel y Supabase propios | — |
| 2 | Panel de accesibilidad | **X** | No existe en este proyecto; no se ha inventado | Búsqueda en el código | Crearlo sería una función nueva y requiere aprobación |
| 3 | Modelo descrito igual en hero, formulario, FAQ, legales y Schema | P → I | `Service.serviceType` = «Raccolta e inoltro di richieste di preventivo» y `category` = el servicio, en lugar de «Bagni» | `src/lib/seo.ts` | — |
| 3 | «Fino a 3 professionisti» | N → I | Límite en panel y trigger de base de datos (desde `d1342ba`) | Migración `20261113000001` (aplicada el 2026-11-13), `MAX_PARTNERS_PER_LEAD` | — |
| 3 | Afirmaciones autorizadas y pendientes centralizadas | N → I | `src/config/claims.ts` con autorizadas (y su respaldo), pendientes (y su condición) y prohibidas; una prueba falla si una prohibida vuelve | `tests/claims.test.ts` (9 patrones, 0 apariciones) | — |
| 4 | Configuración central | P → I | Marca, dominio, contactos, legales y modo demo en `site.ts` con reglas en `launch-rules.ts`; servicios en `services.ts`; zonas en `areas.ts` | `npm run launch:check` | Datos reales |
| 4 | Horarios | N | No se publican; no existen datos reales | — | Facilitar horarios, si van a existir |
| 4 | Destinatarios de las solicitudes | I | Telegram y/o webhook por variables privadas | `notify.ts` | Tokens |
| 4 | Cobertura confirmada / pendiente / desactivada | P → I | `coverageOf()`: hoy todas las zonas «pending» (0 partners confirmados) | `tests/claims.test.ts` | Confirmar partners por zona |
| 4 | Comprobador de CAP | N → I | El formulario explica el CAP: fuera de la provincia (no empieza por 98), Messina ciudad (98121–98168), municipio conocido, o provincia con disponibilidad por confirmar. No bloquea el envío | `checkCap`, `capMessage` y 5 pruebas | — |
| 5 | Landings por intención | I | 10 landings (cappotto incluida); sin páginas nuevas, porque ninguna tiene cobertura confirmada | Rastreo de 28 URL, 0 enlaces rotos | — |
| 5 | Servicio en CTA, enlace directo, recarga y atrás | I | Verificado: header, menú, barra móvil, hero, cierre y ficha de costes llevan `?servizio=`; la recarga conserva el paso | `regress.cjs`, `form-routing.cjs` (20/20) | — |
| 5 | Servicios pendientes en borrador | I | Climatización sin página; registrada como afirmación pendiente (F-gas) | `claims.ts` | Partner certificado |
| 6 | Títulos, meta, H1 únicos; canonical; enlaces | I | Pruebas nuevas de unicidad, longitudes orientativas y correlaciones válidas | `tests/seo-config.test.ts` | — |
| 6 | Índice de zonas | I | Se queda como sección de la home, sin páginas de zona indexables: sin cobertura confirmada serían páginas vacías | `areas.ts` (`seoEnabled` solo Messina) | Datos reales por zona |
| 6 | Mapa de redirecciones | I | Sin cambios de URL; se conservan las 5 redirecciones existentes | `next.config.ts` | — |
| 7 | Entidad y `provider` | P → I | `Organization` (no `LocalBusiness`); el servicio descrito es la intermediación; contactos de prueba nunca en el marcado | Prueba de demo: `contactPointInLd: false` | — |
| 8 | Guardar antes de avisar | I | Se guarda con la RPC y después se avisa con `after()` | `api/leads/route.ts` | — |
| 8 | Duplicados concurrentes | N → I | `pg_advisory_xact_lock` por teléfono y servicio en `submit_lead` | Migración `20261113000002` (aplicada el 2026-11-13) | — |
| 8 | Aviso fallido recuperable | N → I | `notified_at`, `notify_attempts` y `notify_channels` en el lead; aviso en el panel y botón «Reinvia notifica» | Migración aplicada y 2 pruebas | Probar con tokens reales |
| 8 | Respuesta que corresponde al estado real | P → I | `received: "new" | "duplicate"`; la página de gracias dice «ya la habíamos recibido» si era duplicada | Pruebas de API | — |
| 8 | Reintentos y tiempos de espera | I | Corte a 20 s, mensaje y reintento seguro gracias a la deduplicación | `LeadWizard.tsx`, `PartnerForm.tsx` | — |
| 8 | Pruebas con datos sintéticos | P | 16 pruebas simuladas de API y 20 recorridos en navegador con envío interceptado | `tests/api-intake.test.ts` | **Recepción real sin verificar**: falta un entorno autorizado |
| 8 | Minimización y conservación | I | IP solo como hash, `retention_until` a 24 meses, sin PII en analítica | Esquema de base de datos | Validar con asesor |
| 9 | Eventos diferenciados | I | `phone_click`, `whatsapp_click` y `email_click` (contacto), `start_quote` (inicio), `lead_submit` (recibida); las derivaciones se miden en base de datos (`lead_assignments`), no en GA | `analytics.ts` | GA4 ID |
| 9 | Sin datos personales en eventos | I | Lista blanca de parámetros y filtro de teléfono/email; las URL solo llevan `servizio`, `foto` y `stato` | `sanitizeParams` | — |
| 9 | Retirada del consentimiento | P → I | Rechazar después de aceptar desactiva GA (`ga-disable-<ID>`) y borra las cookies `_ga` | `Analytics.tsx` | Probar con un ID real |
| 9 | Google Business Profile | I | Verificado en la página oficial: «Lead generation agents or companies» no son elegibles | `GBP-ELIGIBILITY.md` (2026-11-13) | — |
| 10 | Accesibilidad | I | axe: 0 violaciones en 28 URL y 6 anchos; foco, teclado, Escape, `inert`, movimiento reducido | `crawl-all.cjs` | iPhone y lector de pantalla físicos |
| 10 | Imágenes | I | AVIF/WebP, `sizes` por uso, `fetchPriority` alta solo en la imagen principal, carga diferida en el resto | `next.config.ts` | — |
| 10 | Rendimiento medido | **N** | Tres tandas, todas con la CPU entre el 18 y el 100 % por la sincronización de OneDrive | Ver §Rendimiento | Pausar OneDrive o medir fuera |
| 11 | Referencia recuperable | N → I | Etiqueta git `baseline-2026-11-13` y 32 capturas | Git | — |
| 11 | Regresiones | I | 106 pruebas: rutas, metadatos, sitemap, robots, indexación, enrutado de servicios, API y afirmaciones | `npm run test` | — |
| 11 | Fechas reproducibles | I | El sitemap usa la fecha real de cada guía, no la de compilación | `tests/seo-config.test.ts` | — |
| 11 | Scripts de auditoría aislados | I | `launch-check` solo lee y no escribe en el proyecto; los scripts de QA viven fuera del repositorio | — | — |
| 12 | Datos sintéticos y contactos desactivados | I | Desde `d1342ba` | `demo-contacts.cjs` | — |
| 12 | Dominio, HTTPS, canonical, sitemap, robots | I | Centralizado en `NEXT_PUBLIC_SITE_URL`; procedimiento en `LANZAMIENTO-2026-11.md` | `launch-check --url` | Comprar el dominio |
| 12 | Cabeceras y CSP | I | CSP aplicada en producción con orígenes condicionados a GA, Turnstile y Supabase; HSTS, `nosniff`, `frame-ancestors 'none'`. Mantiene `'unsafe-inline'` por el script de arranque y Next | 0 errores de consola en 28 URL | Revisar la CSP con GA y Turnstile activos |
| 13 | Informe | I | Este documento | — | — |

## Rendimiento

| Tanda | Condición | Home | Bagno | Facciate | Impianti | Cappotto |
|---|---|---|---|---|---|---|
| 2026-11-10 (antes de la optimización SEO) | CPU normal | 97 · LCP 1,19 s | 91 · 2,39 s | 91 · 2,35 s | 92 · 2,56 s | — |
| 2026-11-13 01:11 (`d1342ba`) | CPU 18–100 % (OneDrive) | 78 · 1,10 s | 72 · 2,77 s | 76 · 2,60 s | 76 · 2,44 s | 74 · 2,29 s |

Lighthouse móvil simulado: Moto G Power, 4G lento, CPU ×4. Cada fila es la mediana de 5 ejecuciones con Chrome nuevo.

En la segunda tanda el tiempo de análisis del HTML pasa de 54 a 122 ms y el de estilos de 601 a 1.395 ms. Ninguno de los dos depende de cambios de código: es la carga del equipo, y las puntuaciones de esa tanda no son concluyentes.

CLS = 0 en todas las ejecuciones. INP no se puede medir en laboratorio; el TBT está contaminado.

### Prueba A/B controlada (2026-11-13, 09:38–09:48)

Para separar el código de la máquina se compararon dos versiones **en la misma máquina, alternadas, al mismo tiempo**:
- A = `dd115cd`, la del 10/11 que daba 91–97 en la demo;
- B = `6fa4a5e`, la actual.

Condiciones de la prueba:
- Las dos se compilaron fuera de OneDrive (`next build` y `next start` en localhost) con `NEXT_PUBLIC_DEMO_MODE=true`.
- Lighthouse 13.6.0 móvil simulado con Chrome 157, uno nuevo por ejecución; i5-8350U conectado a la corriente, plan «Equilibrado».
- 5 ejecuciones por página tras una de calentamiento.
- La CPU registrada durante la prueba (incluye a Lighthouse) estuvo entre el 21 y el 100 %, con media del 73 %.

| Página | Perf A → B | LCP A → B | TBT A → B | JS A → B | CLS |
|---|---|---|---|---|---|
| Home | 89 → 91 | 1,11 → 1,10 s | 447 → 375 ms | 154 → 157 KB | ≈ 0 |
| Bagno | 79 → 78 | 3,19 → 3,41 s | 561 → 564 ms | 161 → 163 KB | ≈ 0 |
| Facciate | 79 → 80 | 3,36 → 3,54 s | 527 → 416 ms | 161 → 163 KB | ≈ 0 |
| Modulo | 90 → 90 | 0,92 → 0,92 s | 425 → 406 ms | 171 → 174 KB | 0 |

**Conclusión:** las diferencias entre A y B están dentro del ruido entre ejecuciones (el punteaje de una misma página varía entre 67 y 97). El código actual **no ha empeorado** el rendimiento: solo añade unos 3 KB de JavaScript, por el aviso de contactos y el comprobador de CAP.

La caída frente a los valores del 10/11 viene de la máquina. Todas las fases del navegador, incluido el análisis del HTML, que el código no toca, duran ahora aproximadamente el doble.

En localhost, el LCP de las landings (~3,2–3,5 s) es mayor que en Vercel porque el servidor local optimiza las imágenes al vuelo sin CDN. Afecta igual a A y B.

**Pendiente:**
- Valores absolutos fiables: solo con una máquina sin carga, con PageSpeed Insights (servidores de Google; requiere enviar la URL de la demo, decisión del propietario) o con datos de campo (CrUX) tras el lanzamiento.
- INP: solo con datos de campo.

**Entorno:** cada compilación dentro de OneDrive genera unos 1.700 archivos en `.next` que OneDrive sincroniza. Conviene trabajar fuera de su carpeta.

## Mejoras del 2026-11-14 (`03085fb`)

- **Fuentes oficiales enlazadas en cada landing** (Normattiva, Regione Siciliana, Agenzia delle Entrate): visibles en «Sul territorio» y en `WebPage.citation`. Los 7 enlaces responden y abren la norma correcta.
- **Fecha real de actualización** (`updated` en la configuración): visible en la página, en `dateModified` y en el `lastmod` del sitemap. Recompilar sin cambios de contenido no la altera.
- **Enlaces contextuales en las respuestas de las FAQ** hacia guías y servicios relacionados (12 enlaces). El JSON-LD recibe el texto sin marcado. Una prueba comprueba que cada destino existe.
- **Más enlaces hacia Cappotto** desde Cartongesso e Imbianchino.
- **Formulario:** al llegar con el servicio ya elegido, empieza en «Passo 1 di 6».
- **`Organization.areaServed`:** Messina y la Città metropolitana, que es el área real de recogida.
- **Verificación:**
  - 131 pruebas;
  - 0 violaciones axe en 28 URL;
  - 20/20 recorridos del formulario;
  - demo protegida;
  - landings 52 px más altas en escritorio por la línea de fuentes, sin otros cambios visuales.

### Valoración interna actualizada

Son valoraciones internas, no puntuaciones de herramientas externas.

| Área | 13/11 | 14/11 | 14/11 tarde | Qué falta para el 100 |
|---|---|---|---|---|
| SEO local | 72 | 74 | 75 | Datos reales del negocio, menciones en directorios, reseñas reales |
| Intención de búsqueda italiana | 90 | 90 | 91 | Búsquedas reales de Search Console |
| Localización Messina | 84 | 85 | 85 | Partners y casos reales por zona |
| GEO / IA | 78 | 84 | 88 | Indexación, menciones externas, `sameAs` reales |
| SEO técnico | 96 | 97 | 98 | Dominio definitivo con HTTPS |
| Schema (nueva fila) | — | — | 95 | `sameAs`, datos legales y contacto reales |
| Enlaces internos | 88 | 93 | 93 | Ajuste con datos de Search Console |
| Conversión | 82 | 83 | 84 | Teléfono y WhatsApp reales, prueba social real, partners activos |
| Móvil | 96 | 96 | 96 | Prueba en iPhone físico |

## Ronda SEO / GEO / técnico del 2026-11-14 (`9864ea4`)

Siete agentes especializados (técnico, contenido, Schema, sitemap, local, GEO y SXO) revisaron la demo y el código sin modificar nada. Se aplicó solo lo que se podía hacer con código, sin datos inventados ni cambios de diseño.

**Aplicado**
- **Error de contenido:** la home decía «Nove lavori» con 10 landings. Ahora el número se deriva del recuento real.
- **Promesas honestas:** 5 leads y 3 FAQ decían «ti mettiamo in contatto» sin reservas. Ahora dicen «inoltriamo la richiesta fino a 3… e, se non ce ne sono di disponibili, te lo diciamo».
- **Title de Ristrutturazioni** orientado a la búsqueda: «Ristrutturazione casa a Messina: preventivi».
- **Redirect al dominio canónico** movido del proxy a `next.config.ts`:
  - un solo 308 que conserva la barra final y los parámetros;
  - las páginas públicas salen de la caché CDN sin pasar por una función;
  - el proxy solo actúa en `/admin`.
- **Una sola regla de indexabilidad:** `next.config.ts` aplica ahora la misma que `site.ts` (sin modo demo y sin dominio de prueba). Antes una build en modo demo podía perder la cabecera `X-Robots-Tag`.
- **Schema:**
  - Article con autor y editor explícitos (la redacción, sin personas inventadas), `datePublished` real (primer commit de cada guía) e imagen como ImageObject;
  - WebPage de las guías con `mainEntity` apuntando al Article;
  - Service con área provincial y canal «modulo online»;
  - Organization con `hasOfferCatalog` y `sameAs` desde variable;
  - FAQPage con `isPartOf`;
  - URL de la home con barra final;
  - sin breadcrumb de un solo elemento en la home.
- **Sitemap:**
  - `lastmod` como fecha AAAA-MM-GG;
  - el índice `/guide/` lleva la fecha de la guía más reciente;
  - una prueba nueva garantiza que contiene todas las páginas indexables y ninguna `noindex`.
- **robots de producción:** grupos explícitos para Googlebot, Bingbot y los buscadores y agentes de usuario de OpenAI, Anthropic y Perplexity. Los crawlers de entrenamiento siguen permitidos hasta que el propietario decida (`NEXT_PUBLIC_BLOCK_AI_TRAINING`). La demo no cambia.
- **`llms.txt`:** área por CAP y zonas de Messina.
- **E-E-A-T sin inventar:**
  - firma «A cura della redazione di MessinaCasa360» junto a la fecha de las guías;
  - sección «Come scriviamo le guide» en Chi siamo, con fuentes oficiales, sin precios por m² y con la advertencia del técnico habilitado.
- **Técnico:**
  - páginas `noindex` con `follow`;
  - «Cosa deve contenere il preventivo» pasa a `h3` dentro de Costi, con el mismo estilo;
  - «In breve» con texto accesible que nombra el servicio;
  - un día de caché para logo e iconos;
  - description de la guía del baño ≤ 160 caracteres.
- **`launch:check --url`:** comprueba cada URL del sitemap (200, sin `noindex`, canonical igual a la URL) y los `lastmod`.
- **Simulación de producción en local** (dominio ficticio, indexación activada):
  - host alternativo → un 308 directo a la URL canónica con barra;
  - `index, follow, max-image-preview:large`;
  - sin `X-Robots-Tag`;
  - robots con grupos y `Sitemap:`;
  - 24 URL;
  - admin protegida.

**Descartado y por qué**
- **`/preventivo/` estático** con `useSearchParams`: quien llega desde una landing vería un instante el paso «elige el servicio» antes de saltar al siguiente. Además, la página es `noindex`, así que no aporta posicionamiento.
- **Encabezados del footer** como párrafo: cambiaría interlineado y espaciado, y el beneficio es nulo.
- **Imágenes `eager` de Stage:** posible parpadeo al cambiar de pestaña. Solo se tocarán con una medición de Lighthouse.
- **Enlace en el «In breve» del baño:** ese texto tiene la animación palabra por palabra.
- **Páginas por zona, precios, autores o revisores, incentivos del cappotto sin fuente GSE/ENEA verificada:** no se publican sin datos reales.

**Decisiones del propietario pendientes**
1. Bloquear o no los crawlers de entrenamiento de IA (una variable).
2. Perfiles oficiales reales para `sameAs`.
3. Modelo de ingresos que se declarará en Chi siamo (transparencia).
4. Regla real de reparto entre los 3 profesionales.
5. Protección de contraseñas filtradas en Supabase Auth.

**Plan de indexación el día del lanzamiento**
1. Variables de producción completas y `launch:check -- --url https://<dominio> --strict` en «PRONTO».
2. Search Console (propiedad Dominio por DNS): enviar `sitemap.xml`, inspeccionar la home, las 10 landings y las 7 guías, y pedir la indexación de la home y de las landings con autorización.
3. Bing Webmaster Tools: importar desde Search Console. IndexNow solo si se activa más adelante.
4. Primera semana: revisar en Search Console «Páginas» las excluidas y comprobar que la versión elegida por Google es el canonical declarado.
5. Primer mes: ajustar title y descripciones con las consultas reales y crear contenido solo donde haya impresiones sin página adecuada.

**Verificación online de `9864ea4`:**
- `launch:check --expect demo`: 0 bloqueos, «DEMO PROTETTA». La demo mantiene `noindex` y el robots sin sitemap.
- 28 URL rastreadas: 0 rutas rotas y 0 incidencias de enlaces, encabezados ni accesibilidad.
- 20/20 recorridos landing → formulario con el servicio correcto.
- Formulario sin texto desbordado de 320 a 1440 px.
- 134 pruebas, `tsc` y lint correctos.
- **Comparación visual con `03085fb`:**
  - escritorio: cambios ≤ 0,6 % (solo los textos corregidos), misma altura;
  - móvil, home: el título corregido «Dieci lavori» ocupa 2 líneas en lugar de 3 (−40 px);
  - ningún otro cambio de composición.

## Solo después del lanzamiento

Indexación, consultas e impresiones, Core Web Vitals de campo (CrUX), conversiones reales, recepción real de solicitudes, entrega de avisos, derivaciones efectivas y citas en buscadores con IA.
