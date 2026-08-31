/** @typedef {import('./inquiry-validation.types').InquiryPayload} InquiryPayload */

/** Canonical inquiry validation — imported by browser (Vite) and server (Vercel). */
export const INQUIRY_FIELD_MAX = 4000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * @param {Record<string, unknown>} raw
 * @returns {InquiryPayload}
 */
export function normalizeInquiryPayload(raw) {
  const clip = (value) => String(value ?? '').trim().slice(0, INQUIRY_FIELD_MAX)
  return {
    name: clip(raw.name),
    company: clip(raw.company),
    email: clip(raw.email),
    phone: clip(raw.phone),
    product: clip(raw.product),
    quantity: clip(raw.quantity),
    country: clip(raw.country),
    requirements: clip(raw.requirements),
    message: clip(raw.message),
    language: clip(raw.language),
  }
}

/**
 * @param {InquiryPayload} payload
 * @returns {string | null}
 */
export function validateInquiryPayload(payload) {
  if (!payload.name) return 'missing_name'
  if (!payload.email) return 'missing_email'
  if (!EMAIL_RE.test(payload.email)) return 'invalid_email'
  if (!payload.product) return 'missing_product'
  return null
}
