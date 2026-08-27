/**
 * Translate leftover English strings in locale JSON files.
 * Resumes per language. Usage: node scripts/fill-locales.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import translate from 'google-translate-api-x'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesDir = path.join(__dirname, '../src/i18n/locales')
const cacheDir = path.join(__dirname, '.i18n-cache')
fs.mkdirSync(cacheDir, { recursive: true })

function readJson(file) {
  let text = fs.readFileSync(file, 'utf8')
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  return JSON.parse(text)
}

const en = readJson(path.join(localesDir, 'en.json'))

const targets = [
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function collect(obj, prefix = '', out = []) {
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

function getByPath(obj, pathStr) {
  const parts = pathStr.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean)
  let cur = obj
  for (const x of parts) {
    if (cur == null) return undefined
    cur = cur[x]
  }
  return cur
}

function shouldKeepEnglish(pathStr, text) {
  if (pathStr.endsWith('.icon')) return true
  if (/\.stats\[\d+\]\.value$/.test(pathStr)) return true
  if (/@/.test(text) || /^https?:\/\//i.test(text)) return true
  if (/^WG-\d+$/i.test(text)) return true
  if (/^(ISO 9809-1|DOT 3AA|TPED|GB 5099|CE|OEM\/ODM|ISO \/ DOT \/ TPED|C₂H₂ \(kg\)|WP \(MPa\)|TP \(MPa\))$/.test(text)) return true
  if (/^[\d+$%°×x→—–\-.,/\s]+$/.test(text)) return true
  if (/^[\p{Extended_Pictographic}\p{Emoji_Presentation}\s]+$/u.test(text)) return true
  return false
}

function loadCache(code) {
  const p = path.join(cacheDir, `${code}.json`)
  if (!fs.existsSync(p)) return {}
  try {
    return readJson(p)
  } catch {
    return {}
  }
}

function saveCache(code, cache) {
  fs.writeFileSync(path.join(cacheDir, `${code}.json`), JSON.stringify(cache, null, 0), 'utf8')
}

async function translateBatch(texts, to) {
  if (texts.length === 0) return []
  const opts = { from: 'en', to, forceBatch: true }
  if (to === 'zh-CN') opts.forceTo = true
  const res = await translate(texts, opts)
  if (Array.isArray(res)) return res.map((r) => (typeof r?.text === 'string' ? r.text : String(r)))
  if (typeof res?.text === 'string') return [res.text]
  throw new Error('Unexpected translate result')
}

async function translateUnique(texts, to, cache, code) {
  const pending = texts.filter((t) => !cache[t])
  const size = 12
  for (let i = 0; i < pending.length; i += size) {
    const chunk = pending.slice(i, i + size)
    let ok = false
    for (let attempt = 0; attempt < 6 && !ok; attempt++) {
      try {
        const out = await translateBatch(chunk, to)
        chunk.forEach((src, idx) => {
          const val = String(out[idx] || '').trim()
          cache[src] = val || src
        })
        saveCache(code, cache)
        ok = true
      } catch (e) {
        const wait = 4000 + attempt * 4000
        console.warn(`    retry ${wait}ms (${String(e.message || e).slice(0, 80)})`)
        await sleep(wait)
      }
    }
    if (!ok) {
      chunk.forEach((src) => {
        if (!cache[src]) cache[src] = src
      })
      saveCache(code, cache)
    }
    process.stdout.write(`    ${Math.min(i + size, pending.length)}/${pending.length} new\r`)
    await sleep(700)
  }
  if (pending.length) console.log('')
}

const slots = collect(en)

async function fillOne(code, api) {
  const file = path.join(localesDir, `${code}.json`)
  const locale = readJson(file)
  const cache = loadCache(code)
  const toTranslate = []

  for (const { path: p, value } of slots) {
    let current = getByPath(locale, p)
    if (typeof current !== 'string') {
      setByPath(locale, p, value)
      current = value
    }
    if (shouldKeepEnglish(p, value)) {
      if (p.endsWith('.icon') || /\.stats\[\d+\]\.value$/.test(p) || /^[\d+$%°×x→—–\-.,/\s]+$/.test(value)) {
        setByPath(locale, p, value)
      }
      continue
    }
    if (current !== value) continue
    toTranslate.push({ path: p, value })
  }

  const unique = [...new Set(toTranslate.map((s) => s.value))]
  if (unique.length === 0) {
    fs.writeFileSync(file, JSON.stringify(locale, null, 2) + '\n', 'utf8')
    console.log(`ok ${code} (nothing left)`)
    return
  }

  console.log(`${code}: ${unique.length} unique leftover strings`)
  await translateUnique(unique, api, cache, code)

  for (const { path: p, value } of toTranslate) {
    setByPath(locale, p, cache[value] || value)
  }

  fs.writeFileSync(file, JSON.stringify(locale, null, 2) + '\n', 'utf8')
  console.log(`wrote ${code}.json`)
}

const only = process.env.ONLY ? process.env.ONLY.split(',') : null

async function main() {
  for (const [code, api] of targets) {
    if (only && !only.includes(code)) continue
    await fillOne(code, api)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
