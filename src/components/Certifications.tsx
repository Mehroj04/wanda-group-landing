import { useLanguage } from '../i18n/LanguageContext'
import ScrollReveal from './ScrollReveal'
import './Certifications.css'

export default function Certifications() {
  const { t } = useLanguage()
  const certs = t.certifications
  const process = t.process

  return (
    <>
      <section id="certifications" className="section certifications">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-label">{t.ui.certifications}</span>
              <h2 className="section-title">{certs.title}</h2>
              <p className="section-subtitle">{certs.subtitle}</p>
            </div>
          </ScrollReveal>

          <div className="certifications__grid">
            {certs.items.map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 60}>
                <div className="cert-card">
                  <div className="cert-card__badge">{item.name}</div>
                  <p className="cert-card__desc">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section order-process">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-label">{t.ui.order}</span>
              <h2 className="section-title">{process.title}</h2>
              <p className="section-subtitle">{process.subtitle}</p>
            </div>
          </ScrollReveal>

          <div className="order-process__steps">
            {process.steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 100}>
                <div className="process-step">
                  <div className="process-step__num">{i + 1}</div>
                  <div className="process-step__content">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                  {i < process.steps.length - 1 && <div className="process-step__line" aria-hidden />}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
