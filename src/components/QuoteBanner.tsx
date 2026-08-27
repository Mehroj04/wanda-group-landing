import { LangLink } from './LangLink'
import { routes } from '../config/routes'
import './QuoteBanner.css'

interface QuoteBannerProps {
  title: string
  cta: string
  to?: string
}

export default function QuoteBanner({ title, cta, to = routes.contact }: QuoteBannerProps) {
  return (
    <section className="quote-banner">
      <div className="container quote-banner__inner">
        <h2 className="quote-banner__title">{title}</h2>
        <LangLink to={to} className="btn btn-primary">
          {cta}
        </LangLink>
      </div>
    </section>
  )
}
