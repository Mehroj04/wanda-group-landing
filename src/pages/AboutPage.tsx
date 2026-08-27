import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/PageHero'
import About from '../components/About'
import WhyUs from '../components/WhyUs'
import Services from '../components/Services'
import QuoteBanner from '../components/QuoteBanner'

export default function AboutPage() {
  const { lang, t } = useLanguage()
  const p = t.pages.about

  usePageSeo({
    lang,
    path: routes.about,
    title: p.seoTitle,
    description: p.seoDescription,
  })

  return (
    <>
      <PageHero label={p.label} title={p.title} subtitle={p.subtitle} />
      <About />
      <WhyUs />
      <Services />
      <QuoteBanner title={t.pages.common.quoteTitle} cta={t.pages.common.quoteCta} />
    </>
  )
}
