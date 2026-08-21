import { useLanguage } from '../i18n/LanguageContext'
import './WhyUs.css'

const icons = ['🏭', '🎨', '🚢', '🛒']

export default function WhyUs() {
  const { t } = useLanguage()

  return (
    <section className="section why-us">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Why Us</span>
          <h2 className="section-title">{t.whyUs.title}</h2>
          <p className="section-subtitle">{t.whyUs.subtitle}</p>
        </div>

        <div className="why-us__grid">
          {t.whyUs.items.map((item, i) => (
            <div key={item.title} className="why-card">
              <div className="why-card__icon">{icons[i]}</div>
              <h3 className="why-card__title">{item.title}</h3>
              <p className="why-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
