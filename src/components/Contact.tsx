import { useState, type FormEvent } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { siteConfig, getFormspreeEndpoint } from '../config/site'
import './Contact.css'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { lang, t } = useLanguage()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const endpoint = getFormspreeEndpoint()

    if (!endpoint) {
      setErrorMsg(t.cta.errorNoForm)
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    const formData = new FormData(form)
    formData.append('_subject', `Wanda Group Quote Request from ${formData.get('name')}`)
    formData.append('_language', lang)

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const data = await res.json().catch(() => null)
        setErrorMsg(data?.error || t.cta.errorGeneric)
        setStatus('error')
      }
    } catch {
      setErrorMsg(t.cta.errorGeneric)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__inner">
          <div className="contact__info">
            <span className="section-label">Contact</span>
            <h2 className="section-title contact__title">{t.cta.title}</h2>
            <p className="contact__subtitle">{t.cta.subtitle}</p>

            <div className="contact__details">
              <a href={`mailto:${siteConfig.email}`} className="contact__detail">
                <span className="contact__detail-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <span>{siteConfig.email}</span>
                </div>
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="contact__detail">
                <span className="contact__detail-icon">📞</span>
                <div>
                  <strong>{lang === 'ru' ? 'Телефон' : 'Phone'}</strong>
                  <span>{siteConfig.phone}</span>
                </div>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__detail"
              >
                <span className="contact__detail-icon">💬</span>
                <div>
                  <strong>WhatsApp</strong>
                  <span>{siteConfig.phone}</span>
                </div>
              </a>
              <div className="contact__detail">
                <span className="contact__detail-icon">📍</span>
                <div>
                  <strong>{lang === 'ru' ? 'Адрес' : 'Location'}</strong>
                  <span>{siteConfig.location[lang]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__form-wrap">
            <h3 className="contact__form-title">{t.cta.formTitle}</h3>
            <p className="contact__form-subtitle">{t.cta.formSubtitle}</p>

            {status === 'success' ? (
              <div className="contact__success">
                <span>✓</span>
                <p>{t.cta.success}</p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStatus('idle')}
                >
                  {t.cta.sendAnother}
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{t.cta.name}</label>
                    <input type="text" id="name" name="name" required disabled={status === 'loading'} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t.cta.phone}</label>
                    <input type="tel" id="phone" name="phone" disabled={status === 'loading'} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t.cta.email}</label>
                  <input type="email" id="email" name="email" required disabled={status === 'loading'} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t.cta.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    disabled={status === 'loading'}
                    placeholder={t.cta.messagePlaceholder}
                  />
                </div>

                {status === 'error' && errorMsg && (
                  <p className="contact__error" role="alert">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary contact__submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? t.cta.sending : t.cta.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
