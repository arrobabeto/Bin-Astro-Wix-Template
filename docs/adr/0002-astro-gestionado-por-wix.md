# 0002 — Astro gestionado por Wix, en servidor

**Estado:** Aceptada

## Contexto

El contenido cambia en el dashboard, no al hacer commit. Un sitio estático tendría que reconstruirse para ver un título nuevo, y un release no es una reindexación. La prueba que aprobó el stack corrió Astro 7 con el adapter de hosting de Wix.

## Decisión

`output: "server"`, adapter de Wix, y los comandos `wix dev`, `wix build` y `wix release`. El dev server que vale es el de Wix: la auth ambiental y el proxy no existen en `astro dev`.

## Alternativas

- **Sitio estático en otro hosting.** Contradice el stack aprobado: aquí la página tiene que leer el CMS en el request.
- **Una SPA servida como archivos sueltos.** Wix no le daría el fallback ni la auth ambiental de este adapter.

## Consecuencias

- Cada página corre en el Worker. No hay CDN de páginas estáticas, ni ISR, ni una capa de cache de aplicación en la v1.
- Una página pide lo que va a pintar, con `limit` explícito.
- No se añade Redis, ni un CMS de respaldo, ni generación estática de las fichas.
