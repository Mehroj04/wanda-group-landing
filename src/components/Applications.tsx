import { useLanguage } from '../i18n/LanguageContext'
import { applicationImages } from '../config/story'
import ScrollReveal from './ScrollReveal'
import './Applications.css'

export default function Applications() {
  const { t } = useLanguage()

  return (
    <section id="applications" className="section applications">
      <div className="container">
        <ScrollReveal from="up">
          <div className="section-header">
            <span className="section-label">{t.ui.applications}</span>
            <h2 className="section-title">{t.applications.title}</h2>
            <p className="section-subtitle">{t.applications.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="applications__grid">
          {t.applications.items.map((item, i) => (
            <ScrollReveal key={item} from="scale" delay={i * 80}>
              <article className="app-card">
                <div className="app-card__media">
                  <img
                    src={applicationImages[i] ?? applicationImages[0]}
                    alt={item}
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                  <div className="app-card__shade" />
                </div>
                <div className="app-card__body">
                  <span className="app-card__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="app-card__title">{item}</h3>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
