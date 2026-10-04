import { actions, copy } from '../data/mock'
import type { HomeCard } from '../types'
import { useStore } from '../state/store'
import { Mascot } from '../components/Mascot'
import { Wordmark } from '../components/Wordmark'
import { BottomBar } from '../components/BottomBar'
import { IconButton, IconTile, Pill } from '../components/ui'
import { Icon } from '../components/Icon'

export function Home() {
  const { go, ask, homeList, setSendOpen, openConfirm, decisions } = useStore()

  const open = (c: HomeCard) => {
    const t = c.onTap
    if (t.type === 'plan') go('trip')
    else if (t.type === 'knows') go('knows')
    else openConfirm({ instanceId: `home:${t.actionId}`, action: actions[t.actionId] })
  }

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto no-scrollbar px-5 pb-40 pt-safe">
        <div className="flex items-center justify-between">
          <Wordmark size={28} />
          <IconButton icon="memory" label="What Chimu knows" onClick={() => go('knows')} className="bg-white shadow-soft" />
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Mascot expression="default" size={112} className="-ml-2" />
          <div className="min-w-0 flex-1 animate-rise">
            <h1 className="text-title">{copy.greeting}</h1>
            <p className="mt-1.5 text-body text-muted">{copy.greetingSub}</p>
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {homeList.map((c, i) => {
            const done = c.onTap.type === 'action' && decisions[`home:${c.onTap.actionId}`] === 'approved'
            return (
              <li key={c.id} className="animate-rise" style={{ animationDelay: `${60 + i * 60}ms` }}>
                <button
                  onClick={() => open(c)}
                  className="flex w-full items-center gap-4 rounded-card bg-white p-4 text-left shadow-soft transition active:scale-[0.985]"
                >
                  <IconTile icon={c.icon} tint={c.tint} size={52} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-label">{c.title}</span>
                    <span className="mt-0.5 block text-caption text-muted">{c.subtitle}</span>
                  </span>
                  {done ? <Pill tone="sage">Done</Pill>
                    : c.isNew ? <Pill tone="sky">New</Pill>
                    : c.badge ? <Pill>{c.badge}</Pill> : null}
                  <Icon name="chevron" size={18} className="shrink-0 text-muted" />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <BottomBar onMic={() => go('listening')} onPlus={() => setSendOpen(true)} onSubmit={t => { ask(t); go('chat') }} />
    </div>
  )
}
