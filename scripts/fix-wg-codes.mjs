/**
 * Restore WG product codes from en.json into all locale files.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { readJson, collect, getByPath, setByPath } from './i18n-shared.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesDir = path.join(__dirname, '../src/i18n/locales')
const en = readJson(path.join(localesDir, 'en.json'))
const slots = collect(en)

const wgRe = /WG-[A-Z0-9]+/gi

function restoreWgCodes(enText, locText) {
  const codes = enText.match(wgRe) || []
  if (!codes.length) return locText
  let out = locText
  const locCodes = locText.match(wgRe) || []
  codes.forEach((code, i) => {
    if (locCodes[i] && locCodes[i] !== code) {
      out = out.replace(locCodes[i], code)
    }
  })
  // If translator dropped WG entirely but en had codes, use en segment
  if (!locText.match(wgRe) && codes.length === 1 && enText.includes(',')) {
    return enText
  }
  return out
}

const files = fs.readdirSync(localesDir).filter((f) => f.endsWith('.json') && f !== 'en.json')

for (const file of files) {
  const code = file.replace('.json', '')
  const locale = readJson(path.join(localesDir, file))
  let fixes = 0
  for (const { path: p, value } of slots) {
    if (!wgRe.test(value)) continue
    const cur = getByPath(locale, p)
    if (typeof cur !== 'string') continue
    const fixed = restoreWgCodes(value, cur)
    if (fixed !== cur) {
      setByPath(locale, p, fixed)
      fixes++
    }
  }
  if (fixes) {
    fs.writeFileSync(path.join(localesDir, file), JSON.stringify(locale, null, 2) + '\n', 'utf8')
    console.log(`${code}: fixed ${fixes} WG codes`)
  }
}

console.log('WG code restore done')
