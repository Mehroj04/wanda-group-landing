import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import './AccessoriesBanner.css'

export default function AccessoriesBanner() {
  const { lang, t } = useLanguage()

  return (
    <section className="accessories">
      <div className="container">
        <div className="accessories__card">
          <div className="accessories__content">
            <h2 className="accessories__title">{t.accessories.title}</h2>
            <p className="accessories__text">{t.accessories.text}</p>
            <a href="#contact" className="accessories__link">
              {t.accessories.cta}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div className="accessories__image-wrap">
            <img
              src={images.accessories.src}
              alt={images.accessories.alt[lang]}
              className="accessories__image"
              loading="lazy"
              width={320}
              height={240}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
