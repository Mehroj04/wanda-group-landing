import { getLanguage, langCodes, type Lang } from '../i18n/languages'
import type { TranslationKeys } from '../i18n/locales'

export const SITE_ORIGIN = 'https://www.wandagroups.com'
export const SITE_BRAND = 'Wanda Group'
export const SITE_BRAND_QUERY = 'WandaGroups'

export function pageUrl(lang: Lang) {
  return lang === 'en' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}/?lang=${lang}`
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
  return `${brand}, gas cylinder manufacturer, acetylene cylinder, propane cylinder, LPG cylinder, welding gas, China export`
}

function documentTitle(badge: string) {
  return `${SITE_BRAND} | ${SITE_BRAND_QUERY} | ${badge}`
}

/** Keep a full hreflang set in the document for crawlers that execute JS. */
export function syncAlternateLinks() {
  if (typeof document === 'undefined') return
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
  const add = (hreflang: string, href: string) => {
    const el = document.createElement('link')
    el.rel = 'alternate'
    el.hreflang = hreflang
    el.href = href
    document.head.appendChild(el)
  }
  add('x-default', pageUrl('en'))
  for (const lang of langCodes) {
    add(htmlLang(lang), pageUrl(lang))
  }
}

export function applyDocumentSeo(lang: Lang, t: TranslationKeys) {
  const meta = getLanguage(lang)
  const title = documentTitle(t.hero.badge)
  const description = t.hero.subtitle
  const url = pageUrl(lang)

  document.title = title
  document.documentElement.lang = htmlLang(lang)
  document.documentElement.dir = meta.rtl ? 'rtl' : 'ltr'

  upsertMeta('name', 'description', description)
  upsertMeta('name', 'keywords', keywordsFor(lang))
  upsertMeta('name', 'author', SITE_BRAND)
  upsertMeta('name', 'application-name', SITE_BRAND)
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:locale', `${lang}_${meta.country.toUpperCase()}`)
  upsertMeta('property', 'og:site_name', SITE_BRAND)
  upsertMeta('property', 'og:image:alt', `${SITE_BRAND} gas cylinders`)
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertLink('canonical', url)
  syncAlternateLinks()
}
