import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import './Hero.css'

export default function Hero() {
  const { lang, t } = useLanguage()

  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
      </div>

      <div className="container hero__content">
        <div className="hero__text">
          <span className="hero__badge">{t.hero.badge}</span>
          <h1 className="hero__title">{t.hero.title}</h1>
          <p className="hero__subtitle">{t.hero.subtitle}</p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn-primary">
              {t.hero.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#products" className="btn btn-outline">{t.hero.ctaSecondary}</a>
          </div>
          <div className="hero__stats">
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrap">
            <img
              src={images.hero.main}
              alt={images.hero.alt[lang]}
              className="hero__image"
              loading="eager"
              width={450}
              height={550}
            />
            <div className="hero__image-overlay" />
          </div>
          <div className="hero__float hero__float--1">
            <span>🔥</span>
            <small>{lang === 'ru' ? 'Ацетилен' : 'Acetylene'}</small>
          </div>
          <div className="hero__float hero__float--2">
            <span>🛡️</span>
            <small>{lang === 'ru' ? 'ISO сертификат' : 'ISO Certified'}</small>
          </div>
          <div className="hero__float hero__float--3">
            <span>🌍</span>
            <small>{lang === 'ru' ? 'Экспорт' : 'Global Export'}</small>
          </div>
        </div>
      </div>
    </section>
  )
}
