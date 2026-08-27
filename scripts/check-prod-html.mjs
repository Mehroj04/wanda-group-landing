import https from 'https'

const slugs = [
  'acetylene-cylinders',
  'propane-cylinders',
  'lpg-cylinders',
  'industrial-gas-cylinders',
  'generators',
  'welding-accessories',
  'refrigeration',
]

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = ''
        res.on('data', (c) => (data += c))
        res.on('end', () => resolve({ status: res.statusCode, html: data }))
      })
      .on('error', reject)
  })
}

function pick(html, re) {
  const m = html.match(re)
  return m ? m[1] : null
}

for (const slug of slugs) {
  const url = `https://www.wandagroups.com/products/${slug}`
  const { status, html } = await get(url)
  const canonical = pick(html, /rel="canonical" href="([^"]+)"/)
  const title = pick(html, /<title>([^<]+)<\/title>/)
  const h1 = pick(html, /<h1>([^<]+)<\/h1>/)
  const ok =
    status === 200 &&
    canonical?.includes(slug) &&
    html.includes('data-prerender="product"') &&
    html.includes('BreadcrumbList') &&
    h1 &&
    !html.includes('"@type": "Product"')
  console.log(ok ? 'OK' : 'FAIL', slug, '|', title?.slice(0, 50))
  if (!ok) console.log('  canonical:', canonical, 'h1:', h1)
}
