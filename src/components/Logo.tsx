import './Logo.css'

interface LogoProps {
  variant?: 'full' | 'icon'
  className?: string
}

export default function Logo({ variant = 'full', className = '' }: LogoProps) {
  return (
    <span className={`logo ${className}`}>
      <svg
        className="logo__icon"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#logoGrad)" />
        <rect x="18" y="10" width="12" height="6" rx="2" fill="#1e293b" opacity="0.9" />
        <rect x="20" y="6" width="8" height="6" rx="1.5" fill="#f97316" />
        <rect x="21" y="4" width="6" height="4" rx="1" fill="#fdba74" />
        <rect x="15" y="16" width="18" height="26" rx="4" fill="#334155" />
        <rect x="15" y="16" width="4" height="26" rx="2" fill="#1e293b" opacity="0.5" />
        <rect x="15" y="32" width="18" height="6" fill="#f97316" opacity="0.85" />
        <text
          x="24"
          y="29"
          textAnchor="middle"
          fill="#fb923c"
          fontSize="7"
          fontWeight="800"
          fontFamily="Inter, system-ui, sans-serif"
          transform="rotate(-90 24 29)"
        >
          WG
        </text>
      </svg>

      {variant === 'full' && (
        <span className="logo__text">
          <strong>Wanda Groups</strong>
          <small>Gas Cylinder Manufacturer</small>
        </span>
      )}
    </span>
  )
}
