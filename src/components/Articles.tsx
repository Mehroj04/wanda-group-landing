import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import './Articles.css'

export default function Articles() {
  const { t } = useLanguage()

  return (
    <section className="section articles">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Blog</span>
          <h2 className="section-title">{t.articles.title}</h2>
          <p className="section-subtitle">{t.articles.subtitle}</p>
        </div>

        <div className="articles__grid">
          {t.articles.items.map((item, i) => (
            <article key={item.title} className="article-card">
              <div className="article-card__image-wrap">
                <img
                  src={images.articles[i]}
                  alt={item.title}
                  className="article-card__image"
                  loading="lazy"
                  width={400}
                  height={220}
                />
              </div>
              <div className="article-card__body">
                <span className="article-card__tag">{item.tag}</span>
                <h3 className="article-card__title">{item.title}</h3>
                <p className="article-card__desc">{item.desc}</p>
                <span className="article-card__read">{t.articles.readMore}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
