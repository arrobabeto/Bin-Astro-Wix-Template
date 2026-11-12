import fs from "node:fs"
import path from "node:path"

export function reporter() {
  let failed = 0
  return {
    ok(message) {
      console.log(`ok    ${message}`)
    },
    fail(message) {
      failed += 1
      console.error(`FAIL  ${message}`)
    },
    done(message) {
      if (failed > 0) {
        console.error(`\n${failed} problem(s).`)
        process.exit(1)
      }
      console.log(`\n${message}`)
    },
  }
}

export function walk(dir) {
  if (!fs.existsSync(dir)) return []
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else if (entry.isFile()) files.push(full)
  }
  return files
}
