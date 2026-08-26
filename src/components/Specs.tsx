import { useLanguage } from '../i18n/LanguageContext'
import { specImages } from '../config/story'
import ScrollReveal from './ScrollReveal'
import './Specs.css'

export default function Specs() {
  const { t } = useLanguage()

  return (
    <section id="specs" className="section specs">
      <div className="container">
        <ScrollReveal from="up">
          <div className="section-header">
            <span className="section-label">{t.ui.specs}</span>
            <h2 className="section-title">{t.specs.title}</h2>
            <p className="section-subtitle">{t.specs.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="specs__grid">
          {t.specs.items.map((item, i) => (
            <ScrollReveal key={item.title} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 90}>
              <article className="spec-card">
                <div className="spec-card__visual">
                  <img
                    src={specImages[i] ?? specImages[0]}
                    alt={item.title}
                    loading="lazy"
                    width={640}
                    height={360}
                  />
                </div>
                <div className="spec-card__content">
                  <h3 className="spec-card__title">{item.title}</h3>
                  <p className="spec-card__desc">{item.desc}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
