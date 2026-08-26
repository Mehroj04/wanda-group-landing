/**
 * Generates locale JSON files. Resumes existing files. Retries on rate limits.
 * Usage: node scripts/generate-locales.mjs
 * FORCE=1 to regenerate all.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import translate from 'google-translate-api-x'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-source.json'), 'utf8'))
const outDir = path.join(root, 'src/i18n/locales')
fs.mkdirSync(outDir, { recursive: true })

const targets = [
  { code: 'ar', api: 'ar' },
  { code: 'bn', api: 'bn' },
  { code: 'bg', api: 'bg' },
  { code: 'hr', api: 'hr' },
  { code: 'cs', api: 'cs' },
  { code: 'da', api: 'da' },
  { code: 'nl', api: 'nl' },
  { code: 'fil', api: 'tl' },
  { code: 'fi', api: 'fi' },
  { code: 'fr', api: 'fr' },
  { code: 'de', api: 'de' },
  { code: 'el', api: 'el' },
  { code: 'hi', api: 'hi' },
  { code: 'hu', api: 'hu' },
  { code: 'id', api: 'id' },
  { code: 'it', api: 'it' },
  { code: 'ja', api: 'ja' },
  { code: 'kk', api: 'kk' },
  { code: 'ko', api: 'ko' },
  { code: 'lv', api: 'lv' },
  { code: 'lt', api: 'lt' },
  { code: 'ms', api: 'ms' },
  { code: 'no', api: 'no' },
  { code: 'pl', api: 'pl' },
  { code: 'pt', api: 'pt' },
  { code: 'ro', api: 'ro' },
  { code: 'ru', api: 'ru' },
  { code: 'sr', api: 'sr' },
  { code: 'sk', api: 'sk' },
  { code: 'sl', api: 'sl' },
  { code: 'es', api: 'es' },
  { code: 'sw', api: 'sw' },
  { code: 'sv', api: 'sv' },
  { code: 'th', api: 'th' },
  { code: 'tr', api: 'tr' },
  { code: 'uk', api: 'uk' },
  { code: 'ur', api: 'ur' },
  { code: 'uz', api: 'uz' },
  { code: 'vi', api: 'vi' },
  { code: 'tg', api: 'tg' },
]

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

function setByPath(obj, pathStr, value) {
  const parts = pathStr.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean)
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (cur[key] === undefined) cur[key] = /^\d+$/.test(parts[i + 1]) ? [] : {}
    cur = cur[key]
  }
  cur[parts[parts.length - 1]] = value
}

function deepClone(v) {
  return JSON.parse(JSON.stringify(v))
}

function isMostlyEnglish(locale) {
  const sample = locale?.hero?.title || ''
  return /Reliable Gas Cylinders/i.test(sample)
}

async function translateOne(text, to, attempt = 0) {
  if (/^[\d+$%°→—–\-./\s]+$/.test(text)) return text
  try {
    const res = await translate(text, { from: 'en', to, forceBatch: false })
    return res.text
  } catch (e) {
    const msg = String(e?.message || e)
    if (/Too Many Requests|429|rate/i.test(msg) && attempt < 6) {
      const wait = 5000 + attempt * 4000
      console.warn(`  rate-limit, wait ${wait}ms...`)
      await sleep(wait)
      return translateOne(text, to, attempt + 1)
    }
    console.warn(`  fail: ${text.slice(0, 36)}... ${msg.slice(0, 40)}`)
    return text
  }
}

async function translateBatch(texts, to) {
  const result = []
  for (let i = 0; i < texts.length; i++) {
    result.push(await translateOne(texts[i], to))
    if (i % 5 === 4) await sleep(800)
    else await sleep(200)
    if (i % 20 === 19 || i === texts.length - 1) {
      process.stdout.write(`  ${i + 1}/${texts.length}\r`)
    }
  }
  console.log('')
  return result
}

async function main() {
  fs.writeFileSync(path.join(outDir, 'en.json'), JSON.stringify(en, null, 2), 'utf8')
  console.log('Wrote en.json')

  const strings = collectStrings(en)
  console.log(`String slots: ${strings.length}`)

  for (const { code, api } of targets) {
    const cachePath = path.join(outDir, `${code}.json`)
    if (fs.existsSync(cachePath) && !process.env.FORCE) {
      const existing = JSON.parse(fs.readFileSync(cachePath, 'utf8'))
      if (!isMostlyEnglish(existing)) {
        console.log(`Skip OK ${code}.json`)
        continue
      }
      console.log(`Retry incomplete ${code}.json`)
    }

    console.log(`Translating → ${code}`)
    const translated = await translateBatch(strings.map((s) => s.value), api)
    const locale = deepClone(en)
    strings.forEach((s, i) => setByPath(locale, s.path, translated[i]))
    en.products?.items?.forEach((item, i) => {
      if (locale.products?.items?.[i]) locale.products.items[i].icon = item.icon
    })
    en.hero?.stats?.forEach((s, i) => {
      if (locale.hero?.stats?.[i]) locale.hero.stats[i].value = s.value
    })
    fs.writeFileSync(cachePath, JSON.stringify(locale, null, 2), 'utf8')
    console.log(`Wrote ${code}.json`)
    await sleep(2500)
  }

  const codes = ['en', ...targets.map((t) => t.code)]
  const missing = codes.filter((c) => !fs.existsSync(path.join(outDir, `${c}.json`)))
  if (missing.length) {
    console.error('Missing locales:', missing.join(', '))
    process.exit(1)
  }

  const index = `import type { Lang } from '../languages'
${codes.map((c) => `import ${c} from './${c}.json'`).join('\n')}

export const localeMap = {
${codes.map((c) => `  ${c},`).join('\n')}
} as const

export type TranslationKeys = typeof en
`
  fs.writeFileSync(path.join(outDir, 'index.ts'), index, 'utf8')
  console.log('Done. Locales:', codes.length)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
