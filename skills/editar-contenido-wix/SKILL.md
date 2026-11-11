---
name: editar-contenido-wix
description: >-
  Cambia un texto, una imagen, un ítem, un post o un menú cuyo dato vive en
  Wix, o el cromo de site.ts. Úsala con "/editar-contenido-wix". No copies el
  CMS a TypeScript ni pegues el copy dentro del componente para evitar la red.
---

# Editar contenido de Wix

<!-- check:docs ejemplos: src/data/ -->

## Hace

- Si el dato lo edita el dueño (ítem, post, media, título de colección), usa una recipe de [skills/wix-manage/SKILL.md](../wix-manage/SKILL.md) o indica la pantalla del dashboard y el campo. Lee la recipe en esa sesión. No armes el body de memoria.
- Si el dato es cromo de [src/config/site.ts](../../src/config/site.ts) (nombre, email, locale, descripción, URL, imagen social), cámbialo ahí.

`wix-manage` acuña el token con `npx -y @wix/cli@latest token --site <siteId>` dentro del comando. El token no se escribe en el proyecto, ni en `/tmp`, ni en el cliente.

## No hace

- No crees `src/data/<coleccion>.ts` con los ítems.
- No pegues el copy del CMS dentro del `.astro` "para que no dependa de la red".
- No edites el data layer para transformar un campo que el DTO ya trae.
- El fallo de referencia es un archivo que exporta un array de ciudades y, si al CMS le falta un campo, lo rellena desde ese array. Un ítem nuevo heredaría datos que el editor no ve. El estado vacío y el de error se diseñan en la página.

La presentación no importa `insertItem`, `updateItem` ni `removeItem`. Quien importe esas escrituras desde una isla manda la operación con el token del visitante. La compuerta real es el permiso de la colección en Wix.
