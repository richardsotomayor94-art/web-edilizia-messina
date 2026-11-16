# Reconciliación de categorías — 2026-11-16

Punto de partida: commit `ac3a1d2` (migración `altri_servizi` aplicada y verificada). Estado de la base de datos consultado hoy: **25 filas en `services`, 0 solicitudes y 0 empresas** que las usen. Por eso renombrar o reordenar no afecta a ningún registro real.

## De dónde salen las cifras: 18 → 7 → 25 → 8 → 9

| Cifra | Qué cuenta | Detalle |
|---|---|---|
| **18** | Filas de `services` antes de las 7 nuevas | 12 originales (10 con landing, más `opere-murarie` y `altro`) + 6 de la migración `0004`: 5 subcategorías de restauro y `sabbiatura` |
| **+7** | Filas añadidas por `20261116000001` | microsabbiatura, restauro-tecnico, restauro-conservativo, risanamento-conservazione, traslochi, sgomberi-smaltimento, giardinaggio |
| **25** | Filas de `services` hoy | 18 + 7 (comprobado con una consulta hoy) |
| **8** | Categorías acordadas y probadas en el formulario | sabbiatura + las 7 nuevas |
| **9** | Landings «in preparazione» (noindex) | las 8 anteriores + Restauro, pulizia e recupero |

Las cifras no se contradicen: *25* cuenta filas de base de datos, *9* cuenta páginas. La línea de restauro es **una página** con **cinco subcategorías** en la base de datos (una por tipo de objeto), para que cada profesional reciba solo lo que acepta.

## Matriz: nombre visible, id, slug, página, estado y pendientes

«Valor del formulario» es lo que envía el navegador. «Slug en BD» es lo que se guarda en `leads.service` y lo que usa el enrutado (`suggest_partners`).

### Las dos líneas de este encargo

| Nombre visible | Valor del formulario | Slug en BD | Página | Estado | Pendiente |
|---|---|---|---|---|---|
| Restauro, pulizia e recupero | `restauro` | según el objeto: `restauro-funerario`, `restauro-pietra`, `restauro-legno`, `restauro-decorativo`; «Altro o non so» → `restauro-valutazione` (clasificación manual) | `/restauro-e-pulizia-messina/` | in preparazione | Fichas de los profesionales: subcategorías, exclusiones y zona. Si alguno es empresa autorizada en los cementerios municipales. Si alguno es *restauratore di beni culturali*. Reglamento municipal de policía mortuoria vigente |
| Sabbiatura e pulizia delle superfici | `sabbiatura` | `sabbiatura` | `/sabbiatura-messina/` | in preparazione | Modelo de la máquina, nombre comercial del abrasivo con ficha técnica y ficha de seguridad (SDS), presión de trabajo, superficies aceptadas y exclusiones, cobertura, a domicilio o en taller, DVR. **Nombre en BD:** migración `20261116000002` preparada, sin aplicar |

### Las otras categorías nuevas (formulario normal salvo microsabbiatura)

| Nombre visible | Valor = slug | Página | Estado | Pendiente |
|---|---|---|---|---|
| Microsabbiatura | `microsabbiatura` | `/microsabbiatura-messina/` | in preparazione | Profesional confirmado, abrasivo y equipo, trabajos sobre bienes protegidos |
| Restauro tecnico | `restauro-tecnico` | `/restauro-tecnico-messina/` | in preparazione | Profesional confirmado; término poco usado por el cliente (ver abajo) |
| Restauro conservativo | `restauro-conservativo` | `/restauro-conservativo-messina/` | in preparazione | Profesional confirmado; quién gestiona CILA/SCIA y la Soprintendenza |
| Risanamento e conservazione | `risanamento-conservazione` | `/risanamento-conservazione-messina/` | in preparazione | Profesional confirmado; si hace diagnóstico de humedad |
| Traslochi | `traslochi` | `/traslochi-messina/` | in preparazione | Profesional confirmado; quién pide la ocupación del suelo público |
| Sgomberi e smaltimento | `sgomberi-smaltimento` | `/sgomberi-smaltimento-messina/` | in preparazione | Profesional confirmado; inscripción en el Albo Gestori Ambientali. **Revisión legal aparte** (no forma parte de este encargo) |
| Giardinaggio | `giardinaggio` | `/giardinaggio-messina/` | in preparazione | Profesional confirmado; enlaces internos todavía débiles |

### Las 12 originales (sin cambios)

ristrutturazione-completa, bagno, cucina, cartongesso, pittura, impianti, pavimenti, facciata, impermeabilizzazione, isolamento (con landing); opere-murarie y altro (sin landing). Estado: operativas en el formulario; la indexación espera al lanzamiento.

