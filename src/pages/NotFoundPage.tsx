import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import './NotFoundPage.css'

export default function NotFoundPage() {
  const { lang, t } = useLanguage()
  const location = useLocation()
  const p = t.pages.notFound
  const path = location.pathname || '/404'

  usePageSeo({
    lang,
    path,
    title: p.seoTitle,
    description: p.seoDescription,
    noindex: true,
  })

  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1 className="not-found__title">{p.title}</h1>
        <p className="not-found__text">{p.text}</p>
        <div className="not-found__actions">
          <Link to={routes.home} className="btn btn-primary">
            {p.home}
          </Link>
          <Link to={routes.products} className="btn btn-outline">
            {p.products}
          </Link>
        </div>
      </div>
    </section>
  )
}
