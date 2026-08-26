export const siteConfig = {
  company: 'Wanda Group Gas Cylinder Manufacturer',
  email: 'sales@wandagroups.com',
  phone: '+86 130 8285 5282',
  whatsapp: '+998 50 713 66 46',
  telegram: '@sh987789',
  wechat: '+86 130 8285 5282',
  wechatQr: '/images/wechat-qr.png',
  location: {
    ru: '58, Northwest Qinhai, провинция Хэбэй, Китай',
    en: '58, Northwest Qinhai, Hebei Province, China',
    zh: '中国河北省 Northwest Qinhai 58 号',
  },
}

export function siteLocation(lang: string) {
  if (lang === 'ru') return siteConfig.location.ru
  if (lang === 'zh') return siteConfig.location.zh
  return siteConfig.location.en
}

/** Public Web3Forms key (safe in the browser). Empty if not set at build time. */
export function getWeb3FormsAccessKey() {
  return String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim()
}

/** Server backup if the browser cannot reach Web3Forms. */
export function getFormEndpoint() {
  return {
    provider: 'self' as const,
    url: '/api/inquiry',
  }
}
