/**
 * Verify prerendered HTML contains unique crawlable content.
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')
const EN = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/i18n/locales/en.json'), 'utf8'))

const PRODUCT_SLUGS = [
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
  generators: 'generators',
  'welding-accessories': 'accessories',
  refrigeration: 'refrigeration',
}

const MARKETING_PAGES = [
  { path: '/about', key: 'about' },
  { path: '/factory', key: 'factory' },
  { path: '/certifications', key: 'certificationsPage' },
  { path: '/oem', key: 'oem' },
  { path: '/markets', key: 'markets' },
  { path: '/applications', key: 'applicationsPage' },
  { path: '/faq', key: 'faq' },
  { path: '/contact', key: 'contactPage' },
]

let failed = 0

function fileForPath(pathname) {
  if (pathname === '/') return path.join(DIST, 'index.html')
  return path.join(DIST, pathname.slice(1), 'index.html')
}

function verify(name, file, checks) {
  if (!fs.existsSync(file)) {
    console.error(`FAIL ${name}: file missing (${file})`)
    failed++
    return
  }

  const html = fs.readFileSync(file, 'utf8')
  const bad = checks.filter(([, fn]) => !fn(html))
  if (bad.length) {
    console.error(`FAIL ${name}:`, bad.map(([label]) => label).join(', '))
    failed++
  } else {
    console.log(`OK ${name}`)
  }
}

for (const slug of PRODUCT_SLUGS) {
  const file = path.join(DIST, 'products', slug, 'index.html')
  const key = CATALOG_KEYS[slug]
  const cat = EN.pages.products.catalog[key]
  const canonical = `https://www.wandagroups.com/products/${slug}`

  const appSnippet = (slug === 'refrigeration'
    ? EN.applications.refrigerationItems[0]
    : EN.applications.items[0]).replace(/&/g, '&amp;')

  verify(slug, file, [
    ['product slug marker', (html) => html.includes(`data-product-slug="${slug}"`)],
    ['unique h1 text', (html) => html.includes(cat.name.replace(/&/g, '&amp;'))],
    ['overview', (html) => html.includes(cat.overview.slice(0, 40))],
    ['canonical', (html) => html.includes(`rel="canonical" href="${canonical}"`)],
    ['breadcrumb-jsonld', (html) => html.includes('id="page-jsonld"') && html.includes('BreadcrumbList')],
    ['no homepage jsonld', (html) => !html.includes('id="site-jsonld-static"')],
    ['no Product schema', (html) => !/"@type":\s*"Product"/.test(html)],
    ['root prerender', (html) => html.includes('data-prerender="product"')],
    ['applications', (html) => html.includes(appSnippet.slice(0, 20))],
    ['contact link', (html) => html.includes('/contact')],
  ])
}

for (const { path: pathname, key } of MARKETING_PAGES) {
  const file = fileForPath(pathname)
  const p = EN.pages[key]
  const canonical = `https://www.wandagroups.com${pathname}`

  verify(pathname, file, [
    ['page path marker', (html) => html.includes(`data-page-path="${pathname}"`)],
    ['unique h1', (html) => html.includes(p.title.replace(/&/g, '&amp;'))],
    ['canonical', (html) => html.includes(`rel="canonical" href="${canonical}"`)],
    ['hreflang x-default', (html) => html.includes('hreflang="x-default"')],
    ['root prerender', (html) => html.includes('data-prerender="page"')],
    ['no homepage jsonld', (html) => !html.includes('id="site-jsonld-static"')],
    ['contact link', (html) => html.includes('/contact')],
    ['operations on about/contact', (html) =>
      pathname === '/about' || pathname === '/contact'
        ? html.includes(EN.operations.manufacturingBase)
        : true],
    ['faq jsonld', (html) =>
      pathname === '/faq' ? html.includes('"@type": "FAQPage"') : true],
  ])
}

if (failed) {
  console.error(`\n${failed} page(s) failed verification`)
  process.exit(1)
}

console.log('\nAll prerender checks passed')
