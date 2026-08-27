import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import './YouTubeFacade.css'

interface YouTubeFacadeProps {
  videoId: string
  title: string
  className?: string
}

/** Thumbnail + play control; iframe loads only after user click. */
export default function YouTubeFacade({ videoId, title, className = '' }: YouTubeFacadeProps) {
  const { t } = useLanguage()
  const [active, setActive] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return
    const iframe = rootRef.current?.querySelector('iframe')
    iframe?.focus()
  }, [active])

  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  if (active) {
    return (
      <div ref={rootRef} className={`yt-facade yt-facade--active ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }

  return (
    <div className={`yt-facade ${className}`}>
      <button
        type="button"
        className="yt-facade__button"
        onClick={() => setActive(true)}
        aria-label={`${t.ui.playVideo}: ${title}`}
      >
        <img src={thumb} alt="" className="yt-facade__thumb" loading="lazy" width={480} height={360} />
        <span className="yt-facade__play" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </span>
        <span className="yt-facade__title">{title}</span>
      </button>
    </div>
  )
}
