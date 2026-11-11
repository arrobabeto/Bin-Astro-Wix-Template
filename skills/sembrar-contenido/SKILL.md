---
name: sembrar-contenido
description: >-
  Carga en Wix contenido que la persona aportó (JSON, CSV, lista o fotos),
  leyendo el SEED.md del vertical. Úsala con "/sembrar-contenido". Niégate si
  piden inventar posts o productos de ejemplo.
---

# Sembrar contenido

<!-- check:docs ejemplos: skills/wix-headless-kit/templates/ src/data/ -->

Solo cuando hay contenido aportado o descrito con datos reales. Si el encargo es "inventa tres posts de ejemplo", niégate y dilo.

## Hace

1. Lee en esa sesión `templates/<vertical>/seed/SEED.md` y `templates/shared/SUPPLIED-CONTENT.md`. Si falta `templates/`, primero `node skills/wix-headless-kit/install/templates.mjs`.
2. Escribe `plans/<vertical>.json` con los valores textuales de la persona. Ese plan sí se puede commitear. No es un secreto.
3. Ejecuta el `seed-*.mjs` de ese vertical, como lo indica el `SEED.md`. No recuerdes el comando.
4. Revisa `seed-result.json`. No lo commitees: está en `.gitignore`.
5. Si el sitio ya existía, lee antes `read-site.mjs` y no dupliques por nombre lo que ya está.

## Permisos

Cópialos del `SEED.md`. No los recuerdes. La intención, sin inventar el enum de la API: lectura pública para lo que el sitio muestra; escritura no pública, salvo la operación de visitante que el propio vertical documenta (comentarios, likes). Si el `SEED.md` no trae el campo, pregunta. No uses `auth.elevate`.

## No hace

- No crea un catálogo paralelo en `src/data/`.
- No publica el sitio. Un release no refresca datos: el contenido se lee en runtime.
