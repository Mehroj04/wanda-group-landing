/**
 * Post-build selective prerender for marketing / trust pages (English default).
 */
import fs from 'fs'
import path from 'path'
import {
  EN,
  esc,
  pageUrl,
  readTemplate,
  writePrerenderedPage,
  buildBreadcrumbs,
  buildSiteNav,
  buildOperationsBlock,
  buildQuoteCta,
  buildContextLinks,
} from './prerender-shared.mjs'

const PAGES = [
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

function breadcrumbJsonLd(pathname, pageLabel) {
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
        name: pageLabel,
        item: pageUrl(pathname, 'en'),
      },
    ],
  }
}

function buildCardGrid(items, headingLevel = 'h2') {
  return items
    .map((item) => {
      const title = item.title ? `<${headingLevel}>${esc(item.title)}</${headingLevel}>` : ''
      const text = item.text ? `<p>${esc(item.text)}</p>` : ''
      const q = item.q ? `<h3>${esc(item.q)}</h3>` : ''
      const a = item.a ? `<p>${esc(item.a)}</p>` : ''
      return `<article>${title}${text}${q}${a}</article>`
    })
    .join('')
}

function buildProductsHubBody(p) {
  const catalog = [
    { slug: 'acetylene-cylinders', key: 'acetylene' },
    { slug: 'propane-cylinders', key: 'propane' },
    { slug: 'lpg-cylinders', key: 'lpg' },
    { slug: 'industrial-gas-cylinders', key: 'industrial' },
    { slug: 'generators', key: 'generators' },
    { slug: 'welding-accessories', key: 'accessories' },
    { slug: 'refrigeration', key: 'refrigeration' },
  ]

  const cards = catalog
    .map(({ slug, key }) => {
      const cat = p.catalog[key]
      const application = cat.application ? `<p>${esc(cat.application)}</p>` : ''
      return `
        <article>
          <h2><a href="${pageUrl(`/products/${slug}`, 'en')}">${esc(cat.name)}</a></h2>
          <p>${esc(cat.overview)}</p>
          ${application}
          <p><a href="${pageUrl(`/products/${slug}`, 'en')}">${esc(EN.products.viewDetails)}</a></p>
        </article>
      `
    })
    .join('')

  return `
    <main id="static-prerender" data-prerender="page" data-page-path="/products">
      ${buildBreadcrumbs([
        { label: EN.nav.home, href: '/' },
        { label: EN.nav.products },
      ])}
      <article>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.subtitle)}</p>
        <section>
          ${cards}
        </section>
        <p>${esc(p.refrigerationNote)}</p>
        ${buildQuoteCta()}
      </article>
      ${buildSiteNav()}
    </main>
  `
}

function buildAboutBody(p) {
  const about = EN.about
  const facts = about.facts
    .map((f) => `<li><strong>${esc(f.title)}</strong> <span>${esc(f.desc)}</span></li>`)
    .join('')
  const whyUs = EN.whyUs.items
    .map((item) => `<li><strong>${esc(item.title)}</strong> — ${esc(item.desc)}</li>`)
    .join('')

  return `
    <main id="static-prerender" data-prerender="page" data-page-path="/about">
      ${buildBreadcrumbs([
        { label: EN.nav.home, href: '/' },
        { label: EN.nav.about },
      ])}
      <article>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.subtitle)}</p>
        <section>
          <h2>${esc(about.title)}</h2>
          <p>${esc(about.text)}</p>
          <p>${esc(about.text2)}</p>
          <ul>${facts}</ul>
        </section>
        ${buildOperationsBlock()}
        <section>
          <h2>${esc(EN.whyUs.title)}</h2>
          <ul>${whyUs}</ul>
        </section>
        ${buildQuoteCta()}
        ${buildContextLinks([
          [EN.nav.factory, '/factory'],
          [EN.nav.oem, '/oem'],
          [EN.nav.products, '/products'],
          [EN.nav.contact, '/contact'],
        ])}
      </article>
      ${buildSiteNav()}
    </main>
  `
}

function buildFactoryBody(p) {
  const sections = buildCardGrid(p.sections)
  const qc = EN.quality
  const qcItems = qc.steps
    .map((item) => `<li><strong>${esc(item.title)}</strong> — ${esc(item.desc)}</li>`)
    .join('')

  return `
    <main id="static-prerender" data-prerender="page" data-page-path="/factory">
      ${buildBreadcrumbs([
        { label: EN.nav.home, href: '/' },
        { label: EN.nav.factory },
      ])}
      <article>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.subtitle)}</p>
        <section>${sections}</section>
        <section>
          <h2>${esc(qc.title)}</h2>
          <p>${esc(qc.subtitle)}</p>
          <ul>${qcItems}</ul>
        </section>
        ${buildQuoteCta()}
        ${buildContextLinks([
          [EN.nav.products, '/products'],
          [EN.nav.certifications, '/certifications'],
          [EN.nav.oem, '/oem'],
        ])}
      </article>
      ${buildSiteNav()}
    </main>
  `
}

