export const siteConfig = {
  company: 'Wanda Group Gas Cylinder Manufacturer',
  email: 'sales@wandagroups.com',
  phone: '+998 50 713 66 46',
  whatsapp: '+998 50 713 66 46',
  telegram: '@sh987789',
  wechat: '+86 130 8285 5282',
  wechatQr: '/images/wechat-qr.png',
  location: {
    ru: 'ул. Хуанхэдун, 58, г. Цанчжоу, провинция Хэбэй, Китай',
    en: '58, Huanghedong Street, Cangzhou, Hebei Province, China',
    zh: '中国河北省沧州市黄河东街58号',
  },
}

export function siteLocation(lang: string) {
  if (lang === 'ru') return siteConfig.location.ru
  if (lang === 'zh') return siteConfig.location.zh
  return siteConfig.location.en
}

/** Server route; Web3Forms key stays on Vercel as WEB3FORMS_ACCESS_KEY. */
export function getFormEndpoint() {
  return {
    provider: 'self' as const,
    url: '/api/inquiry',
  }
}
