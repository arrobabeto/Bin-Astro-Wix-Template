# Inventario de skills

Lista oficial de las skills de este proyecto. Se actualiza en el mismo cambio en que se
agrega, modifica o elimina una skill (`npm run check:skills` lo exige). Qué es una skill y
cómo se usa: [README.md](README.md).

Las tres de Wix están pinneadas. No se editan.

Estados: **estable** (el procedimiento de esta versión), **tercero** (viene de Wix, pinneada).

## Resumen

| Skill                   | Invocación                   | Para qué sirve                                              | Estado  |
| ----------------------- | ---------------------------- | ----------------------------------------------------------- | ------- |
| `nuevo-sitio`           | `/nuevo-sitio`               | Conectar el clon a un sitio Wix y cerrar el alta            | estable |
| `agregar-vertical`      | `/agregar-vertical`          | Sumar cms, blog, forms u otro vertical del kit              | estable |
| `sembrar-contenido`     | `/sembrar-contenido`         | Cargar contenido real que la persona aportó                 | estable |
| `editar-contenido-wix`  | `/editar-contenido-wix`      | Cambiar un dato de Wix o el cromo de site.ts                | estable |
| `construir-desde-figma` | `/construir-desde-figma`     | Implementar un nodo de Figma en Astro                       | estable |
| `seo-tecnico`           | `/seo-tecnico`               | Revisar metadatos de una página propia o de un ítem shipped | estable |
| `textos-legales`        | `/textos-legales`            | Privacidad y términos con datos reales                      | estable |
| `wix-headless-kit`      | lee la skill antes de Wix    | Código shipped, deploy y setup del kit                      | tercero |
| `wix-docs`              | lee la skill antes de la API | Confirmar un endpoint en la documentación de Wix            | tercero |
| `wix-manage`            | lee la recipe del vertical   | Operar el sitio en vivo sin escribir el token a disco       | tercero |

## Fichas

### `nuevo-sitio`

- **Invocación:** `/nuevo-sitio`.
- **Función:** conecta el clon a un sitio Wix nuevo o existente, escribe `site.ts` y `template.lock.json`, y no publica.
- **Casos de uso:** "empieza un sitio para este negocio", justo después de clonar el template.
- **Cuándo no usarla:** si ya existe `template.lock.json`.
- **Entradas:** nombre, descripción, sitio nuevo o existente, verticales, locale si no es `es`, email y URL pública si ya se conoce.
- **Salidas:** `wix.config.json`, `.env.local` (no se commitea), `src/config/site.ts`, `template.lock.json`.
- **Requisitos:** Node 22, `npm install`, sesión de `wix login`.
- **Origen:** propia del template.
- **Estado:** estable · v1 · 2026-11-11.

### `agregar-vertical`

- **Invocación:** `/agregar-vertical`.
- **Función:** corre `deploy.mjs` de un vertical del kit y un solo `npm install`.
- **Casos de uso:** "agrega el blog", "hace falta el CMS", "quiero el formulario de Wix".
- **Cuándo no usarla:** el sitio todavía no está conectado (`nuevo-sitio` primero). Para cargar datos, `sembrar-contenido`.
- **Entradas:** el nombre del vertical, como lo lista el kit.
- **Salidas:** código shipped bajo `src/wix/`, dependencias en el lock, `template.lock.json` actualizado.
- **Requisitos:** `wix.config.json`. `templates/` se baja en la sesión y no se commitea.
- **Origen:** propia del template. El código lo trae `wix-headless-kit`.
- **Estado:** estable · v1 · 2026-11-11.

### `sembrar-contenido`

- **Invocación:** `/sembrar-contenido`.
- **Función:** escribe un plan con el contenido aportado y corre el seed del vertical.
- **Casos de uso:** "carga estas tazas", "estos posts ya están redactados".
- **Cuándo no usarla:** si piden inventar ejemplos. Si el cambio es un solo campo, `editar-contenido-wix`.
- **Entradas:** JSON, CSV, lista o fotos reales, y el vertical de destino.
- **Salidas:** `plans/<vertical>.json`. `seed-result.json` se revisa y no se commitea.
- **Requisitos:** leer `SEED.md` en esa sesión. Sitio conectado.
- **Origen:** propia del template.
- **Estado:** estable · v1 · 2026-11-11.

### `editar-contenido-wix`

- **Invocación:** `/editar-contenido-wix`.
- **Función:** cambia un dato que el dueño edita en Wix, o el cromo de `site.ts`.
- **Casos de uso:** "cambia el título de este post", "actualiza el email del sitio".
- **Cuándo no usarla:** para maquetar una página (`construir-desde-figma`) o para redactar legales (`textos-legales`).
- **Entradas:** qué dato cambia y el valor nuevo.
- **Salidas:** una recipe de `wix-manage` ejecutada, o un cambio en `src/config/site.ts`.
- **Requisitos:** leer la recipe en esa sesión. No guardar el token.
- **Origen:** propia del template.
- **Estado:** estable · v1 · 2026-11-11.

