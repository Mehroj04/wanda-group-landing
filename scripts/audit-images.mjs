import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

function walkDir(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walkDir(p, out)
    else out.push(p)
  }
  return out
}

const srcText = walkDir('src')
  .concat(['index.html'])
  .filter((f) => /\.(ts|tsx|json|html|css)$/.test(f))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n')

const files = walkDir('public/images').filter((f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f))

let usedBytes = 0
let unusedBytes = 0
const unused = []
for (const f of files) {
  const webPath = '/' + relative('public', f).split('\\').join('/')
  const size = statSync(f).size
  if (srcText.includes(webPath)) usedBytes += size
  else {
    unusedBytes += size
    unused.push({ webPath, kb: Math.round(size / 1024) })
  }
}

const groups = {}
for (const u of unused) {
  const g = u.webPath.split('/').slice(0, 3).join('/')
  groups[g] = (groups[g] || 0) + u.kb
}

console.log(`referenced images: ${files.length - unused.length}  (${(usedBytes / 1024 / 1024).toFixed(1)} MB)`)
console.log(`unused images:     ${unused.length}  (${(unusedBytes / 1024 / 1024).toFixed(1)} MB)\n`)
console.log('unused by folder:')
for (const [g, kb] of Object.entries(groups).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${g.padEnd(30)} ${(kb / 1024).toFixed(1)} MB`)
}
