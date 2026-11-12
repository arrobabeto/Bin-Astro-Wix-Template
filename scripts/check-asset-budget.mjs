#!/usr/bin/env node
/** Raster > 500 KB or SVG > 200 KB in src/ or public/. */
import fs from "node:fs"
import path from "node:path"

import { reporter, walk } from "./lib/output.mjs"

const KB = 1024
const RASTER = /\.(png|jpe?g|webp|gif)$/i
const SVG = /\.svg$/i
const RASTER_MAX = 500 * KB
const SVG_MAX = 200 * KB

const r = reporter()

function kb(bytes) {
  return `${Math.round(bytes / KB)} KB`
}

for (const dir of ["src", "public"]) {
  for (const file of walk(dir)) {
    const { size } = fs.statSync(file)
    const rel = file.split(path.sep).join("/")
    if (RASTER.test(file) && size > RASTER_MAX) {
      r.fail(`${rel}: ${kb(size)} (max ${kb(RASTER_MAX)} for a raster)`)
    }
    if (SVG.test(file) && size > SVG_MAX) {
      r.fail(`${rel}: ${kb(size)} (max ${kb(SVG_MAX)} for an SVG)`)
    }
  }
}

r.done("asset weight inside the budget")
