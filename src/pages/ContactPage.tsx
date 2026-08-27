import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/PageHero'
import Contact from '../components/Contact'

export default function ContactPage() {
  const { lang, t } = useLanguage()
  const p = t.pages.contactPage

  usePageSeo({
    lang,
    path: routes.contact,
    title: p.seoTitle,
    description: p.seoDescription,
  })

  return (
    <>
      <PageHero label={p.label} title={p.title} subtitle={p.subtitle} />
      <Contact hideHeader />
    </>
  )
}
