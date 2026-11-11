---
name: nuevo-sitio
description: >-
  Da de alta un clon de BAWT: conecta un sitio Wix nuevo o uno que ya existe,
  elige verticales y escribe template.lock.json. Úsala justo después de clonar,
  cuando pidan "nuevo sitio", "empieza este template" o "/nuevo-sitio".
---

# Nuevo sitio

Convierte el clon en el proyecto de un negocio. No diseña la portada y no publica.

## Cuándo

El primer trabajo después de clonar. Si existe `template.lock.json`, detente y di qué skill sigue: `agregar-vertical`, `editar-contenido-wix` o `construir-desde-figma`.

## Pregunta solo esto

- Nombre del negocio.
- Descripción de una línea. No dejes el texto de ejemplo del template.
- Si el sitio Wix es nuevo o ya existe.
- Verticales. Puede ser ninguna todavía. No asumas CMS ni Blog.
- `locale`, solo si no es `es`.
- Email de contacto.
- URL pública, solo si ya se conoce. No inventes un dominio.

No preguntes colores ni secciones.

## Preflight

1. Lee [skills/wix-headless-kit/SKILL.md](../wix-headless-kit/SKILL.md) antes de correr nada.
2. Desde la raíz del repo. No uses `--subfolder`.
3. No pases `--plan`. No redactes contenido de relleno.
4. `npx @wix/cli@latest whoami`. Si falla, muestra la URL y el código de `wix login` y espera. No leas el token.

## Sitio nuevo

El template ya tiene `package.json`. No lo borres para forzar un scaffold: eso pisaría este repo.

- Con al menos un vertical:

```bash
node skills/wix-headless-kit/install/setup.mjs --stack astro --vertical <lista> --business-name "<nombre>"
```

La lista va separada por comas, sin espacios raros. Sin `--plan`. Sin `--subfolder`.

- Sin verticales, solo el `init` que el propio setup usa en modo adopt:

```bash
CI=1 npm create @wix/new@latest -- init
```

Ese comando escribe `wix.config.json` y `.env.local`. No debe reescribir `package.json`, `astro.config.mjs` ni `AGENTS.md`. Si lo hace, detente y muéstralo.

## Sitio existente

No corras `init`: crearía otro sitio. Lee la salida de:

```bash
node skills/wix-headless-kit/install/context.mjs
```

Sigue el `next` que imprima. Si el camino es `attach`, usa [skills/wix-headless-kit/install/attach.mjs](../wix-headless-kit/install/attach.mjs). No inventes un `--site` si el contexto ya trae el id.

El sitio de deploy (`wix.config.json`) y el sitio de contenido (`.env.local`) son el mismo en un proyecto normal. En un migration preview no. Dilo en voz alta y no adivines el sitio a partir del config si `context.mjs` dice otra cosa.

## Después

1. `npx @wix/cli@latest env pull` si no existe `.env.local`.
2. Escribe [src/config/site.ts](../../src/config/site.ts) con el nombre, la descripción, el email, el locale y la URL si se conoce.
3. Escribe `template.lock.json` con `name`, `siteId`, `verticals`, `createdAt` y la versión de Node (`process.version`).
4. El `<title>` del home debe usar `site.name`. Deja el marcador `bawt:demo` hasta que pidan el diseño.
5. Corre `npm test`. Corre `npm run check:source`.
6. No corras `wix release`. Publicar es otro paso.

Si `check:placeholders` falla solo porque el home sigue con el marcador de demo, porque los Markdown legales siguen de ejemplo, o porque la URL pública todavía no se conoce, no lo "arregles" inventando texto, un dominio o borrando el home. Repórtalo. El diseño lo quita `demo:clear` o `construir-desde-figma`. Los legales los escribe `textos-legales`.

## No hace

- No siembra contenido.
- No cambia `src/wix/sdk.ts` ni pone `WIX_CLIENT_ID` en un string.
- No commitea `.env.local`.
