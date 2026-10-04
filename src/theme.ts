/** Single source of truth for brand colors. Tailwind imports this; SVG art reads it too. */
export const colors = {
  peach: { DEFAULT: '#FFB4A3', soft: '#FFD9CF', deep: '#F79C8A', glow: '#FFE6DE' },
  coral: { DEFAULT: '#FF8F7F', soft: '#FFE3DD', ink: '#C9584A' },
  cream: { DEFAULT: '#FFF7F1', deep: '#FBEDE3' },
  sage: { DEFAULT: '#B7CBB7', soft: '#E3ECE3', deep: '#7E997E' },
  sky: { DEFAULT: '#D7E8FF', soft: '#EAF3FF', deep: '#7FA6D6' },
  charcoal: { DEFAULT: '#1E1E1E', soft: '#3A3836' },
  muted: '#7A726D',
  line: '#F0E4DA',
  blush: '#FF9E9E',
} as const
