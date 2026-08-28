/**
 * Full locale translation from en.json (structure clone + translate all strings).
 * Skips en, ru, zh by default.
 * Usage: npm run translate:locales
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import translate from 'google-translate-api-x'
import {
  readJson,
  collect,
  setByPath,
  shouldKeepEnglish,
  TARGETS,
} from './i18n-shared.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesDir = path.join(__dirname, '../src/i18n/locales')
const cacheDir = path.join(__dirname, '.i18n-cache')
fs.mkdirSync(cacheDir, { recursive: true })

const en = readJson(path.join(localesDir, 'en.json'))
const slots = collect(en)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const skipSet = new Set(
  (process.env.SKIP || 'ru,zh').split(',').filter(Boolean).concat(['en'])
)

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
    process.stdout.write(`    ${Math.min(i + size, pending.length)}/${pending.length} cached\r`)
    await sleep(700)
  }
  if (pending.length) console.log('')
}

async function translateFull(code, api) {
  const file = path.join(localesDir, `${code}.json`)
  const locale = structuredClone(en)
  const cache = loadCache(code)
  const toTranslate = []

  for (const { path: p, value } of slots) {
    if (shouldKeepEnglish(p, value)) continue
    toTranslate.push({ path: p, value })
  }

  const unique = [...new Set(toTranslate.map((s) => s.value))]
  console.log(`${code}: translating ${unique.length} unique strings (${toTranslate.length} slots)`)
  await translateUnique(unique, api, cache, code)

  for (const { path: p, value } of toTranslate) {
    setByPath(locale, p, cache[value] || value)
  }

  fs.writeFileSync(file, JSON.stringify(locale, null, 2) + '\n', 'utf8')
  console.log(`wrote ${code}.json`)
}

const only = process.env.ONLY ? process.env.ONLY.split(',') : null

async function main() {
  for (const [code, api] of TARGETS) {
    if (skipSet.has(code)) {
      console.log(`skip ${code}`)
      continue
    }
    if (only && !only.includes(code)) continue
    await translateFull(code, api)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
