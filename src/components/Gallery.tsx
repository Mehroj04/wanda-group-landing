import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import './Gallery.css'

export default function Gallery() {
  const { lang, t } = useLanguage()

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Gallery</span>
          <h2 className="section-title">{t.gallery.title}</h2>
          <p className="section-subtitle">{t.gallery.subtitle}</p>
        </div>

        <div className="gallery__grid">
          {images.gallery.map((item, i) => (
            <figure key={item.src} className={`gallery__item gallery__item--${(i % 3) + 1}`}>
              <img
                src={item.src}
                alt={item.alt[lang]}
                loading="lazy"
                width={400}
                height={300}
              />
              <figcaption>{item.alt[lang]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
