import { useState, type FormEvent } from 'react'
import { LangLink } from './LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { siteConfig, getFormEndpoint, siteLocation } from '../config/site'
import { routes } from '../config/routes'
import { trackLead } from '../config/analytics'
import OperationsInfo from './OperationsInfo'
import ScrollReveal from './ScrollReveal'
import WhatsAppIcon from './WhatsAppIcon'
import TelegramIcon from './TelegramIcon'
import WeChatIcon from './WeChatIcon'
import './Contact.css'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

function buildMailto(payload: Record<string, FormDataEntryValue>, lang: string) {
  const subject = `Wanda Group Quote — ${payload.product} — ${payload.name}`
  const body = [
    `Name: ${payload.name}`,
    `Company: ${payload.company || '-'}`,
    `Email: ${payload.email}`,
    `Phone / WhatsApp: ${payload.phone || '-'}`,
    `Product: ${payload.product}`,
    `Quantity: ${payload.quantity || '-'}`,
    `Country: ${payload.country || '-'}`,
    `Requirements: ${payload.requirements || '-'}`,
    `Language: ${lang}`,
    '',
    String(payload.message || ''),
  ].join('\n')
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

interface ContactProps {
  /** Hide the section heading when a page already shows PageHero. */
  hideHeader?: boolean
}

export default function Contact({ hideHeader = false }: ContactProps) {
  const { lang, t } = useLanguage()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [mailtoHref, setMailtoHref] = useState(`mailto:${siteConfig.email}`)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const endpoint = getFormEndpoint()

    setStatus('loading')
    setErrorMsg('')

    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    if (typeof payload._gotcha === 'string' && payload._gotcha.trim()) {
      setStatus('success')
      form.reset()
      return
    }

    delete payload._gotcha
    delete payload.privacy

    const quote = {
      name: String(payload.name || ''),
      company: String(payload.company || ''),
      email: String(payload.email || ''),
      phone: String(payload.phone || ''),
      product: String(payload.product || ''),
      quantity: String(payload.quantity || ''),
      country: String(payload.country || ''),
      requirements: String(payload.requirements || ''),
      message: String(payload.message || ''),
      language: lang,
    }

    try {
      const res = await fetch(endpoint.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(quote),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success === true) {
        trackLead('quote_form', {
          product: quote.product,
          country: quote.country || 'unknown',
          language: quote.language,
          channel: 'api',
        })
        setStatus('success')
        form.reset()
        return
      }
    } catch {
      // fall through to email app
    }

    const href = buildMailto(payload, lang)
    setMailtoHref(href)
    setErrorMsg(t.cta.emailFallback)
    setStatus('error')
    trackLead('quote_mailto', {
      product: quote.product,
      country: quote.country || 'unknown',
      language: quote.language,
    })
    window.location.href = href
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        {!hideHeader && (
          <ScrollReveal>
            <div className="section-header">
              <span className="section-label">{t.ui.contact}</span>
              <h2 className="section-title">{t.cta.title}</h2>
              <p className="section-subtitle">{t.cta.subtitle}</p>
            </div>
          </ScrollReveal>
        )}

        <div className="contact__inner">
          <ScrollReveal delay={100}>
            <div className="contact__info">
              <div className="contact__details">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="contact__detail"
                  onClick={() => trackLead('quote_cta_click', { source: 'email' })}
                >
                  <span className="contact__detail-icon" aria-hidden="true">
                    ✉
                  </span>
                  <div>
                    <strong>Email</strong>
                    <span>{siteConfig.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="contact__detail"
                  onClick={() => trackLead('quote_cta_click', { source: 'phone' })}
                >
                  <span className="contact__detail-icon" aria-hidden="true">
                    ☎
                  </span>
                  <div>
                    <strong>{t.ui.phone}</strong>
                    <span>{siteConfig.phone}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__detail"
                  onClick={() => trackLead('whatsapp_click', { source: 'contact' })}
                >
                  <span className="contact__detail-icon contact__detail-icon--whatsapp">
                    <WhatsAppIcon size={22} />
                  </span>
                  <div>
                    <strong>WhatsApp</strong>
                    <span>{siteConfig.whatsapp}</span>
                  </div>
                </a>

                <a
                  href={`https://t.me/${siteConfig.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__detail"
                  onClick={() => trackLead('telegram_click', { source: 'contact' })}
                >
                  <span className="contact__detail-icon contact__detail-icon--telegram">
                    <TelegramIcon size={22} />
                  </span>
                  <div>
                    <strong>Telegram</strong>
                    <span>{siteConfig.telegram}</span>
                  </div>
                </a>

                <div className="contact__detail">
                  <span className="contact__detail-icon" aria-hidden="true">
                    ⌖
                  </span>
                  <div>
                    <strong>{t.ui.location}</strong>
                    <span>{siteLocation(lang)}</span>
                  </div>
                </div>

                <div className="contact__detail contact__detail--operations">
                  <OperationsInfo />
                </div>

                <div className="contact__detail contact__detail--wechat">
                  <span className="contact__detail-icon contact__detail-icon--wechat">
                    <WeChatIcon size={22} />
                  </span>
                  <div>
                    <strong>WeChat</strong>
                    <span className="contact__wechat-id">{siteConfig.wechat}</span>
                    <img
                      src={siteConfig.wechatQr}
                      alt={t.ui.wechatQr}
                      className="contact__wechat-qr"
                      loading="lazy"
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
              </div>

              <div className="contact__promise">
                <div className="contact__promise-item">
                  <strong>OEM</strong>
                  <span>{t.nav.oem}</span>
                </div>
                <div className="contact__promise-item">
                  <strong>QC</strong>
                  <span>{t.ui.quality}</span>
                </div>
                <div className="contact__promise-item">
                  <strong>FOB</strong>
                  <span>{t.ui.exportReady}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="contact__form-wrap">
              <h3 className="contact__form-title">{t.cta.formTitle}</h3>
              <p className="contact__form-subtitle">{t.cta.formSubtitle}</p>

              {status === 'success' ? (
                <div className="contact__success">
                  <span aria-hidden="true">✓</span>
                  <p>{t.cta.success}</p>
                  <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
                    {t.cta.sendAnother}
                  </button>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit} noValidate={false}>
                  <input type="hidden" name="_to" value={siteConfig.email} />
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    className="form-honeypot"
                    aria-hidden="true"
                  />

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">{t.cta.name}</label>
                      <input type="text" id="name" name="name" required autoComplete="name" disabled={status === 'loading'} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">{t.cta.company}</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        autoComplete="organization"
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">{t.cta.email}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">{t.cta.phone}</label>
                      <input type="tel" id="phone" name="phone" autoComplete="tel" disabled={status === 'loading'} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="product">{t.cta.product}</label>
                      <select id="product" name="product" required disabled={status === 'loading'}>
                        {t.cta.productOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="quantity">{t.cta.quantity}</label>
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        placeholder={t.cta.quantityPlaceholder}
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">{t.cta.country}</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder={t.cta.countryPlaceholder}
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="requirements">{t.cta.requirements}</label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={4}
                      disabled={status === 'loading'}
                      placeholder={t.cta.requirementsPlaceholder}
                    />
                  </div>

                  {status === 'error' && errorMsg && (
                    <>
                      <p className="contact__error" role="alert">
                        {errorMsg}
                      </p>
                      <a href={mailtoHref} className="btn btn-outline contact__submit">
                        {t.cta.emailAppButton}
                      </a>
                    </>
                  )}

                  <label className="form-consent">
                    <input type="checkbox" name="privacy" required disabled={status === 'loading'} />
                    <span>
                      {t.cta.privacyPrefix}
                      <LangLink to={routes.privacy}>{t.cta.privacyLink}</LangLink>
                      {t.cta.termsAnd}
                      <LangLink to={routes.terms}>{t.cta.termsLink}</LangLink>
                      {t.cta.privacySuffix}
                    </span>
                  </label>

                  <button type="submit" className="btn btn-primary contact__submit" disabled={status === 'loading'}>
                    {status === 'loading' ? t.cta.sending : t.cta.submit}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
