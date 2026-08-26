import type { Lang } from '../languages'
import { isSupportedLang } from '../languages'
import en from './en.json'

export type TranslationKeys = typeof en

const localeLoaders = import.meta.glob<{ default: TranslationKeys }>(['./*.json', '!./en.json'])

const cache = new Map<Lang, TranslationKeys>([['en', en]])

export function getCachedLocale(lang: Lang): TranslationKeys {
  return cache.get(lang) ?? en
}

export async function loadLocale(lang: Lang): Promise<TranslationKeys> {
  const cached = cache.get(lang)
  if (cached) return cached
  if (!isSupportedLang(lang)) return en

  const loader = localeLoaders[`./${lang}.json`]
  if (!loader) return en

  const mod = await loader()
  cache.set(lang, mod.default)
  return mod.default
}

export function prefetchLocale(lang: Lang) {
  void loadLocale(lang)
}
