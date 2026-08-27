import { LangLink } from './LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { siteConfig, siteLocation } from '../config/site'
import { routes } from '../config/routes'
import { productCatalog } from '../config/products'
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
            <a href={`mailto:${siteConfig.email}`} className="footer__email">
              {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="footer__email">
              {siteConfig.phone}
            </a>
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
            {productCatalog.map((p) => (
              <LangLink key={p.slug} to={routes.product(p.slug)}>
                {t.pages.products.catalog[p.catalogKey].name}
              </LangLink>
            ))}
          </div>

          <div className="footer__col">
            <h4>{t.nav.about}</h4>
            <LangLink to={routes.about}>{t.nav.about}</LangLink>
            <LangLink to={routes.factory}>{t.nav.factory}</LangLink>
            <LangLink to={routes.certifications}>{t.nav.certifications}</LangLink>
            <LangLink to={routes.oem}>{t.nav.oem}</LangLink>
            <LangLink to={routes.markets}>{t.nav.markets}</LangLink>
            <LangLink to={routes.applications}>{t.nav.applications}</LangLink>
          </div>

          <div className="footer__col">
            <h4>{t.nav.contact}</h4>
            <LangLink to={routes.contact}>{t.nav.getQuote}</LangLink>
            <LangLink to={routes.faq}>{t.nav.faq}</LangLink>
            <LangLink to={routes.blog}>{t.ui.blog}</LangLink>
            <LangLink to={routes.privacy}>{t.footer.privacy}</LangLink>
            <LangLink to={routes.terms}>{t.footer.terms}</LangLink>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__rights">{t.footer.rights}</p>
          <LangLink to={routes.privacy}>{t.footer.privacy}</LangLink>
          <LangLink to={routes.terms}>{t.footer.terms}</LangLink>
        </div>
      </div>
    </footer>
  )
}
