import Terms from '../components/Terms'
import Breadcrumbs from '../components/Breadcrumbs'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import './LegalCrumbs.css'

export default function TermsPage() {
  const { lang, t } = useLanguage()

  usePageSeo({
    lang,
    path: routes.terms,
    title: t.pages.terms.seoTitle,
    description: t.pages.terms.seoDescription,
  })

  return (
    <>
      <div className="container legal-crumbs">
        <Breadcrumbs
          items={[
            { label: t.nav.home, to: routes.home },
            { label: t.footer.terms },
          ]}
        />
      </div>
      <Terms />
    </>
  )
}
