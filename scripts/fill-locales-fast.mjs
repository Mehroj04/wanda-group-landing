/**
 * Fast leftover translation: parallel languages + large batches.
 * Usage: node scripts/fill-locales-fast.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import translate from 'google-translate-api-x'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesDir = path.join(__dirname, '../src/i18n/locales')
const cacheDir = path.join(__dirname, '.i18n-cache')
fs.mkdirSync(cacheDir, { recursive: true })

const CONCURRENCY = Number(process.env.CONCURRENCY || 6)
const BATCH = Number(process.env.BATCH || 35)

const targets = [
  ['ar', 'ar'], ['bn', 'bn'], ['bg', 'bg'], ['hr', 'hr'], ['cs', 'cs'],
  ['da', 'da'], ['nl', 'nl'], ['fil', 'tl'], ['fi', 'fi'], ['fr', 'fr'],
  ['de', 'de'], ['el', 'el'], ['hi', 'hi'], ['hu', 'hu'], ['id', 'id'],
  ['it', 'it'], ['ja', 'ja'], ['kk', 'kk'], ['ko', 'ko'], ['lv', 'lv'],
  ['lt', 'lt'], ['ms', 'ms'], ['no', 'no'], ['pl', 'pl'], ['pt', 'pt'],
  ['ro', 'ro'], ['ru', 'ru'], ['sr', 'sr'], ['sk', 'sk'], ['sl', 'sl'],
  ['es', 'es'], ['sw', 'sw'], ['sv', 'sv'], ['th', 'th'], ['tr', 'tr'],
  ['uk', 'uk'], ['ur', 'ur'], ['uz', 'uz'], ['vi', 'vi'],   ['zh', 'zh-CN'],
  ['tg', 'tg'],
]

const forceToLangs = new Set(['zh-CN'])

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function readJson(file) {
  let text = fs.readFileSync(file, 'utf8')
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  return JSON.parse(text)
}

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
  fs.writeFileSync(path.join(cacheDir, `${code}.json`), JSON.stringify(cache), 'utf8')
}

async function translateBatch(texts, to) {
  const res = await translate(texts, {
    from: 'en',
    to,
    forceBatch: true,
    forceTo: forceToLangs.has(to),
  })
  if (Array.isArray(res)) return res.map((r) => (typeof r?.text === 'string' ? r.text : String(r)))
  if (typeof res?.text === 'string') return [res.text]
  throw new Error('Unexpected translate result')
}

async function translateUnique(texts, to, cache, code) {
  const pending = texts.filter((t) => !cache[t])
  for (let i = 0; i < pending.length; i += BATCH) {
    const chunk = pending.slice(i, i + BATCH)
    let ok = false
    for (let attempt = 0; attempt < 5 && !ok; attempt++) {
      try {
        const out = await translateBatch(chunk, to)
        chunk.forEach((src, idx) => {
          const val = String(out[idx] || '').trim()
          cache[src] = val || src
        })
        saveCache(code, cache)
        ok = true
      } catch (e) {
        const wait = 2000 + attempt * 2500
        console.warn(`  [${code}] retry ${wait}ms (${String(e.message || e).slice(0, 60)})`)
        await sleep(wait)
      }
    }
    if (!ok) {
      // fallback: one-by-one for this chunk
      for (const src of chunk) {
        if (cache[src]) continue
        try {
          const one = await translate(src, { from: 'en', to })
          cache[src] = String(one?.text || src).trim() || src
        } catch {
          cache[src] = src
        }
        await sleep(150)
      }
      saveCache(code, cache)
    }
    process.stdout.write(`  [${code}] ${Math.min(i + BATCH, pending.length)}/${pending.length}\r`)
    await sleep(120)
  }
  if (pending.length) console.log(`  [${code}] done ${pending.length} new`)
}

const en = readJson(path.join(localesDir, 'en.json'))
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
    // still ensure new ui keys exist
    if (!locale.ui?.searchLanguage) setByPath(locale, 'ui.searchLanguage', en.ui.searchLanguage)
    if (!locale.ui?.noLanguagesFound) setByPath(locale, 'ui.noLanguagesFound', en.ui.noLanguagesFound)
    fs.writeFileSync(file, JSON.stringify(locale, null, 2) + '\n', 'utf8')
    console.log(`ok ${code}`)
    return
  }

  console.log(`${code}: ${unique.length} leftover`)
  await translateUnique(unique, api, cache, code)

  for (const { path: p, value } of toTranslate) {
    setByPath(locale, p, cache[value] || value)
  }
  fs.writeFileSync(file, JSON.stringify(locale, null, 2) + '\n', 'utf8')
  console.log(`wrote ${code}`)
}

async function mapPool(items, limit, worker) {
  const q = [...items]
  const runners = Array.from({ length: Math.min(limit, q.length) }, async () => {
    while (q.length) {
      const item = q.shift()
      if (!item) return
      await worker(item)
    }
  })
  await Promise.all(runners)
}

const only = process.env.ONLY ? process.env.ONLY.split(',') : null

async function main() {
  const list = targets.filter(([code]) => !only || only.includes(code))
  console.log(`Fast fill: ${list.length} locales, concurrency=${CONCURRENCY}, batch=${BATCH}`)
  await mapPool(list, CONCURRENCY, async ([code, api]) => {
    try {
      await fillOne(code, api)
    } catch (e) {
      console.error(`FAIL ${code}`, e.message || e)
    }
  })
  console.log('ALL DONE')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
