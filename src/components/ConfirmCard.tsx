import type { ChimuAction } from '../types'
import { useStore } from '../state/store'
import { Mascot } from './Mascot'
import { Button } from './ui'
import { Icon } from './Icon'
import { Sheet } from './Sheet'

/**
 * Ask-before-acting. Spells out exactly what Chimu will do and does nothing until Approve.
 * Used inline (chat, send sheet) and inside the global ConfirmSheet.
 */
export function ConfirmCard({ instanceId, action, onApprove, heading, approveLabel = 'Approve', onDone }: {
  instanceId: string
  action: ChimuAction
  onApprove?: () => void
  heading?: string
  approveLabel?: string
  onDone?: () => void
}) {
  const { decisions, resolve } = useStore()
  const decision = decisions[instanceId]

  if (decision) {
    const ok = decision === 'approved'
    return (
      <div className="animate-pop rounded-card bg-white p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <Mascot expression={ok ? 'celebrating' : 'caring'} size={56} />
          <div className="min-w-0 flex-1 pt-1">
            <p className="flex items-center gap-1.5 text-micro uppercase text-sage-deep">
              <Icon name={ok ? 'check' : 'shield'} size={14} strokeWidth={2} />
              {ok ? 'Done' : 'Nothing changed'}
            </p>
            <p className="mt-1 text-body">{ok ? action.doneMessage : action.declinedMessage}</p>
          </div>
        </div>
        {onDone && <Button full className="mt-4" onClick={onDone}>Got it</Button>}
      </div>
    )
  }

  return (
    <div className="rounded-card bg-white p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <Mascot expression="curious" size={52} />
        <div className="min-w-0">
          <p className="text-micro uppercase text-coral-ink">Asking first</p>
          <h3 className="text-heading">{heading ?? action.title}</h3>
        </div>
      </div>

      <p className="mt-4 text-caption text-muted">Here's exactly what I'll do:</p>
      <ul className="mt-2 space-y-2.5">
        {action.willDo.map(line => (
          <li key={line} className="flex gap-2.5 text-body">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage-soft text-sage-deep">
              <Icon name="check" size={12} strokeWidth={2.4} />
            </span>
            {line}
          </li>
        ))}
      </ul>

      {action.wontDo && (
        <p className="mt-3 flex gap-2 rounded-tile bg-cream px-3.5 py-3 text-caption text-muted">
          <Icon name="shield" size={16} className="mt-px shrink-0" />
          {action.wontDo}
        </p>
      )}

      <div className="mt-5 flex gap-3">
        <Button className="flex-1 !px-4" onClick={() => resolve(instanceId, action, 'approved', onApprove)}>{approveLabel}</Button>
        <Button variant="ghost" className="flex-1 !px-4" onClick={() => resolve(instanceId, action, 'declined')}>Not now</Button>
      </div>
      <p className="mt-3 text-center text-caption text-muted">Nothing happens until you say so.</p>
    </div>
  )
}

/** Global sheet for confirmations opened from Home / plan cards */
export function ConfirmSheet() {
  const { confirm, closeConfirm } = useStore()
  if (!confirm) return null
  return (
    <Sheet key={confirm.instanceId} open onClose={closeConfirm} label="Confirm action">
      <ConfirmCard
        instanceId={confirm.instanceId} action={confirm.action}
        onApprove={confirm.onApprove} onDone={closeConfirm}
      />
    </Sheet>
  )
}
