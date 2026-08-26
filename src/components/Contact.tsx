import { useState, type FormEvent } from 'react'

import { useLanguage } from '../i18n/LanguageContext'

import { siteConfig, getFormEndpoint, getWeb3FormsAccessKey, siteLocation } from '../config/site'
import { trackLead } from '../config/analytics'

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
    `Language: ${lang}`,
    '',
    String(payload.message || ''),
  ].join('\n')
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function Contact() {

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
      message: String(payload.message || ''),
      language: lang,
    }

    const message = [
      quote.message || '(no additional requirements)',
      '',
      `Name: ${quote.name}`,
      `Company: ${quote.company || '-'}`,
      `Email: ${quote.email}`,
      `Phone / WhatsApp: ${quote.phone || '-'}`,
      `Product: ${quote.product}`,
      `Quantity: ${quote.quantity || '-'}`,
      `Country: ${quote.country || '-'}`,
      `Language: ${quote.language}`,
    ].join('\n')

    try {
      const web3Key = getWeb3FormsAccessKey()
      if (web3Key) {
        const body = new URLSearchParams({
          access_key: web3Key,
          from_name: 'Wanda Groups website',
          subject: `Wanda Group Quote — ${quote.product} — ${quote.name}`,
          name: quote.name,
          email: quote.email,
          replyto: quote.email,
          company: quote.company,
          phone: quote.phone,
          product: quote.product,
          quantity: quote.quantity,
          country: quote.country,
          language: quote.language,
          message,
        })
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
          body,
        })
        const data = await res.json().catch(() => null)
        if (res.ok && data?.success === true) {
          trackLead('quote_form', {
            product: quote.product,
            country: quote.country || 'unknown',
            language: quote.language,
            channel: 'web3forms',
          })
          setStatus('success')
          form.reset()
          return
        }
      }
    } catch {
      // try the site API next
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

        <ScrollReveal>

          <div className="section-header">

            <span className="section-label">{t.ui.contact}</span>

            <h2 className="section-title">{t.cta.title}</h2>

            <p className="section-subtitle">{t.cta.subtitle}</p>

          </div>

        </ScrollReveal>



        <div className="contact__inner">

          <ScrollReveal delay={100}>

            <div className="contact__info">

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

                  <span className="contact__detail-icon">📍</span>

                  <div>

                    <strong>{t.ui.location}</strong>

                    <span>{siteLocation(lang)}</span>

                  </div>

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
                      alt="WeChat QR code"
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

                  <strong>24h</strong>

                  <span>{t.ui.quoteResponse}</span>

                </div>

                <div className="contact__promise-item">

                  <strong>50+</strong>

                  <span>{t.ui.countriesServed}</span>

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

                  <span>✓</span>

                  <p>{t.cta.success}</p>

                  <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>

                    {t.cta.sendAnother}

                  </button>

                </div>

              ) : (

                <form className="contact__form" onSubmit={handleSubmit}>
                  <input type="hidden" name="_to" value={siteConfig.email} />
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">{t.cta.name}</label>
                      <input type="text" id="name" name="name" required disabled={status === 'loading'} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">{t.cta.company}</label>
                      <input type="text" id="company" name="company" disabled={status === 'loading'} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">{t.cta.email}</label>
                      <input type="email" id="email" name="email" required disabled={status === 'loading'} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">{t.cta.phone}</label>
                      <input type="tel" id="phone" name="phone" disabled={status === 'loading'} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="product">{t.cta.product}</label>
                      <select id="product" name="product" required disabled={status === 'loading'}>
                        {t.cta.productOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="quantity">{t.cta.quantity}</label>
                      <input type="text" id="quantity" name="quantity" placeholder="500" required disabled={status === 'loading'} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">{t.cta.country}</label>
                    <input type="text" id="country" name="country" required disabled={status === 'loading'} />
                  </div>

                  <div className="form-group">

                    <label htmlFor="message">{t.cta.message}</label>

                    <textarea

                      id="message"

                      name="message"

                      rows={4}

                      disabled={status === 'loading'}

                      placeholder={t.cta.messagePlaceholder}

                    />

                  </div>



                  {status === 'error' && errorMsg && (
                    <>
                      <p className="contact__error" role="alert">{errorMsg}</p>
                      <a href={mailtoHref} className="btn btn-outline contact__submit">
                        {t.cta.emailAppButton}
                      </a>
                    </>
                  )}

                  <label className="form-consent">
                    <input type="checkbox" name="privacy" required disabled={status === 'loading'} />
                    <span>
                      {t.cta.privacyPrefix}
                      <a href="#privacy">{t.cta.privacyLink}</a>
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


