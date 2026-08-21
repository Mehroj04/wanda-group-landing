import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import './About.css'

export default function About() {
  const { lang, t } = useLanguage()

  return (
    <section id="about" className="section about">
      <div className="container about__inner">
        <div className="about__visual">
          <div className="about__image">
            <img
              src={images.about.main}
              alt={images.about.alt[lang]}
              className="about__photo"
              loading="lazy"
              width={600}
              height={450}
            />
          </div>
          <div className="about__badge">
            <strong>15+</strong>
            <span>{lang === 'ru' ? 'Лет' : 'Years'}</span>
          </div>
        </div>
        <div className="about__content">
          <span className="section-label">About Us</span>
          <h2 className="section-title about__title">{t.about.title}</h2>
          <p className="about__text">{t.about.text}</p>
          <p className="about__text">{t.about.text2}</p>
          <a href="#contact" className="btn btn-primary">{t.nav.getQuote}</a>
        </div>
      </div>
    </section>
  )
}
