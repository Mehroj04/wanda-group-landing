import type { ReactNode } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { galleryImages } from '../config/images'
import { factoryVideos } from '../config/videos'
import ScrollReveal from './ScrollReveal'
import YouTubeFacade from './YouTubeFacade'
import './Gallery.css'

interface GalleryProps {
  id?: string
  hideHeader?: boolean
  /** Show fewer photos and skip YouTube embeds (home teaser). */
  compact?: boolean
  footer?: ReactNode
}

export default function Gallery({
  id = 'factory-gallery',
  hideHeader = false,
  compact = false,
  footer,
}: GalleryProps) {
  const { t } = useLanguage()
  const items = compact ? t.gallery.items.slice(0, 6) : t.gallery.items
  const images = compact ? galleryImages.slice(0, 6) : galleryImages

  return (
    <section id={id} className="section gallery">
      <div className="container">
        {!hideHeader && (
          <ScrollReveal from="up">
            <div className="section-header">
              <span className="section-label">{t.nav.factory}</span>
              <h2 className="section-title">{t.gallery.title}</h2>
              <p className="section-subtitle">{t.gallery.subtitle}</p>
            </div>
          </ScrollReveal>
        )}

        <div className="gallery__grid">
          {items.map((item, i) => (
            <ScrollReveal key={images[i]} delay={(i % 6) * 30} from="fade">
              <figure
                className={`gallery__item${images[i]?.includes('g10-pipe-welding') ? ' gallery__item--contain' : ''}`}
              >
                <img
                  src={images[i]}
                  alt={t.imageAlts.gallery[i] || item.title}
                  loading="lazy"
                  width={640}
                  height={images[i]?.includes('g10-pipe-welding') ? 853 : 480}
                />
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

        {!compact && (
          <>
            <ScrollReveal from="up">
              <div className="gallery__videos-head">
                <h3 className="gallery__videos-title">{t.gallery.videosTitle}</h3>
                <p className="gallery__videos-subtitle">{t.gallery.videosSubtitle}</p>
              </div>
            </ScrollReveal>

            <div className="gallery__videos">
              {factoryVideos.map((video) => (
                <ScrollReveal key={video.id} delay={40} from="fade">
                  <YouTubeFacade videoId={video.id} title={video.title} className="gallery__video" />
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

        {footer}
      </div>
    </section>
  )
}
