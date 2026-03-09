import fs from "fs"

const baseUrl = "https://transportaai.com"
const lastmod = new Date().toISOString().split("T")[0]

const routes = [
  "/",
  "/projects",
  "/publications",
  "/projects/the-great-australian-transit-showdown",
  "/projects/brisbane-connectivity",
  "/projects/translink-od",
  "/projects/transitmate-chatbot",
  "/projects/feature-engineering-impact-analysis"
]

// Generate sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("")}
</urlset>`

fs.writeFileSync("./dist/sitemap.xml", sitemap)

// Generate robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`

fs.writeFileSync("./dist/robots.txt", robots)

console.log("✅ Sitemap and robots.txt generated")