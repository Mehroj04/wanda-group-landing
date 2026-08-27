import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { htmlLang, syncLangInUrl } from '../config/seo'
import { getLanguage, isSupportedLang, type Lang } from './languages'
import { getCachedLocale, loadLocale, type TranslationKeys } from './locales'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | null>(null)
const STORAGE_KEY = 'wanda-lang'

function fromNavigator(): Lang | null {
  if (typeof navigator === 'undefined') return null
  const candidates = [...(navigator.languages ?? []), navigator.language].filter(Boolean)
  for (const raw of candidates) {
    const lower = String(raw).toLowerCase()
    if (lower.startsWith('zh')) return 'zh'
    if (lower.startsWith('fil') || lower.startsWith('tl')) return 'fil'
    if (lower.startsWith('nb') || lower.startsWith('nn') || lower.startsWith('no')) return 'no'
    const two = lower.slice(0, 2)
    if (isSupportedLang(two)) return two
  }
  return null
}

function fromUrl(): Lang | null {
  if (typeof window === 'undefined') return null
  const q = new URLSearchParams(window.location.search).get('lang')
  if (q && isSupportedLang(q)) return q
  return null
}

function detectInitialLang(): Lang {
  const fromQuery = fromUrl()
  if (fromQuery) return fromQuery
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && isSupportedLang(saved)) return saved
  } catch {
    /* ignore */
  }
  return fromNavigator() ?? 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)
  const [t, setT] = useState<TranslationKeys>(() => getCachedLocale(lang))

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    syncLangInUrl(next)
  }

  useEffect(() => {
    let live = true
    loadLocale(lang).then((next) => {
      if (!live) return
      setT(next)
      const meta = getLanguage(lang)
      document.documentElement.lang = htmlLang(lang)
      document.documentElement.dir = meta.rtl ? 'rtl' : 'ltr'
      syncLangInUrl(lang)
    })
    return () => {
      live = false
    }
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
    }),
    [lang, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export { prefetchLocale } from './locales'
