/**
 * Post-build selective prerender for product detail pages (English default).
 * Generates dist/products/<slug>/index.html with unique crawlable content.
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')
const EN = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/i18n/locales/en.json'), 'utf8'))

const SITE_ORIGIN = 'https://www.wandagroups.com'
const SITE_BRAND = 'Wanda Group'

const LANG_CODES = [
  'ar', 'bn', 'bg', 'hr', 'cs', 'da', 'nl', 'en', 'fil', 'fi', 'fr', 'de', 'el', 'hi', 'hu', 'id',
  'it', 'ja', 'kk', 'ko', 'lv', 'lt', 'ms', 'no', 'pl', 'pt', 'ro', 'ru', 'sr', 'sk', 'sl', 'es',
  'sw', 'sv', 'th', 'tr', 'uk', 'ur', 'uz', 'tg', 'vi', 'zh',
]

const PRODUCTS = [
  {
    slug: 'acetylene-cylinders',
    catalogKey: 'acetylene',
    tab: 'acetylene',
    image: '/images/wg/product-acetylene.jpg',
    related: ['generators', 'welding-accessories', 'propane-cylinders'],
  },
  {
    slug: 'propane-cylinders',
    catalogKey: 'propane',
    tab: 'propane',
    image: '/images/wg/product-propane.jpg',
    related: ['lpg-cylinders', 'welding-accessories', 'acetylene-cylinders'],
  },
  {
    slug: 'lpg-cylinders',
    catalogKey: 'lpg',
    tab: 'propane',
    image: '/images/wg/product-propane.jpg',
    related: ['propane-cylinders', 'welding-accessories', 'industrial-gas-cylinders'],
  },
  {
    slug: 'industrial-gas-cylinders',
    catalogKey: 'industrial',
    tab: null,
    image: '/images/wg/product-acetylene.jpg',
    related: ['acetylene-cylinders', 'propane-cylinders', 'lpg-cylinders'],
    hubLinks: [
      { slug: 'acetylene-cylinders', key: 'acetylene' },
      { slug: 'propane-cylinders', key: 'propane' },
      { slug: 'lpg-cylinders', key: 'lpg' },
    ],
  },
  {
    slug: 'generators',
    catalogKey: 'generators',
    tab: 'generator',
    image: '/images/wg/product-generator.jpg',
    related: ['acetylene-cylinders', 'welding-accessories'],
  },
  {
    slug: 'welding-accessories',
    catalogKey: 'accessories',
    tab: 'accessories',
    image: '/images/wg/acc-kit-product.jpg',
    related: ['acetylene-cylinders', 'propane-cylinders', 'generators'],
  },
  {
    slug: 'refrigeration',
    catalogKey: 'refrigeration',
    tab: null,
    image: '/images/wg/ref-copeland.jpg',
    related: ['welding-accessories'],
  },
]

const REF_IMAGES = [
  '/images/wg/ref-copeland.jpg',
  '/images/wg/ref-bitzer.jpg',
  '/images/wg/ref-enclosed.jpg',
  '/images/wg/ref-four-fan.jpg',
]

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function htmlLang(lang) {
  return lang === 'zh' ? 'zh-Hans' : lang
}

function pageUrl(pathname, lang) {
  const base = pathname === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${pathname}`
  if (lang === 'en') return base
  const join = base.includes('?') ? '&' : '?'
  return `${base}${join}lang=${lang}`
}

function buildTitle(seoTitle) {
  return seoTitle.includes(SITE_BRAND) ? seoTitle : `${seoTitle} | ${SITE_BRAND}`
}

function productPath(slug) {
  return `/products/${slug}`
}

function catalogEntry(key) {
  return EN.pages.products.catalog[key]
}

function tabContent(tab) {
  return tab ? EN.productDetails[tab] : null
}

function buildSpecTable(tab) {
  const content = tabContent(tab)
  if (!content?.headers?.length) return ''

  const head = content.headers.map((h) => `<th>${esc(h)}</th>`).join('')
  const body = content.rows
    .map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`)
    .join('')

  return `
    <h2>${esc(content.tableTitle)}</h2>
    <table>
      <thead><tr>${head}</tr></thead>
      <tbody>${body}</tbody>
    </table>
    ${content.note ? `<p><em>${esc(content.note)}</em></p>` : ''}
  `
}

function buildTabBlock(tab) {
  const content = tabContent(tab)
  if (!content) return ''

  const features = content.features.map((f) => `<li>${esc(f)}</li>`).join('')
  return `
    <section>
      <h2>${esc(content.title)}</h2>
      <p>${esc(content.intro)}</p>
      <ul>${features}</ul>
      ${buildSpecTable(tab)}
    </section>
  `
}

function buildRefrigerationBlock() {
  const ref = EN.refrigeration
  const items = ref.items
    .map((item, i) => {
      const img = REF_IMAGES[i] ?? REF_IMAGES[0]
      return `
        <article>
          <h3>${esc(item.title)}</h3>
          <p><strong>${esc(item.spec)}</strong></p>
          <p>${esc(item.desc)}</p>
          <img src="${esc(img)}" alt="${esc(item.title)}" width="640" height="400" loading="lazy" />
        </article>
      `
    })
    .join('')

  const also = ref.also.map((line) => `<li>${esc(line)}</li>`).join('')

  return `
    <section>
      <h2>${esc(ref.title)}</h2>
      <p>${esc(ref.subtitle)}</p>
      ${items}
      <h3>${esc(ref.alsoTitle)}</h3>
      <ul>${also}</ul>
      <p>${esc(ref.note)}</p>
    </section>
  `
}

function buildHubLinks(hubLinks) {
  if (!hubLinks?.length) return ''
  const links = hubLinks
    .map(({ slug, key }) => {
      const name = catalogEntry(key).name
      return `<li><a href="${pageUrl(productPath(slug), 'en')}">${esc(name)}</a></li>`
    })
    .join('')
  return `
    <section>
      <h2>Product range</h2>
      <ul>${links}</ul>
    </section>
  `
}

function buildRelated(relatedSlugs) {
  const items = relatedSlugs
    .map((slug) => {
      const def = PRODUCTS.find((p) => p.slug === slug)
      if (!def) return ''
      const cat = catalogEntry(def.catalogKey)
      return `<li><a href="${pageUrl(productPath(slug), 'en')}">${esc(cat.name)}</a></li>`
    })
    .join('')

  if (!items) return ''
  return `
    <section>
      <h2>${esc(EN.pages.common.relatedProducts)}</h2>
      <ul>${items}</ul>
    </section>
  `
}

function buildSiteNav() {
  const links = [
    ['Home', '/'],
    ['Products', '/products'],
    ['About', '/about'],
    ['Factory', '/factory'],
    ['Certifications', '/certifications'],
    ['OEM', '/oem'],
    ['Contact', '/contact'],
  ]
  const items = links
    .map(([label, href]) => `<li><a href="${pageUrl(href, 'en')}">${esc(label)}</a></li>`)
    .join('')
  return `<nav aria-label="Site"><ul>${items}</ul></nav>`
}

function buildBody(product) {
  const cat = catalogEntry(product.catalogKey)
  const pathname = productPath(product.slug)
  const applications = EN.applications.items.map((item) => `<li>${esc(item)}</li>`).join('')

  const breadcrumbs = `
    <nav aria-label="Breadcrumb">
      <ol>
        <li><a href="${pageUrl('/', 'en')}">${esc(EN.nav.home)}</a></li>
        <li><a href="${pageUrl('/products', 'en')}">${esc(EN.nav.products)}</a></li>
        <li>${esc(cat.name)}</li>
      </ol>
    </nav>
  `

  const mainContent = `
    <article>
      <h1>${esc(cat.name)}</h1>
      <p>${esc(cat.overview)}</p>
      <p><a href="${pageUrl('/contact', 'en')}">${esc(EN.pages.common.quoteCta)}</a></p>
      <img src="${esc(product.image)}" alt="${esc(cat.name)}" width="800" height="560" />
      ${product.slug === 'refrigeration' ? buildRefrigerationBlock() : ''}
      ${product.hubLinks ? buildHubLinks(product.hubLinks) : ''}
      ${product.tab ? buildTabBlock(product.tab) : ''}
      <section>
        <h2>${esc(EN.pages.common.applications)}</h2>
        <ul>${applications}</ul>
      </section>
      ${buildRelated(product.related)}
    </article>
  `

  return `
    <main id="static-prerender" data-prerender="product" data-product-slug="${esc(product.slug)}">
      ${breadcrumbs}
      ${mainContent}
      ${buildSiteNav()}
      <p>Email: sales@wandagroups.com · Phone / WhatsApp: +998 50 713 66 46</p>
    </main>
  `
}

function buildBreadcrumbJsonLd(catName, pathname) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: EN.nav.home,
        item: pageUrl('/', 'en'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: EN.nav.products,
        item: pageUrl('/products', 'en'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: catName,
        item: pageUrl(pathname, 'en'),
      },
    ],
  }
}

function replaceMeta(html, attr, key, content) {
  const re = new RegExp(
    `<meta ${attr}="${key}" content="[^"]*"\\s*/?>|<meta ${attr}="${key}"\\s+content="[^"]*"\\s*/?>`
  )
  if (re.test(html)) {
    return html.replace(re, `<meta ${attr}="${key}" content="${esc(content)}" />`)
  }
  return html
}

