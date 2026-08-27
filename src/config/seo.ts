import { getLanguage, langCodes, type Lang } from '../i18n/languages'
import type { TranslationKeys } from '../i18n/locales'
import { SITE_ORIGIN, SITE_BRAND, SITE_BRAND_QUERY } from './seoBrand'

export { SITE_ORIGIN, SITE_BRAND, SITE_BRAND_QUERY }

export function pageUrl(path: string, lang: Lang) {
  const clean = path.startsWith('/') ? path : `/${path}`
  const base = clean === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${clean}`
  if (lang === 'en') return base
  const join = base.includes('?') ? '&' : '?'
  return `${base}${join}lang=${lang}`
}

/** @deprecated Prefer pageUrl(path, lang). Kept for callers that only need the homepage. */
export function homeUrl(lang: Lang) {
  return pageUrl('/', lang)
}

/** HTML lang + hreflang (Simplified Chinese is zh-Hans). */
export function htmlLang(lang: Lang) {
  return lang === 'zh' ? 'zh-Hans' : lang
}

export function syncLangInUrl(lang: Lang) {
  const url = new URL(window.location.href)
  if (lang === 'en') url.searchParams.delete('lang')
  else url.searchParams.set('lang', lang)
  const next = `${url.pathname}${url.search}${url.hash}`
  if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== next) {
    window.history.replaceState(null, '', next)
  }
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const sel = attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`
  let el = document.head.querySelector(sel) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]:not([hreflang])`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function keywordsFor(lang: Lang) {
  const brand = `${SITE_BRAND}, ${SITE_BRAND_QUERY}, wandagroups, wandagroups.com`
  if (lang === 'ru') {
    return `${brand}, производитель газовых баллонов, ацетиленовые баллоны, пропановые баллоны, газовые баллоны Китай`
  }
  if (lang === 'zh') {
    return `${brand}, 气瓶厂家, 乙炔气瓶, 丙烷气瓶, 万达气瓶`
  }
  return `${brand}, gas cylinder manufacturer, acetylene cylinder, propane cylinder, LPG cylinder, welding gas, China export, OEM gas cylinder`
}

export function syncAlternateLinks(path = '/') {
  if (typeof document === 'undefined') return
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
  const add = (hreflang: string, href: string) => {
    const el = document.createElement('link')
    el.rel = 'alternate'
    el.hreflang = hreflang
    el.href = href
    document.head.appendChild(el)
  }
  add('x-default', pageUrl(path, 'en'))
  for (const lang of langCodes) {
    add(htmlLang(lang), pageUrl(path, lang))
  }
}

export interface PageSeoInput {
  path: string
  title: string
  description: string
  image?: string
  noindex?: boolean
}

/** Apply document SEO for the current route + language. */
export function applyPageSeo(lang: Lang, seo: PageSeoInput) {
  const meta = getLanguage(lang)
  const title = seo.title.includes(SITE_BRAND) ? seo.title : `${seo.title} | ${SITE_BRAND}`
  const description = seo.description
  const url = pageUrl(seo.path, lang)
  const image = seo.image
    ? seo.image.startsWith('http')
      ? seo.image
      : `${SITE_ORIGIN}${seo.image}`
    : `${SITE_ORIGIN}/images/wg/hero.jpg`

  document.title = title
  document.documentElement.lang = htmlLang(lang)
  document.documentElement.dir = meta.rtl ? 'rtl' : 'ltr'

  upsertMeta('name', 'description', description)
  upsertMeta('name', 'keywords', keywordsFor(lang))
  upsertMeta('name', 'author', SITE_BRAND)
  upsertMeta('name', 'application-name', SITE_BRAND)
  upsertMeta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:locale', `${lang}_${meta.country.toUpperCase()}`)
  upsertMeta('property', 'og:site_name', SITE_BRAND)
  upsertMeta('property', 'og:image:alt', `${SITE_BRAND} — ${seo.title}`)
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', image)
  upsertLink('canonical', url)
  syncAlternateLinks(seo.path)
}

/** Homepage SEO from translations (legacy entry used on lang change before route hook runs). */
export function applyDocumentSeo(lang: Lang, t: TranslationKeys) {
  applyPageSeo(lang, {
    path: '/',
    title: `${SITE_BRAND} | ${SITE_BRAND_QUERY} | ${t.hero.badge}`,
    description: t.hero.subtitle,
  })
}
