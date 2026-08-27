import { useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { pageUrl } from '../config/seo'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/PageHero'
import FAQ from '../components/FAQ'
import QuoteBanner from '../components/QuoteBanner'
import { setJsonLd } from '../utils/jsonLd'

const FAQ_SCRIPT_ID = 'faq-jsonld'

export default function FaqPage() {
  const { lang, t } = useLanguage()
  const p = t.pages.faq

  usePageSeo({
    lang,
    path: routes.faq,
    title: p.seoTitle,
    description: p.seoDescription,
  })

  useEffect(() => {
    const mainEntities = t.faq.groups.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    )

    return setJsonLd(FAQ_SCRIPT_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: mainEntities,
      url: pageUrl(routes.faq, lang),
    })
  }, [t.faq.groups, lang])

  return (
    <>
      <PageHero
        label={p.label}
        title={p.title}
        subtitle={p.subtitle}
        breadcrumbs={[
          { label: t.nav.home, to: routes.home },
          { label: t.nav.faq },
        ]}
      />
      <FAQ hideHeader />
      <QuoteBanner title={t.pages.common.quoteTitle} cta={t.pages.common.quoteCta} />
    </>
  )
}