function applyHead(html, product, cat) {
  const pathname = productPath(product.slug)
  const title = buildTitle(cat.seoTitle)
  const description = cat.seoDescription
  const canonical = pageUrl(pathname, 'en')
  const image = product.image.startsWith('http') ? product.image : `${SITE_ORIGIN}${product.image}`

  let out = html
  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  out = replaceMeta(out, 'name', 'description', description)
  out = replaceMeta(out, 'property', 'og:title', title)
  out = replaceMeta(out, 'property', 'og:description', description)
  out = replaceMeta(out, 'property', 'og:url', canonical)
  out = replaceMeta(out, 'property', 'og:image', image)
  out = replaceMeta(out, 'property', 'og:image:alt', `${SITE_BRAND} — ${cat.seoTitle}`)
  out = replaceMeta(out, 'name', 'twitter:title', title)
  out = replaceMeta(out, 'name', 'twitter:description', description)
  out = replaceMeta(out, 'name', 'twitter:image', image)

  out = out.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>\s*/g, '')

  const hreflangBlock = LANG_CODES
    .map((lang) => {
      const hreflang = htmlLang(lang)
      return `<link rel="alternate" hreflang="${hreflang}" href="${pageUrl(pathname, lang)}" />`
    })
    .join('\n    ')
  const xDefault = `<link rel="alternate" hreflang="x-default" href="${pageUrl(pathname, 'en')}" />`

  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />\n    ${xDefault}\n    ${hreflangBlock}`
  )

  const breadcrumbLd = JSON.stringify(buildBreadcrumbJsonLd(cat.name, pathname), null, 2)
  const jsonLdScript = `<script type="application/ld+json" id="breadcrumb-jsonld">\n${breadcrumbLd}\n    </script>`

  out = out.replace(
    /<script type="application\/ld\+json" id="site-jsonld-static">[\s\S]*?<\/script>/,
    jsonLdScript
  )

  return out
}

function applyBody(html, bodyHtml) {
  const noscriptMain = bodyHtml.replace(/^<main[^>]*>/, '<main>').replace(/<\/main>$/, '')

  let out = html.replace(/<div id="root"><\/div>/, `<div id="root">${bodyHtml}</div>`)
  out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>${noscriptMain}</noscript>`)
  return out
}

function prerenderProduct(template, product) {
  const cat = catalogEntry(product.catalogKey)
  const body = buildBody(product)
  let html = applyHead(template, product, cat)
  html = applyBody(html, body)
  return html
}

function main() {
  const templatePath = path.join(DIST, 'index.html')
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found — run vite build first')
    process.exit(1)
  }

  const template = fs.readFileSync(templatePath, 'utf8')
  const written = []

  for (const product of PRODUCTS) {
    const outDir = path.join(DIST, 'products', product.slug)
    fs.mkdirSync(outDir, { recursive: true })
    const html = prerenderProduct(template, product)
    const outFile = path.join(outDir, 'index.html')
    fs.writeFileSync(outFile, html)
    written.push(outFile)
    console.log(`prerender: /products/${product.slug}`)
  }

  console.log(`\nPrerendered ${written.length} product pages`)
}

main()
