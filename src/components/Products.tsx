import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import './Products.css'

const detailHref = ['#product-details', '#product-details', '#product-details', '#accessories'] as const

export default function Products() {
  const { t } = useLanguage()

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
                <a href={detailHref[i]} className="btn btn-outline btn-sm product-card__btn">
                  {t.products.viewDetails}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
