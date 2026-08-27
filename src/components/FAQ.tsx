import { useState } from 'react'
import { LangLink } from './LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import ScrollReveal from './ScrollReveal'
import './FAQ.css'

interface FAQProps {
  hideHeader?: boolean
}

export default function FAQ({ hideHeader = false }: FAQProps) {
  const { t } = useLanguage()
  const groups = t.faq.groups
  const [activeGroup, setActiveGroup] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const selectGroup = (index: number) => {
    setActiveGroup(index)
    setOpenIndex(0)
  }

  return (
    <section id="faq" className="section faq">
      <div className="container">
        {!hideHeader && (
          <ScrollReveal from="up">
            <div className="section-header">
              <span className="section-label">{t.ui.faq}</span>
              <h2 className="section-title">{t.faq.title}</h2>
              <p className="section-subtitle">{t.faq.subtitle}</p>
            </div>
          </ScrollReveal>
        )}

        <div className="faq__layout">
          <nav className="faq__tabs" aria-label={t.faq.title}>
            {groups.map((group, i) => (
              <button
                key={group.title}
                type="button"
                className={`faq__tab ${activeGroup === i ? 'faq__tab--active' : ''}`}
                onClick={() => selectGroup(i)}
                aria-pressed={activeGroup === i}
              >
                {group.title}
              </button>
            ))}
          </nav>

          {groups.map((group, gi) => (
            <div
              key={group.title}
              className="faq__panel"
              hidden={gi !== activeGroup}
            >
              <h3 className="faq__group-title">{group.title}</h3>
              <div className="faq__list">
                {group.items.map((item, i) => {
                  const open = gi === activeGroup && openIndex === i
                  return (
                    <div
                      key={item.q}
                      className={`faq-item ${open ? 'faq-item--open' : ''}`}
                    >
                      <button
                        type="button"
                        className="faq-item__question"
                        onClick={() => setOpenIndex(open ? null : i)}
                        aria-expanded={open}
                      >
                        <span>{item.q}</span>
                        <svg className="faq-item__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <div className="faq-item__answer">
                        <div className="faq-item__answer-inner">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="faq__cta">
          <p>{t.faq.cta}</p>
          <LangLink to={routes.contact} className="btn btn-primary">{t.faq.ctaBtn}</LangLink>
        </div>
      </div>
    </section>
  )
}
