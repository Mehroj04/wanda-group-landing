import { LangLink } from './LangLink'
import { routes } from '../config/routes'
import { useLanguage } from '../i18n/LanguageContext'
import { storySlideImages } from '../config/story'
import ScrollReveal from './ScrollReveal'
import './VisualStory.css'

export default function VisualStory() {
  const { t } = useLanguage()

  return (
    <section id="story" className="visual-story" aria-label="Product story">
      {t.story.slides.map((slide, index) => {
        const reverse = index % 2 === 1
        return (
          <article
            key={slide.id}
            className={`visual-story__panel ${reverse ? 'visual-story__panel--reverse' : ''}`}
          >
            <div className="visual-story__media">
              <ScrollReveal from={reverse ? 'right' : 'left'} className="visual-story__media-inner">
                <img
                  src={storySlideImages[index]}
                  alt={slide.title}
                  className="visual-story__image"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
                <div className="visual-story__media-glow" />
              </ScrollReveal>
            </div>

            <div className="visual-story__copy">
              <ScrollReveal from={reverse ? 'left' : 'right'} delay={120}>
                <p className="visual-story__eyebrow">{slide.eyebrow}</p>
                <h2 className="visual-story__title">{slide.title}</h2>
                <p className="visual-story__text">{slide.text}</p>
                <ul className="visual-story__points">
                  {slide.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <LangLink to={routes.contact} className="btn btn-primary visual-story__cta">
                  {t.nav.getQuote}
                </LangLink>
              </ScrollReveal>
            </div>
          </article>
        )
      })}
    </section>
  )
}
