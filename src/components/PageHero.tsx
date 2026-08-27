import type { ReactNode } from 'react'
import './PageHero.css'

interface PageHeroProps {
  label?: string
  title: string
  subtitle?: string
  children?: ReactNode
}

export default function PageHero({ label, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        {label ? <span className="section-label">{label}</span> : null}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle ? <p className="page-hero__subtitle">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  )
}
