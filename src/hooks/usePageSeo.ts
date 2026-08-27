import { useEffect } from 'react'
import { applyPageSeo } from '../config/seo'
import type { Lang } from '../i18n/languages'

interface UsePageSeoOptions {
  lang: Lang
  path: string
  title: string
  description: string
  image?: string
  noindex?: boolean
}

export function usePageSeo({ lang, path, title, description, image, noindex }: UsePageSeoOptions) {
  useEffect(() => {
    applyPageSeo(lang, { path, title, description, image, noindex })
  }, [lang, path, title, description, image, noindex])
}
