import { useId } from 'react'
import type { Expression } from '../types'
import { colors } from '../theme'

/**
 * Chimu: one SVG, nine expressions.
 * Layers (back → front): extras-behind, back arms, body, blush, face, front arms, extras.
 */

type Eyes = 'arc' | 'arcBig' | 'arcDown' | 'dot' | 'dotUp' | 'dotCurious'
type Mouth = 'smile' | 'wide' | 'open' | 'tiny' | 'flat' | 'o'
type Arms = 'rest' | 'up' | 'chest' | 'chin' | 'wave'

interface Spec {
  eyes: Eyes
  mouth: Mouth
  arms: Arms
  blush: number
  tilt: number
  dy?: number
  blink?: boolean
}

const specs: Record<Expression, Spec> = {
  default:     { eyes: 'arc',     mouth: 'smile', arms: 'rest',  blush: 0.55, tilt: 0 },
  happy:       { eyes: 'arc',     mouth: 'wide',  arms: 'rest',  blush: 0.75, tilt: 0 },
  excited:     { eyes: 'arcBig',  mouth: 'open',  arms: 'up',    blush: 0.8,  tilt: 0 },
  listening:   { eyes: 'dot',     mouth: 'tiny',  arms: 'rest',  blush: 0.5,  tilt: -5 },
  thinking:    { eyes: 'dotUp',   mouth: 'flat',  arms: 'chin',  blush: 0.4,  tilt: 4 },
  curious:     { eyes: 'dotCurious', mouth: 'o',  arms: 'rest',  blush: 0.5,  tilt: 6 },
  caring:      { eyes: 'arcDown', mouth: 'smile', arms: 'chest', blush: 0.9,  tilt: -2 },
  celebrating: { eyes: 'arcBig',  mouth: 'open',  arms: 'up',    blush: 0.85, tilt: 0 },
  sleeping:    { eyes: 'arcDown', mouth: 'tiny',  arms: 'rest',  blush: 0.45, tilt: 3, dy: 6, blink: false },
}

const ink = colors.charcoal.DEFAULT

function EyesSvg({ kind }: { kind: Eyes }) {
  const stroke = { stroke: ink, strokeWidth: 5, strokeLinecap: 'round' as const, fill: 'none' }
  switch (kind) {
    case 'arc':
      return <><path d="M64 111 Q74 99 84 111" {...stroke} /><path d="M116 111 Q126 99 136 111" {...stroke} /></>
    case 'arcBig':
      return <><path d="M62 112 Q74 94 86 112" {...stroke} /><path d="M114 112 Q126 94 138 112" {...stroke} /></>
    case 'arcDown':
      return <><path d="M65 105 Q74 114 83 105" {...stroke} strokeWidth={4.5} /><path d="M117 105 Q126 114 135 105" {...stroke} strokeWidth={4.5} /></>
    case 'dot':
      return <><circle cx="74" cy="106" r="6" fill={ink} /><circle cx="126" cy="106" r="6" fill={ink} /><circle cx="76" cy="104" r="1.8" fill="#fff" /><circle cx="128" cy="104" r="1.8" fill="#fff" /></>
    case 'dotUp':
      return <><circle cx="77" cy="102" r="5.5" fill={ink} /><circle cx="129" cy="102" r="5.5" fill={ink} /><circle cx="79" cy="100" r="1.6" fill="#fff" /><circle cx="131" cy="100" r="1.6" fill="#fff" /></>
    case 'dotCurious':
      return <><circle cx="74" cy="107" r="5" fill={ink} /><circle cx="126" cy="105" r="7" fill={ink} /><circle cx="76" cy="105" r="1.6" fill="#fff" /><circle cx="128.5" cy="102.5" r="2.2" fill="#fff" />
        <path d="M116 91 Q127 84 138 90" {...stroke} strokeWidth={3.5} /></>
  }
}

