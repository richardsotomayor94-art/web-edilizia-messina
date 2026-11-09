# Auditoría SEO local, GEO/IA y conversión: MessinaCasa360

Fecha: 2026-11-09. Código auditado: rama `rebuild/master-2026-11`, commit `07455c7`, servido en la demo `messinacasa360-demo.vercel.app`.
Auditoría de solo lectura: este documento es el único archivo nuevo y no se ha tocado el sitio.

## 0. Diagnóstico en una página

La ingeniería está por delante del negocio. El código ya hace bien casi todo lo técnico. Lo que hoy impide aparecer no es el SEO: **no hay dominio, no hay titular legal publicado, no hay partners y la web está en `noindex` a propósito**.

Tres conclusiones que cambian decisiones:

1. **El modelo manda sobre el SEO.** Tu encargo describe una empresa de edilizia, pero la web es un **intermediario** que no ejecuta obras. Con ese modelo **no es elegible para Google Business Profile**: Google excluye expresamente a *lead generation agents or companies* y exige contacto en persona. Google Maps solo sería legítimo si operas como impresa real, o a través de las fichas de los partners.
2. **No existe "registrarse en las IA".** Google declara que no hacen falta archivos ni marcado especiales. OpenAI, Perplexity y Anthropic no documentan registro alguno. Lo verificable: estar indexado, permitir sus crawlers de búsqueda y tener contenido citable. Solo Bing ofrece un informe propio de citas en IA.
3. **Los datos de demanda no existen todavía.** Sin Search Console ni Keyword Planner, todo volumen es **NOT AVAILABLE**. Lo que sí he podido medir es la forma real de las consultas (autocompletado de Google y Bing), y aporta correcciones concretas (sección 4).

## Modelo real y fases (aclarado por el propietario el 2026-11-09)

MessinaCasa360 es un **activo digital de lead generation local en construcción**. No ejecuta obras, no monetiza y no factura. Sopralluogo, preventivo, contrato, ejecución, factura y garantías son del profesional que preste el servicio.

Orden: **construir y posicionar el activo → validar la demanda → decidir la monetización** (venta o alquiler del activo, lead generation, marketing u otra). Ninguna de esas fórmulas se implementa ni se describe como vigente.

| Fase | Qué requiere | Qué NO requiere |
|---|---|---|
| Demo actual | Desarrollo, UX, SEO, QA en Vercel, `noindex` | Partita IVA, PEC, REA, sede, sociedad, partners |
| Indexación y posicionamiento | Autorización expresa, dominio, Search Console | Monetización |
| Solicitudes reales | Titular del tratamiento identificado, privacy revisada, profesionales reales | |
| Monetización | Estructura definida con commercialista | |

**Esto corrige la sección de prioridades.** Titular, PEC, partners y secretos no bloquean el desarrollo: son condiciones de la fase de solicitudes reales. Antes de recoger datos personales reales hará falta identificar a un responsable del tratamiento, aunque no se cobre nada. Si se indexa antes con el formulario cerrado, conviene confirmar con un profesional qué datos debe mostrar el sitio.

## Actualización del 2026-11-09: mejoras aplicadas (commit `9e55f24`)

Modelo decidido: **intermediario**. Aplicado en la rama y en la demo, sin publicar: textos sobre partners, titles, H1 de la home, guías de coste del baño y "da dove iniziare", sección chiavi in mano, respuesta sobre el sopralluogo, enlaces hacia guías, sitemap con fechas reales y recuperación del móvil.

| Área | Antes | Ahora |
|---|---|---|
| Technical SEO | 80 | 84 |
| Italian search intent | 60 | 70 |
| Content depth | 66 | 73 |
| Internal linking | 68 | 78 |
| AI/GEO readiness | 55 | 60 |
| Performance | 76 | 90 |

| Página | Móvil antes del pase visual | Tras el pase | Ahora | LCP móvil ahora | TBT ahora |
|---|---|---|---|---|---|
| Home | 84 | 86 | **93** | 1,24 s | 306 ms |
| Pavimenti | 94 | 85 | **93** | 1,62 s | 314 ms |
| Bagno | 92 | 83 | **94** | 1,94 s | 248 ms |
| Preventivo | 93 | 88 | **93** | 1,00 s | 315 ms |
| Guía local | 90 | 86 | **90** | 1,26 s | 406 ms |

Siguen pendientes los puntos CRITICAL: dominio, titular y contactos, partners, secretos y revisión legal, publicación con Search Console. Las secciones siguientes reflejan el estado previo a estas mejoras.

## 1. Puntuaciones

Miden el estado **real de hoy**. Las de "readiness" son bajas porque el sitio no está publicado, aunque el código esté preparado.

