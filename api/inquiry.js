const INBOX = 'sales@wandagroups.com'

export const config = {
  maxDuration: 10,
}

function readBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = readBody(req)
  const fields = {
    name: String(body.name || '').trim(),
    company: String(body.company || '').trim(),
    email: String(body.email || '').trim(),
    phone: String(body.phone || '').trim(),
    product: String(body.product || '').trim(),
    quantity: String(body.quantity || '').trim(),
    country: String(body.country || '').trim(),
    requirements: String(body.requirements || '').trim(),
    message: String(body.message || '').trim(),
    language: String(body.language || '').trim(),
  }

  if (!fields.name || !fields.email || !fields.product) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const max = 4000
  for (const key of ['name', 'company', 'phone', 'product', 'quantity', 'country', 'requirements', 'message', 'language']) {
    if (fields[key] && fields[key].length > max) {
      fields[key] = fields[key].slice(0, max)
    }
  }

  const key = process.env.WEB3FORMS_ACCESS_KEY
  if (!key) {
    return res.status(503).json({ error: 'MAILTO_FALLBACK' })
  }

  const message = [
    fields.message || '(no additional message)',
    '',
    `Name: ${fields.name}`,
    `Company: ${fields.company || '-'}`,
    `Email: ${fields.email}`,
    `Phone / WhatsApp: ${fields.phone || '-'}`,
    `Product: ${fields.product}`,
    `Quantity: ${fields.quantity || '-'}`,
    `Country: ${fields.country || '-'}`,
    `Requirements: ${fields.requirements || '-'}`,
    `Language: ${fields.language || '-'}`,
    `Inbox: ${INBOX}`,
  ].join('\n')

  try {
    const body = new URLSearchParams({
      access_key: key,
      from_name: 'Wanda Groups website',
      subject: `Wanda Groups Quote — ${fields.product} — ${fields.name}`,
      name: fields.name,
      email: fields.email,
      replyto: fields.email,
      company: fields.company,
      phone: fields.phone,
      product: fields.product,
      quantity: fields.quantity,
      country: fields.country,
      requirements: fields.requirements,
      language: fields.language,
      message,
    })
    const upstream = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body,
    })
    const text = await upstream.text()
    let data = {}
    try {
      data = JSON.parse(text)
    } catch {
      data = {}
    }
    if (upstream.ok && data.success === true) {
      return res.status(200).json({ success: true })
    }
    console.error('web3forms failed', upstream.status, text.slice(0, 400))
    return res.status(502).json({ error: 'MAILTO_FALLBACK' })
  } catch (err) {
    console.error('web3forms error', err)
    return res.status(502).json({ error: 'MAILTO_FALLBACK' })
  }
}
