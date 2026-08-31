import { useState, useEffect } from 'react'
import { LangLink, LangNavLink } from './LangLink'
import { useLanguage } from '../i18n/LanguageContext'
import { routes } from '../config/routes'
import Logo from './Logo'
import LanguageSelect from './LanguageSelect'
import './Header.css'

const navItems = [
  { id: 'home', key: 'home' as const, to: routes.home },
  { id: 'about', key: 'about' as const, to: routes.about },
  { id: 'products', key: 'products' as const, to: routes.products },
  { id: 'factory', key: 'factory' as const, to: routes.factory },
  { id: 'certifications', key: 'certifications' as const, to: routes.certifications },
  { id: 'oem', key: 'oem' as const, to: routes.oem },
  { id: 'markets', key: 'markets' as const, to: routes.markets },
  { id: 'contact', key: 'contact' as const, to: routes.contact },
]

export default function Header() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu-open' : ''}`}>
      <div className="container header__inner">
        <LangLink to={routes.home} className="header__logo" aria-label={t.ui.brandName} onClick={() => setMenuOpen(false)}>
          <Logo />
        </LangLink>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`} aria-label={t.ui.primaryNav}>
          {navItems.map(({ id, key, to }) => (
            <LangNavLink
              key={id}
              to={to}
              end={to === routes.home}
              className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {t.nav[key]}
            </LangNavLink>
          ))}
        </nav>

        <div className="header__actions">
          <LanguageSelect />
          <LangLink to={routes.contact} className="btn btn-primary btn-sm header__cta" onClick={() => setMenuOpen(false)}>
            {t.nav.getQuote}
          </LangLink>
          <button
            type="button"
            className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t.ui.menu}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
