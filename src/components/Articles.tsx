import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import './Articles.css'

export default function Articles() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openArticle = openIndex !== null ? t.articles.items[openIndex] : null

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openIndex])

  return (
    <section id="articles" className="section articles">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.ui.blog}</span>
          <h2 className="section-title">{t.articles.title}</h2>
          <p className="section-subtitle">{t.articles.subtitle}</p>
        </div>

        <div className="articles__grid">
          {t.articles.items.map((item, i) => (
            <article
              key={item.title}
              className="article-card"
              onClick={() => setOpenIndex(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpenIndex(i)
                }
              }}
              role="button"
              tabIndex={0}
            >
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
                <button
                  type="button"
                  className="article-card__read"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenIndex(i)
                  }}
                >
                  {t.articles.readMore}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {openArticle && openIndex !== null && (
        <div
          className="article-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="article-modal__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="article-modal__close"
              onClick={() => setOpenIndex(null)}
              aria-label={t.articles.close}
            >
              ×
            </button>
            <img
              src={images.articles[openIndex]}
              alt={openArticle.title}
              className="article-modal__image"
            />
            <div className="article-modal__content">
              <span className="article-card__tag">{openArticle.tag}</span>
              <h3 id="article-modal-title" className="article-modal__title">
                {openArticle.title}
              </h3>
              {openArticle.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="article-modal__text">
                  {paragraph}
                </p>
              ))}
              <div className="article-modal__actions">
                <a href="#contact" className="btn btn-primary" onClick={() => setOpenIndex(null)}>
                  {t.nav.getQuote}
                </a>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setOpenIndex(null)}
                >
                  {t.articles.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
