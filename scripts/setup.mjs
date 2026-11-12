#!/usr/bin/env node
/**
 * First boot. Does not create the Wix site: that is the new-site skill.
 */
import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"

const major = process.versions.node.split(".")[0]
if (major !== "22") {
  console.error(
    `This template needs Node 22 (you have ${process.versions.node}). Install Node 22 and do not continue on this version.`,
  )
  process.exit(1)
}

const required = [
  "skills/wix-headless-kit/SKILL.md",
  "skills/wix-docs/SKILL.md",
  "skills/wix-manage/SKILL.md",
]
const missing = required.filter((file) => !existsSync(file))
if (missing.length > 0) {
  console.error(
    "The clone is incomplete. Wix skills the template already ships are missing:",
  )
  for (const file of missing) console.error(`  ${file}`)
  console.error("They are not downloaded quietly. Clone the template again.")
  process.exit(1)
}

if (!existsSync("node_modules")) {
  console.error("npm install comes first.")
  process.exit(1)
}

const sync = spawnSync("npx", ["astro", "sync"], {
  stdio: "inherit",
  env: {
    ...process.env,
    // The integration requires the variable to load the config. Empty is not a
    // secret: the committed client id stays null. If `wix env pull` already
    // set it, that value is kept.
    WIX_CLIENT_ID: process.env.WIX_CLIENT_ID ?? "",
  },
})
if (sync.status !== 0) process.exit(sync.status ?? 1)

const husky = spawnSync("npx", ["husky"], { stdio: "inherit" })
if (husky.status !== 0) process.exit(husky.status ?? 1)

console.log("Next step: ask for new-site, or read docs/guides/create-site.md.")
