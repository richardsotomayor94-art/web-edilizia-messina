# Preparación de lanzamiento: MessinaCasa360

Estado a 2026-11-13. Rama `rebuild/master-2026-11`, demo `https://messinacasa360-demo.vercel.app` (proyecto Vercel `messinacasa360-demo`, siempre `noindex`).

Nada de lo que sigue se ha ejecutado en producción: `main`, producción, indexación, Search Console, GBP y Ads siguen sin tocar. La compra del dominio, los gastos y la publicación esperan la indicación del propietario.

## 1. Datos que debe facilitar el propietario

Todos van en **variables de entorno** del proyecto de producción de Vercel. Ningún archivo del código se edita a mano. Las reglas de validación están en `src/lib/launch-rules.ts` y las aplica `npm run launch:check`.

| Variable | Dato | Validación automática | Obligatorio |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Dominio definitivo, solo origen: `https://www.dominio.it` | HTTPS, sin ruta, no `*.vercel.app`, no `.example` | Sí |
| `NEXT_PUBLIC_LEGAL_OWNER_NAME` | Razón social del titular | Presente, no de prueba | Sí |
| `NEXT_PUBLIC_LEGAL_VAT` | Partita IVA | 11 cifras con dígito de control | Sí |
| `NEXT_PUBLIC_LEGAL_ADDRESS` | Sede legal | Presente, no de prueba | Sí |
| `NEXT_PUBLIC_LEGAL_PEC` | PEC | Email válido | Sí |
| `NEXT_PUBLIC_PRIVACY_EMAIL` | Email para privacidad | Email válido | Sí |
| `NEXT_PUBLIC_CONTACT_PHONE` | Teléfono comercial | `+39` y formato italiano, no `+39 000…` | Al menos uno de los tres canales |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp, solo cifras con 39 | Formato italiano | Al menos uno de los tres canales |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email comercial | Email válido, no `.example` | Al menos uno de los tres canales |
| `NEXT_PUBLIC_SUPABASE_URL` · `…_PUBLISHABLE_KEY` | Base de datos de producción | Presentes | Sí |
| `LEAD_INGEST_SECRET` | Secreto de alta (≥ 32 caracteres, *sensitive*) | Longitud | Sí |
| `IP_HASH_SALT` | Sal del hash de IP (≥ 16, *sensitive*) | Longitud | Sí |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`, o `LEAD_WEBHOOK_URL` | Canal de aviso de nuevas solicitudes | Al menos uno | Sí |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` | Antispam Cloudflare | Ambas | Sí |
| `NEXT_PUBLIC_GA4_ID` | Analítica | — | Recomendado |
| `NEXT_PUBLIC_SITE_INDEXABLE=true` | Autorización expresa para indexar | — | Solo al lanzar |
| `NEXT_PUBLIC_DEMO_MODE` | Debe quedar vacío o `false` | — | Sí |

**En la demo** faltan todos estos valores a propósito. Para revisar el diseño se muestran contactos **sintéticos** (`+39 000 000 0000`, WhatsApp `390000000000`, `contatti@messinacasa360.example`):
- número no marcable y dominio reservado (RFC 2606);
- distintivo «Demo» en pantalla;
- los botones muestran un aviso de prueba y nunca abren `tel:`, `wa.me` ni `mailto:`;
- nunca entran en JSON-LD (`site.contact.demo`);
- solo existen con `NEXT_PUBLIC_DEMO_MODE=true` y se ocultan con `NEXT_PUBLIC_DEMO_CONTACTS=false`.

## 2. Control automático de lanzamiento

```
npm run launch:check                                         # configuración actual
npm run launch:check -- --env .env.production.local          # configuración de un archivo
npm run launch:check -- --url https://www.dominio.it --strict    # web publicada, sale con error si hay bloqueos
npm run launch:check -- --url https://messinacasa360-demo.vercel.app --expect demo
```

