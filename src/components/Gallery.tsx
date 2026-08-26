import { useLanguage } from '../i18n/LanguageContext'
import { galleryImages } from '../config/images'
import ScrollReveal from './ScrollReveal'
import './Gallery.css'

export default function Gallery() {
  const { t } = useLanguage()
  const items = t.gallery.items

  return (
    <section id="factory" className="section gallery">
      <div className="container">
        <ScrollReveal from="up">
          <div className="section-header">
            <span className="section-label">{t.nav.factory}</span>
            <h2 className="section-title">{t.gallery.title}</h2>
            <p className="section-subtitle">{t.gallery.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="gallery__grid">
          {items.map((item, i) => (
            <ScrollReveal key={galleryImages[i]} delay={(i % 6) * 30} from="fade">
              <figure className="gallery__item">
                <img
                  src={galleryImages[i]}
                  alt={item.title}
                  loading="lazy"
                  width={640}
                  height={480}
                />
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
