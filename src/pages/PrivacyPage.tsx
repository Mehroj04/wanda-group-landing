import Privacy from '../components/Privacy'
import Breadcrumbs from '../components/Breadcrumbs'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'
import './LegalCrumbs.css'

export default function PrivacyPage() {
  const { lang, t } = useLanguage()

  usePageSeo({
    lang,
    path: routes.privacy,
    title: t.pages.privacy.seoTitle,
    description: t.pages.privacy.seoDescription,
  })

  return (
    <>
      <div className="container legal-crumbs">
        <Breadcrumbs
          items={[
            { label: t.nav.home, to: routes.home },
            { label: t.footer.privacy },
          ]}
        />
      </div>
      <Privacy />
    </>
  )
}
