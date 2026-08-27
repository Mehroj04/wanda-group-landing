import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/PageHero'
import Gallery from '../components/Gallery'
import QualityControl from '../components/QualityControl'
import QuoteBanner from '../components/QuoteBanner'
import ScrollReveal from '../components/ScrollReveal'
import './SimplePages.css'

export default function FactoryPage() {
  const { lang, t } = useLanguage()
  const p = t.pages.factory

  usePageSeo({
    lang,
    path: routes.factory,
    title: p.seoTitle,
    description: p.seoDescription,
  })

  return (
    <>
      <PageHero
        label={p.label}
        title={p.title}
        subtitle={p.subtitle}
        breadcrumbs={[
          { label: t.nav.home, to: routes.home },
          { label: t.nav.factory },
        ]}
      />

      <section className="section page-cards">
        <div className="container">
          <div className="page-cards__grid">
            {p.sections.map((section, i) => (
              <ScrollReveal key={section.title} delay={i * 60} from="up">
                <article className="page-card">
                  <h2 className="page-card__title">{section.title}</h2>
                  <p className="page-card__text">{section.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Gallery hideHeader />
      <QualityControl />
      <QuoteBanner title={t.pages.common.quoteTitle} cta={t.pages.common.quoteCta} />
    </>
  )
}
