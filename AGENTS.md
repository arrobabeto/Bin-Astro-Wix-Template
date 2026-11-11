# AGENTS.md

<!-- check:docs ejemplos: src/data/ -->

Fuente única de reglas de BAWT. `CLAUDE.md` solo apunta aquí.

## Qué es esto

BAWT (Bin Astro and Wix Template) es un stack, no un sitio. La decisión está en [docs/adr/0005-stack-no-diseno.md](docs/adr/0005-stack-no-diseno.md) y el mapa de entrada en [README.md](README.md).

Astro 7 corre en el hosting de Wix (`output: "server"`). Tailwind 4 entra por `@tailwindcss/vite`. React 18 está para las islas que un vertical shipped exija, no para la presentación nueva. El contenido de negocio se lee en runtime desde Wix. Un release no refresca datos.

## Mapa

- `src/pages`, `src/components`, `src/layouts`, `src/styles`: presentación.
- `src/config/site.ts`: nombre, locale, descripción, URL pública, email, imagen social. Nada más.
- `src/config/routes.ts`: rutas propias que entran al sitemap y a `llms.txt`.
- `src/lib/public-url.ts`: la única lógica de plataforma con test, sin red de Wix.
- `src/wix/`: seam de auth y, cuando se agregue un vertical, el código shipped. No se reescribe.
- `src/content/legal/`: privacidad y términos. Excepción: no viven en el CMS.
- `skills/`: siete skills propias y tres de Wix pinneadas. Inventario en [skills/INVENTARIO.md](skills/INVENTARIO.md).
- `docs/adr/`: decisiones. `docs/guias/`: cómo se trabaja. Índice en [docs/guias/empieza-aqui.md](docs/guias/empieza-aqui.md).

No hay `src/data/`. No hay header ni footer de ejemplo. No hay `wix.config.json` en el template vacío.

## Skills

Léela antes de la tarea. La ficha completa está en el inventario.

| Skill                   | Para qué                                       |
| ----------------------- | ---------------------------------------------- |
| `nuevo-sitio`           | Alta del clon contra Wix                       |
| `agregar-vertical`      | Sumar cms, blog, forms u otro vertical         |
| `sembrar-contenido`     | Cargar contenido real                          |
| `editar-contenido-wix`  | Cambiar un dato de Wix o el cromo de `site.ts` |
| `construir-desde-figma` | Implementar un nodo de Figma                   |
| `seo-tecnico`           | Metadatos de una página                        |
| `textos-legales`        | Privacidad y términos                          |
| `wix-headless-kit`      | Código shipped, setup y deploy. No se edita    |
| `wix-docs`              | Confirmar un endpoint. No se edita             |
| `wix-manage`            | Operar el sitio en vivo. No se edita           |

## Reglas de Wix

No trabajes de memoria sobre la API de Wix. Ni un path, ni un header, ni un campo, ni un body. Cada llamada sale de un archivo leído en esa sesión: el código shipped o, si no cubre el caso, la documentación abierta con `wix-docs`. Un 400 no autoriza a probar otra forma.

El código shipped se copia y no se reescribe. `src/wix/sdk.ts` es el único seam. `WIX_CLIENT_ID` permanece `null`: la auth es ambiental. Una operación privilegiada no se mete en una isla. No uses `auth.elevate`.

El release es `wix build` y después `wix release`. El dev server de `wix dev` no cuenta como publicación. `astro dev` no es el camino: no tiene la auth ambiental ni el proxy.

El feedback a Wix solo se envía si la persona dice que sí. El procedimiento está en [skills/wix-headless-kit/guides/feedback.md](skills/wix-headless-kit/guides/feedback.md).

Las escrituras de CMS (`insertItem`, `updateItem`, `removeItem`) no se importan desde la presentación. La compuerta es el permiso de la colección en Wix.

## Catálogo paralelo

Un array de ítems en el repo que rellene huecos del CMS es un defecto, no un fallback. No inventes ítems, precios, testimonios ni posts. Si no hay contenido, la página muestra el estado vacío del vertical.

El texto que el dueño debe poder cambiar sin un desarrollador vive en Wix. El cromo (nombre del sitio, email, locale) vive en `src/config/site.ts` o en el componente del proyecto, nunca en un segundo catálogo.

## Demo

Si piden el home y el marcador `bawt:demo` sigue en `src/pages/index.astro`, primero `npm run demo:clear` o la skill `construir-desde-figma`. No adaptes el placeholder para que parezca el sitio.

## Git

Ramas `feature/*`, `fix/*` o `contenido/*`. No hagas commit directo a `main` (escape: `ALLOW_MAIN_COMMIT=1`). `git add` con rutas. No incluyas `.env.local`, `seed-result.json`, logs ni `templates/` del kit.

`WIX_API_KEY` vive en GitHub Secrets del repo del cliente. `WIX_CLIENT_SECRET` no entra a GitHub ni al bundle.

## Verificación

`npm run verify` antes de dar la tarea por terminada. Si un check falla, se arregla la causa. No se apaga el check.

TypeScript estricto. Sin `any` en la presentación. Los imports de tipo van con `import type`. Los tokens de color viven en `src/styles/global.css`. Hacia la persona, en español.
