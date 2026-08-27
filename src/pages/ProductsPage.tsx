import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { productCatalog } from '../config/products'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/PageHero'
import QuoteBanner from '../components/QuoteBanner'
import Pricing from '../components/Pricing'
import Accessories from '../components/Accessories'
import ScrollReveal from '../components/ScrollReveal'
import { LangLink } from '../components/LangLink'
import './ProductsPage.css'

export default function ProductsPage() {
  const { lang, t } = useLanguage()
  const p = t.pages.products

  usePageSeo({
    lang,
    path: routes.products,
    title: p.seoTitle,
    description: p.seoDescription,
  })

  return (
    <>
      <PageHero label={p.label} title={p.title} subtitle={p.subtitle} />

      <section className="section products-page">
        <div className="container">
          <div className="products-page__grid">
            {productCatalog.map((item, i) => {
              const cat = p.catalog[item.catalogKey]
              return (
                <ScrollReveal key={item.slug} delay={(i % 3) * 60} from="up">
                  <LangLink to={routes.product(item.slug)} className="products-page__card">
                    <div className="products-page__image-wrap">
                      <img src={item.image} alt={cat.name} loading="lazy" width={640} height={400} />
                    </div>
                    <div className="products-page__body">
                      <h2 className="products-page__name">{cat.name}</h2>
                      <p className="products-page__overview">{cat.overview}</p>
                      <span className="btn btn-outline btn-sm">{t.products.viewDetails}</span>
                    </div>
                  </LangLink>
                </ScrollReveal>
              )
            })}
          </div>

          <p className="products-page__note">{p.refrigerationNote}</p>
        </div>
      </section>

      <Accessories />
      <Pricing />
      <QuoteBanner title={t.pages.common.quoteTitle} cta={t.pages.common.quoteCta} />
    </>
  )
}
