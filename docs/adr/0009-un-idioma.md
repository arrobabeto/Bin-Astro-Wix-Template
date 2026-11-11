# 0009 — Un idioma configurable

**Estado:** Aceptada

## Contexto

La v1 de los sitios de este template se escribe en un idioma. El multilingüe de Wix es otra vertical y otro proyecto. Carpetas por idioma, como en el template sin CMS, duplicarían un modelo que aquí no existe.

## Decisión

`site.locale` (default `es`) es el `lang` del `<html>`. Un proyecto puede cambiarlo. No hay routing por idioma ni skill de i18n.

El idioma de trabajo del repositorio —guías, skills, mensajes de los checks— es español.

## Alternativas

- **Carpetas `es/` y `en/` desde el día uno.** Obligarían a mantener contenido duplicado en Git, y el contenido de negocio no está en Git.
- **Activar el multilingüe de Wix dentro del template vacío.** No está pedido y metería otro vertical de fábrica.

## Consecuencias

- No hay `check:i18n`.
- Los textos legales de ejemplo están en español. Otro país no se redacta de memoria: la skill pregunta.
