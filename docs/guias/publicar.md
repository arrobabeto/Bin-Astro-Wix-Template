# Publicar

`wix dev` no publica. El sitio público es el URL que imprime `wix release`. No se reescribe ese URL de memoria: se lee del log.

## En la máquina

Con la sesión ya iniciada:

```bash
npx @wix/cli@latest build
npx @wix/cli@latest release
```

El primer release de un sitio nuevo puede ser este. El workflow queda para el merge siguiente.

## En GitHub Actions

El workflow Release corre al hacer push a `main`, solo si existe `wix.config.json`. En el repositorio del template ese archivo no está y el job se salta. Un skipped no es un fallo.

En el repo del cliente, el secreto es `WIX_API_KEY`: una API key de cuenta creada para CI. Se pega en Settings → Secrets and variables → Actions. No se pega en el código, ni en el chat, ni en `.env.local`.

No uses `WIX_CLIENT_SECRET` para este workflow. Ese secreto autentica visitantes. No publica.

Si el secreto no está, el job falla con un mensaje fijo y no imprime el valor. Los pasos, cuando el archivo de config existe, son login con la API key, `env pull`, `build` y `release` con el SHA del commit en el comentario. El log del job es el registro del URL. No hace falta parsearlo.

El workflow Calidad no hace login y no necesita secretos.