function buildCertificationsBody(p) {
  const certs = EN.certifications.items
    .map((item) => `<article><h2>${esc(item.name)}</h2><p>${esc(item.desc)}</p></article>`)
    .join('')
  const steps = EN.process.steps
    .map((step, i) => `<article><h2>${i + 1}. ${esc(step.title)}</h2><p>${esc(step.desc)}</p></article>`)
    .join('')

  return `
    <main id="static-prerender" data-prerender="page" data-page-path="/certifications">
      ${buildBreadcrumbs([
        { label: EN.nav.home, href: '/' },
        { label: EN.nav.certifications },
      ])}
      <article>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.subtitle)}</p>
        <section>
          <h2>${esc(EN.certifications.title)}</h2>
          ${certs}
        </section>
        <section>
          <h2>${esc(EN.process.title)}</h2>
          ${steps}
        </section>
        <p>${esc(p.note)}</p>
        ${buildQuoteCta()}
        ${buildContextLinks([
          [EN.nav.factory, '/factory'],
          [EN.nav.products, '/products'],
        ])}
      </article>
      ${buildSiteNav()}
    </main>
  `
}

function buildOemBody(p) {
  const caps = buildCardGrid(p.capabilities)
  const services = EN.services.items
    .map((item) => `<li><strong>${esc(item.title)}</strong> — ${esc(item.desc)}</li>`)
    .join('')

  return `
    <main id="static-prerender" data-prerender="page" data-page-path="/oem">
      ${buildBreadcrumbs([
        { label: EN.nav.home, href: '/' },
        { label: EN.nav.oem },
      ])}
      <article>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.subtitle)}</p>
        <section>${caps}</section>
        <section>
          <h2>${esc(EN.services.title)}</h2>
          <ul>${services}</ul>
        </section>
        <p><a href="${pageUrl('/contact', 'en')}">${esc(p.quoteCta)}</a></p>
        ${buildContextLinks([
          [EN.nav.products, '/products'],
          [EN.nav.factory, '/factory'],
        ])}
      </article>
      ${buildSiteNav()}
    </main>
  `
}

function buildMarketsBody(p) {
  const regions = buildCardGrid(p.regions)
  return `
    <main id="static-prerender" data-prerender="page" data-page-path="/markets">
      ${buildBreadcrumbs([
        { label: EN.nav.home, href: '/' },
        { label: EN.nav.markets },
      ])}
      <article>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.subtitle)}</p>
        <section>${regions}</section>
        <p>${esc(p.note)}</p>
        ${buildQuoteCta()}
      </article>
      ${buildSiteNav()}
    </main>
  `
}

function buildApplicationsBody(p) {
  const items = p.items
    .map((item) => `<article><h2>${esc(item.title)}</h2><p>${esc(item.text)}</p></article>`)
    .join('')

  return `
    <main id="static-prerender" data-prerender="page" data-page-path="/applications">
      ${buildBreadcrumbs([
        { label: EN.nav.home, href: '/' },
        { label: EN.nav.applications },
      ])}
      <article>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.subtitle)}</p>
        <section>${items}</section>
        ${buildQuoteCta()}
      </article>
      ${buildSiteNav()}
    </main>
  `
}

function buildFaqBody(p) {
  const groups = EN.faq.groups
    .map((group) => {
      const items = group.items.map((item) => `<article><h3>${esc(item.q)}</h3><p>${esc(item.a)}</p></article>`).join('')
      return `<section><h2>${esc(group.title)}</h2>${items}</section>`
    })
    .join('')

  const faqCrumbs = breadcrumbJsonLd('/faq', EN.nav.faq)
  delete faqCrumbs['@context']

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      faqCrumbs,
      {
        '@type': 'FAQPage',
        mainEntity: EN.faq.groups.flatMap((group) =>
          group.items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        ),
        url: pageUrl('/faq', 'en'),
      },
    ],
  }

  return {
    body: `
      <main id="static-prerender" data-prerender="page" data-page-path="/faq">
        ${buildBreadcrumbs([
          { label: EN.nav.home, href: '/' },
          { label: EN.nav.faq },
        ])}
        <article>
          <h1>${esc(p.title)}</h1>
          <p>${esc(p.subtitle)}</p>
          ${groups}
          ${buildQuoteCta()}
        </article>
        ${buildSiteNav()}
      </main>
    `,
    jsonLd: faqJsonLd,
  }
}

