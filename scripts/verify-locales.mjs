/**
 * Verify locale JSON files against en.json.
 * Usage: npm run verify:locales
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  readJson,
  collect,
  getByPath,
  shouldKeepEnglish,
  extractPlaceholders,
  SKIP_TRANSLATE,
} from './i18n-shared.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesDir = path.join(__dirname, '../src/i18n/locales')
const en = readJson(path.join(localesDir, 'en.json'))
const slots = collect(en)

const files = fs
  .readdirSync(localesDir)
  .filter((f) => f.endsWith('.json') && f !== 'en.json')
  .map((f) => f.replace('.json', ''))
  .sort()

let totalMissing = 0
let totalUntranslated = 0
let totalEmpty = 0
let totalErrors = 0
const report = []

for (const code of files) {
  const locale = readJson(path.join(localesDir, `${code}.json`))
  const missing = []
  const untranslated = []
  const empty = []
  const errors = []

  for (const { path: p, value: enVal } of slots) {
    const cur = getByPath(locale, p)
    if (cur === undefined) {
      missing.push(p)
      continue
    }
    if (typeof cur !== 'string') {
      errors.push(`${p}: not a string`)
      continue
    }
    if (!cur.trim()) {
      if (!enVal.trim()) continue
      empty.push(p)
      continue
    }
    if (shouldKeepEnglish(p, enVal)) continue
    if (SKIP_TRANSLATE.has(code)) continue
    if (cur === enVal) untranslated.push(p)

    const enPh = extractPlaceholders(enVal)
    const curPh = extractPlaceholders(cur)
    if (JSON.stringify(enPh) !== JSON.stringify(curPh)) {
      errors.push(`${p}: placeholder mismatch`)
    }

    const wgEn = (enVal.match(/WG-[\w]+/gi) || []).sort()
    const wgCur = (cur.match(/WG-[\w]+/gi) || []).sort()
    if (wgEn.length || wgCur.length) {
      if (JSON.stringify(wgEn) !== JSON.stringify(wgCur)) {
        errors.push(`${p}: WG code changed`)
      }
    }

    if (/<[a-z][^>]*>/i.test(enVal) && !/<[a-z][^>]*>/i.test(cur) && enVal.includes('<')) {
      errors.push(`${p}: HTML tags missing`)
    }
  }

  totalMissing += missing.length
  totalUntranslated += untranslated.length
  totalEmpty += empty.length
  totalErrors += errors.length

  report.push({
    code,
    missing: missing.length,
    untranslated: untranslated.length,
    empty: empty.length,
    errors: errors.length,
  })

  if (missing.length || untranslated.length || empty.length || errors.length) {
    console.log(
      `${code}: missing=${missing.length} untranslated=${untranslated.length} empty=${empty.length} errors=${errors.length}`
    )
    if (errors.length) errors.slice(0, 5).forEach((e) => console.log(`  ERR ${e}`))
    if (untranslated.length) untranslated.slice(0, 3).forEach((p) => console.log(`  EN ${p}`))
  } else {
    console.log(`${code}: OK`)
  }
}

console.log('\n--- Summary ---')
console.log('Languages:', files.length, '(+ en.json)')
console.log('Total missing keys:', totalMissing)
console.log('Total untranslated (identical to EN, should review):', totalUntranslated)
console.log('Total empty strings:', totalEmpty)
console.log('Total errors:', totalErrors)

if (totalMissing || totalEmpty || totalErrors) {
  console.error('\nLocale verification FAILED (missing, empty, or structural errors)')
  process.exit(1)
}

if (totalUntranslated) {
  console.log(`\nNote: ${totalUntranslated} strings still match English (often technical terms, country names, or Filipino English).`)
}

console.log('Locale verification passed (structure + integrity)')
