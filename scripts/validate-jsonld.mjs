import fs from 'fs'

const html = fs.readFileSync('index.html', 'utf8')
const m = html.match(/<script type="application\/ld\+json" id="site-jsonld-static">([\s\S]*?)<\/script>/)
if (!m) throw new Error('site-jsonld-static script not found')

const data = JSON.parse(m[1])
const graph = data['@graph'] ?? [data]

function types(node) {
  const t = node['@type']
  return Array.isArray(t) ? t : t ? [t] : []
}

function walk(node, out = []) {
  if (!node || typeof node !== 'object') return out
  if (Array.isArray(node)) {
    node.forEach((item) => walk(item, out))
    return out
  }
  out.push(node)
  for (const value of Object.values(node)) walk(value, out)
  return out
}

const nodes = walk(graph)
const products = nodes.filter((n) => types(n).includes('Product'))
const misleading = JSON.stringify(graph).match(
  /"offers"|AggregateOffer|aggregateRating|"review"|InStock|lowPrice|highPrice/g,
)

console.log('graph nodes', graph.length)
console.log('Product nodes', products.length)
console.log('misleading commerce fields', misleading ? misleading.length : 0)

if (products.length) {
  console.error('Product schema must not appear without verified offers/reviews/ratings.')
  products.forEach((p) => console.error(' -', p.name ?? p['@id']))
  process.exit(1)
}

if (misleading?.length) {
  console.error('Misleading commerce schema fields found:', [...new Set(misleading)])
  process.exit(1)
}

const required = ['Organization', 'WebSite', 'WebPage']
for (const type of required) {
  const found = graph.some((n) => types(n).includes(type))
  if (!found) {
    console.error(`Missing ${type} in homepage @graph`)
    process.exit(1)
  }
}

console.log('JSON-LD OK')
