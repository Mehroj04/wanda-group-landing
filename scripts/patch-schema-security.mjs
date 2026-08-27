import fs from 'fs'

let html = fs.readFileSync('index.html', 'utf8')

html = html.replace(/,\s*"offers":\s*\{[\s\S]*?"availability":\s*"https:\/\/schema\.org\/InStock"\s*\}/g, '')

html = html.replace(
  'Dissolved acetylene cylinders for welding and cutting. Indicative EXW range WG-10 to WG-25. ISO / DOT / TPED options.',
  'Dissolved acetylene cylinders for welding and cutting. Standards and configuration confirmed per order and destination market.',
)
html = html.replace(
  'Propane / LPG cylinders from compact to 50 L. Indicative EXW range WG-P11 to WG-P50.',
  'Propane / LPG cylinders for heating, cutting and industrial gas supply. Configuration confirmed per inquiry.',
)
html = html.replace(
  'Industrial acetylene generator for on-site gas supply. Indicative EXW range for WG-G20.',
  'Industrial acetylene generator for on-site gas supply. Specifications confirmed per inquiry.',
)
html = html.replace(
  'Welding and cutting accessories for gas cylinders, including regulator sets. Indicative EXW range.',
  'Welding and cutting accessories for gas cylinders, including regulator sets. Quoted per inquiry.',
)

const noscript = `    <noscript>
      <main>
        <h1>Wanda Group (WandaGroups) — Gas Cylinder Manufacturer</h1>
        <p>
          Official website of Wanda Group: acetylene cylinders, propane cylinders, generators and welding
          accessories for industrial buyers. OEM marking and international export support.
        </p>
        <nav aria-label="Site">
          <ul>
            <li><a href="https://www.wandagroups.com/">Home</a></li>
            <li><a href="https://www.wandagroups.com/about">About</a></li>
            <li><a href="https://www.wandagroups.com/products">Products</a></li>
            <li><a href="https://www.wandagroups.com/products/acetylene-cylinders">Acetylene cylinders</a></li>
            <li><a href="https://www.wandagroups.com/products/propane-cylinders">Propane cylinders</a></li>
            <li><a href="https://www.wandagroups.com/factory">Factory</a></li>
            <li><a href="https://www.wandagroups.com/certifications">Certifications</a></li>
            <li><a href="https://www.wandagroups.com/oem">OEM</a></li>
            <li><a href="https://www.wandagroups.com/contact">Contact / Get a Quote</a></li>
          </ul>
        </nav>
        <p>
          Email: sales@wandagroups.com · Phone / WhatsApp: +998 50 713 66 46 · Telegram: @sh987789 · WeChat: +86 130 8285 5282
        </p>
      </main>
    </noscript>`

html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript)

fs.writeFileSync('index.html', html)
console.log('index.html schema + noscript updated')
