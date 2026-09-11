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
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const p = url.pathname;
        if (p.startsWith("/learning")) return false;
        if (p.includes("/404")) return false;
        if (p.includes("story-proj-")) return false;
        if (p.includes("thai-ai-lens")) return false;
        if (p === "/project/sabaijai/") return false;
        if (p === "/project/thaiailens/") return false;
        return true;
      },
    }),
    robotsTxt(),
  ],
});
