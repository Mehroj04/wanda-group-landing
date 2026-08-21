import { useLanguage } from '../i18n/LanguageContext'
import './QualityControl.css'

export default function QualityControl() {
  const { t } = useLanguage()

  return (
    <section id="quality" className="section quality">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Quality</span>
          <h2 className="section-title">{t.quality.title}</h2>
          <p className="section-subtitle">{t.quality.subtitle}</p>
        </div>

        <div className="quality__timeline">
          {t.quality.steps.map((step, i) => (
            <div key={step.title} className="quality-step">
              <div className="quality-step__number">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="quality-step__content">
                <h3 className="quality-step__title">{step.title}</h3>
                <p className="quality-step__desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
