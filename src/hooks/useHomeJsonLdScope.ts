import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const STATIC_LD_ID = 'site-jsonld-static'

/** Clear homepage-only JSON-LD from index.html on inner routes (SPA keeps the script in DOM). */
export function useHomeJsonLdScope() {
  const { pathname } = useLocation()

  useEffect(() => {
    const el = document.getElementById(STATIC_LD_ID) as HTMLScriptElement | null
    if (!el) return

    if (!el.dataset.homeGraph && el.textContent?.trim()) {
      el.dataset.homeGraph = el.textContent
    }

    const homeGraph = el.dataset.homeGraph ?? ''
    el.textContent = pathname === '/' ? homeGraph : ''
  }, [pathname])
}