| Área | Nota | Justificación |
|---|---|---|
| TECHNICAL SEO | **80/100** | Canonical, sitemap, robots, redirecciones, SSR, 0 enlaces rotos. Falta dominio; `lastmod` fijo; dos titles con la marca duplicada |
| LOCAL SEO MESSINA | **50/100** | Hechos locales verificados y con fuentes. Sin NAP, sin GBP posible, sin casos, sin partners |
| ITALIAN SEARCH INTENT | **60/100** | Italiano nativo y bien orientado. Huecos: "quanto costa rifare il bagno", "da dove inizio", "chiavi in mano", facciate |
| CONTENT DEPTH | **66/100** | Landings de 890–1.220 palabras bien estructuradas. Sin casos reales; Facciate no existe |
| INTERNAL LINKING | **68/100** | Sin huérfanas. Guías poco enlazadas desde el contenido (`come-scegliere`: solo 2 enlaces entrantes) |
| SCHEMA | **82/100** | Grafo honesto y coherente. Falta identidad legal; fechas y autor de los artículos flojos |
| GOOGLE READINESS | **35/100** | Código listo. `noindex`, sin dominio, sin GSC, sin titular |
| BING READINESS | **30/100** | Sin Webmaster Tools. Mismos bloqueos |
| AI/GEO READINESS | **55/100** | Respuestas directas y crawlers permitidos. No indexado, cero citas externas, identidad sin datos |
| CONVERSION | **58/100** | Formulario y CTA fuertes. Sin teléfono ni WhatsApp, sin prueba social real, 0 partners, intake bloqueado |
| PERFORMANCE | **76/100** | LCP ≤ 2,5 s, CLS 0, desktop 100. Móvil 83–88 con TBT de 470–650 ms, peor que antes del último pase visual |
| MOBILE UX | **88/100** | PASS a 360–430, CTA en primer pantallazo, menú y formulario sólidos. Sin prueba en iPhone físico |

## 2. Inventario

Fuente: crawl del HTML servido, 23 URL, 0 enlaces rotos, titles y descriptions sin duplicados. Hoy todas tienen `noindex` por configuración (`NEXT_PUBLIC_SITE_INDEXABLE`).

| URL | Palabras | H2 | H3 | Imgs | Enlaces desde contenido | Al publicar | JSON-LD |
|---|---|---|---|---|---|---|---|
| `/` | 1114 | 9 | 16 | 22 | 21 | Indexable | Organization, WebSite, WebPage, Breadcrumb, OfferCatalog, Service, FAQPage |
| `/ristrutturazioni-messina/` | 1218 | 11 | 13 | 8 | 7 | Indexable | Organization, WebSite, WebPage, Service, Breadcrumb, FAQPage |
| `/ristrutturazione-bagno-messina/` | 1016 | 10 | 12 | 7 | 4 | Indexable | Igual |
| `/ristrutturazione-cucina-messina/` | 945 | 10 | 11 | 7 | 3 | Indexable | Igual |
| `/cartongesso-messina/` | 898 | 10 | 11 | 7 | 2 | Indexable | Igual |
| `/imbianchino-messina/` | 886 | 10 | 12 | 8 | 3 | Indexable | Igual |
| `/impianti-messina/` | 907 | 10 | 11 | 7 | 5 | Indexable | Igual |
| `/pavimenti-messina/` | 924 | 10 | 13 | 7 | 5 | Indexable | Igual |
| `/guide/` | 137 | 5 | 0 | 0 | 5 | Indexable, fina | CollectionPage |
| `/guide/costo-ristrutturazione-casa-messina/` | 589 | 7 | 3 | 2 | 4 | Indexable | Article, FAQPage |
| `/guide/lavori-casa-messina-verifiche-zona/` | 763 | 8 | 4 | 2 | 11 | Indexable | Article, FAQPage |
| `/guide/come-scegliere-impresa-edile-messina/` | 559 | 7 | 4 | 2 | **2** | Indexable | Article, FAQPage |
| `/guide/cila-quando-serve/` | 530 | 6 | 4 | 2 | 12 | Indexable | Article, FAQPage |
| `/guide/bonus-ristrutturazione-2026/` | 597 | 6 | 3 | 2 | 6 | Indexable | Article, FAQPage |
| `/come-funziona/` | 457 | 8 | 4 | 1 | 2 | Indexable | WebPage, FAQPage |
| `/come-selezioniamo-i-professionisti/` | 190 | 3 | 0 | 0 | 2 | Indexable, fina | WebPage |
| `/chi-siamo/` | 156 | 3 | 0 | 0 | 0 | Indexable, fina | AboutPage |
| `/contatti/` | 79 | 3 | 0 | 0 | 0 | Indexable, fina | ContactPage |
| `/diventa-partner/` | 175 | 3 | 0 | 0 | 1 | Indexable | WebPage |
| `/preventivo/` | 134 | 1 | 0 | 1 | 15 | `noindex` fijo | Ninguno |
| `/preventivo/grazie/` | | | | | | `noindex` + bloqueada en robots | Ninguno |
| `/privacy/`, `/cookie/`, `/termini/` | 134–583 | 3–10 | 0 | 0 | 0–4 | `noindex` fijo | WebPage |

Imágenes: 0 sin `alt`; decorativas con `alt=""`; las de debajo del pliegue, en lazy. Sitemap: 19 URL, solo indexables. Robots: bloquea `/api/`, `/admin/`, `/preventivo/grazie/`. Canonical absoluto y correcto, pero hoy apunta a la demo.

**Similitud entre landings** (Jaccard sobre secuencias de 5 palabras): máximo **16 %**, entre Pittura y Pavimenti. Lo común es el proceso y la nota de privacidad. No hay riesgo de doorway.

**Huérfanas:** ninguna. Pero `/come-scegliere-impresa-edile-messina/` solo recibe 2 enlaces y es la respuesta directa a una intención clave.

### Balance

**Ya está bien (no rehacer):** URLs planas por intención; un title, description y H1 únicos por URL; grafo Schema honesto; respuesta directa "In breve" en cada landing; FAQ en el DOM; breadcrumbs; hechos locales con fuentes; atribución de lead, incluida la procedente de IA; eventos sin PII y filtrados; decisión de no crear páginas por barrio o municipio; `noindex` con compuerta por entorno.

