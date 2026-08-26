import { readFileSync, writeFileSync } from 'node:fs'

const en = JSON.parse(readFileSync('src/i18n/locales/en.json', 'utf8'))
const zh = JSON.parse(readFileSync('src/i18n/locales/zh.json', 'utf8'))

// Internal identifiers and standard/brand codes must stay in Latin script.
const SKIP_KEY = /(^|\.)id$|(^|\.)slug$|(^|\.)key$|\.author$/
const CODE = /^(ISO|DOT|TPED|EN|GB|API|CE|ASME|BS|DIN|SAE|TC|UN)[\s\d]/i

const out = {}
function walk(a, b, path = '') {
  if (typeof a === 'string') {
    if (typeof b === 'string' && a === b && a.length > 3) {
      if (SKIP_KEY.test(path)) return
      if (CODE.test(a) && a.length < 20) return
      out[path] = a
    }
    return
  }
  if (Array.isArray(a)) return a.forEach((v, i) => walk(v, b?.[i], `${path}[${i}]`))
  if (a && typeof a === 'object') {
    for (const k of Object.keys(a)) walk(a[k], b?.[k], path ? `${path}.${k}` : k)
  }
}
walk(en, zh)

const sections = {}
for (const [p, v] of Object.entries(out)) {
  const sec = p.split(/\.|\[/)[0]
  ;(sections[sec] ||= {})[p] = v
}

for (const [sec, obj] of Object.entries(sections)) {
  writeFileSync(`scripts/zh-todo-${sec}.json`, JSON.stringify(obj, null, 2), 'utf8')
  console.log(`${sec}: ${Object.keys(obj).length} -> scripts/zh-todo-${sec}.json`)
}
console.log(`\ntotal to translate: ${Object.keys(out).length}`)