function MouthSvg({ kind }: { kind: Mouth }) {
  const stroke = { stroke: ink, strokeWidth: 4.5, strokeLinecap: 'round' as const, fill: 'none' }
  switch (kind) {
    case 'smile': return <path d="M91 125 Q100 134 109 125" {...stroke} />
    case 'wide':  return <path d="M86 123 Q100 140 114 123" {...stroke} />
    case 'open':  return <><path d="M86 122 Q100 148 114 122 Z" fill={colors.coral.ink} stroke={ink} strokeWidth={4} strokeLinejoin="round" /><path d="M93 135 Q100 130 107 135" stroke={colors.blush} strokeWidth={4} strokeLinecap="round" fill="none" /></>
    case 'tiny':  return <ellipse cx="100" cy="127" rx="3.6" ry="3" fill={ink} />
    case 'flat':  return <path d="M91 128 Q96 125 100 128 Q104 131 109 128" {...stroke} strokeWidth={4} />
    case 'o':     return <ellipse cx="100" cy="128" rx="4.6" ry="5.4" fill={ink} />
  }
}

function Arm({ x, y, rot, fill }: { x: number; y: number; rot: number; fill: string }) {
  return <ellipse cx={x} cy={y} rx="12" ry="17" transform={`rotate(${rot} ${x} ${y})`} fill={fill} />
}