**Incompleto:** contenido local (2 notas en casi todas las landings); chiavi in mano (5 menciones, sin sección propia); sopralluogo (38 menciones, ninguna respuesta directa); GA4 (código sin ID); cobertura (`coverageVerified: false` en todo).

**Falta:** dominio, titular, contactos, partners, GSC, Bing WMT, casos reales, guía de coste del baño, página de facciate, validación de volumen.

**Debe mejorar:** titles con marca duplicada; afirmaciones en presente sobre partners; autor y fechas de las guías; enlazado contextual hacia guías.

## 3. Arquitectura: veredicto

**La actual es correcta y no debe rehacerse.** Una URL por intención real, slugs `/servicio-messina/` planos.

Tu ejemplo pone `/` como autoridad principal de "Ristrutturazioni Messina". Recomiendo **mantener la decisión actual**: la home trabaja marca y "preventivi lavori in casa", y `/ristrutturazioni-messina/` concentra la intención principal. Dos URL compitiendo por lo mismo se canibalizarían.

| Propuesta | Decisión | Condición |
|---|---|---|
| Sección H2 "chiavi in mano" en `/ristrutturazioni-messina/` | **Hacer** | Ninguna |
| `/guide/costo-rifacimento-bagno-messina/` | **Hacer** | Ninguna |
| Guía "Devo ristrutturare casa: da dove iniziare" | **Hacer** | Ninguna |
| `/rifacimento-facciata-messina/` | **Condicional** | Partner real con andamios. Es servicio tuyo en este encargo, pero la consulta es condominial e informativa |
| `/impermeabilizzazione-terrazzi-messina/` | **Condicional** | Partner real |
| `/impresa-edile-messina/`, `/lavori-edili-messina/`, `/ditta-edile-messina/` | **No** | Sería presentarse como impresa. "Lavori edili" además atrae empleo y licitaciones |
| Páginas por barrio o municipio | **No** | Solo Milazzo y Barcellona P.G., con partner, demanda medida y contenido propio |

## 4. Cómo busca realmente un italiano

**Método y límite.** Autocompletado público de Google (`hl=it, gl=it`) y Bing (`it-IT`), más SERP ya documentadas en `SEO-KEYWORDS.md` y `LOCAL-SEO-EXPANSION.md`. El autocompletado muestra **formas reales de consulta, no volumen**, y no está geolocalizado en Messina. Las SERP no son de Google.it: el buscador disponible es de EE. UU.

### Hallazgos que corrigen supuestos

- **"pavimenti messina" es sobre todo tiendas y marcas**: *vendita, negozi, crescenti, millo, melluso*. La intención de obra está en "posa" y en **"levigatura / lucidatura pavimenti messina"**, servicio que hoy no cubrimos.
- **"cartongesso messina" tira a material**: *vendita, smaltimento*. La intención de obra está en "cartongessista", "controsoffitto".
- **"muratore messina" y "elettricista messina" traen empleo y cursos**: *lavoro muratore, corso elettricista*. "idraulico messina" trae **pronto intervento**, fuera de nuestro servicio.
- **"lavori edili messina"** trae horarios y otros municipios. Se confirma no crear página.
- **"ristrutturazioni messina"** sugiere **"ditte ristrutturazioni messina"**. En plural: "imprese edili messina e provincia". La palabra "ditta" aparece **0 veces** en todo el sitio.
- **Fuera de lo local, las preguntas llevan metros:** "quanto costa ristrutturare un appartamento di **100 / 80 / 70 mq**", "rifare un bagno di **5 / 6 mq**". Una guía útil debe razonar por metraje.
- **Permisos:** "rifare il bagno è edilizia libera", "serve la cila per rifare il bagno / l'impianto elettrico / cambiare gli infissi".
- **El arranque:** "devo ristrutturare casa **cosa devo fare / da dove comincio / agevolazioni**", y "voglio ristrutturare casa **ma non ho soldi**".
- **Facciate es derecho condominial:** "rifacimento facciata condominio **maggioranza / chi paga / ripartizione spese / detrazione**".

### Léxico natural

| Lo que quiere decir | Cómo lo dice un italiano | Matiz |
|---|---|---|
| Quiero reformar mi casa | *Devo ristrutturare casa*, *voglio rifare casa* | "Devo" domina en autocompletado |
| Busco una empresa | *Cerco un'impresa edile per ristrutturare casa*, *ditte di ristrutturazioni* | "Impresa" es formal; "ditta", coloquial y frecuente en plural |
| Quiero presupuesto | *Chiedere un preventivo*, *preventivo ristrutturazione* | Compromiso bajo; el usuario espera varios |
| Que vengan a verlo | *Sopralluogo* | Paso técnico previo al preventivo fiable; a menudo se pregunta si es gratis |
| Reformar el baño | *Rifare il bagno* (hablado), *ristrutturazione / rifacimento bagno* (búsqueda comercial) | Sinónimos: una sola URL |
| Hacer la fachada | *Rifare la facciata*, *rifacimento facciata condominio* | Decide la asamblea |
| Reforma llave en mano | *Ristrutturazione chiavi in mano* | Un único interlocutor; hay que aclarar qué incluye |
| Obras en general | *Lavori in casa*, *lavori di ristrutturazione* | "Lavori edili" suena a sector y empleo |

### Mapa de consultas

VOLUME y COMPETITION numérica: **NOT AVAILABLE** en todas. Sin Keyword Planner ni GSC. "Obs." indica si la forma aparece en autocompletado o SERP documentada.

