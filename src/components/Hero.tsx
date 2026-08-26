import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import './Hero.css'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <div className="hero__glow hero__glow--1" />
      </div>

      <div className="container hero__content">
        <div className="hero__text">
          <span className="hero__badge">{t.hero.badge}</span>
          <h1 className="hero__title">
            <span className="hero__brand">Wanda Group</span>
            {t.hero.title}
          </h1>
          <p className="hero__subtitle">{t.hero.subtitle}</p>
          <div className="hero__actions">
            <a href="#products" className="btn btn-outline">{t.hero.ctaSecondary}</a>
            <a href="#contact" className="btn btn-primary">{t.hero.cta}</a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrap">
            <img
              src={images.hero.main}
              alt={`${t.imageAlts.hero} — Wanda Group`}
              className="hero__image"
              loading="eager"
              width={900}
              height={700}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
