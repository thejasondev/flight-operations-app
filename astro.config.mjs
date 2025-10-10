// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://flight-operations-panel.vercel.app",
  integrations: [
    react(), 
    tailwind()
  ],
  output: "static",
  build: {
    inlineStylesheets: "never",
  },
  vite: {
    build: {
      cssMinify: true,
      minify: "terser",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['date-fns']
          }
        }
      }
    }
  },
  compressHTML: true
});
