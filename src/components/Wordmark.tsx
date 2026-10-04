import { colors } from '../theme'

/** "chimu": heavy rounded lowercase, with a coral heart in place of the i's dot. */
export function Wordmark({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-sans font-extrabold text-charcoal select-none ${className}`}
      style={{
        fontSize: size, lineHeight: 1, letterSpacing: '-0.01em',
        // thicken + round the corners of the letterforms
        WebkitTextStroke: `${size * 0.022}px currentColor`, paintOrder: 'stroke fill',
      }}
      role="img" aria-label="chimu"
    >
      <span aria-hidden>ch</span>
      <span aria-hidden className="relative inline-block">
        {'ı'}
        <svg
          viewBox="0 0 24 22" width={size * 0.36} height={size * 0.33}
          className="absolute"
          style={{ left: '50%', top: '-0.2em', transform: 'translateX(-50%)', WebkitTextStroke: 0 }}
        >
          <path d="M12 21 C-3 11 3 0 12 6.5 C21 0 27 11 12 21Z" fill={colors.coral.DEFAULT} stroke={colors.coral.DEFAULT} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </span>
      <span aria-hidden>mu</span>
    </span>
  )
}
