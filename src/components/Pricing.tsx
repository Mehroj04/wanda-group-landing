import { useLanguage } from '../i18n/LanguageContext'
import ScrollReveal from './ScrollReveal'
import './Pricing.css'

export default function Pricing() {
  const { t } = useLanguage()
  const c = t.pricing

  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-label">{t.ui.pricing}</span>
            <h2 className="section-title">{c.title}</h2>
            <p className="section-subtitle">{c.subtitle}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="pricing__cards">
            {c.cards.map((card) => (
              <div key={card.label} className="pricing-card">
                <span className="pricing-card__label">{card.label}</span>
                <strong className="pricing-card__value">{card.value}</strong>
                <span className="pricing-card__desc">{card.desc}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="pricing__body">
          <ScrollReveal delay={120}>
            <div className="pricing__factors">
              <h3 className="pricing__factors-title">{c.factors.title}</h3>
              <ul className="pricing__factors-list">
                {c.factors.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="pricing__note">{c.note}</p>
              <a href="#contact" className="btn btn-primary">
                {t.ui.getExactQuote}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="pricing__table-wrap">
              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr>
                      {c.tableHeaders.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.samples.map((row) => (
                      <tr key={row.product}>
                        <td>{row.product}</td>
                        <td>{row.moq}</td>
                        <td className="pricing__price">{row.price}</td>
                        <td>{row.lead}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
