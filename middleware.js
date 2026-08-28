/**
 * Return HTTP 404 for unknown SPA paths while serving the React app (NotFoundPage).
 * Valid routes pass through to static files or SPA rewrite (HTTP 200).
 */
import { VALID_ROUTES } from './valid-routes.mjs'

export const config = {
  matcher: [
    '/((?!api/|assets/|images/|favicon|robots\\.txt|sitemap\\.xml|site\\.webmanifest|_vercel|.*\\..*).*)',
  ],
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '') || '/'
}

export default async function middleware(request) {
  const pathname = normalizePath(new URL(request.url).pathname)

  if (VALID_ROUTES.has(pathname)) {
    return undefined
  }

  const indexUrl = new URL('/index.html', request.url)
  const res = await fetch(indexUrl)
  const html = await res.text()

  return new Response(html, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
