import { normalizeInquiryPayload, validateInquiryPayload } from '../src/shared/inquiry-validation.js'

const INBOX = 'sales@wandagroups.com'
const MAX_BODY_BYTES = 32_000
const UPSTREAM_TIMEOUT_MS = 8_000

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

  const rawBody = readBody(req)
  if (typeof rawBody._gotcha === 'string' && rawBody._gotcha.trim()) {
    return res.status(200).json({ success: true })
  }

  const bodySize = JSON.stringify(rawBody).length
  if (bodySize > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Payload too large' })
  }

  const fields = normalizeInquiryPayload(rawBody)
  const validationError = validateInquiryPayload(fields)
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  const key = process.env.WEB3FORMS_ACCESS_KEY
  if (!key) {
    return res.status(503).json({ error: 'MAILTO_FALLBACK' })
  }

  const message = [
    fields.message || fields.requirements || '(no additional message)',
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
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
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
    console.error('web3forms failed', upstream.status)
    return res.status(502).json({ error: 'MAILTO_FALLBACK' })
  } catch (err) {
    console.error('web3forms error', err instanceof Error ? err.name : 'unknown')
    return res.status(502).json({ error: 'MAILTO_FALLBACK' })
  }
}
