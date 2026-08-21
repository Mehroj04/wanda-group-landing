import { useLanguage } from '../i18n/LanguageContext'
import './Applications.css'

const appIcons = ['⚡', '✂️', '🏭', '🏗️', '🔩', '💨']

export default function Applications() {
  const { t } = useLanguage()

  return (
    <section id="applications" className="section applications">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Applications</span>
          <h2 className="section-title">{t.applications.title}</h2>
          <p className="section-subtitle">{t.applications.subtitle}</p>
        </div>

        <div className="applications__grid">
          {t.applications.items.map((item, i) => (
            <div key={item} className="app-item">
              <span className="app-item__icon">{appIcons[i]}</span>
              <span className="app-item__text">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
