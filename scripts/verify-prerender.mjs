/**
 * Verify prerendered product HTML contains unique crawlable content.
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')
const EN = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/i18n/locales/en.json'), 'utf8'))

const SLUGS = [
  'acetylene-cylinders',
  'propane-cylinders',
  'lpg-cylinders',
  'industrial-gas-cylinders',
  'generators',
  'welding-accessories',
  'refrigeration',
]

const CATALOG_KEYS = {
  'acetylene-cylinders': 'acetylene',
  'propane-cylinders': 'propane',
  'lpg-cylinders': 'lpg',
  'industrial-gas-cylinders': 'industrial',
  'generators': 'generators',
  'welding-accessories': 'accessories',
  'refrigeration': 'refrigeration',
}

let failed = 0

for (const slug of SLUGS) {
  const file = path.join(DIST, 'products', slug, 'index.html')
  if (!fs.existsSync(file)) {
    console.error(`FAIL ${slug}: file missing`)
    failed++
    continue
  }

  const html = fs.readFileSync(file, 'utf8')
  const key = CATALOG_KEYS[slug]
  const cat = EN.pages.products.catalog[key]
  const canonical = `https://www.wandagroups.com/products/${slug}`
  const checks = [
    ['product slug marker', html.includes(`data-product-slug="${slug}"`)],
    ['unique h1 text', html.includes(cat.name.replace(/&/g, '&amp;'))],
    ['overview', html.includes(cat.overview.slice(0, 40))],
    ['canonical', html.includes(`rel="canonical" href="${canonical}"`)],
    ['breadcrumb-jsonld', html.includes('id="breadcrumb-jsonld"') && html.includes('BreadcrumbList')],
    ['no homepage jsonld', !html.includes('id="site-jsonld-static"')],
    ['no Product schema', !/"@type":\s*"Product"/.test(html)],
    ['root prerender', html.includes('data-prerender="product"')],
    ['internal link /products', html.includes('/products')],
    ['contact link', html.includes('/contact')],
  ]

  const bad = checks.filter(([, ok]) => !ok)
  if (bad.length) {
    console.error(`FAIL ${slug}:`, bad.map(([name]) => name).join(', '))
    failed++
  } else {
    console.log(`OK ${slug}`)
  }
}

if (failed) {
  console.error(`\n${failed} page(s) failed verification`)
  process.exit(1)
}

console.log('\nAll product prerender checks passed')
