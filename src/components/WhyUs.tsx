import { useLanguage } from '../i18n/LanguageContext'
import ScrollReveal from './ScrollReveal'
import './WhyUs.css'

export default function WhyUs() {
  const { t } = useLanguage()

  return (
    <section className="section why-us">
      <div className="container">
        <ScrollReveal from="up">
          <div className="section-header">
            <span className="section-label">{t.ui.whyUs}</span>
            <h2 className="section-title">{t.whyUs.title}</h2>
            <p className="section-subtitle">{t.whyUs.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="why-us__grid">
          {t.whyUs.items.map((item, i) => (
            <article key={item.title} className="why-card">
              <span className="why-card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="why-card__title">{item.title}</h3>
              <p className="why-card__desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