| Keyword / query | Intent | Servicio | Local | Obs. | Página objetivo | Actual | Falta | Prioridad |
|---|---|---|---|---|---|---|---|---|
| ristrutturazioni messina | COMMERCIAL | Ristrutturazioni | Alta | Sí | `/ristrutturazioni-messina/` | Sí | | P1 |
| ditte ristrutturazioni messina | COMMERCIAL | Ristrutturazioni | Alta | Sí | Ídem | Parcial | Variante "ditte" | P1 |
| ristrutturazione casa / appartamento messina | COMMERCIAL | Ristrutturazioni | Alta | SERP | Ídem | Sí | | P1 |
| ristrutturazioni chiavi in mano messina | TRANSACTIONAL | Ristrutturazioni | Alta | SERP | Ídem | Parcial | H2 propio | P1 |
| preventivo ristrutturazione messina | PRICE/QUOTE | Ristrutturazioni | Alta | SERP | Ídem + `/preventivo/` | Sí | | P1 |
| impresa edile messina / imprese edili messina e provincia | LOCAL, directorio | General | Alta | Sí | `/guide/come-scegliere-impresa-edile-messina/` | Parcial | Aceptar posición limitada | P2 |
| ditta edile messina | LOCAL | General | Alta | No | Misma guía | No | Variante en texto | P3 |
| lavori edili messina | RESEARCH, empleo | | Media | Sí | Ninguna | | No crear | Rechazada |
| rifacimento / ristrutturazione bagno messina | COMMERCIAL | Bagno | Alta | SERP | `/ristrutturazione-bagno-messina/` | Sí | | P1 |
| quanto costa rifare un bagno (di 5-6 mq) | PRICE/QUOTE | Bagno | Baja | Sí | Guía coste baño | **No** | **Guía nueva** | P1 |
| rifare il bagno serve la cila / è edilizia libera | INFORMATIONAL | Bagno | Baja | Sí | Bagno + guía CILA | Sí | Enlace cruzado | P2 |
| posa pavimenti messina | COMMERCIAL | Pavimenti | Alta | SERP | `/pavimenti-messina/` | Sí | | P2 |
| levigatura / lucidatura pavimenti messina | COMMERCIAL | Pavimenti | Alta | Sí | Sección en Pavimenti | **No** | Solo con partner | P3 |
| pavimenti messina | Navegacional, tienda | Pavimenti | Alta | Sí | Ninguna como objetivo | | Intención de tienda | Baja |
| cartongessista / controsoffitto messina | COMMERCIAL | Cartongesso | Alta | SERP | `/cartongesso-messina/` | Sí | | P2 |
| rifacimento facciata messina | COMMERCIAL, condominial | Facciate | Alta | SERP | `/rifacimento-facciata-messina/` | **No** | Con partner | P2 |
| rifacimento facciata condominio maggioranza / chi paga | INFORMATIONAL | Facciate | Baja | Sí | Sección en esa página | **No** | Con la página | P2 |
| imbianchino messina | COMMERCIAL | Pittura | Alta | SERP | `/imbianchino-messina/` | Sí | | P2 |
| impermeabilizzazione terrazzo messina | COMMERCIAL, problema | Impermeabilización | Alta | SERP | Página nueva | **No** | Con partner | P2 |
| idraulico messina pronto intervento | URGENT | | Alta | Sí | Ninguna | | Fuera de servicio | Rechazada |
| quanto costa ristrutturare casa / appartamento (100 mq) | PRICE/QUOTE | Ristrutturazioni | Media | Sí | Guía de costes | Parcial | Razonar por metraje | P1 |
| devo ristrutturare casa da dove comincio | RESEARCH | General | Baja | Sí | Guía nueva | **No** | **Guía nueva** | P1 |
| come scegliere impresa edile affidabile | RESEARCH | General | Media | Sí | Guía existente | Sí | Más enlaces | P1 |
| serve la cila per... | INFORMATIONAL | Permisos | Baja | Sí | Guía CILA | Sí | | P2 |
| bonus ristrutturazione 2026 / devo ristrutturare agevolazioni | INFORMATIONAL | Fiscal | Baja | Sí | Guía bonus | Sí | Revisar enero 2027 | P2 |

### Mapa conversacional

Se agrupan por tema: **no crear una página por pregunta.**

| Grupo | Ejemplos | Dónde se responde | Estado |
|---|---|---|---|
| ¿Quién lo hace? | "Qual è una buona impresa per ristrutturare casa a Messina?", "Chi fa ristrutturazioni chiavi in mano a Messina?", "Cerco qualcuno per rifare il bagno" | Landings + guía de elección | **Parcial.** Sin imprese verificables, una IA no tiene a quién citar; podemos ser fuente de criterios y canal de solicitud |
| ¿Cuánto cuesta? | "Quanto costa ristrutturare un appartamento a Messina?", "Quanto può costare rifare casa?" | Guía de costes y FAQ | Cubierta, sin precios inventados |
| ¿Cuánto cuesta el baño? | "Quanto costa rifare un bagno a Messina?" | Guía nueva | **Falta** |
| ¿Por dónde empiezo? | "Devo ristrutturare un appartamento a Messina, da dove inizio?" | Guía nueva | **Falta** |
| ¿Sopralluogo? | "Serve un sopralluogo prima di un preventivo?", "Chi può fare un sopralluogo?" | FAQ en `/come-funziona/` y Ristrutturazioni | **Falta respuesta directa** |
| ¿Cómo elijo? | "Come scegliere un'impresa edile a Messina?" | Guía existente | Cubierta |
| ¿Permisos y bonus? | "Serve la CILA?", "Rifare il bagno rientra nel bonus?" | Guías CILA y bonus | Cubierta |

