import { useLanguage } from '../i18n/LanguageContext'
import ScrollReveal from './ScrollReveal'
import './Testimonials.css'

export default function Testimonials() {
  const { t } = useLanguage()
  const c = t.testimonials

  return (
    <section className="section testimonials">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-label">{t.ui.reviews}</span>
            <h2 className="section-title">{c.title}</h2>
          </div>
        </ScrollReveal>

        <div className="testimonials__grid">
          {c.items.map((item, i) => (
            <ScrollReveal key={`${item.author}-${item.country}`} delay={i * 100}>
              <blockquote className="testimonial-card">
                <p className="testimonial-card__quote">"{item.quote}"</p>
                <footer className="testimonial-card__author">
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                  <span className="testimonial-card__country">{item.country}</span>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
