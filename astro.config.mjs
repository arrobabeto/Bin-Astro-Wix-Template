import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import wix from "@wix/astro"
import wixPages from "@wix/astro-pages"
import wixHostingAdapter from "@wix/astro-wix-hosting-adapter"
import { defineConfig } from "astro/config"

// `checkOrigin: false` es el contrato de Astro gestionado por Wix, no un
// descuido. Ver docs/adr/0003-auth-ambiental.md.
// `robots: false` deja `/robots.txt` al endpoint del proyecto. El del kit
// choca con esa ruta y pide un client id real para ir a buscar el robots de Wix.
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [wix({ robots: false }), wixPages(), react()],
  security: { checkOrigin: false },
  adapter: wixHostingAdapter(),
  image: { domains: ["static.wixstatic.com"] },
  output: "server",
})