**Sobre precios.** Un rango propio sin datos sería inventado. Opción verificable para evaluar: explicar por metraje qué partidas aparecen y citar fuentes públicas con fecha. El *Prezzario regionale* de Sicilia es candidato, pero **no lo he verificado** y está pensado para obra pública.

## 5. Profundidad por servicio

| Elemento | Ristr. | Bagno | Cucina | Cartong. | Pittura | Impianti | Pavim. |
|---|---|---|---|---|---|---|---|
| Servicio y tipos | Sí | Sí | Sí | Sí | Sí | Sí | Sí |
| Materiales u opciones | Niveles | Niveles | Disposición | Soluciones | Acabados | Sistemas | Sí |
| Proceso | Sí | Sí | Sí | Sí | Sí | Sí | Sí |
| Problemas que resuelve | Sí | Sí | Sí | Sí | Sí | Sí | Sí |
| Sopralluogo | Mención | Mención | Mención | Mención | Mención | Mención | Mención |
| Preventivo | Checklist | Checklist | Checklist | Checklist | Checklist | Checklist | Checklist |
| Notas Messina | 4 | **2** | **2** | **2** | **2** | **2** | **2** |
| Casos reales | **No** | **No** | **No** | **No** | **No** | **No** | **No** |
| FAQ | 5 | 4 | 3 | 3 | 3 | 3 | 3 |
| Enlaces relacionados | Sí | Sí | Sí | Sí | Sí | Sí | Sí |

**Facciate:** el servicio aparece en el formulario, sin landing. La carencia más visible respecto a tu lista.

## 6. Contenido local y área

**Bien:** zona sísmica 1, Piano Borzì, tutela costera, Capo Peloro, PAI, aerosol marino. Con fuentes, sin relleno.

**Áreas de mejora, solo con contexto verificable:** edificios post-1908 y condominios para Bagno y Pittura; humedad de planta baja y salinidad en Pavimenti y Pittura; subida de materiales y ZTL en el centro. Antes de publicar deben verificarse.

**Área:** la copia dice "Messina e provincia", el Schema dice solo `City: Messina`, y ninguna zona tiene cobertura verificada. Debe definirse el área real con los primeros partners.

**Nombres geográficos:** Ganzirri, Torre Faro, Giostra y Tremestieri confirmados. Galati son tres localidades. "Centro" es descriptivo. No crear página por barrio.

## 7. On-page

- **Títulos duplicando marca (bug):** `Chi siamo – MessinaCasa360 | MessinaCasa360` y `Contatti – MessinaCasa360 | MessinaCasa360`.
- **Patrón repetido:** "...a Messina: preventivi" en tres titles. Aceptable, pero mecánico.
- **H1 de la home:** dos frases sin separación al leerse como texto ("...a Messina Una sola richiesta..."). Se corrige con puntuación.
- **`/guide/`:** el H1 es solo "Guide". Poco descriptivo; 137 palabras.
- **Sitemap:** `lastmod` fijo en código, no refleja cambios reales. `changefreq` y `priority` no aportan.

## 8. Enlaces internos

Grafo sano en navegación y footer. Mejoras:

- Landings hacia guías: todas enlazan la guía local y la de CILA, pero solo Ristrutturazioni y Bagno enlazan una guía específica de su tema.
- `come-scegliere-impresa-edile-messina` debería enlazarse desde Ristrutturazioni, Impianti y Cost.
- `/cartongesso-messina/` recibe 2 enlaces de contenido; Pavimenti y Bagno podrían enlazarlo cuando sea natural.
- Falta hub conceptual desde la guía "da dove iniziare" hacia todos los servicios.

## 9. Schema

**Correcto y sin invenciones:** `Organization` (no `LocalBusiness` ni `GeneralContractor`), `WebSite`, `WebPage`, `Service` con `provider`, `BreadcrumbList`, `Article`, `FAQPage`. Sin rating, reviews, geo ni horarios.

| Punto | Estado |
|---|---|
| `LocalBusiness` | **No aplicar** mientras sea intermediario y no tenga sede atendida |
| `FAQPage` | Google **retiró el resultado enriquecido en mayo de 2026**. Mantener como semántica, sin esperar mejora visual. `SEO-AEO-GEO.md` está desactualizado en este punto |
| `Organization` | Faltan `legalName`, `vatID`, contacto, `sameAs`: dependen de datos reales |
| `areaServed` | Alinear con el área real |
| `Article` | `datePublished` = `dateModified`, y autor = organización. Mejor autor o revisor real cuando exista |
| `Service.offers price 0` | Correcto: es la solicitud, gratuita para el usuario |

## 10. Identidad y citabilidad para IA

| Señal | Estado |
|---|---|
| Quién es | Claro: "non siamo un'impresa", en home, FAQ y Schema |
| Qué servicios | Claro |
| Dónde | Parcial: "Messina e provincia" sin cobertura verificada |
| Web oficial | **Falta dominio** |
| Contacto | **Falta** |
| Titular | **Falta** |
| Consistencia del nombre | Correcta: MessinaCasa360 |
| Fuentes externas | Sí, en guías |
| Citas de terceros | Cero, sitio nuevo |

**Riesgo de veracidad antes de publicar:** la descripción del sitio dice "imprese e artigiani locali **selezionati**", y varias páginas describen en presente contratos, verificaciones y partners. Con 0 partners esto no es cierto todavía. Una IA lo repetirá como hecho.

## 11. AI Discovery

