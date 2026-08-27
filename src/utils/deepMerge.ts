/** Deep-merge `patch` onto `base`. Arrays are replaced, not concatenated. */
export function deepMerge<T>(base: T, patch: unknown): T {
  if (patch === null || patch === undefined) return base
  if (Array.isArray(base)) {
    return (Array.isArray(patch) ? patch : base) as T
  }
  if (typeof base !== 'object' || base === null) {
    return (patch as T) ?? base
  }
  if (typeof patch !== 'object' || patch === null || Array.isArray(patch)) {
    return base
  }

  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const [key, value] of Object.entries(patch as Record<string, unknown>)) {
    if (key in out) {
      out[key] = deepMerge(out[key], value)
    } else {
      out[key] = value
    }
  }
  return out as T
}
