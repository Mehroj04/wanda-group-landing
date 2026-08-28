import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { getProductBySlug, productCatalog } from '../config/products'
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
  const cylinderCatalog = productCatalog.filter((item) => item.slug !== 'refrigeration')
  const refrigeration = getProductBySlug('refrigeration')
  const refrigerationCopy = refrigeration ? p.catalog[refrigeration.catalogKey] : null

  usePageSeo({
    lang,
    path: routes.products,
    title: p.seoTitle,
    description: p.seoDescription,
  })

  return (
    <>
      <PageHero
        label={p.label}
        title={p.title}
        subtitle={p.subtitle}
        breadcrumbs={[
          { label: t.nav.home, to: routes.home },
          { label: t.nav.products },
        ]}
      />

      <section className="section products-page">
        <div className="container">
          <div className="products-page__grid">
            {cylinderCatalog.map((item, i) => {
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
                      {'application' in cat && cat.application ? (
                        <p className="products-page__app">{cat.application}</p>
                      ) : null}
                      <span className="btn btn-outline btn-sm">{t.products.viewDetails}</span>
                    </div>
                  </LangLink>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {refrigeration && refrigerationCopy ? (
        <section className="section products-cold" aria-labelledby="products-cold-title">
          <div className="container">
            <LangLink to={routes.product(refrigeration.slug)} className="products-cold__panel">
              <div className="products-cold__media">
                <img
                  src={refrigeration.image}
                  alt={refrigerationCopy.name}
                  loading="lazy"
                  width={800}
                  height={560}
                />
              </div>
              <div className="products-cold__copy">
                <span className="section-label">{t.refrigeration.label}</span>
                <h2 id="products-cold-title" className="products-cold__title">
                  {refrigerationCopy.name}
                </h2>
                <p className="products-cold__text">{refrigerationCopy.overview}</p>
                {'application' in refrigerationCopy && refrigerationCopy.application ? (
                  <p className="products-page__app">{refrigerationCopy.application}</p>
                ) : null}
                <span className="btn btn-primary">{t.products.viewDetails}</span>
              </div>
            </LangLink>
            <p className="products-page__note">{p.refrigerationNote}</p>
          </div>
        </section>
      ) : null}

      <Accessories />
      <Pricing />
      <QuoteBanner title={t.pages.common.quoteTitle} cta={t.pages.common.quoteCta} />
    </>
  )
}
