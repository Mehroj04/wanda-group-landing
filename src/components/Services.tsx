import { useLanguage } from '../i18n/LanguageContext'
import ScrollReveal from './ScrollReveal'
import './Services.css'

export default function Services() {
  const { t } = useLanguage()
  const c = t.services

  return (
    <section id="services" className="section services">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-label">{t.ui.services}</span>
            <h2 className="section-title">{c.title}</h2>
            <p className="section-subtitle">{c.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="services__grid">
          {c.items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 80}>
              <article className="service-card">
                <div className="service-card__icon">{item.icon}</div>
                <h3 className="service-card__title">{item.title}</h3>
                <p className="service-card__desc">{item.desc}</p>
                <ul className="service-card__points">
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
