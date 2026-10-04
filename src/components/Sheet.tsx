import { useEffect, type ReactNode } from 'react'

export function Sheet({ open, onClose, children, label }: {
  open: boolean; onClose: () => void; children: ReactNode; label: string
}) {
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="absolute inset-0 z-40 flex items-end" role="dialog" aria-modal="true" aria-label={label}>
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 animate-fade cursor-default bg-charcoal/30" />
      <div className="relative max-h-[90%] w-full animate-sheetUp overflow-y-auto no-scrollbar rounded-t-sheet bg-cream px-5 pb-8 pt-3 shadow-lift">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-pill bg-line" />
        {children}
      </div>
    </div>
  )
}
