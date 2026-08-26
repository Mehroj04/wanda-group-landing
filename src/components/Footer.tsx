import { useLanguage } from '../i18n/LanguageContext'
import { siteConfig, siteLocation } from '../config/site'
import Logo from './Logo'
import './Footer.css'

export default function Footer() {
  const { t, lang } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__company">{t.footer.company}</p>
            <p className="footer__domain">wandagroups.com</p>
            <p className="footer__tagline">{t.footer.tagline}</p>
            <a href={`mailto:${siteConfig.email}`} className="footer__email">{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="footer__email">{siteConfig.phone}</a>
            <p className="footer__address">{siteLocation(lang)}</p>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__email"
            >
              WhatsApp
            </a>
            <a
              href={`https://t.me/${siteConfig.telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__email"
            >
              Telegram {siteConfig.telegram}
            </a>
          </div>

          <div className="footer__col">
            <h4>{t.nav.products}</h4>
            <a href="#products">{t.nav.products}</a>
            <a href="#accessories">{t.nav.accessories}</a>
            <a href="#product-details">{t.nav.specs}</a>
          </div>

          <div className="footer__col">
            <h4>{t.nav.about}</h4>
            <a href="#about">{t.nav.about}</a>
            <a href="#factory">{t.nav.factory}</a>
            <a href="#quality">{t.nav.quality}</a>
          </div>

          <div className="footer__col">
            <h4>{t.nav.contact}</h4>
            <a href="#contact">{t.nav.getQuote}</a>
            <a href="#faq">{t.nav.faq}</a>
            <a href="#privacy">{t.footer.privacy}</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__rights">{t.footer.rights}</p>
          <a href="#privacy">{t.footer.privacy}</a>
        </div>
      </div>
    </footer>
  )
}
