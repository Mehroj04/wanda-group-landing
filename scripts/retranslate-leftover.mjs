/**
 * Second pass: translate strings still identical to en.json.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import translate from 'google-translate-api-x'
import {
  readJson,
  collect,
  getByPath,
  setByPath,
  shouldKeepEnglish,
  TARGETS,
  SKIP_TRANSLATE,
} from './i18n-shared.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesDir = path.join(__dirname, '../src/i18n/locales')
const cacheDir = path.join(__dirname, '.i18n-cache')
const en = readJson(path.join(localesDir, 'en.json'))
const slots = collect(en)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const skipSet = new Set((process.env.SKIP || 'ru,zh,en').split(',').filter(Boolean))

async function translateBatch(texts, to) {
  const opts = { from: 'en', to, forceBatch: true }
  if (to === 'zh-CN') opts.forceTo = true
  const res = await translate(texts, opts)
  if (Array.isArray(res)) return res.map((r) => (typeof r?.text === 'string' ? r.text : String(r)))
  return [res.text]
}

async function fillLeftover(code, api) {
  const file = path.join(localesDir, `${code}.json`)
  const locale = readJson(file)
  const leftover = []
  for (const { path: p, value } of slots) {
    if (shouldKeepEnglish(p, value)) continue
    const cur = getByPath(locale, p)
    if (typeof cur === 'string' && cur === value) leftover.push({ path: p, value })
  }
  if (!leftover.length) {
    console.log(`${code}: no leftover`)
    return
  }
  const unique = [...new Set(leftover.map((x) => x.value))]
  console.log(`${code}: ${unique.length} leftover strings`)
  const cache = {}
  const size = 10
  for (let i = 0; i < unique.length; i += size) {
    const chunk = unique.slice(i, i + size)
    try {
      const out = await translateBatch(chunk, api)
      chunk.forEach((src, idx) => {
        cache[src] = String(out[idx] || src).trim() || src
      })
    } catch {
      chunk.forEach((src) => (cache[src] = src))
    }
    await sleep(800)
  }
  for (const { path: p, value } of leftover) {
    if (cache[value] && cache[value] !== value) setByPath(locale, p, cache[value])
  }
  fs.writeFileSync(file, JSON.stringify(locale, null, 2) + '\n', 'utf8')
  console.log(`wrote ${code}.json`)
}

const only = process.env.ONLY ? process.env.ONLY.split(',') : null

for (const [code, api] of TARGETS) {
  if (skipSet.has(code)) continue
  if (only && !only.includes(code)) continue
  await fillLeftover(code, api)
}
