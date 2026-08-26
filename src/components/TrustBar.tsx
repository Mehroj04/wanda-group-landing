import { useLanguage } from '../i18n/LanguageContext'
import './TrustBar.css'

export default function TrustBar() {
  const { t } = useLanguage()

  return (
    <section className="trust-stats" aria-label={t.hero.badge}>
      <div className="container trust-stats__grid">
        {t.hero.stats.map((stat) => (
          <div key={stat.label} className="trust-stats__item">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
