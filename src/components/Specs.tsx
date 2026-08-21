import { useLanguage } from '../i18n/LanguageContext'
import './Specs.css'

const icons = ['📏', '🔧', '⚗️', '📦']

export default function Specs() {
  const { t } = useLanguage()

  return (
    <section id="specs" className="section specs">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Specifications</span>
          <h2 className="section-title">{t.specs.title}</h2>
          <p className="section-subtitle">{t.specs.subtitle}</p>
        </div>

        <div className="specs__grid">
          {t.specs.items.map((item, i) => (
            <div key={item.title} className="spec-card">
              <div className="spec-card__icon">{icons[i]}</div>
              <h3 className="spec-card__title">{item.title}</h3>
              <p className="spec-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
