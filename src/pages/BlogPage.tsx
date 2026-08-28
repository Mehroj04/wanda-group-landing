import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/PageHero'
import Articles from '../components/Articles'
import './SimplePages.css'

export default function BlogPage() {
  const { lang, t } = useLanguage()
  const p = t.pages.blog

  usePageSeo({
    lang,
    path: routes.blog,
    title: p.seoTitle,
    description: p.seoDescription,
    noindex: true,
  })

  return (
    <>
      <PageHero
        label={p.label}
        title={p.title}
        subtitle={p.subtitle}
        breadcrumbs={[
          { label: t.nav.home, to: routes.home },
          { label: t.ui.blog },
        ]}
      />
      <Articles hideHeader />
      <section className="section page-cards">
        <div className="container">
          <p className="page-note">{p.coming}</p>
        </div>
      </section>
    </>
  )
}
