function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

/** Subconjunto suficiente para los textos legales del repositorio. */
export function renderLegalMarkdown(markdown: string): string {
  return markdown
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const line = block.trim()
      if (line.startsWith("### ")) {
        return `<h3>${escapeHtml(line.slice(4))}</h3>`
      }
      if (line.startsWith("## ")) {
        return `<h2>${escapeHtml(line.slice(3))}</h2>`
      }
      if (line.startsWith("# ")) {
        return `<h1>${escapeHtml(line.slice(2))}</h1>`
      }
      return `<p>${escapeHtml(line).replaceAll("\n", "<br />")}</p>`
    })
    .join("\n")
}
