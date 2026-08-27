import fs from 'fs'

const html = fs.readFileSync('index.html', 'utf8')
const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
if (!m) throw new Error('no json-ld')
const data = JSON.parse(m[1])
const products = data['@graph'].filter((n) => n['@type'] === 'Product')
const bad = products.filter((p) => p.offers || /InStock|AggregateOffer|lowPrice|highPrice/.test(JSON.stringify(p)))
console.log('products', products.length)
console.log('misleading offers', bad.length)
if (bad.length) process.exit(1)
console.log('JSON-LD OK')