**Configuración.** Bloquea si:
- falta el dominio o es `*.vercel.app` o HTTP;
- está activo el modo demo o la indexación está desactivada;
- falta algún dato legal, no es válido o es de prueba (incluida la P.IVA);
- no hay ningún canal de contacto, o alguno es de prueba;
- falta la base de datos, el secreto, la sal, el canal de aviso o el antispam;
- falta alguna de las 6 verificaciones end-to-end de `launch/verifications.json`.

**Web publicada (`--url`).** Comprueba:
- estado HTTP de las páginas clave;
- `noindex` en cabecera y meta;
- canonical en el dominio;
- referencias a `*.vercel.app` y valores de prueba en el HTML o el JSON-LD;
- `Sitemap:` en robots y que todas las URL del sitemap sean del dominio;
- redirección permanente de `http` y de www/no-www.

En modo `--expect demo` verifica lo contrario: `noindex` en todas las páginas y ninguna sitemap declarada.

**Estado al 2026-11-13:**
- Configuración: **19 bloqueos** (dominio, indexación, 5 datos legales, contactos, base de datos, secreto, sal, aviso, antispam y las 6 verificaciones) y 3 avisos.
- Demo: **0 bloqueos**, «DEMO PROTETTA».

El control no interviene en `npm run build`: la demo se sigue desarrollando sin restricciones. Las mismas reglas impiden además en el código que el sitio sea indexable en modo demo, sin dominio declarado o con un dominio de ejemplo (`site.indexable`).

## 3. Cambio al dominio definitivo

Todo depende de `NEXT_PUBLIC_SITE_URL`: canonical, sitemap, robots, Open Graph, Twitter, JSON-LD (`@id`), `llms.txt` y el redireccionamiento de `src/proxy.ts`. No hay dominios escritos en el código.

1. **Decisión del propietario:** comprar el dominio (recomendado el `.it` y un `.com` defensivo) y elegir entre `www` y raíz como canónico.
2. **Vercel:** en el proyecto de producción, Settings → Domains → añadir ambos hosts y marcar el no canónico con *Redirect 308*.
3. **DNS:** registros A y CNAME que indique Vercel, o sus nameservers. HTTPS se emite solo; comprobar el certificado en Domains.
4. **Variables:** las de la tabla 1 en *Production*, con `NEXT_PUBLIC_SITE_INDEXABLE=true` solo con autorización expresa. Redeploy.
5. **Migraciones:** ✅ **aplicadas el 2026-11-13** al proyecto Supabase `etqifeyzwpetpqtluwfs`:
   - `20261109000001`: Impermeabilizzazioni, Cappotto y Facciate en el catálogo;
   - `20261113000001`: máximo 3 profesionales;
   - `20261113000002`: bloqueo de duplicados concurrentes y estado del aviso.

   Verificadas con una prueba dentro de una transacción anulada, sin dejar datos:
   - los servicios nuevos se aceptan;
   - la 4ª asignación se bloquea y la reactivación que llevaría a 4 también;
   - una asignación anulada libera el puesto;
   - sin el secreto se rechazan tanto el alta como el aviso.

   `20261113000003_db_advisor_fixes` (3 índices y una política de `admin_users` más eficiente, mismo comportamiento): **aplicada el 2026-11-13** con aprobación del propietario. Quedan solo avisos informativos: índices sin uso, normal con la base vacía, y varias políticas de lectura en las mismas tablas, que no merecen cambio a este volumen.
6. **Verificaciones end-to-end** con solicitudes de prueba identificadas: anotarlas en `launch/verifications.json` y borrar después los datos de prueba.
7. **Control final:** `npm run launch:check -- --url https://<dominio> --strict` debe dar «PRONTO PER IL LANCIO».
8. **Search Console:**
   - propiedad *Dominio* verificada por DNS TXT;
   - enviar `https://<dominio>/sitemap.xml`;
   - inspeccionar la home y las 10 landings;
   - pedir indexación manual solo con autorización.
9. **Bing Webmaster Tools:** importar desde Search Console y enviar el sitemap.
10. **Google Business Profile:** solo si existe un negocio real elegible (ver `GBP-ELIGIBILITY.md`).
11. **Fuera de búsqueda:** la demo `.vercel.app` sigue con `noindex` y, en producción, `proxy.ts` redirige con 308 cualquier host distinto del canónico.

