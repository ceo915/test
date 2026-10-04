import type { ThumbKind } from '../types'
import { colors as c } from '../theme'

/** Simple illustrated scenes standing in for photos. No external images. */
export function Thumb({ kind, className = '' }: { kind: ThumbKind; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} aria-hidden="true">
      {scenes[kind]}
    </svg>
  )
}

const sun = (x: number, y: number, r = 11, fill: string = c.peach.DEFAULT) => <circle cx={x} cy={y} r={r} fill={fill} />
const palm = (x: number, base: number) => (
  <g stroke={c.charcoal.soft} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.85">
    <path d={`M${x} ${base} Q${x + 3} ${base - 18} ${x + 1} ${base - 30}`} />
    <path d={`M${x + 1} ${base - 30} q-12 -3 -17 5M${x + 1} ${base - 30} q10 -6 18 0M${x + 1} ${base - 30} q-5 -10 -14 -9M${x + 1} ${base - 30} q6 -10 15 -7`} stroke={c.sage.deep} />
  </g>
)

const scenes: Record<ThumbKind, React.ReactNode> = {
  beach: (
    <>
      <rect width="120" height="120" fill={c.sky.soft} />
      {sun(84, 38, 13)}
      <rect y="62" width="120" height="30" fill={c.sky.DEFAULT} />
      <path d="M0 70 q15 -5 30 0 t30 0 t30 0 t30 0" stroke="#fff" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M0 88 q30 -10 60 0 t60 0 V120 H0Z" fill={c.peach.soft} />
      {palm(26, 100)}
    </>
  ),
  sunset: (
    <>
      <rect width="120" height="120" fill={c.coral.soft} />
      <rect y="0" width="120" height="50" fill={c.peach.soft} />
      {sun(60, 66, 22, c.coral.DEFAULT)}
      <rect y="66" width="120" height="54" fill={c.sky.deep} opacity="0.55" />
      <path d="M0 78 q15 -4 30 0 t30 0 t30 0 t30 0" stroke="#fff" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M22 40 l10 -3 l-3 -5 M30 52 l8 -2" stroke={c.charcoal.soft} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
    </>
  ),
  fort: (
    <>
      <rect width="120" height="120" fill={c.sky.soft} />
      {sun(30, 30, 10)}
      <path d="M0 96 Q40 70 80 84 T120 76 V120 H0Z" fill={c.sage.DEFAULT} />
      <g fill={c.peach.DEFAULT} stroke={c.charcoal.soft} strokeWidth="2" strokeLinejoin="round">
        <path d="M44 88 V56 h6 v5 h6 v-5 h8 v5 h6 v-5 h6 V88Z" />
        <path d="M58 88 v-10 a6 6 0 0 1 12 0 v10Z" fill={c.cream.DEFAULT} />
      </g>
    </>
  ),
  hotel: (
    <>
      <rect width="120" height="120" fill={c.sky.soft} />
      <rect y="86" width="120" height="34" fill={c.sky.DEFAULT} />
      {sun(96, 28, 10)}
      <rect x="22" y="40" width="64" height="62" rx="8" fill="#fff" stroke={c.charcoal.soft} strokeWidth="2" />
      {[0, 1, 2].map(r => [0, 1, 2].map(col => (
        <rect key={`${r}${col}`} x={32 + col * 18} y={50 + r * 16} width="11" height="9" rx="3" fill={c.sky.DEFAULT} stroke={c.charcoal.soft} strokeWidth="1.4" />
      )))}
      <path d="M18 40 h72" stroke={c.coral.DEFAULT} strokeWidth="5" strokeLinecap="round" />
      {palm(98, 104)}
    </>
  ),
  hills: (
    <>
      <rect width="120" height="120" fill={c.peach.soft} />
      {sun(88, 34, 12, c.cream.DEFAULT)}
      <path d="M0 86 L34 46 L58 74 L82 38 L120 86 V120 H0Z" fill={c.sage.DEFAULT} />
      <path d="M0 100 L40 70 L70 96 L100 66 L120 86 V120 H0Z" fill={c.sage.deep} opacity="0.7" />
    </>
  ),
  waterfall: (
    <>
      <rect width="120" height="120" fill={c.sage.soft} />
      <path d="M0 40 H46 V120 H0Z" fill={c.sage.deep} />
      <path d="M74 36 H120 V120 H74Z" fill={c.sage.DEFAULT} />
      <path d="M46 36 H74 V100 Q60 108 46 100Z" fill={c.sky.DEFAULT} />
      <path d="M54 40 v52M62 38 v56M68 42 v48" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
      <ellipse cx="60" cy="104" rx="22" ry="7" fill={c.sky.soft} />
    </>
  ),
  coast: (
    <>
      <rect width="120" height="120" fill={c.sky.soft} />
      <circle cx="30" cy="34" r="11" fill={c.peach.DEFAULT} />
      <path d="M0 74 q20 -8 40 0 t40 0 t40 0 V120 H0Z" fill={c.sky.DEFAULT} />
      <path d="M0 96 q30 -12 60 0 t60 -4 V120 H0Z" fill={c.peach.soft} />
      <path d="M70 76 h30 l-4 12 h-22Z M85 76 v-22 l14 18Z" fill="#fff" stroke={c.charcoal.soft} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
}
