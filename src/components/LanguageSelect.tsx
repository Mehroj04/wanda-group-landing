import { useEffect, useRef, useState } from 'react'
import { languages, flagSrc, type Lang } from '../i18n/languages'
import { useLanguage, prefetchLocale } from '../i18n/LanguageContext'
import './LanguageSelect.css'

function Flag({ country, name, className }: { country: string; name: string; className?: string }) {
  return (
    <img
      className={className}
      src={flagSrc(country)}
      alt=""
      title={name}
      width={22}
      height={16}
      loading="lazy"
      decoding="async"
    />
  )
}

export default function LanguageSelect() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const current = languages.find((l) => l.code === lang)!

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const filtered = languages.filter((l) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      l.name.toLowerCase().includes(q) ||
      l.native.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
    )
  })

  return (
    <div className={`lang-select ${open ? 'lang-select--open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="lang-select__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.ui.searchLanguage}
      >
        <Flag country={current.country} name={current.name} className="lang-select__flag" />
        <span className="lang-select__name">{current.native}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="lang-select__dropdown" role="listbox">
          <input
            className="lang-select__search"
            type="search"
            placeholder={t.ui.searchLanguage}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="lang-select__list">
            {filtered.map((l) => (
              <button
                key={l.code}
                type="button"
                role="option"
                aria-selected={l.code === lang}
                className={`lang-select__option ${l.code === lang ? 'lang-select__option--active' : ''}`}
                onMouseEnter={() => prefetchLocale(l.code)}
                onClick={() => {
                  setLang(l.code as Lang)
                  setOpen(false)
                  setQuery('')
                }}
              >
                <Flag country={l.country} name={l.name} className="lang-select__option-flag" />
                <span className="lang-select__option-native">{l.native}</span>
                <span className="lang-select__option-en">{l.name}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="lang-select__empty">{t.ui.noLanguagesFound}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
