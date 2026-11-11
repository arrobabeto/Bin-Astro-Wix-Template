# Empieza aquí

BAWT es el template de Astro en hosting de Wix. Se clona, se conecta a un sitio y a partir de ahí se desarrolla. No trae un sitio de ejemplo.

Índice:

- [Crear un sitio nuevo](crear-sitio-nuevo.md)
- [Conectar Wix](conectar-wix.md)
- [Verticales](verticales.md)
- [Contenido](contenido.md)
- [Diseñar desde Figma](disenar-desde-figma.md)
- [SEO](seo.md)
- [Publicar](publicar.md)
- [Variables de entorno](variables-de-entorno.md)
- [Skills](skills.md)
- [Actualizar dependencias](actualizar-dependencias.md)

Las decisiones están en [../adr/README.md](../adr/README.md). Las reglas del agente, en [../../AGENTS.md](../../AGENTS.md).

## Glosario

**Auth ambiental.** `WIX_CLIENT_ID` queda en `null`. `@wix/astro` autentica las llamadas del SDK en el servidor y en las islas. No hay un client id que pegar en el código.

**Sitio de deploy.** El que nombra `wix.config.json`. Ahí va `wix release`. El archivo no está en el template vacío: aparece al conectar.

**Sitio de contenido.** El que describe `.env.local`, escrito por `wix env pull`. En un proyecto normal es el mismo que el de deploy. En un migration preview no.

**Vertical.** Una solución del kit (cms, blog, forms, y otras). Se agrega con la skill `agregar-vertical`. El template no trae ninguna instalada.

**Release.** `wix build` y después `wix release`. El URL que imprime el CLI es el sitio público. `wix dev` no publica.

**Seed.** Cargar contenido aportado con el script del vertical. No es un catálogo de mentira. El plan, si se guarda, va en `plans/` y se puede commitear. El resultado del seed no.