## 4. Estado de las integraciones

Se distinguen dos tipos de comprobación:
- **Simulada:** prueba automática con la base de datos sustituida (`tests/api-intake.test.ts`).
- **Verificada:** comprobada contra el servicio real. Ninguna lo está todavía.

| Integración | Estado | Qué falta |
|---|---|---|
| Formulario de clientes → `/api/leads` | **Simulada**: validación por campo, origen, tamaño, JSON, honeypot, modo demo, sin configurar, captcha, límite de envíos, error de base de datos, duplicados sin segunda notificación, IP nunca en claro | Envío real a Supabase de producción |
| Servicio desde cada landing (10) | **Simulada en navegador**: 20 de 20 recorridos (hero y cierre) envían el servicio correcto, con la petición interceptada | — |
| Formulario de partners → `/api/partners` | **Simulada**: nuevos servicios, honeypot, tiempo mínimo, validación, origen, límite | Envío real |
| Fotos adjuntas | Implementado, **sin verificar** (necesita Storage real) | Subida real y consulta en admin |
| Aviso de nuevas solicitudes (Telegram / webhook) | Implementado con timeout de 5 s. El resultado se guarda en el lead y, si nadie lo recibe, el panel lo marca y permite «Reinvia notifica». **Sin verificar** | Tokens, migración `20261113000002` y una prueba real |
| Duplicados concurrentes | Bloqueo por teléfono y servicio en `submit_lead`, **aplicado** el 2026-11-13 | — |
| Avisos de seguridad de Supabase | Las funciones de alta ejecutables con la clave pública son intencionadas (protegidas por el secreto, verificado). Desactivada la protección contra contraseñas filtradas de Auth | El propietario: Supabase → Authentication → contraseñas → activar la protección contra contraseñas filtradas |
| Antispam Turnstile | Implementado, **sin claves** | Claves de Cloudflare |
| Analítica GA4 con consentimiento | Implementado, **sin ID** | ID de medición |
| Límite de 3 profesionales | Panel de administración (comprobación antes de asignar) y trigger en base de datos (**migración escrita, no aplicada**) | Aplicar la migración |
| Tiempo de espera y reintento | Clientes y partners: corte a los 20 s con mensaje; reintentar es seguro porque la base marca como duplicado el mismo teléfono y servicio en 72 h | — |
| Supabase `etqifeyzwpetpqtluwfs` | **Sin acceso autorizado para pruebas en esta fase**: no se ha escrito nada | Autorización o un entorno de prueba aparte |

**Privacidad y seguridad comprobadas en código:**
- consentimiento obligatorio y versionado;
- IP solo como hash con sal;
- intake bloqueado en producción sin titular, dirección y email de privacidad (art. 13 RGPD);
- CSRF por origen y límite de tamaño;
- límite de 5 solicitudes por IP y hora y de 300 globales por hora;
- secretos solo en variables *sensitive*.

## 5. Afirmaciones y fuentes (consulta del 2026-11-13)

Verificadas por un agente con fuentes oficiales cuando fue posible. El texto del sitio se ajustó a la redacción de la norma.

| Afirmación | Veredicto | Fuente |
|---|---|---|
| Art. 1122, 1126, 1136, 1120 c.c. | Confirmada (texto vía Brocardi; Normattiva no devolvió el articulado) | brocardi.it |
| Art. 1590 c.c. | Reformulada: «uso conforme al contratto» | avvocato.it, filodiritto (secundarias) |
| Cass. SU 9449/2016 | Reformulada: responden usuario y condominio; reparto interno según art. 1126 | Comentarios; sentencia oficial no abierta |
| DM 37/2008 art. 7 c. 6 | Reformulada sin fecha concreta | normattiva.it |
| DM 2 marzo 2018 (Glossario) | Reformulada: «riparazione, integrazione, rinnovamento e messa a norma» | Allegato 1, voz 17 |
| L.R. Sicilia 16/2016 | Confirmada; se añadió la L.R. 2/2022 | regione.sicilia.it, texto coordinado de feb. 2025 |
| Messina zona sísmica 1 | Confirmada | DGR 81/2022, DDG 64/2022 |
| Messina zona climática B, 707 GG | Confirmada solo por fuentes secundarias | tuttitalia.it |
| Bonus facciate hasta 2022 | Confirmada | Varias secundarias |
| Bonus ristrutturazione en partes comunes | Confirmada | Guía de la AdE, feb. 2026 |
| Bonus mobili ligado a recupero edilizio | Confirmada | AdE |
| F-gas | Pendiente para la landing de climatización: DPR 146/2018 «en actualización» con el Reg. UE 2024/573 | mase.gov.it |

