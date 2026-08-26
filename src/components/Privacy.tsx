import { useLanguage } from '../i18n/LanguageContext'
import { siteConfig } from '../config/site'
import ScrollReveal from './ScrollReveal'
import './Privacy.css'

export default function Privacy() {
  const { t } = useLanguage()
  const p = t.privacy

  return (
    <section id="privacy" className="section privacy">
      <div className="container">
        <ScrollReveal from="up">
          <div className="section-header">
            <span className="section-label">{p.label}</span>
            <h2 className="section-title">{p.title}</h2>
            <p className="section-subtitle">{p.updated}</p>
          </div>
        </ScrollReveal>

        <div className="privacy__body">
          {p.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {p.sections.map((section) => (
            <div key={section.title} className="privacy__block">
              <h3>{section.title}</h3>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}

          <p className="privacy__contact">
            {p.contactLead}{' '}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </div>
      </div>
    </section>
  )
}
