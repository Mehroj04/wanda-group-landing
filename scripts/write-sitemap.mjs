import fs from 'fs'

const ORIGIN = 'https://www.wandagroups.com'
const langs = [
  'en', 'zh', 'ru', 'ar', 'es', 'tr', 'uz', 'tg', 'kk', 'de', 'fr', 'pt', 'it', 'pl', 'uk',
  'hi', 'id', 'vi', 'ja', 'ko', 'th', 'bn', 'bg', 'hr', 'cs', 'da', 'nl', 'fil', 'fi', 'el',
  'hu', 'lv', 'lt', 'ms', 'no', 'ro', 'sr', 'sk', 'sl', 'sw', 'sv', 'ur',
]

const paths = [
  '/',
  '/about',
  '/products',
  '/products/acetylene-cylinders',
  '/products/propane-cylinders',
  '/products/lpg-cylinders',
  '/products/industrial-gas-cylinders',
  '/products/generators',
  '/products/welding-accessories',
  '/products/refrigeration',
  '/factory',
  '/certifications',
  '/oem',
  '/markets',
  '/applications',
  '/faq',
  '/contact',
]

function pageUrl(path, lang) {
  const base = path === '/' ? `${ORIGIN}/` : `${ORIGIN}${path}`
  if (lang === 'en') return base
  return `${base}${base.includes('?') ? '&' : '?'}lang=${lang}`
}

function hreflang(lang) {
  return lang === 'zh' ? 'zh-Hans' : lang
}

const lastmod = new Date().toISOString().slice(0, 10)

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

for (const path of paths) {
  const priority =
    path === '/' ? '1.0' : path.startsWith('/products/') ? '0.85' : path === '/products' || path === '/contact' ? '0.9' : '0.7'
  xml += `  <url>
    <loc>${pageUrl(path, 'en')}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(path, 'en')}"/>
`
  for (const lang of langs) {
    xml += `    <xhtml:link rel="alternate" hreflang="${hreflang(lang)}" href="${pageUrl(path, lang)}"/>
`
  }
  xml += `  </url>
`
}

xml += `</urlset>
`

fs.writeFileSync('public/sitemap.xml', xml)
console.log(`sitemap.xml written (${paths.length} paths x ${langs.length} langs)`)
