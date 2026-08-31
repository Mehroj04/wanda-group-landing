export const siteConfig = {
  company: 'Wanda Groups',
  email: 'sales@wandagroups.com',
  phone: '+998 50 713 66 46',
  whatsapp: '+998 50 713 66 46',
  telegram: '@sh987789',
  wechat: '+86 130 8285 5282',
  wechatQr: '/images/wechat-qr.png',
  location: {
    ru: 'ул. Хуанхэдун, 58, г. Цанчжоу, провинция Хэбэй, 061000, Китай',
    en: '58, Huanghedong Street, Cangzhou, Hebei Province 061000, China',
    zh: '中国河北省沧州市黄河东街58号 061000',
  },
}

export function siteLocation(lang: string) {
  if (lang === 'ru') return siteConfig.location.ru
  if (lang === 'zh') return siteConfig.location.zh
  return siteConfig.location.en
}

/**
 * Browser → Web3Forms when the access key is present at build time.
 * Server /api/inquiry is blocked by Cloudflare on Vercel; keep it only as a last resort.
 */
export function getFormEndpoint() {
  const accessKey = typeof __WEB3FORMS_ACCESS_KEY__ === 'string' ? __WEB3FORMS_ACCESS_KEY__ : ''
  if (accessKey) {
    return {
      provider: 'web3forms' as const,
      url: 'https://api.web3forms.com/submit',
      accessKey,
    }
  }
  return {
    provider: 'self' as const,
    url: '/api/inquiry',
    accessKey: '',
  }
}