export function Mascot({
  expression = 'default', size = 160, animated = true, className = '',
}: { expression?: Expression; size?: number; animated?: boolean; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const s = specs[expression]
  const g = (n: string) => `${n}${uid}`
  const sleeping = expression === 'sleeping'
  const breath = animated ? (sleeping ? 'animate-[breathe_6s_ease-in-out_infinite]' : 'animate-breathe') : ''
  const blink = animated && s.blink !== false ? 'animate-blink' : ''

  // Arm layouts
  const armFill = `url(#${g('arm')})`
  const back: React.ReactNode[] = []
  const front: React.ReactNode[] = []
  if (s.arms === 'rest') {
    back.push(<Arm key="l" x={24} y={134} rot={24} fill={armFill} />, <Arm key="r" x={176} y={134} rot={-24} fill={armFill} />)
  } else if (s.arms === 'up') {
    back.push(<Arm key="l" x={26} y={92} rot={-28} fill={armFill} />, <Arm key="r" x={174} y={92} rot={28} fill={armFill} />)
  } else if (s.arms === 'chest') {
    front.push(<Arm key="l" x={84} y={152} rot={72} fill={armFill} />, <Arm key="r" x={116} y={152} rot={-72} fill={armFill} />)
  } else if (s.arms === 'chin') {
    back.push(<Arm key="l" x={24} y={134} rot={24} fill={armFill} />)
    front.push(<Arm key="r" x={128} y={148} rot={38} fill={armFill} />)
  }

  return (
    <svg
      width={size} height={size} viewBox="0 0 200 200" role="img"
      aria-label={`Chimu, looking ${expression}`}
      className={`shrink-0 overflow-visible ${className}`}
    >
      <defs>
        <radialGradient id={g('body')} cx="36%" cy="26%" r="85%">
          <stop offset="0%" stopColor={colors.peach.glow} />
          <stop offset="45%" stopColor={colors.peach.DEFAULT} />
          <stop offset="100%" stopColor={colors.peach.deep} />
        </radialGradient>
        <linearGradient id={g('arm')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.peach.DEFAULT} />
          <stop offset="100%" stopColor={colors.peach.deep} />
        </linearGradient>
        <radialGradient id={g('shadow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.charcoal.DEFAULT} stopOpacity="0.14" />
          <stop offset="100%" stopColor={colors.charcoal.DEFAULT} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* ground shadow */}
      <ellipse cx="100" cy="188" rx="58" ry="7" fill={`url(#${g('shadow')})`} />

      <g transform={`translate(0 ${s.dy ?? 0}) rotate(${s.tilt} 100 170)`} style={{ transition: 'transform 400ms cubic-bezier(.2,.8,.2,1)' }}>
        <g className={`origin-bottom-c ${breath}`}>
          {back}
          {/* body */}
          <path
            d="M100 32 C152 28 181 70 179 116 C177 158 142 183 100 183 C58 183 23 158 21 116 C19 70 48 28 100 32 Z"
            fill={`url(#${g('body')})`}
          />
          {/* soft highlight */}
          <ellipse cx="68" cy="56" rx="26" ry="13" transform="rotate(-28 68 56)" fill="#fff" opacity="0.28" />

          <g key={expression} style={{ animation: animated ? 'fade 240ms ease-out both' : undefined }}>
            {/* blush */}
            <ellipse cx="55" cy="127" rx="12" ry="7.5" fill={colors.blush} opacity={s.blush} />
            <ellipse cx="145" cy="127" rx="12" ry="7.5" fill={colors.blush} opacity={s.blush} />
            <g className={`eyes-blink ${blink}`}><EyesSvg kind={s.eyes} /></g>
            <MouthSvg kind={s.mouth} />
          </g>
          {front}
        </g>
      </g>

      {/* Extras that sit outside the body */}
      {expression === 'excited' && (
        <g stroke={colors.coral.DEFAULT} strokeWidth="4" strokeLinecap="round">
          <path d="M40 22v14M33 29h14" /><path d="M162 14v12M156 20h12" /><path d="M176 52l7 -7" />
        </g>
      )}
      {expression === 'celebrating' && (
        <g>
          {[
            [30, 18, colors.coral.DEFAULT, 0], [62, 6, colors.sky.deep, 0.5], [100, 10, colors.sage.deep, 1.1],
            [140, 4, colors.coral.DEFAULT, 0.3], [170, 20, colors.sky.deep, 0.9], [18, 56, colors.sage.deep, 1.6], [184, 58, colors.peach.deep, 0.6],
          ].map(([x, y, c, d], i) => (
            <rect key={i} x={x as number} y={y as number} width="7" height="11" rx="2.5" fill={c as string}
              className={animated ? 'animate-confetti' : ''} style={{ animationDelay: `${d}s`, transformBox: 'fill-box', transformOrigin: 'center' }}
              transform={`rotate(${i * 37})`} opacity={animated ? undefined : 0.9} />
          ))}
        </g>
      )}
      {expression === 'listening' && (
        <g stroke={colors.coral.DEFAULT} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M184 86 Q192 100 184 114" /><path d="M192 76 Q204 100 192 124" opacity="0.5" />
          <path d="M16 86 Q8 100 16 114" /><path d="M8 76 Q-4 100 8 124" opacity="0.5" />
        </g>
      )}
      {expression === 'thinking' && (
        <g fill={colors.coral.DEFAULT}>
          {[0, 1, 2].map(i => (
            <circle key={i} cx={150 + i * 14} cy={30 - i * 4} r={4 + i} className={animated ? 'animate-dot' : ''} style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </g>
      )}
      {expression === 'curious' && (
        <path d="M156 34 Q156 18 170 18 Q184 18 184 30 Q184 40 172 44 L172 52 M172 62v2"
          stroke={colors.coral.DEFAULT} strokeWidth="5" strokeLinecap="round" fill="none" />
      )}
      {expression === 'caring' && (
        <path d="M160 30 s-14 -8 -14 -17 a7.5 7.5 0 0 1 14 -3 a7.5 7.5 0 0 1 14 3 c0 9 -14 17 -14 17Z"
          fill={colors.coral.DEFAULT} className={animated ? 'animate-bob' : ''} />
      )}
      {expression === 'sleeping' && (
        <g fill={colors.coral.DEFAULT} fontFamily="Caveat, cursive" fontWeight="600">
          <text x="150" y="40" fontSize="30" className={animated ? 'animate-floatZ' : ''}>z</text>
          <text x="168" y="22" fontSize="22" className={animated ? 'animate-floatZ' : ''} style={{ animationDelay: '1s' }}>z</text>
        </g>
      )}
    </svg>
  )
}
