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
  { path: '/products', key: 'products' },
  { path: '/factory', key: 'factory' },
  { path: '/certifications', key: 'certificationsPage' },
  { path: '/oem', key: 'oem' },
  { path: '/markets', key: 'markets' },
  { path: '/applications', key: 'applicationsPage' },
  { path: '/faq', key: 'faq' },
  { path: '/contact', key: 'contactPage' },
]

function escAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
}

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

  const keyedApps = EN.applications[key]
  const appSource = slug === 'refrigeration'
    ? EN.applications.refrigerationItems
    : Array.isArray(keyedApps)
      ? keyedApps
      : EN.applications.items
  const appSnippet = appSource[0].replace(/&/g, '&amp;')

  verify(slug, file, [
    ['product slug marker', (html) => html.includes(`data-product-slug="${slug}"`)],
    ['unique h1 text', (html) => html.includes(cat.name.replace(/&/g, '&amp;'))],
    ['overview', (html) => html.includes(cat.overview.slice(0, 40))],
    ['canonical', (html) => html.includes(`rel="canonical" href="${canonical}"`)],
    ['meta description', (html) => html.includes(`<meta name="description" content="${escAttr(cat.seoDescription)}"`)],
    ['breadcrumb-jsonld', (html) => html.includes('id="page-jsonld"') && html.includes('BreadcrumbList')],
    ['no homepage jsonld', (html) => !html.includes('id="site-jsonld-static"')],
    ['no Product schema', (html) => !/"@type":\s*"Product"/.test(html)],
    ['root prerender', (html) => html.includes('data-prerender="product"')],
    ['applications', (html) => html.includes(appSnippet.slice(0, 20))],
    ['contact link', (html) => html.includes('/contact')],
    ['factory link', (html) => html.includes('/factory')],
    ['oem link', (html) => html.includes('/oem')],
    ['certifications link', (html) => html.includes('/certifications')],
    ['no dissolved acetylene for 9809-3', (html) =>
      slug !== 'acetylene-cylinders' || !html.includes('ISO 9809-3 is for dissolved')],
  ])
}

const home = EN.pages.home
const heroH1 = `Wanda Groups. ${EN.hero.title}`
const h1Count = (html) => (html.match(/<h1[\s>]/g) || []).length

