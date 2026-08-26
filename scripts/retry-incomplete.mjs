import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import translate from 'google-translate-api-x'

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
  if (typeof obj === 'string') { out.push({ path: prefix, value: obj }); return out }
  if (Array.isArray(obj)) { obj.forEach((v, i) => collect(v, `${prefix}[${i}]`, out)); return out }
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

async function tr(text, to, n = 0) {
  try {
    return (await translate(text, { from: 'en', to, forceBatch: false })).text
  } catch (e) {
    if (n < 8) {
      const w = 8000 + n * 5000
      console.log(`  wait ${w}ms (${String(e.message || e).slice(0, 40)})`)
      await sleep(w)
      return tr(text, to, n + 1)
    }
    return text
  }
}

const slots = collect(en)
console.log('slots', slots.length, 'langs', todo.length)

for (const [code, api] of todo) {
  console.log(`\n=== ${code} ===`)
  const locale = JSON.parse(JSON.stringify(en))
  for (let i = 0; i < slots.length; i++) {
    const translated = await tr(slots[i].value, api)
    setPath(locale, slots[i].path, translated)
    await sleep(350)
    if (i % 10 === 0) process.stdout.write(`  ${i}/${slots.length}\r`)
  }
  // restore values/icons
  en.hero?.stats?.forEach((s, i) => { if (locale.hero?.stats?.[i]) locale.hero.stats[i].value = s.value })
  en.products?.items?.forEach((s, i) => { if (locale.products?.items?.[i]) locale.products.items[i].icon = s.icon })
  fs.writeFileSync(path.join(outDir, `${code}.json`), JSON.stringify(locale, null, 2))
  console.log(`\nWrote ${code}.json title=${locale.hero.title.slice(0, 40)}`)
  await sleep(3000)
}
console.log('ALL DONE')
