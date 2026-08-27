import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import WhoWeAre from '../components/WhoWeAre'
import Products from '../components/Products'
import WhyUs from '../components/WhyUs'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import QuoteBanner from '../components/QuoteBanner'
import { LangLink } from '../components/LangLink'
import './HomePage.css'

export default function HomePage() {
  const { lang, t } = useLanguage()
  const seo = t.pages.home

  usePageSeo({
    lang,
    path: routes.home,
    title: seo.seoTitle,
    description: seo.seoDescription,
  })

  return (
    <>
      <Hero />
      <TrustBar />
      <WhoWeAre />
      <Products />
      <WhyUs />
      <QuoteBanner title={t.pages.oem.title} cta={t.pages.oem.quoteCta} to={routes.oem} />
      <Gallery
        id="factory-gallery"
        hideHeader={false}
        compact
        footer={
          <div className="home-factory-links">
            <LangLink to={routes.factory} className="btn btn-outline">
              {t.nav.factory}
            </LangLink>
            <LangLink to={routes.certifications} className="btn btn-outline">
              {t.nav.certifications}
            </LangLink>
            <LangLink to={routes.faq} className="btn btn-outline">
              {t.nav.faq}
            </LangLink>
          </div>
        }
      />
      <Contact />
    </>
  )
}
