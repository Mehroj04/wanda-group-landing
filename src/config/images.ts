/** Local images in /public/images */

/** Accessory catalogue — order must match t.accessoriesCatalog.items */
export const accessoryImages = [
  '/images/wg/acc-01-flashback-valve.jpg',
  '/images/wg/acc-02-generator-canister.jpg',
  '/images/wg/acc-03-cutting-torch.jpg',
  '/images/wg/acc-04-angle-valve.jpg',
  '/images/wg/acc-05-hose-clamp.jpg',
  '/images/wg/acc-06-oxygen-hose.jpg',
  '/images/wg/acc-07-pressure-gauge.jpg',
  '/images/wg/acc-08-safety-valve.jpg',
  '/images/wg/acc-09-welding-torch.jpg',
  '/images/wg/acc-10-filter-converter-head.jpg',
  '/images/wg/acc-11-filter.jpg',
] as const

/** Trust gallery — order must match t.gallery.items */
export const galleryImages = [
  '/images/wg/g13-truck-dispatch.jpg',
  '/images/wg/g14-night-cargo.jpg',
  '/images/wg/g15-boxed-stock.jpg',
  '/images/wg/g01-finished-stock.jpg',
  '/images/wg/g02-production-weld.jpg',
  '/images/wg/g03-export-pack.jpg',
  '/images/wg/g04-safety-cages.jpg',
  '/images/wg/g05-truck-shipping.jpg',
  '/images/wg/g06-export-docs.jpg',
  '/images/wg/g07-valve-assembly.jpg',
  '/images/wg/g08-oxy-cutting.jpg',
  '/images/wg/g09-shop-welding.jpg',
  '/images/wg/g10-pipe-welding.jpg',
  '/images/wg/g11-heavy-fabrication.jpg',
  '/images/wg/g12-size-range.jpg',
] as const

/** Cold-storage condensing units — order must match t.refrigeration.items */
export const refrigerationImages = [
  '/images/wg/ref-copeland.jpg',
  '/images/wg/ref-bitzer.jpg',
  '/images/wg/ref-enclosed.jpg',
  '/images/wg/ref-four-fan.jpg',
] as const

export const refrigerationVideoId = 'uBzWuXlWdOE'

export const images = {
  hero: {
    main: '/images/wg/hero.jpg',
  },
  about: {
    main: '/images/wg/about.jpg',
  },
  products: [
    { src: '/images/wg/product-acetylene.jpg' },
    { src: '/images/wg/product-generator.jpg' },
    { src: '/images/wg/product-propane.jpg' },
    { src: '/images/wg/acc-kit-product.jpg' },
  ],
  gallery: galleryImages.map((src) => ({ src })),
  articles: [
    '/images/wg/art1-propane-supply.jpg',
    '/images/wg/art2-storage.jpg',
    '/images/wg/art3-pricing.jpg',
  ] as const,
  accessories: {
    src: '/images/wg/acc-kit-banner.jpg',
  },
} as const