### `construir-desde-figma`

- **Invocación:** `/construir-desde-figma`.
- **Función:** implementa un nodo de Figma en Astro y Tailwind y ofrece quitar el home de demo.
- **Casos de uso:** "arma esta página del archivo de Figma", con URL o `node-id`.
- **Cuándo no usarla:** si no hay archivo ni capturas. No sustituye al plugin de Figma con la API REST.
- **Entradas:** URL de Figma o `node-id`, y el vertical si la página muestra datos de negocio.
- **Salidas:** componentes en `src/`, tokens en `src/styles/global.css`, assets en el repo.
- **Requisitos:** plugin de Figma en Cursor. `npm run verify` al cerrar.
- **Origen:** propia del template.
- **Estado:** estable · v1 · 2026-11-11.

### `seo-tecnico`

- **Invocación:** `/seo-tecnico`.
- **Función:** comprueba metadatos de una página de ítem shipped o de una página propia.
- **Casos de uso:** "revisa el SEO de esta página antes de publicar".
- **Cuándo no usarla:** para investigar palabras clave o para redactar el contenido.
- **Entradas:** la ruta o el archivo de la página.
- **Salidas:** correcciones en la página, en `BaseHead` o en `routes.ts`. Ningún informe con puntuación.
- **Requisitos:** en una ficha shipped, no quitar `wixMetadata` ni `SEO.Tags`.
- **Origen:** propia del template.
- **Estado:** estable · v1 · 2026-11-11.

### `textos-legales`

- **Invocación:** `/textos-legales`.
- **Función:** escribe privacidad y términos con los datos del responsable y quita el marcador de ejemplo.
- **Casos de uso:** "ya tenemos razón social y domicilio; redacta los legales".
- **Cuándo no usarla:** para un banner de cookies. No hay medición en la v1.
- **Entradas:** razón social, domicilio, email y qué datos recoge el sitio.
- **Salidas:** `src/content/legal/privacidad.md` y `src/content/legal/terminos.md`.
- **Requisitos:** para México, `skills/textos-legales/references/mexico.md`. Para otro país, no redactar artículos de memoria.
- **Origen:** propia del template. La referencia de México viene de Bin Astro Template.
- **Estado:** estable · v1 · 2026-11-11.

### `wix-headless-kit`

- **Invocación:** leerla antes de setup, deploy, seed o cualquier cambio al código shipped.
- **Función:** el kit que copia verticales, el seam de auth y las instrucciones de cada solución.
- **Casos de uso:** conectar un sitio, agregar un vertical, entender por qué `WIX_CLIENT_ID` queda en null.
- **Cuándo no usarla:** no la edites. No la uses para operar datos del sitio: eso es `wix-manage`.
- **Entradas:** el vertical y el stack `astro`.
- **Salidas:** archivos bajo `src/wix/` y, en cada proyecto, `templates/` (gitignored).
- **Requisitos:** pinneada en `skills-lock.json`. El plugin de Wix en Cursor sigue haciendo falta para el MCP.
- **Origen:** tercero, `wix/skills`, pinneada. No se edita.
- **Estado:** tercero · pinneada · 2026-11-11.

### `wix-docs`

- **Invocación:** leerla antes de escribir una llamada a la API que el código shipped no cubre.
- **Función:** buscar y leer la página de documentación del endpoint, el body y el enum.
- **Casos de uso:** "¿cuál es el path de esta operación?". Un 400 no autoriza a probar otra forma de memoria.
- **Cuándo no usarla:** si el archivo shipped o una recipe de `wix-manage` ya traen la llamada.
- **Entradas:** qué operación hace falta.
- **Salidas:** el path y el body copiados de la página leída en esa sesión.
- **Requisitos:** red para leer la doc, o las herramientas de docs del plugin de Wix.
- **Origen:** tercero, `wix/skills`, pinneada. No se edita.
- **Estado:** tercero · pinneada · 2026-11-11.

### `wix-manage`

- **Invocación:** leer la recipe del área (CMS, blog, media, SEO) antes de cambiar datos en vivo.
- **Función:** recetas REST para el sitio, con el token acuñado dentro del comando.
- **Casos de uso:** "cambia este precio", "publica este post", "lee qué hay en la colección".
- **Cuándo no usarla:** para diseñar páginas o para commitear el token.
- **Entradas:** el `siteId` y el cambio pedido.
- **Salidas:** la llamada descrita por la recipe. El token no toca disco ni el cliente.
- **Requisitos:** sesión del CLI. No escribir el token en el proyecto, ni en `/tmp`, ni en código de cliente.
- **Origen:** tercero, `wix/skills`, pinneada. No se edita.
- **Estado:** tercero · pinneada · 2026-11-11.
