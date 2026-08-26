import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { LanguageProvider } from './i18n/LanguageContext'
import { initGoogleAnalytics } from './config/analytics'
import App from './App'
import './index.css'

initGoogleAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  </StrictMode>,
)
