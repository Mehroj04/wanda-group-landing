import { useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { SITE_ORIGIN } from '../config/seoBrand'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/PageHero'
import FAQ from '../components/FAQ'
import QuoteBanner from '../components/QuoteBanner'

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

    const payload = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: mainEntities,
      url: `${SITE_ORIGIN}${routes.faq}`,
    }

    let el = document.getElementById(FAQ_SCRIPT_ID) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.id = FAQ_SCRIPT_ID
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(payload)

    return () => {
      document.getElementById(FAQ_SCRIPT_ID)?.remove()
    }
  }, [t.faq.groups])

  return (
    <>
      <PageHero label={p.label} title={p.title} subtitle={p.subtitle} />
      <FAQ hideHeader />
      <QuoteBanner title={t.pages.common.quoteTitle} cta={t.pages.common.quoteCta} />
    </>
  )
}
