# Servicios especializados — estado, datos pendientes y activación (2026-11-15)

> **Actualización 2026-11-16 (integración de las dos líneas):**
> - **Nombre acordado:** «Sabbiatura e pulizia delle superfici» en todo el sitio. En la base de datos, con la migración `20261116000002`, preparada y **sin aplicar** (solo cambia `services.name`; se puede ejecutar varias veces sin efecto).
> - **Técnica confirmada por ti:** arena proyectada con aire comprimido a alta presión, con máquina de depósito. Están en `BLASTING` y en la landing. Siguen pendientes: modelo del equipo, abrasivo comercial y presión (sección 4 de la ficha).
> - **Formulario:** nuevo paso «Com'è adesso?» (estado y problema), con «Non lo so». Se valida en el servidor, se guarda en `details.condition` y se ve en el área admin como «Condizioni».
> - **Reconciliación de categorías:** `docs/RICONCILIAZIONE-CATEGORIE-2026-11-16.md`. Ningún id ni slug cambia, así que no hacen falta redirecciones.
> - **La revisión legal de sgomberi** se lleva aparte y no forma parte de este trabajo.

> **Actualización 2026-11-16:** las «altri servizi» son ahora nueve, todas en estado «in preparazione»:
> - las dos de ayer (Restauro, pulizia e recupero; Sabbiatura, ahora con el nombre «Sabbiatura»);
> - siete nuevas: Microsabbiatura, Traslochi, Sgomberi e smaltimento, Giardinaggio, Restauro tecnico, Restauro conservativo, Risanamento e conservazione.
>
> Dónde está cada cosa:
> - **Catálogo único y grupos** (home, menú, footer, futuro chatbot): `src/config/service-catalog.ts`.
> - **Contenidos de las nuevas landings:** `src/config/altri-servizi-pages.ts`.
> - **Matriz SEO de todas las landings:** `docs/MATRICE-LANDING-2026-11-16.md`.
> - **Análisis de canibalización del grupo restauro:** `docs/ANALISI-RESTAURO-CANNIBALIZZAZIONE.md`.
>
> **Migración `20261116000001_altri_servizi.sql`: aplicada el 2026-11-16** con tu autorización. Añade 7 filas en `services` (25 en total). La verifiqué con `submit_lead` y el enrutado de las 8 categorías en una transacción anulada: no quedan datos de prueba ni hay avisos de seguridad nuevos.

Dos líneas nuevas, preparadas de principio a fin y **en estado «in preparazione»**:

| Línea | URL | Valor del formulario | Subcategorías en la base de datos |
|---|---|---|---|
| Restauro, pulizia e recupero | `/restauro-e-pulizia-messina/` | `restauro` | `restauro-funerario`, `restauro-pietra`, `restauro-legno`, `restauro-decorativo`, `restauro-valutazione` (clasificación manual) |
| Sabbiatura e pulizia delle superfici | `/sabbiatura-messina/` | `sabbiatura` | `sabbiatura` |

## Qué está hecho

- **Configuración central:** `src/config/specialist.ts` (estado, nombre provisional y datos de la técnica en `BLASTING`, opciones del formulario, subcategorías) y `src/config/specialist-pages.ts` (textos, FAQ, fuentes, láminas e imágenes).
- **Landings:** reutilizan el sistema de secciones de las demás. Llevan aviso «In preparazione», CTA «Richiedi un preventivo» (que abre el formulario con el servicio preseleccionado), FAQ propias y enlaces cruzados entre ellas y con Facciate y Pittura.
  - Sin precios, plazos, garantías ni disponibilidad.
  - Ninguna técnica se presenta como delicada, ecológica, sin residuos o apta para todo (lo comprueba un test).
- **Visibilidad:**
  - **Home:** sección «Servizi specialistici» (Tav. 02·S).
  - **Menú «Servizi»:** grupo propio (S1, S2) en escritorio y móvil.
  - **Footer:** grupo propio.
  - **Formulario:** dos opciones al final de la lista.
  - **Formulario de partners:** las empresas marcan subcategorías concretas, no la línea entera.
