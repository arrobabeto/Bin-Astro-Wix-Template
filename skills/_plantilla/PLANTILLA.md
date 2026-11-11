---
name: nombre-skill
description: >-
  Qué hace la skill en una o dos frases y CUÁNDO usarla, con ejemplos de cómo
  lo pediría una persona. Los agentes deciden cargarla leyendo solo esta
  descripción.
---

<!--
Plantilla para una skill nueva:
  1. Copia esta carpeta: cp -R skills/_plantilla skills/<nombre>
  2. Renombra este archivo a SKILL.md y pon en `name` el nombre de la carpeta.
  3. Borra este comentario.
  4. Agrega la fila y la ficha en skills/INVENTARIO.md.
  5. Corre `npm run check:skills`.
Guía: docs/guias/skills.md
-->

# Nombre de la skill

Una frase sobre el resultado.

## Input

- **Obligatorio:** …
- **Opcional:** …

Si falta algo obligatorio, pide solo eso.

## Preflight

1. `git status -sb`: no mezcles el trabajo con cambios ajenos.
2. Lee los archivos que vas a tocar antes de editarlos.
3. Si la tarea habla con la API de Wix, lee antes el código shipped o `wix-docs`. No escribas el path de memoria.

## Pasos

1. …

## Reglas

- El contenido de negocio se edita en Wix, no en un array del repositorio.
- No inventes ítems, precios, testimonios ni posts.
- No reescribas `src/wix/`. Extiende en un archivo nuevo.
- No hagas commit a `main`.

## Verificar

```bash
npm run verify
```

## Entrega

Archivos cambiados, comandos y resultado, y lo que quedó pendiente.
