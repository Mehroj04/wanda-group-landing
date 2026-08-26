export const productTabs = ['acetylene', 'propane', 'generator', 'accessories'] as const
export type ProductTab = (typeof productTabs)[number]
