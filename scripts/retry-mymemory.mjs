/**
 * Translate incomplete locales via MyMemory API (fallback when Google is rate-limited).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../src/i18n/locales')
const en = JSON.parse(fs.readFileSync(path.join(outDir, 'en.json'), 'utf8'))

const todo = [
  ['ms', 'ms'], ['no', 'no'], ['pl', 'pl'], ['pt', 'pt'], ['ro', 'ro'],
  ['ru', 'ru'], ['sr', 'sr'], ['sk', 'sk'], ['sl', 'sl'], ['es', 'es'],
  ['sw', 'sw'], ['sv', 'sv'], ['th', 'th'], ['tr', 'tr'], ['uk', 'uk'],
  ['ur', 'ur'], ['uz', 'uz'], ['vi', 'vi'], ['tg', 'tg'],
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function collect(obj, prefix = '', out = []) {
  if (typeof obj === 'string') {
    out.push({ path: prefix, value: obj })
    return out
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => collect(v, `${prefix}[${i}]`, out))
    return out
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) collect(v, prefix ? `${prefix}.${k}` : k, out)
  }
  return out
}

function setPath(obj, p, value) {
  const parts = p.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean)
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    if (cur[parts[i]] === undefined) cur[parts[i]] = /^\d+$/.test(parts[i + 1]) ? [] : {}
    cur = cur[parts[i]]
  }
  cur[parts[parts.length - 1]] = value
}

async function mymemory(text, to) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${to}&de=sales@wandagroup.com`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const translated = data?.responseData?.translatedText
  if (!translated || /INVALID|QUERY LENGTH/i.test(translated)) throw new Error(translated || 'empty')
  return translated
}

async function translateOne(text, to, n = 0) {
  if (/^[\d+$%°→—–\-./\s]+$/.test(text)) return text
  try {
    return await mymemory(text, to)
  } catch (e) {
    if (n < 5) {
      const w = 2000 + n * 2000
      console.log(`  retry ${w}ms (${String(e.message || e).slice(0, 50)})`)
      await sleep(w)
      return translateOne(text, to, n + 1)
    }
    return text
  }
}

const slots = collect(en)
console.log('slots', slots.length)

for (const [code, api] of todo) {
  const existing = JSON.parse(fs.readFileSync(path.join(outDir, `${code}.json`), 'utf8'))
  if (existing.hero?.title && existing.hero.title !== en.hero.title) {
    console.log(`skip ok ${code}`)
    continue
  }
  console.log(`\n=== ${code} via MyMemory ===`)
  const locale = JSON.parse(JSON.stringify(en))
  for (let i = 0; i < slots.length; i++) {
    const translated = await translateOne(slots[i].value, api)
    setPath(locale, slots[i].path, translated)
    await sleep(350)
    if (i % 10 === 0) process.stdout.write(`  ${i}/${slots.length}\r`)
  }
  en.hero?.stats?.forEach((s, i) => {
    if (locale.hero?.stats?.[i]) locale.hero.stats[i].value = s.value
  })
  en.products?.items?.forEach((s, i) => {
    if (locale.products?.items?.[i]) locale.products.items[i].icon = s.icon
  })
  fs.writeFileSync(path.join(outDir, `${code}.json`), JSON.stringify(locale, null, 2))
  console.log(`\nWrote ${code}: ${locale.hero.title.slice(0, 50)}`)
  await sleep(1500)
}
console.log('DONE')
