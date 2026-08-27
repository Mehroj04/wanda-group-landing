/** Canonical path routes for the multi-page site. Keep hash aliases for legacy links. */

export const routes = {
  home: '/',
  about: '/about',
  products: '/products',
  factory: '/factory',
  certifications: '/certifications',
  oem: '/oem',
  markets: '/markets',
  applications: '/applications',
  faq: '/faq',
  contact: '/contact',
  blog: '/blog',
  privacy: '/privacy',
  terms: '/terms',
  product: (slug: string) => `/products/${slug}`,
} as const

export type ProductSlug =
  | 'acetylene-cylinders'
  | 'propane-cylinders'
  | 'lpg-cylinders'
  | 'industrial-gas-cylinders'
  | 'generators'
  | 'welding-accessories'
  | 'refrigeration'

export const PRODUCT_SLUGS: ProductSlug[] = [
  'acetylene-cylinders',
  'propane-cylinders',
  'lpg-cylinders',
  'industrial-gas-cylinders',
  'generators',
  'welding-accessories',
  'refrigeration',
]

/** Map legacy hash anchors → path (for internal redirects / docs). */
export const hashToPath: Record<string, string> = {
  home: routes.home,
  products: routes.products,
  refrigeration: routes.product('refrigeration'),
  accessories: routes.product('welding-accessories'),
  about: routes.about,
  factory: routes.factory,
  quality: `${routes.factory}#quality`,
  certifications: routes.certifications,
  faq: routes.faq,
  contact: routes.contact,
  privacy: routes.privacy,
  terms: routes.terms,
  applications: routes.applications,
  articles: routes.blog,
}
