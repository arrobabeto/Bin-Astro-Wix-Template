# 0004 — Skills canónicas y skills de Wix pinneadas

**Estado:** Aceptada

## Contexto

El mismo encargo puede llegar desde Cursor, Claude Code o Codex. Si cada herramienta lee una copia distinta de las instrucciones, el alta de un sitio diverge. El kit de Wix además cambia: hace falta fijar la versión que este template ya leyó.

## Decisión

Las skills viven en `skills/`. `.cursor/skills`, `.claude/skills`, `.codex/skills` y `.agents/skills` son symlinks a esa carpeta. `skills/INVENTARIO.md` lista las propias y las de Wix. `npm run check:skills` exige la ficha, el frontmatter y los symlinks.

`wix-headless-kit`, `wix-docs` y `wix-manage` se commitean pinneadas. No se editan. Su hash está en `skills-lock.json`. `templates/` lo baja `templates.mjs` en cada proyecto y está en `.gitignore`.

## Alternativas

- **Depender solo de la caché del plugin de Wix en la máquina de quien clona.** Un agente sin el plugin no ve las instrucciones, y la versión no queda fijada.
- **Commitear `templates/`.** Es código generado por el kit en cada proyecto, no parte del template vacío.

## Consecuencias

- El plugin de Wix en Cursor sigue haciendo falta para el MCP. Las skills del repo no lo reemplazan: cubren a un agente que no tiene el plugin abierto.
- En Windows, los symlinks requieren `git config core.symlinks true` antes de clonar. La guía de skills lo dice.
