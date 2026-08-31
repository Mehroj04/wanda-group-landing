/**
 * Production HTTP smoke test against www.wandagroups.com
 */
const ORIGIN = process.env.VERIFY_ORIGIN || 'https://www.wandagroups.com'

const EXPECTED = [
  ['/', 200],
  ['/about', 200],
  ['/products', 200],
  ['/products/acetylene-cylinders', 200],
  ['/factory', 200],
  ['/certifications', 200],
  ['/oem', 200],
  ['/contact', 200],
  ['/nonexistent-page-test', 404],
  ['/random-invalid-path', 404],
]

async function statusFor(pathname) {
  const res = await fetch(`${ORIGIN}${pathname}`, { method: 'GET', redirect: 'manual' })
  return res.status
}

let failed = 0
for (const [pathname, expected] of EXPECTED) {
  try {
    const status = await statusFor(pathname)
    if (status !== expected) {
      console.error(`FAIL ${pathname}: ${status} (expected ${expected})`)
      failed++
    } else {
      console.log(`OK ${status} ${pathname}`)
    }
  } catch (err) {
    console.error(`FAIL ${pathname}: ${err.message}`)
    failed++
  }
}

if (failed) {
  console.error(`\n${failed} HTTP check(s) failed against ${ORIGIN}`)
  process.exit(1)
}

console.log(`\nHTTP smoke passed against ${ORIGIN}`)