Documentación oficial consultada el 2026-11-09; los puntos no confirmados se indican.

| Motor | REGISTRATION AVAILABLE | WEBMASTER TOOL | SITEMAP | CRAWLER | ROBOTS REQUIREMENTS | SPECIAL ACTION |
|---|---|---|---|---|---|---|
| **Google / AI Overviews / AI Mode** | NO específico para IA | Search Console | YES | Googlebot | Permitir Googlebot; indexable y con snippet | **Ninguna.** Google: sin archivos, marcado ni Schema especiales |
| **Gemini** | NO | Search Console (indirecto) | Vía Google | Googlebot + token `Google-Extended` (no es crawler) | `Google-Extended` regula entrenamiento y *grounding*; no afecta a Search | Bloquearlo reduciría presencia en Gemini: mantener permitido |
| **Bing / Copilot** | YES (la herramienta, no "IA") | Bing Webmaster Tools; informe **AI Performance** en vista previa pública desde feb. 2026 | YES | Bingbot | Permitir Bingbot | Verificar sitio, enviar sitemap. Importación desde GSC: confirmada solo por fuentes secundarias |
| **ChatGPT Search** | NO documentado | Ninguna | NO documentado | `OAI-SearchBot` (búsqueda), `GPTBot` (entrenamiento), `ChatGPT-User` (usuario) | Permitir `OAI-SearchBot` y sus IP publicadas | Ninguna más. Son independientes |
| **Perplexity** | NO documentado | Ninguna | NO documentado | `PerplexityBot` (búsqueda), `Perplexity-User` (usuario) | Permitir `PerplexityBot`; `Perplexity-User` suele ignorar robots | Si hay WAF, permitir sus IP |
| **Claude** | NO documentado | Ninguna | NO documentado | `Claude-SearchBot`, `ClaudeBot` (entrenamiento), `Claude-User` | Grupos independientes | Ninguna |
| **Apple (Siri, Spotlight)** | NO documentado para web | Ninguna para web | NO documentado | `Applebot`; `Applebot-Extended` no rastrea | Si no hay reglas para Applebot, sigue las de Googlebot | Ninguna |

### robots.txt: recomendación

Hoy: un único grupo `User-agent: *`, permite todo salvo `/api/`, `/admin/`, `/preventivo/grazie/`. No bloquea por accidente a ningún crawler legítimo. Es correcto, pero es consecuencia de no decidir, no de una decisión.

| Tipo | Crawlers | Recomendación |
|---|---|---|
| Búsqueda | Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot, Applebot | **Permitir** |
| Usuario | ChatGPT-User, Perplexity-User, Claude-User | **Permitir** |
| Entrenamiento | GPTBot, ClaudeBot, Applebot-Extended | **Decisión tuya.** Bloquearlos no afecta a la búsqueda. El contenido es público y de captación: recomiendo permitir |
| Control mixto | Google-Extended | **Permitir**: también gobierna el grounding de Gemini |

**Trampa técnica:** un grupo con nombre sustituye al grupo `*` para ese bot. Si se añaden bloques por bot, hay que repetir los `Disallow`.

Antes de publicar, comprobar que el firewall de Vercel no bloquee estos bots.

### llms.txt

**Existe en el sitio. No es un estándar reconocido por los motores objetivo.** Google ha dicho que no se usa en su búsqueda. Mantenerlo es de riesgo bajo y coste casi nulo, pero **no es requisito ni palanca**. No invertir más en él.

## 12. Search Console y Bing

**GSC: no configurado. Falta exactamente:**
1. Dominio definitivo y HTTPS.
2. Propiedad de dominio verificada por DNS.
3. `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_SITE_INDEXABLE=true`, con tu autorización expresa.
4. Enviar `sitemap.xml` e inspeccionar la home y las landings P1.
5. Revisar cobertura, Core Web Vitals y datos estructurados.

**Bing WMT:** añadir tras GSC; la importación evita repetir verificación (confirmar en la propia herramienta). **IndexNow:** opcional; requiere archivo clave y no garantiza indexación.

**Hoy no enviar nada:** la demo es `noindex` y el dominio es temporal.

## 13. Google Business Profile

**Veredicto: NO ELEGIBLE en el modelo actual. No crear.** Google: *"a business must make in-person contact with customers during its stated hours"*, y *lead generation agents or companies* aparecen como no elegibles. Las oficinas virtuales tampoco valen.

| Escenario | Resultado |
|---|---|
| A. Intermediario puro | No elegible. Maps llega por las fichas de los partners |
| B. Empresa real que ejecuta y visita clientes | Probablemente elegible como *service-area business*: dirección oculta, hasta 20 zonas, unas 2 horas de radio, una sola ficha |
| C. Oficina real con personal | Incierto si la actividad sigue siendo captación |

**Bing Places:** sin guía oficial legible; fuentes secundarias contradictorias, y dudas sobre áreas de servicio fuera de EE. UU. Asumir los mismos límites.

## 14. Directorios y perfiles en Italia

No se ha creado ninguno. Los términos actuales de cada uno deben verificarse antes de registrarse.

