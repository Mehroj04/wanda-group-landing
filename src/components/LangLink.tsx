import { forwardRef } from 'react'
import { Link, NavLink, type LinkProps, type NavLinkProps } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import type { Lang } from '../i18n/languages'

/** Preserve ?lang= on internal navigation for shareable localized URLs. */
export function withLang(to: string, lang: Lang): string {
  if (lang === 'en') return to
  const [path, hash = ''] = to.split('#')
  const url = new URL(path || '/', 'https://www.wandagroups.com')
  url.searchParams.set('lang', lang)
  const search = url.search
  return `${url.pathname}${search}${hash ? `#${hash}` : ''}`
}

export const LangLink = forwardRef<HTMLAnchorElement, LinkProps>(function LangLink({ to, ...rest }, ref) {
  const { lang } = useLanguage()
  const next = typeof to === 'string' ? withLang(to, lang) : to
  return <Link ref={ref} to={next} {...rest} />
})

export const LangNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function LangNavLink({ to, ...rest }, ref) {
  const { lang } = useLanguage()
  const next = typeof to === 'string' ? withLang(to, lang) : to
  return <NavLink ref={ref} to={next} {...rest} />
})
