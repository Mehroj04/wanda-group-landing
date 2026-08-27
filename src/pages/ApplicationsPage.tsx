import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/PageHero'
import Applications from '../components/Applications'
import QuoteBanner from '../components/QuoteBanner'
import ScrollReveal from '../components/ScrollReveal'
import './SimplePages.css'

export default function ApplicationsPage() {
  const { lang, t } = useLanguage()
  const p = t.pages.applicationsPage

  usePageSeo({
    lang,
    path: routes.applications,
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
          { label: t.nav.applications },
        ]}
      />

      <section className="section page-cards">
        <div className="container">
          <div className="page-cards__grid">
            {p.items.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60} from="up">
                <article className="page-card">
                  <h2 className="page-card__title">{item.title}</h2>
                  <p className="page-card__text">{item.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Applications />
      <QuoteBanner title={t.pages.common.quoteTitle} cta={t.pages.common.quoteCta} />
    </>
  )
}
