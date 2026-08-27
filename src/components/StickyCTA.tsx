import { LangLink } from './LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { siteConfig } from '../config/site'
import { routes } from '../config/routes'
import { trackLead } from '../config/analytics'
import WhatsAppIcon from './WhatsAppIcon'
import TelegramIcon from './TelegramIcon'
import './StickyCTA.css'

export default function StickyCTA() {
  const { t } = useLanguage()

  return (
    <div className="sticky-cta">
      <a
        href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-cta__btn sticky-cta__btn--whatsapp"
        aria-label={t.ui.whatsapp}
        onClick={() => trackLead('whatsapp_click', { source: 'sticky' })}
      >
        <WhatsAppIcon size={26} />
      </a>
      <a
        href={`https://t.me/${siteConfig.telegram.replace('@', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-cta__btn sticky-cta__btn--telegram"
        aria-label={t.ui.telegram}
        onClick={() => trackLead('telegram_click', { source: 'sticky' })}
      >
        <TelegramIcon size={26} />
      </a>
      <LangLink
        to={routes.contact}
        className="sticky-cta__btn sticky-cta__btn--quote"
        onClick={() => trackLead('quote_cta_click', { source: 'sticky' })}
      >
        {t.nav.getQuote}
      </LangLink>
    </div>
  )
}
