#!/usr/bin/env node
/** src/ does not hardcode the dev server. wix dev picks the port. */
import fs from "node:fs"
import path from "node:path"

import { reporter, walk } from "./lib/output.mjs"

const r = reporter()
const pattern = /\blocalhost\b|127\.0\.0\.1/

for (const file of walk("src")) {
  const rel = file.split(path.sep).join("/")
  fs.readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      const trimmed = line.trim()
      if (
        trimmed.startsWith("//") ||
        trimmed.startsWith("*") ||
        trimmed.startsWith("/*")
      )
        return
      if (pattern.test(line))
        r.fail(`${rel}:${index + 1}: do not hardcode the local host`)
    })
}

r.done("no local host in src/")
