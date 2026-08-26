import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { accessoryImages } from '../config/images'
import ScrollReveal from './ScrollReveal'
import AccessoryModal from './AccessoryModal'
import './Accessories.css'

export default function Accessories() {
  const { t } = useLanguage()
  const items = t.accessoriesCatalog.items
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openItem = openIndex === null ? null : items[openIndex]

  return (
    <section id="accessories" className="section accessories-catalog">
      <div className="container">
        <ScrollReveal from="up">
          <div className="section-header">
            <span className="section-label">{t.accessoriesCatalog.label}</span>
            <h2 className="section-title">{t.accessoriesCatalog.title}</h2>
            <p className="section-subtitle">{t.accessoriesCatalog.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="accessories-catalog__grid">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 40} from="up">
              <article className="accessory-card">
                <button
                  type="button"
                  className="accessory-card__media"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`${t.accessoriesCatalog.details}: ${item.title}`}
                >
                  <img
                    src={accessoryImages[i]}
                    alt={item.title}
                    loading="lazy"
                    width={480}
                    height={320}
                    onError={(e) => {
                      e.currentTarget.style.visibility = 'hidden'
                    }}
                  />
                </button>
                <div className="accessory-card__body">
                  <h3 className="accessory-card__title">{item.title}</h3>
                  <p className="accessory-card__desc">{item.desc}</p>
                  <button
                    type="button"
                    className="accessory-card__link"
                    onClick={() => setOpenIndex(i)}
                  >
                    {t.accessoriesCatalog.details}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={120}>
          <div className="accessories-catalog__why">
            <h3 className="accessories-catalog__why-title">{t.accessoriesCatalog.whyTitle}</h3>
            <ul className="accessories-catalog__why-list">
              {t.accessoriesCatalog.why.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>

      <AccessoryModal
        item={openItem}
        image={openIndex === null ? '' : accessoryImages[openIndex]}
        detailsLabel={t.accessoriesCatalog.details}
        featuresLabel={t.accessoriesCatalog.featuresLabel}
        specsLabel={t.accessoriesCatalog.specsLabel}
        applicationsLabel={t.accessoriesCatalog.applicationsLabel}
        qualityLabel={t.accessoriesCatalog.qualityLabel}
        quoteLabel={t.nav.getQuote}
        closeLabel={t.accessoriesCatalog.close}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  )
}
