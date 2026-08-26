/** All supported site languages (country = ISO 3166-1 alpha-2 for flag image) */
export const languages = [
  { code: 'ar', name: 'Arabic', native: 'العربية', country: 'sa', rtl: true },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', country: 'bd', rtl: false },
  { code: 'bg', name: 'Bulgarian', native: 'Български', country: 'bg', rtl: false },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski', country: 'hr', rtl: false },
  { code: 'cs', name: 'Czech', native: 'Čeština', country: 'cz', rtl: false },
  { code: 'da', name: 'Danish', native: 'Dansk', country: 'dk', rtl: false },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', country: 'nl', rtl: false },
  { code: 'en', name: 'English', native: 'English', country: 'gb', rtl: false },
  { code: 'fil', name: 'Filipino', native: 'Filipino', country: 'ph', rtl: false },
  { code: 'fi', name: 'Finnish', native: 'Suomi', country: 'fi', rtl: false },
  { code: 'fr', name: 'French', native: 'Français', country: 'fr', rtl: false },
  { code: 'de', name: 'German', native: 'Deutsch', country: 'de', rtl: false },
  { code: 'el', name: 'Greek', native: 'Ελληνικά', country: 'gr', rtl: false },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', country: 'in', rtl: false },
  { code: 'hu', name: 'Hungarian', native: 'Magyar', country: 'hu', rtl: false },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', country: 'id', rtl: false },
  { code: 'it', name: 'Italian', native: 'Italiano', country: 'it', rtl: false },
  { code: 'ja', name: 'Japanese', native: '日本語', country: 'jp', rtl: false },
  { code: 'kk', name: 'Kazakh', native: 'Қазақша', country: 'kz', rtl: false },
  { code: 'ko', name: 'Korean', native: '한국어', country: 'kr', rtl: false },
  { code: 'lv', name: 'Latvian', native: 'Latviešu', country: 'lv', rtl: false },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių', country: 'lt', rtl: false },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', country: 'my', rtl: false },
  { code: 'no', name: 'Norwegian', native: 'Norsk', country: 'no', rtl: false },
  { code: 'pl', name: 'Polish', native: 'Polski', country: 'pl', rtl: false },
  { code: 'pt', name: 'Portuguese', native: 'Português', country: 'pt', rtl: false },
  { code: 'ro', name: 'Romanian', native: 'Română', country: 'ro', rtl: false },
  { code: 'ru', name: 'Russian', native: 'Русский', country: 'ru', rtl: false },
  { code: 'sr', name: 'Serbian', native: 'Српски', country: 'rs', rtl: false },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina', country: 'sk', rtl: false },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina', country: 'si', rtl: false },
  { code: 'es', name: 'Spanish', native: 'Español', country: 'es', rtl: false },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', country: 'tz', rtl: false },
  { code: 'sv', name: 'Swedish', native: 'Svenska', country: 'se', rtl: false },
  { code: 'th', name: 'Thai', native: 'ไทย', country: 'th', rtl: false },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', country: 'tr', rtl: false },
  { code: 'uk', name: 'Ukrainian', native: 'Українська', country: 'ua', rtl: false },
  { code: 'ur', name: 'Urdu', native: 'اردو', country: 'pk', rtl: true },
  { code: 'uz', name: 'Uzbek', native: 'Oʻzbekcha', country: 'uz', rtl: false },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', country: 'vn', rtl: false },
  { code: 'zh', name: 'Chinese', native: '简体中文', country: 'cn', rtl: false },
  { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ', country: 'tj', rtl: false },
] as const

export type Lang = (typeof languages)[number]['code']

export const langCodes = languages.map((l) => l.code) as Lang[]

const langSet = new Set<string>(langCodes)

export function isSupportedLang(code: string): code is Lang {
  return langSet.has(code)
}

export function getLanguage(code: Lang) {
  return languages.find((l) => l.code === code)!
}

export function isRtl(code: Lang) {
  return getLanguage(code).rtl
}

/** Local SVG flag path (works on Windows — emoji flags often don't) */
export function flagSrc(country: string) {
  return `/flags/${country}.svg`
}
