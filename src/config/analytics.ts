import { track } from '@vercel/analytics'

export type LeadEvent =
  | 'quote_form'
  | 'quote_mailto'
  | 'whatsapp_click'
  | 'telegram_click'
  | 'quote_cta_click'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function gaId() {
  return String(import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim()
}

/** Inject gtag only when a measurement ID is configured at build time. */
export function initGoogleAnalytics() {
  const id = gaId()
  if (!id || typeof document === 'undefined') return
  if (document.getElementById('ga-gtag')) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, { send_page_view: true })

  const s = document.createElement('script')
  s.id = 'ga-gtag'
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
}

/** Safe custom event — Vercel Analytics + optional GA4. */
export function trackLead(name: LeadEvent, props?: Record<string, string | number | boolean | null>) {
  try {
    track(name, props)
  } catch {
    /* ignore */
  }
  try {
    if (gaId() && typeof window.gtag === 'function') {
      window.gtag('event', name, props)
    }
  } catch {
    /* ignore */
  }
}