verify('homepage', path.join(DIST, 'index.html'), [
  ['prerender marker', (html) => html.includes('data-prerender="home"')],
  ['filled #root', (html) => /<div id="root">[\s\S]*data-prerender="home"/.test(html)],
  ['not empty root', (html) => !html.includes('<div id="root"></div>')],
  ['not shell-only fallback', (html) => !html.includes('Wanda Groups — Industrial Gas Cylinder Manufacturer')],
  ['unique title', (html) => html.includes(`<title>${escAttr(home.seoTitle)}</title>`)],
  ['meta description', (html) => html.includes(`<meta name="description" content="${escAttr(home.seoDescription)}"`)],
  ['canonical /', (html) => html.includes('rel="canonical" href="https://www.wandagroups.com/"')],
  ['hreflang x-default', (html) => html.includes('hreflang="x-default" href="https://www.wandagroups.com/"')],
  ['hreflang en', (html) => html.includes('hreflang="en" href="https://www.wandagroups.com/"')],
  ['html lang', (html) => /<html lang="en"/.test(html)],
  ['single H1', (html) => h1Count(html) === 1],
  ['H1 text', (html) => html.includes(heroH1)],
  ['hero subtitle', (html) => html.includes(EN.hero.subtitle)],
  ['acetylene link', (html) => html.includes('/products/acetylene-cylinders')],
  ['propane link', (html) => html.includes('/products/propane-cylinders')],
  ['lpg link', (html) => html.includes('/products/lpg-cylinders')],
  ['industrial gas link', (html) => html.includes('/products/industrial-gas-cylinders')],
  ['generators link', (html) => html.includes('/products/generators')],
  ['welding accessories link', (html) => html.includes('/products/welding-accessories')],
  ['refrigeration link', (html) => html.includes('/products/refrigeration')],
  ['about link', (html) => html.includes('/about')],
  ['factory link', (html) => html.includes('/factory')],
  ['certifications link', (html) => html.includes('/certifications')],
  ['oem link', (html) => html.includes('/oem')],
  ['contact link', (html) => html.includes('/contact')],
  ['cta quote', (html) => html.includes(EN.hero.cta)],
  ['cta products', (html) => html.includes(EN.hero.ctaSecondary)],
  ['site jsonld', (html) => html.includes('id="site-jsonld-static"')],
  ['Organization jsonld', (html) => html.includes('"Organization"')],
  ['WebSite jsonld', (html) => html.includes('"WebSite"')],
  ['WebPage jsonld', (html) => html.includes('"WebPage"')],
  ['no BreadcrumbList', (html) => !html.includes('BreadcrumbList')],
  ['no Product schema', (html) => !/"@type":\s*"Product"/.test(html)],
  ['indexable', (html) => !/name="robots"[^>]*content="noindex/.test(html)],
])

verify('404.html', path.join(DIST, '404.html'), [
  ['file exists / not-found marker', (html) => html.includes('data-prerender="not-found"')],
  ['not homepage prerender', (html) => !html.includes('data-prerender="home"')],
  ['not homepage H1', (html) => !html.includes(heroH1)],
  ['not-found H1', (html) => html.includes(EN.pages.notFound.title)],
  ['noindex', (html) => html.includes('content="noindex, follow"')],
  ['404 description', (html) => html.includes(`<meta name="description" content="${EN.pages.notFound.seoDescription}"`)],
  ['no homepage canonical', (html) => !html.includes('rel="canonical" href="https://www.wandagroups.com/"')],
  ['no homepage hreflang cluster', (html) => !html.includes('hreflang="x-default"')],
])

verify('spa.html', path.join(DIST, 'spa.html'), [
  ['empty root for SPA fallback', (html) => html.includes('<div id="root"></div>')],
  ['not homepage prerender', (html) => !html.includes('data-prerender="home"')],
])

for (const { path: pathname, key } of MARKETING_PAGES) {
  const file = fileForPath(pathname)
  const p = EN.pages[key]
  const canonical = `https://www.wandagroups.com${pathname}`

  verify(pathname, file, [
    ['page path marker', (html) => html.includes(`data-page-path="${pathname}"`)],
    ['unique h1', (html) => html.includes(p.title.replace(/&/g, '&amp;'))],
    ['canonical', (html) => html.includes(`rel="canonical" href="${canonical}"`)],
    ['meta description', (html) => html.includes(`<meta name="description" content="${escAttr(p.seoDescription)}"`)],
    ['hreflang x-default', (html) => html.includes('hreflang="x-default"')],
    ['root prerender', (html) => html.includes('data-prerender="page"')],
    ['no homepage jsonld', (html) => !html.includes('id="site-jsonld-static"')],
    ['contact link', (html) => html.includes('/contact')],
    ['operations on about/contact', (html) =>
      pathname === '/about' || pathname === '/contact'
        ? html.includes(EN.operations.manufacturingBase)
        : true],
    ['products hub categories', (html) =>
      pathname === '/products'
        ? html.includes('/products/acetylene-cylinders') &&
          html.includes('/products/propane-cylinders') &&
          html.includes('/products/lpg-cylinders') &&
          html.includes('/products/industrial-gas-cylinders') &&
          html.includes('/products/generators') &&
          html.includes('/products/welding-accessories') &&
          html.includes('/products/refrigeration') &&
          html.includes(EN.pages.products.catalog.acetylene.overview.slice(0, 40))
        : true],
    ['faq jsonld', (html) =>
      pathname === '/faq' ? html.includes('"@type": "FAQPage"') : true],
    ['certifications iso 9809-3', (html) =>
      pathname !== '/certifications' ||
      (html.includes('ISO 9809-3') && html.includes('normalized steel') && !html.includes('Dissolved acetylene cylinders'))],
    ['contact messengers', (html) =>
      pathname !== '/contact' ||
      (html.includes('@sh987789') && html.includes('+86 130 8285 5282'))],
  ])
}

const LEGAL_PAGES = [
  { path: '/privacy', title: EN.privacy.title, description: EN.pages.privacy.seoDescription },
  { path: '/terms', title: EN.terms.title, description: EN.pages.terms.seoDescription },
  { path: '/blog', title: EN.pages.blog.title, description: EN.pages.blog.seoDescription },
]

for (const { path: pathname, title, description } of LEGAL_PAGES) {
  const file = fileForPath(pathname)
  const canonical = `https://www.wandagroups.com${pathname}`
  verify(pathname, file, [
    ['legal prerender marker', (html) => html.includes('data-prerender="legal"')],
    ['h1', (html) => html.includes(title)],
    ['canonical self', (html) => html.includes(`rel="canonical" href="${canonical}"`)],
    ['noindex', (html) => html.includes('content="noindex, follow"')],
    ['no hreflang', (html) => !html.includes('hreflang="x-default"')],
    ['no homepage jsonld', (html) => !html.includes('id="site-jsonld-static"')],
    ['description', (html) => html.includes(`<meta name="description" content="${escAttr(description)}"`)],
  ])
}

if (failed) {
  console.error(`\n${failed} page(s) failed verification`)
  process.exit(1)
}

console.log('\nAll prerender checks passed')
