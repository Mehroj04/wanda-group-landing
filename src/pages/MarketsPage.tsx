import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/PageHero'
import QuoteBanner from '../components/QuoteBanner'
import ScrollReveal from '../components/ScrollReveal'
import './SimplePages.css'

export default function MarketsPage() {
  const { lang, t } = useLanguage()
  const p = t.pages.markets

  usePageSeo({
    lang,
    path: routes.markets,
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
          { label: t.nav.markets },
        ]}
      />

      <section className="section page-cards">
        <div className="container">
          <div className="page-cards__grid">
            {p.regions.map((region, i) => (
              <ScrollReveal key={region.title} delay={i * 60} from="up">
                <article className="page-card">
                  <h2 className="page-card__title">{region.title}</h2>
                  <p className="page-card__text">{region.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <p className="page-note">{p.note}</p>
        </div>
      </section>

      <QuoteBanner title={t.pages.common.quoteTitle} cta={t.pages.common.quoteCta} />
    </>
  )
}
