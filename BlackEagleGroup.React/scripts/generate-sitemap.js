/**
 * Sitemap Generation Script
 * Generates sitemap.xml for all routes in the application
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'https://blackeaglegroup.co.za'

// Define all routes with their priorities and change frequencies
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/clients', priority: '0.8', changefreq: 'monthly' },
  { path: '/strategic-partners', priority: '0.8', changefreq: 'monthly' },
  { path: '/property-services', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/golf-events', priority: '0.9', changefreq: 'weekly' },
  
  // COT Event Routes
  { path: '/events/cot', priority: '0.8', changefreq: 'monthly' },
  { path: '/events/cot/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/events/cot/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/events/cot/team', priority: '0.7', changefreq: 'monthly' },
  
  // CSIR Event Routes
  { path: '/events/csir', priority: '0.8', changefreq: 'monthly' },
  { path: '/events/csir/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/events/csir/event-detail', priority: '0.7', changefreq: 'monthly' },
  { path: '/events/csir/contact', priority: '0.7', changefreq: 'monthly' },
  
  // CASSI Routes
  { path: '/cassi', priority: '0.8', changefreq: 'monthly' }
]

// Generate sitemap XML
function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0]
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  routes.forEach(route => {
    sitemap += `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`
  })

  sitemap += `</urlset>`

  return sitemap
}

// Write sitemap to public folder
const publicDir = path.join(__dirname, '..', 'public')
const sitemapPath = path.join(publicDir, 'sitemap.xml')

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

const sitemap = generateSitemap()
fs.writeFileSync(sitemapPath, sitemap, 'utf-8')

console.log('✅ Sitemap generated successfully at:', sitemapPath)

