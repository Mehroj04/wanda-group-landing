/**
 * Merge extra content blocks into locale files and translate missing keys.
 * Usage: node scripts/merge-extra-locales.mjs
 * ONLY_NEW=1 — skip locales that already have productDetails
 * LANG=uz — translate single locale
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import translate from 'google-translate-api-x'
import { extraEn, extraRu } from './extra-content.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../src/i18n/locales')

const apiMap = {
  ar: 'ar',
  bn: 'bn',
  bg: 'bg',
  hr: 'hr',
  cs: 'cs',
  da: 'da',
  nl: 'nl',
  fil: 'tl',
  fi: 'fi',
  fr: 'fr',
  de: 'de',
  el: 'el',
  hi: 'hi',
  hu: 'hu',
  id: 'id',
  it: 'it',
  ja: 'ja',
  kk: 'kk',
  ko: 'ko',
  lv: 'lv',
  lt: 'lt',
  ms: 'ms',
  no: 'no',
  pl: 'pl',
  pt: 'pt',
  ro: 'ro',
  sr: 'sr',
  sk: 'sk',
  sl: 'sl',
  es: 'es',
  sw: 'sw',
  sv: 'sv',
  th: 'th',
  tr: 'tr',
  uk: 'uk',
  ur: 'ur',
  uz: 'uz',
  vi: 'vi',
  zh: 'zh-CN',
  tg: 'tg',
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function collectStrings(obj, prefix = '', out = []) {
  if (typeof obj === 'string') {
    out.push({ path: prefix, value: obj })
    return out
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectStrings(item, `${prefix}[${i}]`, out))
    return out
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      collectStrings(v, prefix ? `${prefix}.${k}` : k, out)
    }
  }
  return out
}

function getPath(obj, pathStr) {
  const parts = pathStr.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean)
  let cur = obj
  for (const p of parts) {
    if (cur == null) return undefined
    cur = cur[p]
  }
  return cur
}

function setPath(obj, pathStr, value) {
  const parts = pathStr.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean)
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (cur[key] === undefined) cur[key] = /^\d+$/.test(parts[i + 1]) ? [] : {}
    cur = cur[key]
  }
  cur[parts[parts.length - 1]] = value
}

function deepMerge(base, extra) {
  const out = JSON.parse(JSON.stringify(base))
  for (const [k, v] of Object.entries(extra)) {
    out[k] = JSON.parse(JSON.stringify(v))
  }
  return out
}

function shouldSkipTranslate(text) {
  if (!text || typeof text !== 'string') return true
  if (/^[\d+$%°→—–\-./\s,]+$/.test(text)) return true
  if (/^WG-/.test(text)) return true
  if (/^\$/.test(text)) return true
  if (/^(ISO|DOT|TPED|GB|CE|CGA|GOST|DIN|POL|OEM|ODM|FOB|CIF|DDP|EXW|MOQ|T\/T|MSDS|SGS|BV|RAL|EN |C₂H₂|m³)/.test(text)) return true
  if (/^[A-Z]{2,}[\d\-/]*$/.test(text)) return true
  if (text === '—') return true
  return false
}

async function translateBatch(texts, to, attempt = 0) {
  const need = texts.filter((t) => !shouldSkipTranslate(t))
  if (!need.length) return texts
  try {
    const res = await translate(need, { from: 'en', to, forceBatch: true })
    const translated = Array.isArray(res) ? res.map((r) => r.text) : [res.text]
    let j = 0
    return texts.map((t) => (shouldSkipTranslate(t) ? t : translated[j++]))
  } catch (e) {
    const msg = String(e?.message || e)
    if (/Too Many Requests|429|rate/i.test(msg) && attempt < 8) {
      const wait = 4000 + attempt * 3000
      console.warn(`  rate-limit, wait ${wait}ms`)
      await sleep(wait)
      return translateBatch(texts, to, attempt + 1)
    }
    console.warn(`  batch fail, falling back one-by-one: ${msg.slice(0, 60)}`)
    const out = []
    for (const t of texts) {
      if (shouldSkipTranslate(t)) {
        out.push(t)
        continue
      }
      try {
        const r = await translate(t, { from: 'en', to, forceBatch: false })
        out.push(r.text)
      } catch {
        out.push(t)
      }
      await sleep(250)
    }
    return out
  }
}

async function translateLocale(locale, code) {
  const api = apiMap[code]
  if (!api) throw new Error(`No API code for ${code}`)

  const slots = collectStrings(extraEn)
  const todo = slots.filter(({ path: p, value }) => {
    const current = getPath(locale, p)
    if (current === undefined) return true
    return current === value
  })

  if (!todo.length) {
    console.log(`  ${code}: already translated`)
    return locale
  }

  console.log(`  ${code}: translating ${todo.length} strings`)
  const batchSize = 40
  for (let i = 0; i < todo.length; i += batchSize) {
    const chunk = todo.slice(i, i + batchSize)
    const translated = await translateBatch(
      chunk.map((c) => c.value),
      api,
    )
    chunk.forEach((slot, idx) => setPath(locale, slot.path, translated[idx]))
    process.stdout.write(`    ${Math.min(i + batchSize, todo.length)}/${todo.length}\r`)
    await sleep(600)
  }
  console.log('')

  // preserve icons and numeric table cells from EN
  extraEn.services.items.forEach((item, i) => {
    if (locale.services?.items?.[i]) locale.services.items[i].icon = item.icon
  })
  for (const tab of ['acetylene', 'propane', 'generator', 'accessories']) {
    extraEn.productDetails[tab].rows?.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        if (ci > 0 && /^[\d.+\-–]+$/.test(cell)) {
          if (locale.productDetails?.[tab]?.rows?.[ri]) {
            locale.productDetails[tab].rows[ri][ci] = cell
          }
        }
      })
    })
  }
  extraEn.story.slides.forEach((slide, i) => {
    if (locale.story?.slides?.[i]) locale.story.slides[i].id = slide.id
  })

  return locale
}

async function main() {
  const enPath = path.join(outDir, 'en.json')
  const ruPath = path.join(outDir, 'ru.json')
  const enBase = JSON.parse(fs.readFileSync(enPath, 'utf8'))
  const ruBase = JSON.parse(fs.readFileSync(ruPath, 'utf8'))

  const enMerged = deepMerge(enBase, extraEn)
  const ruMerged = deepMerge(ruBase, extraRu)
  fs.writeFileSync(enPath, JSON.stringify(enMerged, null, 2), 'utf8')
  fs.writeFileSync(ruPath, JSON.stringify(ruMerged, null, 2), 'utf8')
  console.log('Updated en.json and ru.json')

  const onlyLang = process.env.LANG
  const files = fs
    .readdirSync(outDir)
    .filter((f) => f.endsWith('.json') && f !== 'en.json' && f !== 'ru.json')
    .map((f) => f.replace('.json', ''))
    .filter((code) => !onlyLang || code === onlyLang)

  for (const code of files) {
    const filePath = path.join(outDir, `${code}.json`)
    let locale = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    if (process.env.ONLY_NEW === '1' && locale.productDetails?.tabs?.acetylene && locale.productDetails.tabs.acetylene !== extraEn.productDetails.tabs.acetylene) {
      console.log(`Skip ${code} (already has productDetails)`)
      continue
    }

    locale = deepMerge(locale, extraEn)
    console.log(`\n=== ${code} ===`)
    locale = await translateLocale(locale, code)
    fs.writeFileSync(filePath, JSON.stringify(locale, null, 2), 'utf8')
    console.log(`Wrote ${code}.json — sample: ${locale.services?.title?.slice(0, 48)}`)
    await sleep(800)
  }

  console.log('\nDone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