## Nombres, ids y slugs aplicados

- **«Sabbiatura e pulizia delle superfici»** sustituye a «Sabbiatura e pulizia specialistica».
  - Ya está en el sitio, el menú, el formulario y el título de la landing (una sola fuente: `BLASTING.name` en `src/config/specialist.ts`).
  - En la base de datos solo cambia la columna `name`, con la migración `20261116000002`, que espera tu aprobación. Hasta entonces el área admin muestra el nombre del sitio y el SQL conserva el anterior; no rompe nada.
- **Ningún id ni slug cambia.** Antes de decidirlo revisé:
  - el código (`lead-schema`, `specialist.ts`, `service-catalog.ts`, landings, tests);
  - la base de datos (`services`, la clave externa de `leads.service`, `partners.services`): 0 solicitudes y 0 empresas;
  - los formularios: los CTA llevan `?servizio=<valor>`.

  Como ninguna URL cambia, **no hacen falta redirecciones**.

## «Restauro tecnico» y «Risanamento e conservazione»: cómo encajan

Ninguna de las dos pertenece a las dos líneas de este encargo, y no las fusiono.

| Categoría | Qué trata | Objeto del trabajo | Relación con las dos líneas |
|---|---|---|---|
| Restauro, pulizia e recupero | Objetos y elementos sueltos: tumbas, lápidas, mármol, puertas, muebles, elementos decorativos | Un objeto | — |
| Sabbiatura e pulizia delle superfici | Limpieza con chorro de arena a presión de travesaños, hierro, muros rústicos y pavimentos | Una superficie | — |
| Restauro tecnico | Reparación del hormigón armado: balcones, cornisas, hierros a la vista, carbonatación | La estructura de un edificio | Puede necesitar sabbiatura de los hierros como fase previa, pero la contrata la empresa de obra |
| Risanamento e conservazione | Humedad y degradación de los muros: capilaridad, condensación, sales | La envolvente de un edificio | Ninguna. Se distingue por el problema (humedad), no por la técnica |
| Restauro conservativo | Obra de restauración y saneamiento conservativo de edificios (DPR 380 art. 3), con permisos | Un edificio | Ninguna. Es una categoría urbanística, no de objetos |

**Decisión:** mantener las cinco categorías separadas.

- La línea de restauro se queda con los **objetos**.
- Restauro tecnico, Risanamento y Restauro conservativo se quedan con los **edificios**.
- La sabbiatura se queda con la **técnica sobre superficies**.

El cruce que más riesgo tiene (Restauro conservativo ↔ Risanamento) es solo de vocabulario. Está documentado en `docs/ANALISI-RESTAURO-CANNIBALIZZAZIONE.md`, y cada página enlaza a la otra con una frase que dice cuándo elegirla.

**Microsabbiatura** sigue separada de la sabbiatura:

- la técnica descrita por el profesional es arena con aire comprimido a alta presión;
- la microsabbiatura usa abrasivos finos y presiones bajas para superficies decoradas o delicadas;
- presentarlas como una sola iría contra la regla de no proponer la sabbiatura para mármol delicado o bienes protegidos.

## Cementerios y bienes protegidos: confirmado y pendiente

| Punto | Estado | Fuente |
|---|---|---|
| El titular de la concesión mantiene la tumba y decide las obras | Confirmado | DPR 285/1990, arts. 63 y 93 (normattiva.it) |
| En los cementerios municipales de Messina solo trabajan empresas autorizadas; colocar o modificar monumentos necesita autorización | Confirmado | sportellotelematico.comune.messina.it |
| ¿La limpieza simple necesita autorización? | **Pendiente** | La página del Comune no lo menciona. Hay que preguntarlo al Servizio Cimiteri |
| Texto vigente del reglamento municipal de policía mortuoria (delibera 118/C/2012) | **Pendiente** | No encontrado en línea |
| Las obras sobre bienes culturales necesitan autorización de la Soprintendenza | Confirmado | D.Lgs 42/2004, art. 21 |
| La restauración de bienes protegidos está reservada a *restauratori di beni culturali* | Confirmado | D.Lgs 42/2004, art. 29 |
| ¿El Gran Camposanto o tumbas concretas están protegidos? | **Pendiente** | Soprintendenza BB.CC.AA. di Messina |

El formulario pide para las tumbas solo el **cementerio** (texto libre, máx. 120 caracteres) y el **tipo de sepultura**, para el acceso. Nunca pide datos del difunto.
