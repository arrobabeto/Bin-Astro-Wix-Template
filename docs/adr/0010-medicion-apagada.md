# 0010 — Medición apagada

**Estado:** Aceptada

## Contexto

Analytics, el contenedor de etiquetas y un banner de consentimiento son una decisión del proyecto, no del stack. Copiar el código "por si acaso" deja un tracker apagado o, peor, un banner que no corresponde a nada que se esté midiendo.

## Decisión

La v1 no incluye medición. No hay script de analytics ni banner. El día que se añada un tracker, el banner nace en el mismo cambio y no antes.

## Alternativas

- **Dejar el banner y el contenedor comentados.** Es código muerto que el siguiente proyecto activa sin revisar qué cookies existen.
- **Un banner genérico desde el template.** Afirma un tratamiento de datos que el sitio todavía no hace.

## Consecuencias

- `textos-legales` no inventa cookies de marketing. La lista, si no hay formulario ni tracker, es lo que el hosting y el CMS registran.
- No hay skill de analytics.
