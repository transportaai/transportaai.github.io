import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from "kimi-plugin-inspect-react"
import Sitemap from "vite-plugin-sitemap"

// https://vite.dev/config/
export default defineConfig({
  // User/Org GitHub Pages site:
  // https://transportaai.github.io
  base: "/",
  plugins: [
    inspectAttr(), 
    react(),
    Sitemap({
      hostname: 'https://transportaai.github.io',
      dynamicRoutes: [
        '/projects',
        '/publications',
        '/projects/brisbane_connectivity',
        '/brisbane_connectivity',
        '/projects/translink_od',
        '/translink-od',
        '/projects/transitmate_chatbot',
        '/projects/feature_engineering_impact_analysis'
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})