- **Formulario:** recorrido propio de 9 pasos tras elegir el servicio (10 contando la elección):
  1. objeto;
  2. material, con «Non lo so»;
  3. estado y problema («Com'è adesso?»), con «Non lo so»;
  4. intervención (limpieza, mantenimiento, reparación o restauración; en sabbiatura, superficie limpia o preparada);
  5. dimensiones y si se puede trasladar;
  6. momento del proyecto;
  7. ubicación (para tumbas: cementerio y tipo de sepultura, para el acceso; nunca datos de difuntos);
  8. fotos y descripción;
  9. contacto.

  No pide presupuesto. La confirmación dice «Richiesta di valutazione ricevuta» y explica que técnica, presupuesto y aceptación dependen del profesional.
- **Servidor:**
  - valida los detalles según la línea y fija `property_type = altro` y `square_meters = unknown`;
  - guarda la subcategoría, con lo que el enrutado `suggest_partners` funciona sin cambios;
  - las notificaciones de Telegram siguen sin datos personales;
  - en el área admin se ven los detalles y el filtro por subcategoría, y el CSV incluye `details`.
- **SEO y datos estructurados mientras esté en preparación:**
  - `noindex, follow`;
  - fuera de sitemap, `llms.txt` y catálogo JSON-LD de la home;
  - la página solo publica WebPage y Breadcrumb, sin Service ni FAQPage.
- **Imágenes:** láminas dibujadas en el estilo del sitio (`src/assets/images/d-*.jpg`, generadas con un script, sin créditos), rotuladas «Illustrazione» o «Schema illustrativo». Las bandas sobre fondo oscuro usan fotos ya existentes.
- **Pruebas (2026-11-16):**
  - 17 suites, 209 tests. Incluyen la API simulada: subcategoría guardada, `condition` en los detalles, notificación con el slug de la base de datos, rechazo sin guardar y las 6 categorías de formulario normal.
  - Recorrido completo en 390 y 1440 px para restauro, sabbiatura y microsabbiatura:
    - servicio preseleccionado desde la landing y paso «Com'è adesso?»;
    - recarga y vuelta atrás y adelante, con las elecciones conservadas;
    - primer envío fallido por red, con mensaje y datos conservados, y reintento correcto;
    - confirmación «Richiesta di valutazione ricevuta».
  - Las 8 categorías en 390 y 1440 px, y las 20 rutas antiguas del formulario.
  - En la base de datos, dentro de una transacción anulada, con datos sintéticos y empresas de prueba:
    - duplicado en 72 h y servicio inexistente rechazado;
    - adjuntos con objetos de almacenamiento simulados, sin duplicarse al repetir y con token erróneo rechazado;
    - enrutado de cada subcategoría solo a su empresa y secreto erróneo rechazado.
    - Después: 0 registros de prueba y el secreto real intacto.

## Base de datos

- **Migración `20261115000004_specialist_services`: aplicada el 2026-11-16** con tu aprobación. Incluye subcategorías, columna `details` con límite y `submit_lead` que la guarda, con los permisos sin cambios.
- Verificada con `submit_lead` y `suggest_partners` en una transacción anulada: una puerta acaba en `restauro-legno` y se propone solo al carpintero. No quedan datos de prueba ni hay avisos de seguridad nuevos.

## Pendiente de tu aprobación

- **Migración `20261116000002_nome_sabbiatura`:** cambia solo el nombre visible en la base de datos (cosmético).
- **Imágenes fotográficas** (opcional): sustituir láminas por fotos generadas consume créditos.
- **Prueba real de extremo a extremo** (formulario → base de datos → Telegram): necesita un entorno de pruebas con su propio secreto y destinatarios de prueba. Sin eso, la cadena se verifica por tramos (navegador, API simulada y base de datos en transacción anulada).

## Datos que condicionan la activación

Se recogen con `docs/SCHEDA-PROFESSIONISTI.md`, una ficha por contacto. Para pasar una línea a «attivo» hacen falta:

- **Para las dos líneas:**
  - qué subcategorías acepta cada profesional, sus exclusiones y su zona;
  - partita IVA y factura;
  - capacidad semanal;
  - autorización expresa para recibir solicitudes.
- **Restauro:**
  - si alguno figura entre las **empresas autorizadas del Comune di Messina** para trabajar en cementerios;
  - si alguno es **restauratore di beni culturali** (necesario para bienes protegidos);
  - quién limpia mármol, quién restaura madera.
- **Sabbiatura:** se rellenan los campos de `BLASTING` y se cambia `confirmed: true`. Ya confirmado: arena, aire comprimido a alta presión y máquina de depósito. Faltan:
  - marca y modelo de la máquina y del compresor;
  - nombre comercial del abrasivo, ficha técnica y ficha de seguridad (contenido de sílice cristalina);
  - presión de trabajo según el material;
  - superficies que admite y exclusiones;
  - prueba previa;
  - protección y gestión de residuos;
  - si trabaja a domicilio o en laboratorio;
  - cobertura;
  - DVR con sílice si usa abrasivos silíceos.
- **Comune di Messina, Servizio Cimiteri:**
  - texto vigente del Regolamento de polizia mortuaria (delibera 118/C/2012);
  - si la limpieza simple necesita autorización;
  - horarios, acceso de vehículos de empresa, agua y electricidad.
- **Soprintendenza BB.CC.AA. di Messina:** si el Gran Camposanto o las tumbas concretas tienen vínculo, y qué técnicas admite sobre mármol histórico.

## Requisitos encontrados (resumen; no es asesoramiento legal)

| Requisito | Tipo | Fuente | Estado |
|---|---|---|---|
| El titular de la concesión mantiene la tumba y decide las obras (DPR 285/1990, arts. 63 y 93) | Ley | normattiva.it | verificado |
| En los cementerios municipales de Messina solo trabajan empresas autorizadas; la colocación o modificación de monumentos necesita autorización | Normas del recinto | sportellotelematico.comune.messina.it | verificado (la limpieza simple no se menciona) |
| Reglamento municipal de policía mortuoria 118/C/2012 | Normas del recinto | — | texto no encontrado |
| Bienes culturales: autorización de la Soprintendenza para cualquier obra (art. 21 D.Lgs 42/2004); bienes de entes públicos con más de 70 años y autor fallecido protegidos hasta verificación (art. 12) | Ley | normattiva.it | verificado |
| Restauración de bienes protegidos reservada a restauratori di beni culturali (art. 29) | Ley / profesional | normattiva.it, dgeric.cultura.gov.it | verificado (art. 29) |
| Sicilia: competencia regional, Soprintendenza BB.CC.AA. di Messina | Ley | regione.sicilia.it | verificado parcialmente |
| Sílice cristalina respirable: trabajos con agentes cancerígenos (D.Lgs 81/2008 Allegato XLII, por el D.Lgs 44/2020) | Ley / profesional | INAIL 2024, normattiva.it | verificado en fuente secundaria |
| Residuos: abrasivo usado y residuos de limpieza clasificados (D.Lgs 152/2006); residuos cementeriales (DPR 254/2003) | Ley | normattiva.it | por verificar |
| CO₂ del hielo seco en espacios cerrados | Profesional (evaluación de riesgos) | — | sin norma específica encontrada |

## SEO y GEO: hipótesis frente a datos

- **Datos:** no hay herramientas de volumen de búsqueda. No se ha observado ningún competidor de Messina con página propia de «pulizia tombe» ni de limpieza criogénica. Los términos de uso real sí se han observado en las fuentes (*pulizia* lo usa el cliente; *pulitura*, el sector técnico).
- **Hipótesis editoriales que hay que validar con Search Console o Keyword Planner:**
  - «pulizia tombe/lapidi» es la intención más clara y estacional (2 de noviembre);
  - «restauro mobili antichi» y «sverniciatura» son intenciones distintas;
  - «sabbiatura» engloba microsabbiatura e idrosabbiatura;
  - si la técnica resulta ser hielo seco, se añaden «pulizia criogenica» y «ghiaccio secco» en H2 y FAQ, sin cambiar la URL.
- **Recomendación:**
  - no crear páginas por material ni por localidad;
  - cuando haya datos de demanda y un profesional funerario confirmado, valorar una página propia `/pulizia-tombe-messina/` con contenido suficiente.

## Cómo activar una línea

1. Rellenar la ficha con cada profesional y dar de alta las empresas con sus subcategorías (área admin, «Partner»).
2. En `src/config/specialist.ts`:
   - `SPECIALIST_STATUS.<línea> = "attivo"`;
   - para la sabbiatura, completar `BLASTING`.
3. Revisar textos y FAQ con los datos confirmados. Quitar «Il servizio è già attivo?» o actualizar su respuesta.
4. Ejecutar `npm test`. La página entra sola en el sitemap, en `llms.txt` y en el JSON-LD.
