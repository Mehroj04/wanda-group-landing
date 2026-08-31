/**
 * Verify canonical + hreflang clusters on prerendered HTML.
 */
import fs from 'fs'
import path from 'path'
import { DIST, LANG_CODES, SITE_ORIGIN, htmlLang, pageUrl } from './prerender-shared.mjs'

const INDEXABLE = [
  '/',
  '/about',
  '/products',
  '/factory',
  '/certifications',
  '/oem',
  '/markets',
  '/applications',
  '/faq',
  '/contact',
  '/products/acetylene-cylinders',
  '/products/propane-cylinders',
  '/products/lpg-cylinders',
  '/products/industrial-gas-cylinders',
  '/products/generators',
  '/products/welding-accessories',
  '/products/refrigeration',
]

const EXPECTED_HREFLANG = new Set(['x-default', ...LANG_CODES.map(htmlLang)])
const VALID_LANG_PARAMS = new Set(LANG_CODES)

function fileForPath(pathname) {
  if (pathname === '/') return path.join(DIST, 'index.html')
  return path.join(DIST, pathname.slice(1), 'index.html')
}

function parseHead(html) {
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? ''
  const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)].map(
    (m) => ({ hreflang: m[1], href: m[2] })
  )
  return { canonical, alts }
}

function urlPath(href) {
  const u = new URL(href)
  const p = u.pathname.replace(/\/+$/, '')
  return p || '/'
}

function isValidAbsoluteUrl(href) {
  try {
    const u = new URL(href)
    return u.protocol === 'https:' && href.startsWith(SITE_ORIGIN)
  } catch {
    return false
  }
}

let failed = 0
const clusters = []

for (const pathname of INDEXABLE) {
  const file = fileForPath(pathname)
  if (!fs.existsSync(file)) {
    console.error(`FAIL ${pathname}: file missing`)
    failed++
    continue
  }

  const { canonical, alts } = parseHead(fs.readFileSync(file, 'utf8'))
  const issues = []
  const expectedCanonical = pageUrl(pathname, 'en')

  if (!canonical) issues.push('missing canonical')
  else if (canonical !== expectedCanonical) {
    issues.push(`canonical ${canonical} != ${expectedCanonical}`)
  }

  if (!alts.length) issues.push('missing hreflang')
  if (!alts.some((a) => a.hreflang === 'x-default')) issues.push('missing x-default')

  const seen = new Map()
  for (const alt of alts) {
    if (seen.has(alt.hreflang)) issues.push(`duplicate hreflang ${alt.hreflang}`)
    seen.set(alt.hreflang, alt.href)

    if (!EXPECTED_HREFLANG.has(alt.hreflang)) {
      issues.push(`invalid language code ${alt.hreflang}`)
    }
    if (!isValidAbsoluteUrl(alt.href)) {
      issues.push(`invalid URL ${alt.href}`)
      continue
    }

    if (urlPath(alt.href) !== pathname) {
      issues.push(`hreflang ${alt.hreflang} points at ${urlPath(alt.href)}, not ${pathname}`)
    }

    const u = new URL(alt.href)
    const langParam = u.searchParams.get('lang')
    if (alt.hreflang === 'x-default' || alt.hreflang === 'en') {
      if (langParam) issues.push(`${alt.hreflang} URL must not have lang= (${alt.href})`)
    } else {
      const expectedLang = LANG_CODES.find((code) => htmlLang(code) === alt.hreflang)
      if (!expectedLang || langParam !== expectedLang) {
        issues.push(`broken localized URL for ${alt.hreflang}: ${alt.href}`)
      }
      if (langParam && !VALID_LANG_PARAMS.has(langParam)) {
        issues.push(`invalid lang param ${langParam}`)
      }
    }
  }

  for (const code of EXPECTED_HREFLANG) {
    if (!seen.has(code)) issues.push(`missing hreflang ${code}`)
  }

  const xDefault = seen.get('x-default')
  const enHref = seen.get('en')
  if (xDefault && enHref && xDefault !== enHref) {
    issues.push('x-default does not match en')
  }
  if (canonical && xDefault && canonical !== xDefault) {
    issues.push('canonical/hreflang mismatch (x-default != canonical)')
  }
  if (canonical && enHref && canonical !== enHref) {
    issues.push('canonical/hreflang mismatch (en != canonical)')
  }
  if (enHref && enHref !== expectedCanonical) {
    issues.push(`en hreflang URL ${enHref} != ${expectedCanonical}`)
  }

  for (const lang of LANG_CODES) {
    const expected = pageUrl(pathname, lang)
    const got = seen.get(htmlLang(lang))
    if (got && got !== expected) issues.push(`${htmlLang(lang)} URL ${got} != ${expected}`)
  }

  clusters.push({ pathname, canonical, seen })

  if (issues.length) {
    console.error(`FAIL ${pathname}: ${issues.join('; ')}`)
    failed++
  } else {
    console.log(`OK ${pathname} (${alts.length} hreflang)`)
  }
}

const hrefOwners = new Map()
for (const page of clusters) {
  for (const href of page.seen.values()) {
    if (!hrefOwners.has(href)) hrefOwners.set(href, new Set())
    hrefOwners.get(href).add(page.pathname)
  }
}

for (const [href, owners] of hrefOwners) {
  if (owners.size > 1) {
    console.error(`FAIL non-reciprocal: ${href} listed by ${[...owners].join(', ')}`)
    failed++
  }
}

for (const page of clusters) {
  for (const lang of LANG_CODES) {
    const href = page.seen.get(htmlLang(lang))
    const back = page.seen.get('en')
    if (href && !back) {
      console.error(`FAIL non-reciprocal ${page.pathname}: ${lang} has no en return URL`)
      failed++
    }
  }
}

if (failed) {
  console.error(`\n${failed} hreflang check(s) failed`)
  process.exit(1)
}

console.log('\nHreflang verification passed')