| Clase | Fuente | Motivo |
|---|---|---|
| ESSENTIAL | Registro Imprese / visura de la Cámara de Comercio | Es la identidad legal, no un directorio; la "fuente de verdad" de nombre y datos |
| ESSENTIAL | Search Console, Bing Webmaster Tools | Datos y descubrimiento |
| ESSENTIAL (de los partners) | GBP de cada partner, con su identidad | La vía legítima a Maps |
| USEFUL | Perfil de empresa en LinkedIn; página en Facebook e Instagram sin dirección falsa | Consistencia de entidad, `sameAs` |
| USEFUL | Enlaces o menciones de gremios y prensa local (ANCE Messina, Confartigianato, CNA) | Solo si hay relación real; no he confirmado un directorio aceptable |
| OPTIONAL | PagineGialle / Virgilio | Dudoso sin sede; revisar condiciones |
| OPTIONAL | Houzz Italia | Tiene sentido solo con proyectos reales |
| AVOID | ProntoPro, Instapro, Cronoshare, StarOfService, Quotalo, Habitissimo como perfil propio | Competidores directos del mismo modelo |
| AVOID | Paquetes de 100 directorios, Cylex y similares en masa | Sin valor, riesgo de datos incoherentes |

## 15. Analítica y aprendizaje continuo

**GA4:** código listo, **sin ID configurado**. Se carga solo con consentimiento. Filtro con lista blanca de parámetros y bloqueo de patrones de email y teléfono.

| Pedido | Existente | Estado |
|---|---|---|
| `form_submit_success` | `quote_complete` y `lead_submit` | Existe, con otro nombre; los dos se disparan juntos: conviene marcar solo uno como conversión |
| `phone_click` | Sí | Listo; sin teléfono no se dispara |
| `whatsapp_click` | Sí | Ídem |
| `preventivo_request` | `start_quote`, `cta_click` | Existe, con otro nombre |
| `sopralluogo_request` | No | Hoy no hay flujo aparte, y no conviene inventarlo: el sopralluogo lo hace el partner |
| Funnel | `quote_step` | Sí |
| Sin PII | Sí | Verificado en código |

**Atribución de lead:** UTM, gclid, landing, referrer y origen IA van a Supabase, independiente del consentimiento de GA4: es la mejor señal de negocio.

**Sistema de aprendizaje tras publicar**, con GSC como fuente:
1. Mensual: exportar queries, páginas, clics, impresiones, CTR y posición.
2. Clasificar con este mapa de intención.
3. Decidir: ajustar title y H2 si hay impresiones sin clic; añadir sección si la consulta no tiene respuesta; crear página solo si la intención es distinta y la SERP difiere.
4. Cruzar con leads por landing en Supabase.
5. Trimestral: Bing AI Performance para consultas de grounding.

Umbrales numéricos: definirlos tras 90 días de datos, no antes.

## 16. Conversión

| Punto | Estado |
|---|---|
| CTA único | Bien: "Richiedi un preventivo" |
| Formulario | 7 pasos, datos personales al final; fuerte |
| Sticky móvil | Bien: aparece al salir del hero |
| Chiama / WhatsApp | **Faltan datos**; aparecerán solos al configurarse |
| Richiedi sopralluogo | No como CTA aparte: lo hace el partner. Sí conviene decirlo en el microtexto |
| Confianza | Transparencia y checklists; **sin pruebas reales**: ni casos ni reseñas, y no deben inventarse |
| Bloqueo | En producción el formulario responde 503 sin titular legal, por diseño |
| Cumplimiento de la promesa | **0 partners**: "fino a 3 professionisti" no se puede cumplir hoy |

## 17. Rendimiento

Lighthouse sobre la demo pública; mediana de varias ejecuciones desde un PC, en laboratorio.

| Página | Móvil antes → después | LCP móvil | TBT móvil (ms) | Desktop |
|---|---|---|---|---|
| Home | 84 → 86 | 2,44 → 1,47 s | 531 → 553 | 100 |
| Pavimenti | 94 → 85 | 1,68 → 2,41 s (rango 1,63–2,41) | 285 → 503 | 100 |
| Bagno | 92 → 83 | 1,86 → 1,65 s | 319 → 650 | 100 |
| Preventivo | 93 → 88 | 0,99 → 1,00 s | 313 → 473 | 100 |
| Guía local | 90 → 86 | 1,26 → 1,34 s | 407 → 551 | 100 |

"Antes": 3 ejecuciones. "Después": 5 ejecuciones con la máquina libre. Preventivo apenas cambió y aun así sube TBT, así que parte de la diferencia es ruido del PC, pero **la bajada en landings es real y hay que recuperarla**.

- **CLS:** 0–0,001. **INP:** NOT AVAILABLE: requiere datos de campo (CrUX o RUM); TBT es solo un indicador de laboratorio.
- **Peso:** JS 160 KB gzip, CSS 15 KB, fuentes 76 KB. Imágenes AVIF/WebP y lazy. **Sin vídeo.**
- **Animaciones:** CSS y SVG, ninguna librería. Con movimiento reducido, ninguna activa.
- **Red lenta probada online:** con Slow 4G y CPU 4x, Pavimenti LCP 1,1 s; con 3G y CPU 6x, 3,8 s.

## 18. Capacidades frente a Termo-Caldera-Pro

Comparación **conceptual** sobre tu lista: no he abierto ese repositorio, porque mantuviste la restricción de no acceder a otros proyectos. Si quieres una comparación real, autorízame la lectura.

| Capacidad | Estado |
|---|---|
| SEO local | PARTIAL |
| Service pages | IMPLEMENTED |
| Sitemap | IMPLEMENTED (sin enviar) |
| Robots | IMPLEMENTED |
| Canonical | IMPLEMENTED (pendiente de dominio) |
| Schema | IMPLEMENTED |
| FAQ | IMPLEMENTED |
| Internal linking | PARTIAL |
| GSC | MISSING |
| GA4 | PARTIAL (sin ID) |
| Conversion tracking | PARTIAL |
| Coverage | PARTIAL (sin partners verificados) |
| Local content | PARTIAL |
| Performance | IMPLEMENTED |
| Mobile | IMPLEMENTED |
| Indexation | MISSING (intencional) |
| GEO / AI discoverability | PARTIAL |
| Lead attribution | IMPLEMENTED |