function buildContactBody(p) {
  const cta = EN.cta
  return `
    <main id="static-prerender" data-prerender="page" data-page-path="/contact">
      ${buildBreadcrumbs([
        { label: EN.nav.home, href: '/' },
        { label: EN.nav.contact },
      ])}
      <article>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.subtitle)}</p>
        ${buildOperationsBlock()}
        <section>
          <h2>${esc(cta.title)}</h2>
          <p>${esc(cta.subtitle)}</p>
          <p>Email: sales@wandagroups.com</p>
          <p>Phone / WhatsApp: +998 50 713 66 46</p>
          <p>Telegram: @sh987789</p>
          <p>WeChat: +86 130 8285 5282</p>
        </section>
        ${buildQuoteCta()}
      </article>
      ${buildSiteNav()}
    </main>
  `
}

function buildBody(path, key) {
  const p = EN.pages[key]
  switch (path) {
    case '/about':
      return buildAboutBody(p)
    case '/products':
      return buildProductsHubBody(p)
    case '/factory':
      return buildFactoryBody(p)
    case '/certifications':
      return buildCertificationsBody(p)
    case '/oem':
      return buildOemBody(p)
    case '/markets':
      return buildMarketsBody(p)
    case '/applications':
      return buildApplicationsBody(p)
    case '/faq':
      return buildFaqBody(p).body
    case '/contact':
      return buildContactBody(p)
    default:
      return ''
  }
}

function pageLabel(path) {
  const map = {
    '/about': EN.nav.about,
    '/products': EN.nav.products,
    '/factory': EN.nav.factory,
    '/certifications': EN.nav.certifications,
    '/oem': EN.nav.oem,
    '/markets': EN.nav.markets,
    '/applications': EN.nav.applications,
    '/faq': EN.nav.faq,
    '/contact': EN.nav.contact,
  }
  return map[path] ?? path
}

function prerenderLegalPages(template) {
  const pages = [
    {
      path: '/privacy',
      doc: EN.privacy,
      seo: EN.pages.privacy,
      crumb: EN.footer.privacy,
    },
    {
      path: '/terms',
      doc: EN.terms,
      seo: EN.pages.terms,
      crumb: EN.footer.terms,
    },
    {
      path: '/blog',
      doc: null,
      seo: EN.pages.blog,
      crumb: EN.ui.blog,
    },
  ]

  for (const { path: pathname, doc, seo, crumb } of pages) {
    const intro = doc?.intro?.map((p) => `<p>${esc(p)}</p>`).join('') ?? `<p>${esc(EN.pages.blog.coming)}</p>`
    const sections = doc?.sections
      ?.map(
        (section) =>
          `<section><h2>${esc(section.title)}</h2>${section.body.map((p) => `<p>${esc(p)}</p>`).join('')}</section>`,
      )
      .join('') ?? ''

    const body = `
      <main id="static-prerender" data-prerender="legal" data-page-path="${pathname}">
        ${buildBreadcrumbs([
          { label: EN.nav.home, href: '/' },
          { label: crumb },
        ])}
        <article>
          <h1>${esc(doc?.title ?? EN.pages.blog.title)}</h1>
          ${doc?.updated ? `<p>${esc(doc.updated)}</p>` : `<p>${esc(EN.pages.blog.subtitle)}</p>`}
          ${intro}
          ${sections}
        </article>
        ${buildSiteNav()}
      </main>
    `

    writePrerenderedPage(template, pathname, body, {
      title: seo.seoTitle,
      description: seo.seoDescription,
      noindex: true,
      jsonLd: breadcrumbJsonLd(pathname, crumb),
    })
    console.log(`prerender: ${pathname} (noindex)`)
  }
}

function main() {
  const template = readTemplate()
  let count = 0

  for (const { path: pathname, key } of PAGES) {
    const p = EN.pages[key]
    const body = buildBody(pathname, key)
    const jsonLd =
      pathname === '/faq'
        ? buildFaqBody(p).jsonLd
        : breadcrumbJsonLd(pathname, pageLabel(pathname))

    writePrerenderedPage(template, pathname, body, {
      title: p.seoTitle,
      description: p.seoDescription,
      jsonLd,
    })
    console.log(`prerender: ${pathname}`)
    count++
  }

  prerenderLegalPages(template)

  console.log(`\nPrerendered ${count} marketing pages + legal/noindex pages`)
}

main()
