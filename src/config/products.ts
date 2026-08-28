import { images, refrigerationImages } from './images'
import type { ProductSlug } from './routes'

export type ProductTabKey = 'acetylene' | 'propane' | 'generator' | 'accessories'

export type CatalogKey =
  | 'acetylene'
  | 'propane'
  | 'lpg'
  | 'industrial'
  | 'generators'
  | 'accessories'
  | 'refrigeration'

export interface ProductPageDef {
  slug: ProductSlug
  /** Which productDetails tab to render (null = custom page body). */
  tab: ProductTabKey | null
  image: string
  /** i18n key under pages.products.catalog */
  catalogKey: CatalogKey
  related: ProductSlug[]
}

export const productCatalog: ProductPageDef[] = [
  {
    slug: 'acetylene-cylinders',
    tab: 'acetylene',
    image: images.products[0].src,
    catalogKey: 'acetylene',
    related: ['generators', 'welding-accessories', 'propane-cylinders'],
  },
  {
    slug: 'propane-cylinders',
    tab: 'propane',
    image: images.products[2].src,
    catalogKey: 'propane',
    related: ['lpg-cylinders', 'welding-accessories', 'acetylene-cylinders'],
  },
  {
    slug: 'lpg-cylinders',
    tab: 'propane',
    image: images.productLpg,
    catalogKey: 'lpg',
    related: ['propane-cylinders', 'welding-accessories', 'industrial-gas-cylinders'],
  },
  {
    slug: 'industrial-gas-cylinders',
    tab: null,
    image: images.productIndustrial,
    catalogKey: 'industrial',
    related: ['acetylene-cylinders', 'propane-cylinders', 'lpg-cylinders'],
  },
  {
    slug: 'generators',
    tab: 'generator',
    image: images.products[1].src,
    catalogKey: 'generators',
    related: ['acetylene-cylinders', 'welding-accessories'],
  },
  {
    slug: 'welding-accessories',
    tab: 'accessories',
    image: images.products[3].src,
    catalogKey: 'accessories',
    related: ['acetylene-cylinders', 'propane-cylinders', 'generators'],
  },
  {
    slug: 'refrigeration',
    tab: null,
    image: refrigerationImages[0],
    catalogKey: 'refrigeration',
    related: ['welding-accessories'],
  },
]

export function getProductBySlug(slug: string): ProductPageDef | undefined {
  return productCatalog.find((p) => p.slug === slug)
}
