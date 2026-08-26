import { useEffect } from 'react'
import './AccessoryModal.css'

export type AccessoryDetail = {
  title: string
  desc: string
  intro?: string
  features?: string[]
  specs?: string[]
  applications?: string[]
  quality?: string[]
}

type Props = {
  item: AccessoryDetail | null
  image: string
  detailsLabel: string
  featuresLabel: string
  specsLabel: string
  applicationsLabel: string
  qualityLabel: string
  quoteLabel: string
  closeLabel: string
  onClose: () => void
}

export default function AccessoryModal({
  item,
  image,
  featuresLabel,
  specsLabel,
  applicationsLabel,
  qualityLabel,
  quoteLabel,
  closeLabel,
  onClose,
}: Props) {
  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="accessory-modal" role="dialog" aria-modal="true" aria-label={item.title}>
      <button type="button" className="accessory-modal__backdrop" aria-label={closeLabel} onClick={onClose} />
      <div className="accessory-modal__panel">
        <button type="button" className="accessory-modal__close" onClick={onClose} aria-label={closeLabel}>
          ×
        </button>
        <div className="accessory-modal__media">
          <img src={image} alt={item.title} width={640} height={427} onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
        </div>
        <div className="accessory-modal__body">
          <h3 className="accessory-modal__title">{item.title}</h3>
          <p className="accessory-modal__intro">{item.intro || item.desc}</p>

          {item.features && item.features.length > 0 && (
            <>
              <h4 className="accessory-modal__heading">{featuresLabel}</h4>
              <ul className="accessory-modal__list">
                {item.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          )}

          {item.specs && item.specs.length > 0 && (
            <>
              <h4 className="accessory-modal__heading">{specsLabel}</h4>
              <ul className="accessory-modal__list">
                {item.specs.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          )}

          {item.applications && item.applications.length > 0 && (
            <>
              <h4 className="accessory-modal__heading">{applicationsLabel}</h4>
              <ul className="accessory-modal__list">
                {item.applications.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          )}

          {item.quality && item.quality.length > 0 && (
            <>
              <h4 className="accessory-modal__heading">{qualityLabel}</h4>
              <ul className="accessory-modal__list">
                {item.quality.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          )}

          <a href="#contact" className="btn btn-primary accessory-modal__cta" onClick={onClose}>
            {quoteLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
