import fs from 'fs'

function validateFile(file, { requireSiteGraph }) {
  const html = fs.readFileSync(file, 'utf8')
  const m = html.match(/<script type="application\/ld\+json" id="site-jsonld-static">([\s\S]*?)<\/script>/)
  if (requireSiteGraph && !m) throw new Error(`${file}: site-jsonld-static script not found`)
  if (!m) {
    console.log(`${file}: no homepage graph (OK for inner pages)`)
    return
  }

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
  const serialized = JSON.stringify(graph)
  const misleading = serialized.match(
    /"offers"|AggregateOffer|aggregateRating|"review"|InStock|lowPrice|highPrice/g,
  )

  console.log(file)
  console.log('  graph nodes', graph.length)
  console.log('  Product nodes', products.length)
  console.log('  misleading commerce fields', misleading ? misleading.length : 0)

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
      console.error(`Missing ${type} in homepage @graph (${file})`)
      process.exit(1)
    }
  }

  if (serialized.includes('BreadcrumbList')) {
    console.error(`${file}: homepage graph must not include BreadcrumbList`)
    process.exit(1)
  }

  const org = graph.find((n) => types(n).includes('Organization'))
  if (org?.name !== 'Wanda Groups') {
    console.error(`${file}: Organization.name must be "Wanda Groups"`)
    process.exit(1)
  }
  const website = graph.find((n) => types(n).includes('WebSite'))
  if (website?.name !== 'Wanda Groups') {
    console.error(`${file}: WebSite.name must be "Wanda Groups"`)
    process.exit(1)
  }
  if (website?.url !== 'https://www.wandagroups.com/') {
    console.error(`${file}: WebSite.url must be https://www.wandagroups.com/`)
    process.exit(1)
  }
}

validateFile('index.html', { requireSiteGraph: true })
if (fs.existsSync('dist/index.html')) {
  validateFile('dist/index.html', { requireSiteGraph: true })
}

console.log('JSON-LD OK')
