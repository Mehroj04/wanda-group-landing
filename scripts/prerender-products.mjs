/**
 * Post-build selective prerender for product detail pages (English default).
 */
import fs from 'fs'
import path from 'path'
import {
  EN,
  esc,
  pageUrl,
  readTemplate,
  applyHead,
  applyBody,
  buildSiteNav,
  DIST,
} from './prerender-shared.mjs'

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
    image: '/images/wg/product-lpg.jpg',
    related: ['propane-cylinders', 'welding-accessories', 'industrial-gas-cylinders'],
  },
  {
    slug: 'industrial-gas-cylinders',
    catalogKey: 'industrial',
    tab: null,
    image: '/images/wg/product-industrial.jpg',
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
      return `<li><a href="${pageUrl(`/products/${slug}`, 'en')}">${esc(name)}</a></li>`
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
      return `<li><a href="${pageUrl(`/products/${slug}`, 'en')}">${esc(cat.name)}</a></li>`
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

function productApplications(product) {
  if (product.slug === 'refrigeration') {
    const items = EN.applications.refrigerationItems.map((item) => `<li>${esc(item)}</li>`).join('')
    return `<ul>${items}</ul>`
  }
  const items = EN.applications.items.map((item) => `<li>${esc(item)}</li>`).join('')
  return `<ul>${items}</ul>`
}

function buildBody(product) {
  const cat = catalogEntry(product.catalogKey)
  const pathname = `/products/${product.slug}`

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
        ${productApplications(product)}
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

function prerenderProduct(template, product) {
  const cat = catalogEntry(product.catalogKey)
  const pathname = `/products/${product.slug}`
  const body = buildBody(product)
  let html = applyHead(template, {
    pathname,
    title: cat.seoTitle,
    description: cat.seoDescription,
    image: product.image,
    jsonLd: buildBreadcrumbJsonLd(cat.name, pathname),
  })
  html = applyBody(html, body)
  return html
}

function main() {
  const template = readTemplate()
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
