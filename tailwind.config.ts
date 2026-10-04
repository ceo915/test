import type { Config } from 'tailwindcss'
import { colors } from './src/theme'

/**
 * Chimu design tokens. Components should only use these names,
 * never raw hex / px values, so the whole look can be tuned here.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      ...colors,
    },
    borderRadius: {
      none: '0',
      xs: '8px',
      tile: '18px', // icon tiles, thumbnails
      card: '28px', // white cards
      bubble: '24px', // chat bubbles
      sheet: '36px', // bottom sheets, phone screen
      phone: '56px', // phone frame
      pill: '999px',
      full: '9999px',
    },
    boxShadow: {
      none: 'none',
      soft: '0 6px 24px -8px rgba(30, 30, 30, 0.08), 0 1px 3px rgba(30, 30, 30, 0.04)',
      lift: '0 14px 40px -12px rgba(30, 30, 30, 0.16), 0 2px 6px rgba(30, 30, 30, 0.05)',
      glow: '0 0 0 14px rgba(255, 180, 163, 0.22), 0 0 70px 20px rgba(255, 180, 163, 0.45)',
      frame: '0 50px 90px -30px rgba(30, 30, 30, 0.28), 0 18px 36px -18px rgba(30, 30, 30, 0.2)',
    },
    fontFamily: {
      sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      hand: ['Caveat', 'cursive'],
    },
    fontSize: {
      display: ['34px', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '700' }],
      title: ['26px', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
      heading: ['19px', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
      body: ['16px', { lineHeight: '1.45', fontWeight: '400' }],
      label: ['15px', { lineHeight: '1.3', fontWeight: '600' }],
      caption: ['13px', { lineHeight: '1.35', fontWeight: '500' }],
      micro: ['11px', { lineHeight: '1.2', letterSpacing: '0.06em', fontWeight: '600' }],
      script: ['24px', { lineHeight: '1.1', fontWeight: '500' }],
      scriptLg: ['30px', { lineHeight: '1.05', fontWeight: '500' }],
    },
    extend: {
      width: { phone: '390px' },
      height: { phone: '844px' },
      keyframes: {
        breathe: { '0%,100%': { transform: 'scale(1,1)' }, '50%': { transform: 'scale(1.025,1.04)' } },
        blink: { '0%,92%,100%': { transform: 'scaleY(1)' }, '95%': { transform: 'scaleY(0.12)' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        floatZ: { '0%': { opacity: '0', transform: 'translate(0,4px)' }, '30%': { opacity: '1' }, '100%': { opacity: '0', transform: 'translate(8px,-14px)' } },
        bar: { '0%,100%': { transform: 'scaleY(0.25)' }, '50%': { transform: 'scaleY(1)' } },
        pulseRing: { '0%': { transform: 'scale(0.9)', opacity: '0.7' }, '100%': { transform: 'scale(1.5)', opacity: '0' } },
        enterFwd: { from: { opacity: '0', transform: 'translateX(18px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        enterBack: { from: { opacity: '0', transform: 'translateX(-18px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        rise: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        sheetUp: { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        fade: { from: { opacity: '0' }, to: { opacity: '1' } },
        pop: { '0%': { transform: 'scale(0.6)', opacity: '0' }, '70%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        confetti: { '0%': { transform: 'translateY(0) rotate(0)', opacity: '0' }, '15%': { opacity: '1' }, '100%': { transform: 'translateY(26px) rotate(80deg)', opacity: '0' } },
        dot: { '0%,80%,100%': { opacity: '0.25', transform: 'translateY(0)' }, '40%': { opacity: '1', transform: 'translateY(-3px)' } },
      },
      animation: {
        breathe: 'breathe 4.2s ease-in-out infinite',
        blink: 'blink 5.5s infinite',
        bob: 'bob 3.2s ease-in-out infinite',
        floatZ: 'floatZ 3s ease-in-out infinite',
        bar: 'bar 1s ease-in-out infinite',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
        enterFwd: 'enterFwd 260ms cubic-bezier(.2,.8,.2,1) both',
        enterBack: 'enterBack 260ms cubic-bezier(.2,.8,.2,1) both',
        rise: 'rise 340ms cubic-bezier(.2,.8,.2,1) both',
        sheetUp: 'sheetUp 320ms cubic-bezier(.2,.8,.2,1) both',
        fade: 'fade 220ms ease-out both',
        pop: 'pop 380ms cubic-bezier(.2,.8,.2,1) both',
        confetti: 'confetti 2.4s ease-out infinite',
        dot: 'dot 1.1s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
