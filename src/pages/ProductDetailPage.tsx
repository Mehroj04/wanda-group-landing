import { useParams } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import { getProductBySlug, type ProductPageDef } from '../config/products'
import { galleryImages, refrigerationImages } from '../config/images'
import { SITE_BRAND } from '../config/seoBrand'
import { usePageSeo } from '../hooks/usePageSeo'
import Breadcrumbs from '../components/Breadcrumbs'
import QuoteBanner from '../components/QuoteBanner'
import ScrollReveal from '../components/ScrollReveal'
import { LangLink } from '../components/LangLink'
import NotFoundPage from './NotFoundPage'
import '../components/ProductDetails.css'
import '../components/Products.css'
import '../components/Refrigeration.css'
import './ProductDetailPage.css'

function applicationsForProduct(
  t: ReturnType<typeof useLanguage>['t'],
  catalogKey: ProductPageDef['catalogKey'],
  slug: string,
): string[] {
  if (slug === 'refrigeration') return t.applications.refrigerationItems
  const keyed = t.applications[catalogKey as keyof typeof t.applications]
  if (Array.isArray(keyed)) return keyed
  return t.applications.items
}

function galleryForSlug(slug: string, hero: string): string[] {
  const pick = (...srcs: readonly string[]) => srcs.filter((src) => src && src !== hero).slice(0, 4)

  if (slug.includes('propane') || slug.includes('lpg')) {
    return pick(galleryImages[5], galleryImages[2], galleryImages[12], galleryImages[3])
  }
  if (slug.includes('generator')) {
    return pick(galleryImages[14], galleryImages[7], galleryImages[9], galleryImages[4])
  }
  if (slug.includes('accessories') || slug.includes('welding')) {
    return pick(galleryImages[11], galleryImages[7], galleryImages[2], galleryImages[6])
  }
  if (slug.includes('refrigeration')) return []
  return pick(...galleryImages).slice(0, 4)
}

export default function ProductDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const product = getProductBySlug(slug)
  if (!product) return <NotFoundPage />
  return <ProductDetailView product={product} />
}

