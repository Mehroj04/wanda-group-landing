/** Inject or update a JSON-LD script tag by id. Returns cleanup. */
export function setJsonLd(id: string, data: Record<string, unknown> | null) {
  if (typeof document === 'undefined') return () => {}

  const existing = document.getElementById(id)
  if (!data) {
    existing?.remove()
    return () => {}
  }

  let el = existing as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
  return () => {
    document.getElementById(id)?.remove()
  }
}
