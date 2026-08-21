import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import './FAQ.css'

export default function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-subtitle">{t.faq.subtitle}</p>
        </div>

        <div className="faq__list">
          {t.faq.items.map((item, i) => (
            <div
              key={item.q}
              className={`faq-item ${openIndex === i ? 'faq-item--open' : ''}`}
            >
              <button
                className="faq-item__question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.q}</span>
                <svg className="faq-item__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="faq-item__answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