function ProductDetailView({ product }: { product: ProductPageDef }) {
  const { lang, t } = useLanguage()
  const catalog = t.pages.products.catalog[product.catalogKey]

  usePageSeo({
    lang,
    path: routes.product(product.slug),
    title: catalog.seoTitle,
    description: catalog.seoDescription,
    image: product.image,
  })

  const tabContent = product.tab ? t.productDetails[product.tab] : null
  const related = product.related
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const placeholders = t.pages.common.placeholders
  const industrialLinks = [
    { slug: 'acetylene-cylinders' as const, key: 'acetylene' as const },
    { slug: 'propane-cylinders' as const, key: 'propane' as const },
    { slug: 'lpg-cylinders' as const, key: 'lpg' as const },
  ]
  const extraGallery = galleryForSlug(product.slug, product.image)

  return (
    <>
      <section className="section product-detail">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: t.nav.home, to: routes.home },
              { label: t.nav.products, to: routes.products },
              { label: catalog.name },
            ]}
          />

          <div className="product-detail__hero">
            <div className="product-detail__media">
              <img src={product.image} alt={`${catalog.name} manufactured by ${SITE_BRAND}`} width={800} height={560} loading="eager" />
              {extraGallery.length > 0 && (
                <div className="product-detail__thumbs" aria-label={t.ui.productGallery}>
                  {extraGallery.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${catalog.name} at the ${SITE_BRAND} factory`}
                      loading="lazy"
                      width={160}
                      height={120}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="product-detail__intro">
              <h1 className="product-detail__title">{catalog.name}</h1>
              <p className="product-detail__overview">{catalog.overview}</p>
              {'familyNote' in catalog && catalog.familyNote ? (
                <p className="product-detail__overview">{catalog.familyNote}</p>
              ) : null}
              {product.catalogKey === 'propane' ? (
                <p className="product-detail__overview">
                  <LangLink to={routes.product('lpg-cylinders')}>
                    {t.pages.products.catalog.lpg.name}
                  </LangLink>
                </p>
              ) : null}
              {product.catalogKey === 'lpg' ? (
                <p className="product-detail__overview">
                  <LangLink to={routes.product('propane-cylinders')}>
                    {t.pages.products.catalog.propane.name}
                  </LangLink>
                </p>
              ) : null}
              <LangLink to={routes.contact} className="btn btn-primary">
                {t.pages.common.quoteCta}
              </LangLink>
            </div>
          </div>

          {product.slug === 'refrigeration' ? (
            <div className="product-detail__block">
              <div className="section-header products__group-head">
                <span className="section-label">{t.refrigeration.label}</span>
                <h2 className="section-title">{t.refrigeration.title}</h2>
                <p className="section-subtitle">{t.refrigeration.subtitle}</p>
              </div>
              <div className="products__grid">
                {t.refrigeration.items.map((item, i) => (
                  <ScrollReveal key={item.title} delay={(i % 2) * 80}>
                    <article className="product-card">
                      <div className="product-card__image-wrap">
                        <img
                          src={refrigerationImages[i]}
                          alt={t.imageAlts.refrigeration[i]}
                          className="product-card__image"
                          loading="lazy"
                          width={640}
                          height={400}
                        />
                      </div>
                      <div className="product-card__body">
                        <h3 className="product-card__title">{item.title}</h3>
                        <p className="product-card__spec">{item.spec}</p>
                        <p className="product-card__desc">{item.desc}</p>
                        <LangLink to={routes.contact} className="btn btn-outline btn-sm product-card__btn">
                          {t.refrigeration.cta}
                        </LangLink>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
              <div className="refrigeration__also">
                <h3 className="refrigeration__also-title">{t.refrigeration.alsoTitle}</h3>
                <ul className="refrigeration__also-list">
                  {t.refrigeration.also.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="refrigeration__note">{t.refrigeration.note}</p>
              </div>
            </div>
          ) : null}

          {product.slug === 'industrial-gas-cylinders' ? (
            <div className="product-detail__block">
              <div className="product-detail__links">
                {industrialLinks.map(({ slug: s, key }) => (
                  <LangLink key={s} to={routes.product(s)} className="btn btn-outline btn-sm">
                    {t.pages.products.catalog[key].name}
                  </LangLink>
                ))}
              </div>
            </div>
          ) : null}

          {tabContent ? (
            <div className="product-detail__block product-details__panel">
              <div className="product-details__intro">
                <h2 className="product-details__title">{tabContent.title}</h2>
                <p className="product-details__desc">{tabContent.intro}</p>
                <ul className="product-details__features">
                  {tabContent.features.map((f) => (
                    <li key={f}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path
                          d="M4 9l3.5 3.5L14 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="product-details__table-section">
                <h3 className="product-details__table-title">{tabContent.tableTitle}</h3>
                <div className="spec-table-wrap">
                  <table className="spec-table">
                    <thead>
                      <tr>
                        {tabContent.headers.map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tabContent.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, i) => (
                            <td key={`${row[0]}-${i}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="product-details__note">{tabContent.note}</p>
              </div>
            </div>
          ) : null}

          <div className="product-detail__block">
            <h2 className="product-detail__heading">{t.pages.common.applications}</h2>
            <ul className="product-detail__list">
              {applicationsForProduct(t, product.catalogKey, product.slug).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="product-detail__placeholders">
            <article>
              <h3>{t.pages.common.standardsTitle}</h3>
              <p>{placeholders.standards}</p>
            </article>
            <article>
              <h3>{t.pages.common.oemTitle}</h3>
              <p>{placeholders.oem}</p>
            </article>
            <article>
              <h3>{t.pages.common.packagingTitle}</h3>
              <p>{placeholders.packaging}</p>
            </article>
          </div>

          <div className="product-detail__block">
            <div className="product-detail__links">
              <LangLink to={routes.factory} className="btn btn-outline btn-sm">
                {t.nav.factory}
              </LangLink>
              <LangLink to={routes.oem} className="btn btn-outline btn-sm">
                {t.nav.oem}
              </LangLink>
              <LangLink to={routes.certifications} className="btn btn-outline btn-sm">
                {t.nav.certifications}
              </LangLink>
            </div>
          </div>

          {related.length > 0 ? (
            <div className="product-detail__block">
              <h2 className="product-detail__heading">{t.pages.common.relatedProducts}</h2>
              <div className="product-detail__related">
                {related.map((item) => {
                  const name = t.pages.products.catalog[item.catalogKey].name
                  return (
                    <LangLink key={item.slug} to={routes.product(item.slug)} className="product-detail__related-card">
                      <img src={item.image} alt={name} loading="lazy" width={320} height={200} />
                      <span>{name}</span>
                    </LangLink>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <QuoteBanner title={t.pages.common.quoteTitle} cta={t.pages.common.quoteCta} />
    </>
  )
}
