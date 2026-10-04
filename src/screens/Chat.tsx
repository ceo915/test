import { useEffect, useRef } from 'react'
import { destinations } from '../data/mock'
import { useStore, type Message } from '../state/store'
import { Mascot } from '../components/Mascot'
import { BottomBar } from '../components/BottomBar'
import { ConfirmCard } from '../components/ConfirmCard'
import { Thumb } from '../components/Thumb'
import { Icon } from '../components/Icon'
import { IconButton } from '../components/ui'

export function Chat() {
  const { back, go, ask, messages, thinking, pickDestination, setSendOpen } = useStore()
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [messages.length, thinking])

  return (
    <div className="relative h-full">
      <div className="flex items-center gap-2 px-4 pb-2 pt-safe">
        <IconButton icon="back" label="Back" onClick={back} className="bg-white shadow-soft" />
        <Mascot expression={thinking ? 'thinking' : 'happy'} size={44} />
        <div className="min-w-0 flex-1">
          <p className="text-label">Chimu</p>
          <p className="text-caption text-muted">{thinking ? 'Thinking...' : 'Here with you'}</p>
        </div>
      </div>

      <div className="h-[calc(100%-4rem)] space-y-3 overflow-y-auto no-scrollbar px-4 pb-44 pt-3">
        {messages.map(m => <Bubble key={m.id} m={m} onPick={pickDestination} />)}
        {thinking && (
          <div className="flex animate-rise">
            <div className="flex gap-1.5 rounded-bubble rounded-bl-xs bg-white px-5 py-4 shadow-soft" aria-label="Chimu is thinking">
              {[0, 1, 2].map(i => <span key={i} className="h-2 w-2 animate-dot rounded-full bg-coral" style={{ animationDelay: `${i * 0.16}s` }} />)}
            </div>
          </div>
        )}
        <div ref={end} />
      </div>

      <BottomBar onMic={() => go('listening')} onPlus={() => setSendOpen(true)} onSubmit={ask} />
    </div>
  )
}

function Bubble({ m, onPick }: { m: Message; onPick: (d: (typeof destinations)[number]) => void }) {
  if (m.role === 'user') {
    return (
      <div className="flex animate-rise justify-end">
        <p className="max-w-[80%] rounded-bubble rounded-br-xs bg-sky px-4 py-3 text-body">{m.text}</p>
      </div>
    )
  }
  if (m.kind === 'text') {
    return (
      <div className="flex animate-rise">
        <p className="max-w-[85%] rounded-bubble rounded-bl-xs bg-white px-4 py-3 text-body shadow-soft">{m.text}</p>
      </div>
    )
  }
  if (m.kind === 'destinations') {
    return (
      <ul className="space-y-3">
        {destinations.map((d, i) => (
          <li key={d.id} className="animate-rise" style={{ animationDelay: `${i * 90}ms` }}>
            <button
              onClick={() => onPick(d)}
              className="flex w-full items-center gap-4 rounded-card bg-white p-3 text-left shadow-soft transition active:scale-[0.985]"
            >
              <span className="h-[76px] w-[76px] shrink-0 overflow-hidden rounded-tile"><Thumb kind={d.thumb} /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-heading">{d.name}</span>
                <span className="mt-0.5 block text-caption text-muted">{d.distance}</span>
                <span className="mt-0.5 block text-caption text-muted">{d.blurb}</span>
              </span>
              <Icon name="chevron" size={18} className="mr-1 shrink-0 text-muted" />
            </button>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className="animate-rise">
      <ConfirmCard instanceId={m.instanceId} action={m.action} onApprove={m.onApprove} />
    </div>
  )
}
