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
  })

  return (
    <>
      <PageHero label={p.label} title={p.title} subtitle={p.subtitle} />
      <Articles hideHeader />
      <section className="section page-cards">
        <div className="container">
          <p className="page-note">{p.coming}</p>
        </div>
      </section>
    </>
  )
}
