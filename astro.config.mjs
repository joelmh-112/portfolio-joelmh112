import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), react()],
  adapter: vercel({
    imageService: true,
  }),
  env:{
    schema:{
      API_URL:envField.string({context:"client", access:"public", description:"API URL for the backend service"}),
    }
  }
});