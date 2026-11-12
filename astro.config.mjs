import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import wix from "@wix/astro"
import wixPages from "@wix/astro-pages"
import wixHostingAdapter from "@wix/astro-wix-hosting-adapter"
import { defineConfig } from "astro/config"

// `checkOrigin: false` is the contract of Astro managed by Wix, not an
// oversight. See docs/adr/0003-ambient-auth.md.
// `robots: false` leaves `/robots.txt` to the project's endpoint. The kit's
// endpoint clashes with that route and asks for a real client id to fetch Wix's robots.
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [wix({ robots: false }), wixPages(), react()],
  security: { checkOrigin: false },
  adapter: wixHostingAdapter(),
  image: { domains: ["static.wixstatic.com"] },
  output: "server",
})
