import type { Lang } from '../languages'
import { isSupportedLang } from '../languages'
import { deepMerge } from '../../utils/deepMerge'
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
  // Merge onto English so new keys work before all 42 locales are updated.
  const merged = deepMerge(en, mod.default)
  cache.set(lang, merged)
  return merged
}

export function prefetchLocale(lang: Lang) {
  void loadLocale(lang)
}
