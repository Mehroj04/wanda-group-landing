import { LangLink } from './LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import ScrollReveal from './ScrollReveal'
import './Pricing.css'

/** Quote-first supply terms — no invented MOQ, prices, or lead times. */
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

        <ScrollReveal delay={120}>
          <div className="pricing__quote-only">
            <h3 className="pricing__factors-title">{c.factors.title}</h3>
            <ul className="pricing__factors-list">
              {c.factors.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="pricing__note">{c.note}</p>
            <LangLink to={routes.contact} className="btn btn-primary">
              {t.ui.getExactQuote}
            </LangLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
