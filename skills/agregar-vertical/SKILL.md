---
name: agregar-vertical
description: >-
  Suma un vertical del kit de Wix (cms, blog, forms u otro) a un sitio ya
  conectado, con deploy.mjs y un solo npm install. Úsala con "/agregar-vertical"
  o cuando pidan blog, colecciones o formularios de Wix.
---

# Agregar vertical

<!-- check:docs ejemplos: skills/wix-headless-kit/templates/ -->

El sitio ya está conectado (`wix.config.json` y `template.lock.json`). Hay que sumar un vertical del kit, no reimplementarlo.

## Preflight

1. Lee [skills/wix-headless-kit/SKILL.md](../wix-headless-kit/SKILL.md).
2. Si falta `skills/wix-headless-kit/templates/`, córrelo:

```bash
node skills/wix-headless-kit/install/templates.mjs
```

Esa carpeta no se commitea. 3. Lee entero `templates/<vertical>/INSTRUCTIONS.md` antes de tocar la presentación.

## Hace

```bash
node skills/wix-headless-kit/install/deploy.mjs <vertical> --stack astro
```

Un solo `npm install` después. No lances otro install en paralelo.

Actualiza `verticals` en `template.lock.json`.

No corras el seed salvo que en el mismo encargo pidan `sembrar-contenido` y haya contenido real.

Al instalar Blog, deja visible el comentario del archivo shipped: el visor Ricos va en `client:only` y no se usa para pintar comentarios. No unifiques el render.

## No hace

- No reescribas `src/wix/**` que el deploy acaba de copiar.
- No "mejores" los hooks ni cambies [src/wix/sdk.ts](../../src/wix/sdk.ts).
- No declares `@wix/dashboard` si el vertical no lo pidió.
- No inventes ítems para que la página no se vea vacía. El estado vacío es el del vertical.
