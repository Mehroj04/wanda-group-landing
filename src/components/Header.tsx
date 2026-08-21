import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import Logo from './Logo'
import './Header.css'

const navIds = ['products', 'specs', 'applications', 'about', 'quality', 'faq', 'contact'] as const
const navKeys = ['products', 'specs', 'applications', 'about', 'quality', 'faq', 'contact'] as const

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#" className="header__logo">
          <Logo />
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navKeys.map((key, i) => (
            <a
              key={key}
              href={`#${navIds[i]}`}
              className="header__link"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <div className="lang-switch">
            <button
              className={`lang-switch__btn ${lang === 'ru' ? 'lang-switch__btn--active' : ''}`}
              onClick={() => setLang('ru')}
            >
              RU
            </button>
            <button
              className={`lang-switch__btn ${lang === 'en' ? 'lang-switch__btn--active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
          <a href="#contact" className="btn btn-primary header__cta">
            {t.nav.getQuote}
          </a>
          <button
            className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
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
