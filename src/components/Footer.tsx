import { useLanguage } from '../i18n/LanguageContext'
import Logo from './Logo'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <Logo />
          </div>
        </div>

        <div className="footer__links">
          <a href="#products">{t.nav.products}</a>
          <a href="#gallery">{t.nav.gallery}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#quality">{t.nav.quality}</a>
          <a href="#faq">{t.nav.faq}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>

        <p className="footer__rights">{t.footer.rights}</p>
      </div>
    </footer>
  )
}
