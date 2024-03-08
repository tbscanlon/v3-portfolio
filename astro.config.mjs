import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://www.scanlon.international/",
  integrations: [tailwind(), mdx(), svelte()],
  output: "hybrid",
  adapter: vercel(),
});
