/**
 * Fast pass: translate only visible chrome (nav, hero, form, etc.).
 * Usage: node scripts/fill-chrome.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import translate from 'google-translate-api-x'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesDir = path.join(__dirname, '../src/i18n/locales')

const targets = [
  ['uz', 'uz'],
  ['tg', 'tg'],
  ['kk', 'kk'],
  ['zh', 'zh'],
  ['tr', 'tr'],
  ['es', 'es'],
  ['vi', 'vi'],
]

const allow = [
  'nav.',
  'hero.',
  'accessories.',
  'products.',
  'cta.',
  'footer.',
  'ui.',
  'whyUs.',
  'about.',
]

function allowed(p) {
  return allow.some((prefix) => p === prefix.slice(0, -1) || p.startsWith(prefix))
}

function readJson(file) {
  let text = fs.readFileSync(file, 'utf8')
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  return JSON.parse(text)
}

const en = readJson(path.join(localesDir, 'en.json'))
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
  if (/@/.test(text)) return true
  if (/^[\d+$%°×x→—–\-.,/\s]+$/.test(text)) return true
  return false
}

async function translateBatch(texts, to) {
  const res = await translate(texts, { from: 'en', to, forceBatch: true })
  if (Array.isArray(res)) return res.map((r) => (typeof r?.text === 'string' ? r.text : String(r)))
  if (typeof res?.text === 'string') return [res.text]
  throw new Error('Unexpected translate result')
}

const slots = collect(en).filter((s) => allowed(s.path))

async function fillOne(code, api) {
  const file = path.join(localesDir, `${code}.json`)
  const locale = readJson(file)
  const todo = []

  for (const { path: p, value } of slots) {
    let current = getByPath(locale, p)
    if (typeof current !== 'string') {
      setByPath(locale, p, value)
      current = value
    }
    if (shouldKeepEnglish(p, value)) continue
    if (current !== value) continue
    todo.push({ path: p, value })
  }

  const unique = [...new Set(todo.map((s) => s.value))]
  console.log(`${code}: ${unique.length} chrome strings`)
  const map = {}
  const size = 20
  for (let i = 0; i < unique.length; i += size) {
    const chunk = unique.slice(i, i + size)
    let done = false
    for (let attempt = 0; attempt < 5 && !done; attempt++) {
      try {
        const out = await translateBatch(chunk, api)
        chunk.forEach((src, idx) => {
          map[src] = String(out[idx] || src).trim() || src
        })
        done = true
      } catch (e) {
        await sleep(2500 + attempt * 2500)
        if (attempt === 4) chunk.forEach((src) => { map[src] = src })
      }
    }
    await sleep(200)
  }

  for (const { path: p, value } of todo) setByPath(locale, p, map[value] || value)
  if (!locale.ui) locale.ui = {}
  if (!locale.ui.searchLanguage) locale.ui.searchLanguage = map['Search language...'] || 'Search language...'
  if (!locale.ui.noLanguagesFound) locale.ui.noLanguagesFound = map['No languages found'] || 'No languages found'

  fs.writeFileSync(file, JSON.stringify(locale, null, 2) + '\n', 'utf8')
  console.log(`wrote ${code}.json`)
}

async function main() {
  for (const [code, api] of targets) await fillOne(code, api)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
