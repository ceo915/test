import { useStore } from '../state/store'

export function Toast() {
  const { toast, showToast } = useStore()
  if (!toast) return null
  return (
    <div key={toast.id} className="pointer-events-none absolute inset-x-4 bottom-28 z-[45] flex justify-center">
      <div className="pointer-events-auto flex animate-rise items-center gap-3 rounded-pill bg-charcoal py-3 pl-5 pr-3 text-caption text-cream shadow-lift">
        <span>{toast.text}</span>
        {toast.undo && (
          <button
            onClick={() => { toast.undo?.(); showToast('Restored') }}
            className="rounded-pill bg-white/15 px-3 py-1.5 font-semibold text-peach"
          >Undo</button>
        )}
      </div>
    </div>
  )
}
