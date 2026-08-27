import { LangLink } from '../components/LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import ScrollReveal from './ScrollReveal'
import './WhoWeAre.css'

export default function WhoWeAre() {
  const { t } = useLanguage()
  const w = t.whoWeAre

  return (
    <section className="section who-we-are">
      <div className="container">
        <ScrollReveal from="up">
          <div className="who-we-are__panel">
            <div className="section-header who-we-are__header">
              <span className="section-label">{w.label}</span>
              <h2 className="section-title">{w.title}</h2>
            </div>
            <p className="who-we-are__text">{w.text}</p>
            <p className="who-we-are__text">{w.text2}</p>
            <LangLink to={routes.about} className="btn btn-outline">
              {w.cta}
            </LangLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
