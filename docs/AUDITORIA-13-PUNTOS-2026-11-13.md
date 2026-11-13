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
| 3 | «Fino a 3 professionisti» | N → I | Límite en panel y trigger de base de datos (desde `d1342ba`) | Migración `20261113000001`, `MAX_PARTNERS_PER_LEAD` | Aplicar la migración |
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
| 8 | Duplicados concurrentes | N → I | `pg_advisory_xact_lock` por teléfono y servicio en `submit_lead` | Migración `20261113000002` | Aplicar la migración |
| 8 | Aviso fallido recuperable | N → I | `notified_at`, `notify_attempts` y `notify_channels` en el lead; aviso en el panel y botón «Reinvia notifica» | Migración y 2 pruebas | Aplicar la migración y probar con tokens |
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

## Solo después del lanzamiento

Indexación, consultas e impresiones, Core Web Vitals de campo (CrUX), conversiones reales, recepción real de solicitudes, entrega de avisos, derivaciones efectivas y citas en buscadores con IA.
