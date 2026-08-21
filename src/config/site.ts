export const siteConfig = {
  company: 'Wanda Group Gas Cylinder Manufacturer',
  email: 'sales@wandagroup.com',
  phone: '+86 138 0000 0000',
  whatsapp: '+8613800000000',
  location: {
    ru: 'Китай, провинция Шаньдун',
    en: 'Shandong Province, China',
  },
  formspreeFormId: import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined,
}

export function getFormspreeEndpoint() {
  const id = siteConfig.formspreeFormId
  return id ? `https://formspree.io/f/${id}` : null
}
