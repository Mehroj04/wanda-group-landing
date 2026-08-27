import type { ReactNode, CSSProperties } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export type RevealFrom = 'up' | 'left' | 'right' | 'scale' | 'fade'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  from?: RevealFrom
  style?: CSSProperties
}

/**
 * Reveal on scroll. Delay uses a CSS variable (style-src-attr must allow
 * 'unsafe-inline' in production CSP — see vercel.json).
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  from = 'up',
  style,
}: ScrollRevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()
  const merged: CSSProperties = {
    ...style,
    ...(delay > 0 ? ({ ['--reveal-delay' as string]: `${delay}ms` } as CSSProperties) : null),
  }

  return (
    <div
      ref={ref}
      className={`reveal reveal--${from} ${visible ? 'reveal--visible' : ''} ${className}`}
      style={Object.keys(merged).length ? merged : undefined}
    >
      {children}
    </div>
  )
}
