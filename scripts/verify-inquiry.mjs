import { normalizeInquiryPayload, validateInquiryPayload, INQUIRY_FIELD_MAX } from '../src/shared/inquiry-validation.js'

let failed = 0

function assert(label, condition) {
  if (!condition) {
    console.error('FAIL', label)
    failed += 1
  }
}

const valid = normalizeInquiryPayload({
  name: 'Alex Buyer',
  email: 'buyer@example.com',
  product: 'Acetylene Cylinder',
})
assert('valid payload', validateInquiryPayload(valid) === null)

assert('missing name', validateInquiryPayload({ ...valid, name: '' }) === 'missing_name')
assert('missing email', validateInquiryPayload({ ...valid, email: '' }) === 'missing_email')
assert('invalid email', validateInquiryPayload({ ...valid, email: 'not-an-email' }) === 'invalid_email')
assert('missing product', validateInquiryPayload({ ...valid, product: '' }) === 'missing_product')

const long = 'x'.repeat(INQUIRY_FIELD_MAX + 50)
const clipped = normalizeInquiryPayload({ name: long, email: 'a@b.co', product: 'Propane Cylinder' })
assert('field clip', clipped.name.length === INQUIRY_FIELD_MAX)

if (failed) {
  console.error(`\n${failed} inquiry validation check(s) failed`)
  process.exit(1)
}

console.log('Inquiry validation OK')
