# 0006 — Verticales bajo demanda

**Estado:** Aceptada

## Contexto

CMS, Blog, Forms y el resto del kit instalan paquetes grandes y páginas shipped. Un sitio informativo puede no querer Blog. Cargar Ricos y colecciones vacías en el template castiga al primer cliente que no los usa.

## Decisión

El `package.json` base no incluye `@wix/data`, `@wix/blog`, `@wix/ricos`, `@wix/seo` ni `@wix/dashboard`. Los pone `deploy.mjs` cuando `agregar-vertical` instala esa solución. `nuevo-sitio` pregunta cuáles hacen falta y puede responder ninguna.

React 18 sí está en el contrato, aunque todavía no haya islas: el Astro gestionado lo incluye para cuando un vertical shipped lo exija.

## Alternativas

- **Instalar CMS y Blog en el template "para que ya venga listo".** El primer proyecto que no los quiere carga con ellos.
- **Reimplementar las colecciones a mano.** El kit ya trae el data layer, el seed y las páginas de ítem. Reescribirlos es la falla que las skills prohíben.

## Consecuencias

- Un vertical nuevo puede tocar `package.json`. Después hay un solo `npm install` y se commitea el lock.
- Sin contenido de demostración en Wix. Si el cliente no entregó datos, la colección nace vacía.
