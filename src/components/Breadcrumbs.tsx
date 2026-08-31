import { useEffect } from 'react'
import { LangLink } from './LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { pageUrl } from '../config/seo'
import { setJsonLd } from '../utils/jsonLd'
import './Breadcrumbs.css'

export interface BreadcrumbItem {
  label: string
  /** Absolute site path, e.g. `/products`. Omit for current page. */
  to?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  /** When false, only render visible crumbs (no JSON-LD). Default true. */
  schema?: boolean
}

const SCRIPT_ID = 'breadcrumb-jsonld'

export default function Breadcrumbs({ items, schema = true }: BreadcrumbsProps) {
  const { lang, t } = useLanguage()

  useEffect(() => {
    if (!schema || items.length < 2) {
      return setJsonLd(SCRIPT_ID, null)
    }

    const list = items.map((item, i) => {
      const path = item.to ?? (i === items.length - 1 ? window.location.pathname : undefined)
      const entry: Record<string, unknown> = {
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
      }
      if (path) {
        entry.item = pageUrl(path, 'en')
      }
      return entry
    })

    return setJsonLd(SCRIPT_ID, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: list,
    })
  }, [items, lang, schema])

  return (
    <nav className="breadcrumbs" aria-label={t.ui.breadcrumb}>
      <ol className="breadcrumbs__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="breadcrumbs__item">
              {!isLast && item.to ? (
                <LangLink to={item.to} className="breadcrumbs__link">
                  {item.label}
                </LangLink>
              ) : (
                <span className="breadcrumbs__current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? <span className="breadcrumbs__sep" aria-hidden>/</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
