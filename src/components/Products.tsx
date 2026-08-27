import { LangLink } from './LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { images, refrigerationImages, refrigerationVideoId } from '../config/images'
import { routes } from '../config/routes'
import ScrollReveal from './ScrollReveal'
import YouTubeFacade from './YouTubeFacade'
import './Products.css'
import './Refrigeration.css'

const productLinks = [
  routes.product('acetylene-cylinders'),
  routes.product('generators'),
  routes.product('propane-cylinders'),
  routes.product('welding-accessories'),
] as const

export default function Products() {
  const { t } = useLanguage()
  const r = t.refrigeration

  return (
    <section id="products" className="section products">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.nav.products}</span>
          <h2 className="section-title">{t.products.title}</h2>
          <p className="section-subtitle">{t.products.subtitle}</p>
        </div>

        <div className="products__grid">
          {t.products.items.map((item, i) => (
            <article key={item.title} className="product-card">
              <div className="product-card__image-wrap">
                <img
                  src={images.products[i].src}
                  alt={t.imageAlts.products[i]}
                  className="product-card__image"
                  loading="lazy"
                  width={640}
                  height={420}
                />
              </div>
              <div className="product-card__body">
                <h3 className="product-card__title">{item.title}</h3>
                <p className="product-card__spec">{item.spec}</p>
                <p className="product-card__desc">{item.desc}</p>
                <LangLink to={productLinks[i]} className="btn btn-outline btn-sm product-card__btn">
                  {t.products.viewDetails}
                </LangLink>
              </div>
            </article>
          ))}
        </div>

        <div id="refrigeration" className="products__group">
          <div className="section-header products__group-head">
            <span className="section-label">{r.label}</span>
            <h2 className="section-title">{r.title}</h2>
            <p className="section-subtitle">{r.subtitle}</p>
          </div>
        </div>

        <div className="products__grid">
          {r.items.map((item, i) => (
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
                    {r.cta}
                  </LangLink>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="refrigeration__also">
          <h3 className="refrigeration__also-title">{r.alsoTitle}</h3>
          <ul className="refrigeration__also-list">
            {r.also.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="refrigeration__note">{r.note}</p>
        </div>

        <div className="refrigeration__video-head">
          <h3 className="refrigeration__video-title">{r.videoTitle}</h3>
          <p className="refrigeration__video-subtitle">{r.videoSubtitle}</p>
        </div>
        <div className="refrigeration__video">
          <YouTubeFacade videoId={refrigerationVideoId} title={r.videoTitle} />
        </div>
      </div>
    </section>
  )
}
