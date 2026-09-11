import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
const site = process.env.SITE_URL || "https://devcommunities.github.io";
export default defineConfig({
  site,
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    robotsTxt(),
  ],
});