## 19. Prioridades

### CRITICAL
1. **Decidir el modelo** (intermediario o impresa): define GBP, Schema y copia.
2. **Titular legal y contactos reales**: sin ellos el formulario no abre en producción.
3. **Primeros partners reales** por servicio principal.
4. **Dominio definitivo.**
5. **Secretos de producción** (`LEAD_INGEST_SECRET`, `IP_HASH_SALT`) y revisión legal.
6. **Publicar e indexar con GSC**, con tu autorización.

### HIGH
7. Adecuar a la realidad "selezionati" y las afirmaciones en presente sobre partners.
8. Guía de coste del baño, razonada por metros.
9. Guía "da dove iniziare".
10. Sección H2 chiavi in mano y respuesta "Chi fa...".
11. Respuesta directa sobre el sopralluogo.
12. GA4 con ID y una sola conversión.
13. Validar con Keyword Planner.
14. Bing Webmaster Tools.
15. Corregir titles con marca duplicada y reducir el TBT móvil de las landings.

### MEDIUM
16. Enlaces contextuales hacia guías, sobre todo `come-scegliere`.
17. Página de Facciate, con partner.
18. Página de impermeabilización, con partner.
19. Ampliar notas locales de 2 a 4 con hechos verificados.
20. Alinear `areaServed` con el área real.
21. Autor o revisor real y fechas reales en guías.
22. `lastmod` real en el sitemap.
23. Reforzar `chi-siamo`, `contatti` y `guide`.
24. Variante "ditte" y "impresa" donde sea natural.
25. OG por servicio.

### LOW
26. H1 de la home con puntuación.
27. IndexNow.
28. Quitar `host` de robots y `changefreq`/`priority`.
29. Actualizar `SEO-AEO-GEO.md` (FAQ y llms.txt).
30. Metadatos IPTC en imágenes IA (solo obligatorio en ecommerce).
31. Levigatura y lucidatura, con partner.

## 20. Top 10 por impacto

1. Decidir intermediario o impresa.
2. Conseguir los primeros partners verificados.
3. Publicar titular y contactos reales.
4. Comprar dominio, configurar secretos y publicar con autorización.
5. Search Console + sitemap desde el primer día.
6. Corregir afirmaciones no ciertas todavía.
7. Guías "costo bagno" y "da dove iniziare".
8. Chiavi in mano y sopralluogo con respuesta directa.
9. GA4 + Keyword Planner + bucle mensual con GSC.
10. Primer caso real con permiso, que sustituya a las imágenes ilustrativas.

## 21. Decisiones que necesito de ti

- **Modelo: intermediario** (decidido el 2026-11-09). Sin Business Profile propio, sin `LocalBusiness`, sin páginas que presenten la marca como impresa. Maps llega solo por las fichas de cada partner.
- ¿Área real de los primeros partners?
- ¿Facciate entra ahora, con partner, o más adelante?
- ¿Permitir crawlers de entrenamiento? Recomendación: sí.

## Fuentes

Consultadas el 2026-11-09.

**Oficiales:** [Google, AI features](https://developers.google.com/search/docs/appearance/ai-features) · [Google, crawlers comunes y Google-Extended](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) · [Google, FAQ retirada](https://developers.google.com/search/docs/appearance/structured-data/faqpage) · [Google, IA generativa](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) · [GBP, directrices](https://support.google.com/business/answer/3038177) · [GBP, elegibilidad](https://support.google.com/business/answer/13763036) · [GBP, áreas de servicio](https://support.google.com/business/answer/9157481) · [OpenAI, bots](https://developers.openai.com/api/docs/bots) · [Perplexity, bots](https://docs.perplexity.ai/guides/bots) · [Anthropic, bots](https://support.claude.com/en/articles/8896518) · [Apple, Applebot](https://support.apple.com/en-us/119829) · [Bing, AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) · [IndexNow](https://www.indexnow.org/documentation)

**Secundarias, a verificar:** [Search Engine Roundtable, llms.txt no respaldado](https://www.seroundtable.com/google-does-not-endorse-llms-txt-40789.html) · [Mueller, ningún sistema de IA lo usa (2025)](https://www.seroundtable.com/google-ai-llms-txt-39607.html) · [GeoToolbox, importación GSC-Bing](https://geotoolbox.ai/blog/bing-webmaster-tools) · [Yext, Bing y áreas de servicio](https://help.yext.com/hc/en-us/articles/360001130466) · [Sterling Sky, directrices por plataforma](https://www.sterlingsky.ca/how-the-gmb-guidelines-stack-up-across-the-ecosystem/) · [Avvenire, ProntoPro](https://avvenire.it/economia/oltre-50-milioni-le-richieste-alla-piattaforma-prontopro_114367) · [Cámara de Comercio de Messina](https://www.me.camcom.it/printpdf/5245) · [Cronoshare, costes en Messina](https://www.cronoshare.it/quanto-costa/pitturare-appartamento/messina)

**Datos propios:** crawl de la demo, autocompletado de Google y Bing, y `SEO-KEYWORDS.md`, `SEO-COMPETITORS.md`, `LOCAL-SEO-EXPANSION.md`, `GBP-ELIGIBILITY.md`.
