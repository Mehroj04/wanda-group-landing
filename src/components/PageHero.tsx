import type { ReactNode } from 'react'
import Breadcrumbs, { type BreadcrumbItem } from './Breadcrumbs'
import './PageHero.css'

interface PageHeroProps {
  label?: string
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  children?: ReactNode
}

export default function PageHero({ label, title, subtitle, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        {breadcrumbs && breadcrumbs.length > 0 ? <Breadcrumbs items={breadcrumbs} /> : null}
        {label ? <span className="section-label">{label}</span> : null}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle ? <p className="page-hero__subtitle">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  )
}
