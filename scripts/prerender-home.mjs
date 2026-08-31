/**
 * Post-build selective prerender for the homepage (English default).
 * Overwrites dist/index.html after copying the Vite SPA shell to spa.html / 404.html
 * so invalid routes can stay HTTP 404 without homepage content.
 */
import fs from 'fs'
import path from 'path'
import {
  DIST,
  EN,
  SITE_BRAND,
  esc,
  pageUrl,
  readTemplate,
  writePrerenderedPage,
  applyBody,
  buildSiteNav,
  replaceMeta,
} from './prerender-shared.mjs'

const FAMILIES = [
  { slug: 'acetylene-cylinders', key: 'acetylene' },
  { slug: 'propane-cylinders', key: 'propane' },
  { slug: 'lpg-cylinders', key: 'lpg' },
  { slug: 'industrial-gas-cylinders', key: 'industrial' },
  { slug: 'generators', key: 'generators' },
  { slug: 'welding-accessories', key: 'accessories' },
  { slug: 'refrigeration', key: 'refrigeration' },
]

function buildHomeBody() {
  const hero = EN.hero
  const home = EN.pages.home
  const catalog = EN.pages.products.catalog
  const who = EN.whoWeAre

  const families = FAMILIES.map(({ slug, key }) => {
    const cat = catalog[key]
    return `
      <li>
        <a href="${pageUrl(`/products/${slug}`, 'en')}">${esc(cat.name)}</a>
        <p>${esc(cat.overview)}</p>
      </li>
    `
  }).join('')

  return `
    <main id="static-prerender" data-prerender="home" data-page-path="/">
      <article>
        <p>${esc(hero.badge)}</p>
        <h1>Wanda Groups. ${esc(hero.title)}</h1>
        <p>${esc(hero.subtitle)}</p>
        <p>
          <a href="${pageUrl('/products', 'en')}">${esc(hero.ctaSecondary)}</a>
          <a href="${pageUrl('/contact', 'en')}">${esc(hero.cta)}</a>
        </p>
        <section>
          <h2>${esc(EN.pages.common.productFamilies)}</h2>
          <ul>${families}</ul>
        </section>
        <section>
          <h2>${esc(who.title)}</h2>
          <p>${esc(who.text)}</p>
          <p><a href="${pageUrl('/about', 'en')}">${esc(who.cta)}</a></p>
        </section>
        <p>${esc(home.seoDescription)}</p>
      </article>
      ${buildSiteNav()}
    </main>
  `
}

function writeSpaShell(template) {
  fs.writeFileSync(path.join(DIST, 'spa.html'), template)
}

function writeNotFoundPage(template) {
  const p = EN.pages.notFound
  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.seoTitle)} | ${esc(SITE_BRAND)}</title>`)
  html = replaceMeta(html, 'name', 'robots', 'noindex, follow')
  html = replaceMeta(html, 'name', 'description', p.seoDescription)
  html = replaceMeta(html, 'property', 'og:title', `${p.seoTitle} | ${SITE_BRAND}`)
  html = replaceMeta(html, 'property', 'og:description', p.seoDescription)
  html = replaceMeta(html, 'name', 'twitter:title', `${p.seoTitle} | ${SITE_BRAND}`)
  html = replaceMeta(html, 'name', 'twitter:description', p.seoDescription)
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, '')
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>\s*/g, '')
  html = html.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>\s*/g, '')
  html = html.replace(/<script type="application\/ld\+json"[\s\S]*?<\/script>/g, '')

  const body = `
    <main id="static-prerender" data-prerender="not-found">
      <h1>${esc(p.title)}</h1>
      <p>${esc(p.text)}</p>
      <p>
        <a href="${pageUrl('/', 'en')}">${esc(p.home)}</a>
        <a href="${pageUrl('/products', 'en')}">${esc(p.products)}</a>
        <a href="${pageUrl('/contact', 'en')}">${esc(p.contact)}</a>
      </p>
    </main>
  `
  html = applyBody(html, body)
  fs.writeFileSync(path.join(DIST, '404.html'), html)
}

function main() {
  const template = readTemplate()
  writeSpaShell(template)
  writeNotFoundPage(template)

  const home = EN.pages.home
  writePrerenderedPage(template, '/', buildHomeBody(), {
    title: home.seoTitle,
    description: home.seoDescription,
    image: '/images/wg/hero.jpg',
    preserveJsonLd: true,
  })
  console.log('prerender: /')
  console.log('wrote spa.html and 404.html for SPA fallback / HTTP 404')
}

main()
