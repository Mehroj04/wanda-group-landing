import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { productTabs, type ProductTab } from '../config/content'
import ScrollReveal from './ScrollReveal'
import './ProductDetails.css'

export default function ProductDetails() {
  const { t } = useLanguage()
  const [active, setActive] = useState<ProductTab>('acetylene')
  const content = t.productDetails[active]
  const labels = t.productDetails.tabs

  return (
    <section id="product-details" className="section product-details">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-label">{t.ui.catalog}</span>
            <h2 className="section-title">{t.ui.catalogTitle}</h2>
            <p className="section-subtitle">{t.ui.catalogSubtitle}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="product-details__tabs" role="tablist">
            {productTabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={active === tab}
                className={`product-details__tab ${active === tab ? 'product-details__tab--active' : ''}`}
                onClick={() => setActive(tab)}
              >
                {labels[tab]}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="product-details__panel" role="tabpanel">
            <div className="product-details__intro">
              <h3 className="product-details__title">{content.title}</h3>
              <p className="product-details__desc">{content.intro}</p>
              <ul className="product-details__features">
                {content.features.map((f) => (
                  <li key={f}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4 9l3.5 3.5L14 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-details__table-section">
              <h4 className="product-details__table-title">{content.tableTitle}</h4>
              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr>
                      {content.headers.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => (
                          <td key={i}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="product-details__note">{content.note}</p>
              <a href="#contact" className="btn btn-primary product-details__cta">
                {t.ui.requestPrice}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
