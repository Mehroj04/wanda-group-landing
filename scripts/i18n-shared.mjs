/** Shared i18n helpers for translate + verify scripts. */
import fs from 'fs'

export function readJson(file) {
  let text = fs.readFileSync(file, 'utf8')
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  return JSON.parse(text)
}

export function collect(obj, prefix = '', out = []) {
  if (typeof obj === 'string') {
    out.push({ path: prefix, value: obj })
    return out
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collect(item, `${prefix}[${i}]`, out))
    return out
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      collect(v, prefix ? `${prefix}.${k}` : k, out)
    }
  }
  return out
}

export function setByPath(obj, pathStr, value) {
  const parts = pathStr.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean)
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (cur[key] === undefined) cur[key] = /^\d+$/.test(parts[i + 1]) ? [] : {}
    cur = cur[key]
  }
  cur[parts[parts.length - 1]] = value
}

export function getByPath(obj, pathStr) {
  const parts = pathStr.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean)
  let cur = obj
  for (const x of parts) {
    if (cur == null) return undefined
    cur = cur[x]
  }
  return cur
}

/** Strings / tokens that must stay as in English source. */
export function shouldKeepEnglish(pathStr, text) {
  if (!text || typeof text !== 'string') return true
  if (pathStr.endsWith('.icon')) return true
  if (/\.stats\[\d+\]\.value$/.test(pathStr)) return true
  if (/testimonials\.items\[\d+\]\.author$/.test(pathStr)) return true
  if (/testimonials\.items\[\d+\]\.country$/.test(pathStr)) return true
  if (/story\.slides\[\d+\]\.id$/.test(pathStr)) return true
  if (text.trim() === 'Wanda Groups Gas Cylinder Manufacturer') return true
  if (text.trim() === 'Wanda Group Gas Cylinder Manufacturer') return true
  if (/^(Acetylene|Propane|LPG|Oxygen|Uzbekistan|Kazakhstan|Saudi Arabia|Africa|Latin America)$/.test(text.trim())) return true
  if (/^Lead [Tt]ime$/.test(text.trim())) return true
  if (/CE Mark/.test(text)) return true
  if (/Copeland|Bitzer/i.test(text) && pathStr.includes('refrigeration')) return true
  if (/productDetails\.(acetylene|propane|generator|accessories)\.rows\[\d+\]\[\d+\]$/.test(pathStr)) {
    if (/WG-|ISO|CGA|EN \d|GB\/T|POL|GOST|MPa|kg\)/i.test(text)) return true
  }
  if (/productDetails\.accessories\.rows\[\d+\]\[1\]$/.test(pathStr)) return true
  if (/productDetails\.accessories\.rows\[\d+\]\[2\]$/.test(pathStr) && /^(ISO|CGA|EN|GB)/i.test(text.trim())) return true
  if (/services\.items\[\d+\]\.points\[\d+\]$/.test(pathStr) && /Incoterms|ISO|DOT|TPED/i.test(text)) return true
  if (/certifications\.items\[\d+\]\.name$/.test(pathStr) && /ISO|DOT|TPED/i.test(text)) return true
  if (/accessoriesCatalog\.items\[\d+\]\.specs\[\d+\]$/.test(pathStr) && /ISO|EN |GB\/T/i.test(text)) return true
  if (/@/.test(text) || /^https?:\/\//i.test(text)) return true
  if (/^WG-[\w./,]+$/i.test(text.trim())) return true
  if (/^WG-[A-Z0-9]+$/i.test(text.trim())) return true

  const exact = new Set([
    'OEM',
    'ODM',
    'WhatsApp',
    'Telegram',
    'WeChat',
    'ISO',
    'DOT',
    'TPED',
    'Wanda Group',
    'Wanda Groups',
    'WandaGroups',
    'wandagroups.com',
    'QC',
    'Export',
    'Standards',
    'Factory Direct',
    'FAQ',
    'Blog',
    'Name',
    'Legal',
    'Details',
    'Filter',
    'Generator',
    'Standard',
    'Private Label',
    'MOQ',
    'Menu',
    'Catalog',
    'Contact',
    'Model',
    'Applications',
    'Services',
    'Gallery',
  ])
  if (exact.has(text.trim())) return true
  if (/^OEM\s*\/\s*Private Label$/i.test(text.trim())) return true
  if (/^OEM\b/i.test(text.trim()) && text.length < 40) return true

  if (/^(ISO 9809-1|DOT 3AA|TPED|GB 5099|CE|OEM\/ODM|ISO \/ DOT \/ TPED|C₂H₂ \(kg\)|WP \(MPa\)|TP \(MPa\)|Gas \(kg\))$/.test(text)) return true
  if (/^[\d+$%°×x→—–\-.,/\s]+$/.test(text)) return true
  if (/^[\p{Extended_Pictographic}\p{Emoji_Presentation}\s]+$/u.test(text)) return true

  if (pathStr.endsWith('.oem') && text.trim() === 'OEM') return true
  if (/whatsapp/i.test(pathStr) && text.trim() === 'WhatsApp') return true
  if (/telegram/i.test(pathStr) && text.trim() === 'Telegram') return true
  if (/wechat/i.test(pathStr) && /^WeChat/i.test(text.trim())) return true

  return false
}

export function extractPlaceholders(text) {
  const m = text.match(/\{[^}]+\}/g)
  return m ? [...m].sort() : []
}

export const TARGETS = [
  ['ar', 'ar'], ['bn', 'bn'], ['bg', 'bg'], ['hr', 'hr'], ['cs', 'cs'],
  ['da', 'da'], ['nl', 'nl'], ['fil', 'tl'], ['fi', 'fi'], ['fr', 'fr'],
  ['de', 'de'], ['el', 'el'], ['hi', 'hi'], ['hu', 'hu'], ['id', 'id'],
  ['it', 'it'], ['ja', 'ja'], ['kk', 'kk'], ['ko', 'ko'], ['lv', 'lv'],
  ['lt', 'lt'], ['ms', 'ms'], ['no', 'no'], ['pl', 'pl'], ['pt', 'pt'],
  ['ro', 'ro'], ['ru', 'ru'], ['sr', 'sr'], ['sk', 'sk'], ['sl', 'sl'],
  ['es', 'es'], ['sw', 'sw'], ['sv', 'sv'], ['th', 'th'], ['tr', 'tr'],
  ['uk', 'uk'], ['ur', 'ur'], ['uz', 'uz'], ['vi', 'vi'], ['zh', 'zh-CN'],
  ['tg', 'tg'],
]

export const SKIP_TRANSLATE = new Set(['en', 'ru', 'zh'])
