import fs from 'fs'

const path = 'index.html'
let html = fs.readFileSync(path, 'utf8')

const replacements = [
  ['https://www.wandagroups.com/#product-acetylene-cylinder', 'https://www.wandagroups.com/products/acetylene-cylinders'],
  ['https://www.wandagroups.com/#product-propane-cylinder', 'https://www.wandagroups.com/products/propane-cylinders'],
  ['https://www.wandagroups.com/#product-acetylene-generator', 'https://www.wandagroups.com/products/generators'],
  ['https://www.wandagroups.com/#product-gas-cylinder-accessories', 'https://www.wandagroups.com/products/welding-accessories'],
  ['https://www.wandagroups.com/#product-refrigeration', 'https://www.wandagroups.com/products/refrigeration'],
  ['https://www.wandagroups.com/#pricing', 'https://www.wandagroups.com/contact'],
]

for (const [from, to] of replacements) {
  html = html.split(from).join(to)
}

fs.writeFileSync(path, html)
console.log('index.html product schema URLs updated')
