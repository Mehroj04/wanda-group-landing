import { LangLink } from './LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import { routes } from '../config/routes'
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
          <h1 className="hero__title" aria-label={`Wanda Groups. ${t.hero.title}`}>
            <span className="hero__brand" aria-hidden="true">
              Wanda Groups
            </span>
            <span className="hero__headline" aria-hidden="true">
              {t.hero.title}
            </span>
          </h1>
          <p className="hero__subtitle">{t.hero.subtitle}</p>
          <div className="hero__lines">
            <LangLink to={routes.products} className="hero__line">
              {t.hero.lineGas}
            </LangLink>
            <LangLink to={routes.product('refrigeration')} className="hero__line">
              {t.hero.lineCold}
            </LangLink>
          </div>
          <div className="hero__actions">
            <LangLink to={routes.products} className="btn btn-outline">
              {t.hero.ctaSecondary}
            </LangLink>
            <LangLink to={routes.contact} className="btn btn-primary">
              {t.hero.cta}
            </LangLink>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrap">
            <img
              src={images.hero.main}
              alt={`${t.imageAlts.hero} — Wanda Groups`}
              className="hero__image"
              loading="eager"
              fetchPriority="high"
              width={900}
              height={700}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
