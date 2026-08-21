import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import './Products.css'

export default function Products() {
  const { t, lang } = useLanguage()

  return (
    <section id="products" className="section products">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Products</span>
          <h2 className="section-title">{t.products.title}</h2>
          <p className="section-subtitle">{t.products.subtitle}</p>
        </div>

        <div className="products__grid">
          {t.products.items.map((item, i) => (
            <article key={item.title} className="product-card">
              <div className="product-card__image-wrap">
                <img
                  src={images.products[i].src}
                  alt={images.products[i].alt[lang]}
                  className="product-card__image"
                  loading="lazy"
                  width={400}
                  height={260}
                />
              </div>
              <div className="product-card__body">
                <h3 className="product-card__title">{item.title}</h3>
                <p className="product-card__desc">{item.desc}</p>
                <a href="#contact" className="product-card__link">
                  {t.nav.inquire}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
