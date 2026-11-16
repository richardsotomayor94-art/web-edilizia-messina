# Servizios especializados — estado, datos pendientes y activación (2026-11-15)

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
| Sabbiatura e pulizia specialistica (nombre provisional) | `/sabbiatura-messina/` | `sabbiatura` | `sabbiatura` |

## Qué está hecho

- **Configuración central:** `src/config/specialist.ts` (estado, nombre provisional y datos de la técnica en `BLASTING`, opciones del formulario, subcategorías) y `src/config/specialist-pages.ts` (textos, FAQ, fuentes, láminas e imágenes).
- **Landings:** reutilizan el sistema de secciones de las demás. Llevan aviso «In preparazione», CTA «Chiedi una valutazione», FAQ propias y enlaces cruzados entre ellas y con Facciate y Pittura.
  - Sin precios, plazos, garantías ni disponibilidad.
  - Ninguna técnica se presenta como delicada, ecológica, sin residuos o apta para todo (lo comprueba un test).
- **Visibilidad:**
  - **Home:** sección «Servizi specialistici» (Tav. 02·S).
  - **Menú «Servizi»:** grupo propio (S1, S2) en escritorio y móvil.
  - **Footer:** grupo propio.
  - **Formulario:** dos opciones al final de la lista.
  - **Formulario de partners:** las empresas marcan subcategorías concretas, no la línea entera.
- **Formulario:** recorrido propio de 8 pasos:
  1. objeto;
  2. material, con «Non lo so»;
  3. intervención (limpieza, mantenimiento, reparación o restauración);
  4. dimensiones y si se puede trasladar;
  5. estado;
  6. ubicación (para tumbas: cementerio y tipo de sepultura, nunca datos de difuntos);
  7. fotos y descripción;
  8. contacto.

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
- **Pruebas:**
  - 16 suites, 153 tests;
  - recorrido completo del formulario en 390 y 1440 px para las dos líneas: servicio preseleccionado, recarga, volver atrás, envío interceptado y confirmación.

## Base de datos

- **Migración `20261115000004_specialist_services`: aplicada el 2026-11-16** con tu aprobación. Incluye subcategorías, columna `details` con límite y `submit_lead` que la guarda, con los permisos sin cambios.
- Verificada con `submit_lead` y `suggest_partners` en una transacción anulada: una puerta acaba en `restauro-legno` y se propone solo al carpintero. No quedan datos de prueba ni hay avisos de seguridad nuevos.

## Pendiente de tu aprobación

- **Imágenes fotográficas** (opcional): sustituir láminas por fotos generadas consume créditos.

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
- **Sabbiatura:** se rellenan los campos de `BLASTING` y se cambia `confirmed: true`. Faltan:
  - nombre exacto del procedimiento;
  - medio proyectado y equipos;
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
