import { LangLink } from './LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { images } from '../config/images'
import { routes } from '../config/routes'
import OperationsInfo from './OperationsInfo'
import './About.css'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="section about">
      <div className="container about__inner">
        <div className="about__visual">
          <div className="about__image">
            <img
              src={images.about.main}
              alt={t.imageAlts.about}
              className="about__photo"
              loading="lazy"
              width={800}
              height={560}
            />
          </div>
        </div>
        <div className="about__content">
          <span className="section-label">{t.ui.about}</span>
          <h2 className="section-title about__title">{t.about.title}</h2>
          <p className="about__text">{t.about.text}</p>
          <OperationsInfo />
          <ul className="about__facts">
            {t.about.facts.map((fact) => (
              <li key={fact.title}>
                <strong>{fact.title}</strong>
                <span>{fact.desc}</span>
              </li>
            ))}
          </ul>
          <LangLink to={routes.contact} className="btn btn-primary">{t.nav.getQuote}</LangLink>
        </div>
      </div>
    </section>
  )
}
