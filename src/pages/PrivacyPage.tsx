import Privacy from '../components/Privacy'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'

export default function PrivacyPage() {
  const { lang, t } = useLanguage()

  usePageSeo({
    lang,
    path: routes.privacy,
    title: t.pages.privacy.seoTitle,
    description: t.pages.privacy.seoDescription,
  })

  return <Privacy />
}