**Promesas comerciales:**
- «Richiesta gratuita» y «senza impegno»: respaldadas, porque el formulario no cobra.
- «Fino a 3 professionisti»: ahora la impone el código (panel y trigger). Depende de tener partners reales.
- «Verifichiamo la richiesta»: proceso manual en el panel. Exige que alguien la revise.
- «Professionisti locali»: depende de la red de partners. El propietario dice tenerla, pero no figura aún en la base de datos.

Las ilustraciones están marcadas con «Immagini illustrative: non raffigurano lavori eseguiti tramite questo servizio».

**Climatización:** sin página. Solo se creará si se confirma un partner con certificación F-gas y la capacidad real de derivar el servicio.

## 6. Valoraciones internas

Las notas de los informes anteriores (por ejemplo, «Local SEO 70/100») son **valoraciones internas del equipo**, no puntuaciones de Google, de Lighthouse ni de ninguna herramienta externa. Sirven para priorizar y no deben citarse como métrica.

## 7. Solo medible después del lanzamiento

- Indexación y cobertura (Search Console).
- Consultas reales, impresiones, CTR y posición por landing (Search Console, a partir de unos 28 días).
- Canibalización real entre landings y guías (página por consulta en Search Console, a los 90 días).
- Core Web Vitals de campo, incluido INP (CrUX, solo con tráfico suficiente).
- Conversiones reales y tasa de formulario completado (GA4 con consentimiento).
- Llamadas y WhatsApp (eventos `phone_click` y `whatsapp_click`, solo con canales reales).
- Apariciones y citas en buscadores con IA. No existe una herramienta oficial que lo cubra entero; el panel AI Performance de Bing está en vista previa.
- Demanda real de climatización y cappotto en Messina.

## 8. Recuperación del despliegue anterior

- **Demo (`messinacasa360-demo`):** cada versión es un deployment inmutable. Para volver atrás:
  - Vercel → Deployments → elegir el deployment bueno → *Promote* (o *Instant Rollback* en el de producción del proyecto);
  - o crear un deployment desde un commit anterior de `rebuild/master-2026-11`.
- **Commits de referencia de la demo:**

  | Commit | Contenido |
  |---|---|
  | `0c7bd57` | Optimización SEO y Cappotto |
  | `2de368c` | Cierres por servicio |
  | `dd115cd` | Fuentes revertidas |

- **Código:** cada cambio es un commit; se deshace con `git revert <commit>`, sin reescribir la historia.
- **Producción:** al lanzar, anotar el ID del deployment anterior antes de promover. Si algo falla, *Instant Rollback* a ese deployment y, si el problema es de indexación, poner `NEXT_PUBLIC_SITE_INDEXABLE=false` y redeploy.
- **Base de datos:** las migraciones nuevas solo añaden (insert con `on conflict do nothing`, trigger con `drop trigger if exists`). Para revertir el límite de 3: `drop trigger lead_assignments_max_three on public.lead_assignments;`.

## 9. Pruebas manuales pendientes

- iPhone físico (Safari): PENDING MANUAL TEST.
- Lector de pantalla real (VoiceOver / NVDA): PENDING MANUAL TEST.
- Panel de accesibilidad: **no existe en este proyecto**. Accesibilidad cubierta con axe (0 violaciones), foco, teclado y `prefers-reduced-motion`.
