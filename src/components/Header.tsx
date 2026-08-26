import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import Logo from './Logo'
import LanguageSelect from './LanguageSelect'
import './Header.css'

const navItems = [
  { id: 'home', key: 'home' as const, href: '#home' },
  { id: 'products', key: 'products' as const, href: '#products' },
  { id: 'about', key: 'about' as const, href: '#about' },
  { id: 'factory', key: 'factory' as const, href: '#factory' },
  { id: 'quality', key: 'quality' as const, href: '#quality' },
  { id: 'contact', key: 'contact' as const, href: '#contact' },
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

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu-open' : ''}`}>
      <div className="container header__inner">
        <a href="#home" className="header__logo" aria-label="Wanda Group" onClick={() => setMenuOpen(false)}>
          <Logo />
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navItems.map(({ id, key, href }) => (
            <a
              key={id}
              href={href}
              className="header__link"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <LanguageSelect />
          <a href="#contact" className="btn btn-primary btn-sm header__cta" onClick={() => setMenuOpen(false)}>
            {t.nav.getQuote}
          </a>
          <button
            className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
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
