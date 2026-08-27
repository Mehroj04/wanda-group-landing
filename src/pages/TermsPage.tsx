import Terms from '../components/Terms'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { usePageSeo } from '../hooks/usePageSeo'

export default function TermsPage() {
  const { lang, t } = useLanguage()

  usePageSeo({
    lang,
    path: routes.terms,
    title: t.pages.terms.seoTitle,
    description: t.pages.terms.seoDescription,
  })

  return <Terms />
}
