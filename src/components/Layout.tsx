import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { hashToPath } from '../config/routes'
import Header from './Header'
import Footer from './Footer'
import StickyCTA from './StickyCTA'

/** One-time: map legacy homepage hashes to real routes when landing on `/#section`. */
function useLegacyHashRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') return
    const raw = location.hash.replace(/^#/, '')
    if (!raw) return
    const mapped = hashToPath[raw]
    if (!mapped || mapped === '/' || mapped.startsWith('/#')) return
    navigate(mapped, { replace: true })
  }, [location.pathname, location.hash, navigate])
}

function useScrollRestoration() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '')
      // Allow layout paint before scrolling to in-page anchors.
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo(0, 0)
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}

export default function Layout() {
  useLegacyHashRedirect()
  useScrollRestoration()

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
