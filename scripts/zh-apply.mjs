import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

const zhPath = 'src/i18n/locales/zh.json'
const zh = JSON.parse(readFileSync(zhPath, 'utf8'))
const en = JSON.parse(readFileSync('src/i18n/locales/en.json', 'utf8'))

const parse = (path) => path.split(/\.|\[|\]/).filter(Boolean).map((k) => (/^\d+$/.test(k) ? Number(k) : k))

function get(obj, path) {
  return parse(path).reduce((a, k) => (a == null ? a : a[k]), obj)
}

function set(obj, path, value) {
  const keys = parse(path)
  const last = keys.pop()
  const target = keys.reduce((a, k) => (a == null ? a : a[k]), obj)
  if (target == null) return false
  target[last] = value
  return true
}

const patches = readdirSync('scripts').filter((f) => /^zh-patch-.*\.json$/.test(f))
let applied = 0
const problems = []

for (const file of patches) {
  const patch = JSON.parse(readFileSync(`scripts/${file}`, 'utf8'))
  let count = 0
  for (const [path, value] of Object.entries(patch)) {
    if (get(en, path) === undefined) {
      problems.push(`${file}: path not in en.json -> ${path}`)
      continue
    }
    if (typeof value !== 'string' || !value.trim()) {
      problems.push(`${file}: empty value -> ${path}`)
      continue
    }
    if (!set(zh, path, value)) {
      problems.push(`${file}: could not set -> ${path}`)
      continue
    }
    count++
    applied++
  }
  console.log(`${file}: ${count} / ${Object.keys(patch).length}`)
}

if (problems.length) {
  console.log(`\nPROBLEMS (${problems.length}):`)
  for (const p of problems.slice(0, 40)) console.log('  ' + p)
  process.exitCode = 1
}

writeFileSync(zhPath, JSON.stringify(zh, null, 2) + '\n', 'utf8')
console.log(`\napplied ${applied} translations to ${zhPath}`)
