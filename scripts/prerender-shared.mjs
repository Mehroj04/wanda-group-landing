/**
 * Shared helpers for post-build selective prerender (English default).
 */
import fs from 'fs'
import path from 'path'

export const ROOT = path.resolve(import.meta.dirname, '..')
export const DIST = path.join(ROOT, 'dist')
export const EN = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/i18n/locales/en.json'), 'utf8'))

export const SITE_ORIGIN = 'https://www.wandagroups.com'
export const SITE_BRAND = 'Wanda Group'

export const LANG_CODES = [
  'ar', 'bn', 'bg', 'hr', 'cs', 'da', 'nl', 'en', 'fil', 'fi', 'fr', 'de', 'el', 'hi', 'hu', 'id',
  'it', 'ja', 'kk', 'ko', 'lv', 'lt', 'ms', 'no', 'pl', 'pt', 'ro', 'ru', 'sr', 'sk', 'sl', 'es',
  'sw', 'sv', 'th', 'tr', 'uk', 'ur', 'uz', 'tg', 'vi', 'zh',
]

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function htmlLang(lang) {
  return lang === 'zh' ? 'zh-Hans' : lang
}

export function pageUrl(pathname, lang) {
  const base = pathname === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${pathname}`
  if (lang === 'en') return base
  const join = base.includes('?') ? '&' : '?'
  return `${base}${join}lang=${lang}`
}

export function buildTitle(seoTitle) {
  return seoTitle.includes(SITE_BRAND) ? seoTitle : `${seoTitle} | ${SITE_BRAND}`
}

export function replaceMeta(html, attr, key, content) {
  const re = new RegExp(
    `<meta ${attr}="${key}" content="[^"]*"\\s*/?>|<meta ${attr}="${key}"\\s+content="[^"]*"\\s*/?>`
  )
  if (re.test(html)) {
    return html.replace(re, `<meta ${attr}="${key}" content="${esc(content)}" />`)
  }
  return html
}

export function applyHead(html, { pathname, title, description, image, jsonLd }) {
  const fullTitle = buildTitle(title)
  const canonical = pageUrl(pathname, 'en')
  const ogImage = image?.startsWith('http') ? image : `${SITE_ORIGIN}${image || '/images/wg/product-acetylene.jpg'}`

  let out = html
  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`)
  out = replaceMeta(out, 'name', 'description', description)
  out = replaceMeta(out, 'property', 'og:title', fullTitle)
  out = replaceMeta(out, 'property', 'og:description', description)
  out = replaceMeta(out, 'property', 'og:url', canonical)
  out = replaceMeta(out, 'property', 'og:image', ogImage)
  out = replaceMeta(out, 'property', 'og:image:alt', `${SITE_BRAND} — ${title}`)
  out = replaceMeta(out, 'name', 'twitter:title', fullTitle)
  out = replaceMeta(out, 'name', 'twitter:description', description)
  out = replaceMeta(out, 'name', 'twitter:image', ogImage)

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

  const jsonLdScript = `<script type="application/ld+json" id="page-jsonld">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`
  out = out.replace(
    /<script type="application\/ld\+json" id="site-jsonld-static">[\s\S]*?<\/script>/,
    jsonLdScript
  )

  return out
}

export function applyBody(html, bodyHtml) {
  let out = html.replace(/<div id="root"><\/div>/, `<div id="root">${bodyHtml}</div>`)
  out = out.replace(
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript><p>${esc('Full page content is available in the document above.')}</p></noscript>`
  )
  return out
}

export function buildBreadcrumbs(items) {
  const crumbs = items
    .map((item, i) => {
      if (item.href) {
        return `<li><a href="${pageUrl(item.href, 'en')}">${esc(item.label)}</a></li>`
      }
      return `<li>${esc(item.label)}</li>`
    })
    .join('')
  return `
    <nav aria-label="Breadcrumb">
      <ol>${crumbs}</ol>
    </nav>
  `
}

export function buildSiteNav() {
  const links = [
    ['Home', '/'],
    ['Products', '/products'],
    ['Acetylene cylinders', '/products/acetylene-cylinders'],
    ['Propane cylinders', '/products/propane-cylinders'],
    ['LPG cylinders', '/products/lpg-cylinders'],
    ['Industrial gas cylinders', '/products/industrial-gas-cylinders'],
    ['Acetylene generators', '/products/generators'],
    ['Welding accessories', '/products/welding-accessories'],
    ['Refrigeration', '/products/refrigeration'],
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

export function buildOperationsBlock() {
  const o = EN.operations
  return `
    <section>
      <h2>${esc(o.title)}</h2>
      <p><strong>${esc(o.manufacturingBase)}</strong> — ${esc(o.manufacturingCountry)}</p>
      <p><strong>${esc(o.intlSalesOffice)}</strong> — ${esc(o.intlSalesCountry)}</p>
      <p>${esc(o.description)}</p>
    </section>
  `
}

export function buildQuoteCta() {
  const c = EN.pages.common
  return `<p><a href="${pageUrl('/contact', 'en')}">${esc(c.quoteCta)}</a></p>`
}

export function writePrerenderedPage(template, pathname, bodyHtml, headOpts) {
  let html = applyHead(template, { pathname, ...headOpts })
  html = applyBody(html, bodyHtml)
  const outDir = pathname === '/' ? DIST : path.join(DIST, pathname.slice(1))
  fs.mkdirSync(outDir, { recursive: true })
  const outFile = path.join(outDir, 'index.html')
  fs.writeFileSync(outFile, html)
  return outFile
}

export function readTemplate() {
  const templatePath = path.join(DIST, 'index.html')
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found — run vite build first')
    process.exit(1)
  }
  return fs.readFileSync(templatePath, 'utf8')
}
