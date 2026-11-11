# Skills

Se invocan por su nombre (`/nuevo-sitio`) o pidiendo la tarea en español. El agente lee `skills/<nombre>/SKILL.md` antes de actuar. La lista obligatoria es [../../skills/INVENTARIO.md](../../skills/INVENTARIO.md). Si agregas una skill, actualizas el inventario en el mismo cambio. El molde está en `skills/_plantilla/`.

Las de `wix-headless-kit`, `wix-docs` y `wix-manage` están pinneadas. No se editan. Su hash vive en `skills-lock.json`. Si se actualizan desde el repositorio de Wix a propósito, el hash se regenera con `node scripts/check-skills.mjs --update-lock` y se revisa el diff. No se actualizan "de paso".

`.cursor/skills`, `.claude/skills`, `.codex/skills` y `.agents/skills` apuntan a `../skills`. En Windows, antes de clonar:

```bash
git config --global core.symlinks true
```

Sin eso, Git deja los symlinks como archivos de texto y `npm run check:skills` falla. Hay que volver a clonar después de activar la opción.

El plugin de Wix en Cursor es obligatorio para el MCP. El de Figma, cuando hay un archivo de diseño. No hacen falta plugins de mensajería para que el template funcione.
