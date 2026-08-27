import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/PageHero'
import Certifications from '../components/Certifications'
import QuoteBanner from '../components/QuoteBanner'
import './SimplePages.css'

export default function CertificationsPage() {
  const { lang, t } = useLanguage()
  const p = t.pages.certificationsPage

  usePageSeo({
    lang,
    path: routes.certifications,
    title: p.seoTitle,
    description: p.seoDescription,
  })

  return (
    <>
      <PageHero label={p.label} title={p.title} subtitle={p.subtitle} />
      <Certifications hideHeader />
      <section className="section page-cards">
        <div className="container">
          <p className="page-note">{p.note}</p>
        </div>
      </section>
      <QuoteBanner title={t.pages.common.quoteTitle} cta={t.pages.common.quoteCta} />
    </>
  )
}
