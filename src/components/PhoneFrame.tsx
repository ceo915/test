import type { ReactNode } from 'react'
import { brand } from '../data/mock'

/** Full-bleed on a real phone; a centered 390px device on desktop. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full items-center justify-center bg-cream sm:p-6">
      <div
        className="relative h-[100dvh] w-full overflow-hidden bg-cream
          sm:h-[min(844px,calc(100dvh-48px))] sm:w-phone sm:rounded-phone sm:shadow-frame sm:ring-8 sm:ring-charcoal
          [--status-h:0px] sm:[--status-h:44px]"
        style={{ isolation: 'isolate' }}
      >
        {/* fake status bar, desktop only */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-50 hidden h-11 items-center justify-between px-8 text-caption font-semibold sm:flex">
          <span>{brand.frameTime}</span>
          <span className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-pill bg-charcoal" />
          <span className="flex items-center gap-1" aria-hidden>
            <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/><rect x="23" y="4" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".4"/></svg>
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}
