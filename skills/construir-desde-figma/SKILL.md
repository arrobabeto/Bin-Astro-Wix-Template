---
name: construir-desde-figma
description: >-
  Implementa una página de Figma en Astro y Tailwind con el plugin de Figma de
  Cursor, baja los assets al repo y quita el home de demo al cerrar el diseño.
  Úsala con "/construir-desde-figma" o cuando haya un URL o un node-id.
---

# Construir desde Figma

Hay un URL de Figma o un `node-id`. Una página por nodo.

## Hace

1. Sigue la skill de Cursor `figma-design-to-code`: contexto del nodo con captura, assets descargados al repo.
2. Sin URLs temporales de Figma. Sin layout por coordenadas absolutas.
3. Implementa en `.astro` y Tailwind. Los tokens de color salen del archivo de Figma y se escriben en [src/styles/global.css](../../src/styles/global.css). Si el diseño trae color, no dejes los tokens neutros del template.
4. Los datos de negocio salen de los DTOs del vertical, no de strings fijos, en cuanto el vertical existe. Si todavía no está, detente y pide `agregar-vertical` antes de maquetar fichas con datos falsos.
5. Imágenes: alt descriptivo, nombre de archivo en minúsculas y con guiones, peso dentro de `npm run check:assets`.
6. Al terminar, ofrece `npm run demo:clear` si el marcador sigue en el home, y corre `npm run verify`.

## Si el plugin de Figma no está

Detente y pide capturas y assets. No llames a la API REST de Figma y no cargues un lector REST alternativo. No hay `FIGMA_API_KEY` en `.env.example`.

## No hace

- No copia la identidad de otro proyecto.
- No monta el visor de rich content en el servidor.
- No sube el `limit` de una colección "por si acaso".
