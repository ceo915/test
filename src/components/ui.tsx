import type { ReactNode, ButtonHTMLAttributes } from 'react'
import type { IconName, Tint } from '../types'
import { Icon } from './Icon'

export const tintBg: Record<Tint, string> = {
  peach: 'bg-peach-soft text-charcoal',
  sky: 'bg-sky text-charcoal',
  sage: 'bg-sage-soft text-charcoal',
  cream: 'bg-cream-deep text-charcoal',
  coral: 'bg-coral-soft text-charcoal',
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'soft'; full?: boolean }

export function Button({ variant = 'primary', full, className = '', ...rest }: BtnProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-pill border border-transparent px-7 py-4 text-label whitespace-nowrap transition active:scale-[0.97] disabled:opacity-40'
  const v = {
    primary: 'bg-charcoal text-cream shadow-lift hover:bg-charcoal-soft',
    soft: 'bg-peach-soft text-charcoal hover:bg-peach',
    ghost: 'border-charcoal/15 bg-white text-charcoal hover:bg-cream-deep',
  }[variant]
  return <button {...rest} className={`${base} ${v} ${full ? 'w-full' : ''} ${className}`} />
}

export function IconButton({ icon, label, onClick, className = '', size = 44, iconSize = 22 }: {
  icon: IconName; label: string; onClick?: () => void; className?: string; size?: number; iconSize?: number
}) {
  return (
    <button
      aria-label={label} onClick={onClick}
      className={`grid shrink-0 place-items-center rounded-full transition active:scale-95 ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  )
}

export function IconTile({ icon, tint, size = 48 }: { icon: IconName; tint: Tint; size?: number }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-tile ${tintBg[tint]}`} style={{ width: size, height: size }}>
      <Icon name={icon} size={size * 0.5} />
    </span>
  )
}

export function Card({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  const cls = `rounded-card bg-white shadow-soft ${className}`
  return onClick
    ? <button onClick={onClick} className={`${cls} block w-full text-left transition active:scale-[0.985]`}>{children}</button>
    : <div className={cls}>{children}</div>
}

export function Pill({ children, tone = 'coral' }: { children: ReactNode; tone?: 'coral' | 'sage' | 'sky' }) {
  const t = { coral: 'bg-coral-soft text-coral-ink', sage: 'bg-sage-soft text-sage-deep', sky: 'bg-sky-soft text-sky-deep' }[tone]
  return <span className={`inline-flex items-center rounded-pill px-2.5 py-1 text-caption font-semibold ${t}`}>{children}</span>
}

export function ScreenHeader({ title, onBack, right }: { title?: string; onBack: () => void; right?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-4 pb-2 pt-safe">
      <IconButton icon="back" label="Back" onClick={onBack} className="bg-white shadow-soft" />
      <h1 className="flex-1 truncate text-heading">{title}</h1>
      {right}
    </div>
  )
}

export function Accent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`font-hand text-script text-coral ${className}`}>{children}</span>
}
