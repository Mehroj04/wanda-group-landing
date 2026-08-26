import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = 'src/i18n/locales'
const en = JSON.parse(readFileSync(join(dir, 'en.json'), 'utf8'))

function compare(a, b, path = '', acc = { total: 0, same: 0, missing: [] }) {
  if (typeof a === 'string') {
    if (a.length <= 3) return acc
    acc.total++
    if (b == null) acc.missing.push(path)
    else if (a === b) acc.same++
    return acc
  }
  if (Array.isArray(a)) {
    a.forEach((v, i) => compare(v, b?.[i], `${path}[${i}]`, acc))
    return acc
  }
  if (a && typeof a === 'object') {
    for (const k of Object.keys(a)) compare(a[k], b?.[k], path ? `${path}.${k}` : k, acc)
  }
  return acc
}

const rows = []
for (const f of readdirSync(dir).filter((f) => f.endsWith('.json') && f !== 'en.json')) {
  const lang = f.replace('.json', '')
  const data = JSON.parse(readFileSync(join(dir, f), 'utf8'))
  const r = compare(en, data)
  rows.push({ lang, ...r, pct: Math.round((1 - r.same / r.total) * 100) })
}

rows.sort((a, b) => a.pct - b.pct)
console.log('lang  translated%  untranslated(identical to EN)  missing')
for (const r of rows) {
  const flag = r.pct < 90 ? '  <-- NOT TRANSLATED' : ''
  console.log(`${r.lang.padEnd(5)} ${String(r.pct).padStart(9)}%  ${String(r.same).padStart(4)} / ${r.total}  ${String(r.missing.length).padStart(4)}${flag}`)
}
