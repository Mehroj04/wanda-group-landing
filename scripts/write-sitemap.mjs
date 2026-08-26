import { writeFileSync } from 'node:fs'

const origin = 'https://www.wandagroups.com'
const lastmod = '2026-08-26'
const codes = [
  'en', 'zh', 'ru', 'ar', 'es', 'tr', 'uz', 'tg', 'kk',
  'de', 'fr', 'pt', 'it', 'pl', 'uk', 'hi', 'id', 'vi', 'ja', 'ko', 'th',
  'bn', 'bg', 'hr', 'cs', 'da', 'nl', 'fil', 'fi', 'el', 'hu', 'lv', 'lt',
  'ms', 'no', 'ro', 'sr', 'sk', 'sl', 'sw', 'sv', 'ur',
]

const loc = (code) => (code === 'en' ? `${origin}/` : `${origin}/?lang=${code}`)
const hreflang = (code) => (code === 'zh' ? 'zh-Hans' : code)
const pri = (code) => {
  if (code === 'en') return '1.0'
  if (code === 'zh' || code === 'ru') return '0.9'
  if (['uz', 'tg', 'kk', 'ar', 'tr', 'es'].includes(code)) return '0.8'
  return '0.6'
}

const xhtmlLinks = [
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc('en')}"/>`,
  ...codes.map(
    (c) => `    <xhtml:link rel="alternate" hreflang="${hreflang(c)}" href="${loc(c)}"/>`,
  ),
].join('\n')

const urls = codes
  .map(
    (c) => `  <url>
    <loc>${loc(c)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pri(c)}</priority>
${xhtmlLinks}
  </url>`,
  )
  .join('\n')

writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
)

console.log(`wrote public/sitemap.xml (${codes.length} urls, xhtml hreflang)`)
