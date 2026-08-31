/**
 * One-shot Cloudflare setup for sales@ dual forward.
 * Usage:
 *   node setup-routing.mjs subdomain
 *   node setup-routing.mjs routing
 */
import fs from 'fs'
import os from 'os'
import path from 'path'

const ACCOUNT_ID = '09aed964675a7c7bc685da8b57deace2'
const WORKER = 'sales-forward'
const TO = 'sales@wandagroups.com'
const step = process.argv[2] || 'all'

function readToken() {
  const p = path.join(os.homedir(), 'AppData/Roaming/xdg.config/.wrangler/config/default.toml')
  const txt = fs.readFileSync(p, 'utf8')
  const m = txt.match(/oauth_token\s*=\s*"([^"]+)"/) || txt.match(/api_token\s*=\s*"([^"]+)"/)
  if (!m) throw new Error('Wrangler token not found')
  return m[1]
}

async function cf(token, method, url, body) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  if (!data.success) {
    const err = data.errors?.map((e) => e.message).join('; ') || JSON.stringify(data)
    throw new Error(`${method} ${url}: ${res.status} ${err}`)
  }
  return data.result
}

const token = readToken()

if (step === 'subdomain' || step === 'all') {
  try {
    const subdomain = await cf(token, 'GET', `/accounts/${ACCOUNT_ID}/workers/subdomain`)
    console.log('workers.dev already:', subdomain?.subdomain || JSON.stringify(subdomain))
  } catch (e) {
    console.log('get subdomain:', e.message)
    const subdomain = await cf(token, 'PUT', `/accounts/${ACCOUNT_ID}/workers/subdomain`, {
      subdomain: 'wandagroups',
    })
    console.log('registered workers.dev:', subdomain?.subdomain || JSON.stringify(subdomain))
  }
}

if (step === 'routing' || step === 'all') {
  const zones = await cf(token, 'GET', '/zones?name=wandagroups.com')
  const zone = Array.isArray(zones) ? zones[0] : null
  if (!zone?.id) throw new Error('Zone wandagroups.com not found')
  console.log('zone', zone.id)

  const rules = await cf(token, 'GET', `/zones/${zone.id}/email/routing/rules`)
  const list = Array.isArray(rules) ? rules : []
  console.log(
    'rules',
    list.map((r) => ({
      id: r.tag || r.id,
      name: r.name,
      matchers: r.matchers,
      actions: r.actions,
      enabled: r.enabled,
    })),
  )

  const sales = list.find((r) =>
    (r.matchers || []).some((m) => String(m.value || '').toLowerCase() === TO),
  )
  if (!sales) throw new Error('sales@wandagroups.com rule not found')

  const ruleId = sales.tag || sales.id
  const updated = await cf(token, 'PUT', `/zones/${zone.id}/email/routing/rules/${ruleId}`, {
    name: sales.name || 'sales',
    enabled: true,
    matchers: sales.matchers,
    actions: [{ type: 'worker', value: [WORKER] }],
  })
  console.log('updated sales rule', {
    id: updated.tag || updated.id,
    actions: updated.actions,
    enabled: updated.enabled,
  })
}
