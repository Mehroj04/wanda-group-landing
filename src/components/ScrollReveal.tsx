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

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  from = 'up',
  style,
}: ScrollRevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal reveal--${from} ${visible ? 'reveal--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}
