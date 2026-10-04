import { useState } from 'react'
import { knowsCopy } from '../data/mock'
import type { IconName, MemoryCategory, MemoryItem } from '../types'
import { useStore } from '../state/store'
import { Mascot } from '../components/Mascot'
import { Icon } from '../components/Icon'
import { Accent, Button, IconButton, Pill, ScreenHeader } from '../components/ui'

const catIcon: Record<MemoryCategory, IconName> = {
  People: 'user', Dates: 'calendar', Preferences: 'heart', Places: 'pin', Documents: 'file',
}
const seeded = new Set(['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'])

export function Knows() {
  const { back, memory, activity } = useStore()
  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-12">
      <ScreenHeader title={knowsCopy.title} onBack={back} />
      <div className="px-5">
        <div className="mt-2 flex items-center gap-3">
          <Mascot expression="caring" size={84} />
          <div className="min-w-0 flex-1">
            <p className="text-body text-muted">{knowsCopy.intro}</p>
            <Accent>{knowsCopy.accent}</Accent>
          </div>
        </div>

        <div className="mt-6 space-y-7">
          {knowsCopy.categories.map(cat => {
            const items = memory.filter(m => m.category === cat)
            return (
              <section key={cat} aria-label={cat}>
                <h2 className="mb-3 flex items-center gap-2 text-label">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-peach-soft"><Icon name={catIcon[cat]} size={17} /></span>
                  {cat}
                  <span className="text-caption font-medium text-muted">{items.length}</span>
                </h2>
                {items.length === 0
                  ? <p className="rounded-card bg-white/60 px-4 py-4 text-caption text-muted">{knowsCopy.emptyLine}</p>
                  : <ul className="space-y-2.5">{items.map(m => <Row key={m.id} m={m} />)}</ul>}
              </section>
            )
          })}

          <section aria-label={knowsCopy.activityTitle}>
            <h2 className="mb-3 flex items-center gap-2 text-label">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-sage-soft"><Icon name="check" size={17} /></span>
              {knowsCopy.activityTitle}
            </h2>
            {activity.length === 0
              ? <p className="rounded-card bg-white/60 px-4 py-4 text-caption text-muted">{knowsCopy.activityEmpty}</p>
              : <ul className="space-y-2.5">{activity.map(a => <li key={a.id} className="rounded-card bg-white p-4 text-caption shadow-soft">{a.text}</li>)}</ul>}
          </section>
        </div>
      </div>
    </div>
  )
}

function Row({ m }: { m: MemoryItem }) {
  const { updateMemory, removeMemory } = useStore()
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(m.title)
  const [detail, setDetail] = useState(m.detail)

  if (editing) {
    const input = 'w-full rounded-tile bg-cream px-3.5 py-2.5 text-body focus:outline-none focus:ring-2 focus:ring-coral'
    return (
      <li className="animate-pop space-y-2 rounded-card bg-white p-4 shadow-soft">
        <input autoFocus value={title} onChange={e => setTitle(e.target.value)} aria-label="Title" className={input} />
        <input value={detail} onChange={e => setDetail(e.target.value)} aria-label="Details" className={input} />
        <div className="flex gap-2 pt-1">
          <Button className="flex-1 !py-2.5" disabled={!title.trim()} onClick={() => { updateMemory(m.id, { title: title.trim(), detail: detail.trim() }); setEditing(false) }}>Save</Button>
          <Button variant="ghost" className="flex-1 !py-2.5" onClick={() => { setTitle(m.title); setDetail(m.detail); setEditing(false) }}>Cancel</Button>
        </div>
      </li>
    )
  }

  return (
    <li className="flex animate-rise items-center gap-2 rounded-card bg-white py-3 pl-4 pr-2 shadow-soft">
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-label">
          <span className="truncate">{m.title}</span>
          {!seeded.has(m.id) && <Pill tone="sky">New</Pill>}
        </p>
        <p className="truncate text-caption text-muted">{m.detail}</p>
        <p className="mt-0.5 text-micro uppercase text-sage-deep">{m.source}</p>
      </div>
      <IconButton icon="pencil" label={`Edit ${m.title}`} size={40} iconSize={19} onClick={() => setEditing(true)} className="text-charcoal-soft hover:bg-cream" />
      <IconButton icon="trash" label={`Delete ${m.title}`} size={40} iconSize={19} onClick={() => removeMemory(m.id)} className="text-charcoal-soft hover:bg-cream" />
    </li>
  )
}
