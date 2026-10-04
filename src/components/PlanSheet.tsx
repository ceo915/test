import { useState, useEffect } from 'react'
import { hotelSwitch, trip } from '../data/mock'
import { useStore } from '../state/store'
import { Sheet } from './Sheet'
import { Thumb } from './Thumb'
import { Button, Pill } from './ui'

const optionMeta: Record<string, { total: string; saving: string }> = {
  'sea-view': { total: '₹7,497', saving: '₹1,875' },
  'casa-azul': { total: '₹8,340', saving: '₹1,020' },
}

/** "View Full Plan" (itinerary) and "Want to see?" (hotel options) */
export function PlanSheet() {
  const { planSheet, setPlanSheet, openConfirm } = useStore()
  const [tab, setTab] = useState<'itinerary' | 'hotels'>('itinerary')
  useEffect(() => { if (planSheet) setTab(planSheet) }, [planSheet])
  const close = () => setPlanSheet(null)

  const choose = (id: string) => {
    const o = trip.hotelOptions.find(h => h.id === id)!
    const meta = optionMeta[id]
    close()
    openConfirm({ instanceId: `plan:hotel:${id}`, action: hotelSwitch({ id, name: o.name, price: o.price, ...meta }) })
  }

  return (
    <Sheet open={!!planSheet} onClose={close} label="Trip plan details">
      <h2 className="text-title">Goa · {trip.dates}</h2>
      <div className="mt-4 flex rounded-pill bg-cream-deep p-1" role="tablist">
        {(['itinerary', 'hotels'] as const).map(t => (
          <button
            key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`flex-1 rounded-pill py-2.5 text-label capitalize transition ${tab === t ? 'bg-white shadow-soft' : 'text-muted'}`}
          >{t === 'hotels' ? 'Hotel options' : 'Itinerary'}</button>
        ))}
      </div>

      {tab === 'itinerary' ? (
        <div className="mt-4 space-y-3">
          {trip.itinerary.map(d => (
            <div key={d.day} className="rounded-card bg-white p-4 shadow-soft">
              <p className="text-label">{d.day}</p>
              <ul className="mt-2 space-y-1.5 text-body text-charcoal-soft">
                {d.lines.map(l => <li key={l} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />{l}</li>)}
              </ul>
            </div>
          ))}
          <Button full className="mt-2" onClick={() => choose('sea-view')}>Book Sea View Resort</Button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {trip.hotelOptions.map(o => (
            <div key={o.id} className="flex items-center gap-3 rounded-card bg-white p-3 shadow-soft">
              <span className="h-16 w-16 shrink-0 overflow-hidden rounded-tile"><Thumb kind={o.thumb} /></span>
              <div className="min-w-0 flex-1">
                <p className="text-label">{o.name}</p>
                <p className="text-caption text-muted">{o.price} · {o.detail}</p>
                <div className="mt-1"><Pill tone={o.tag === 'Current' ? 'sky' : 'coral'}>{o.tag}</Pill></div>
              </div>
              {o.tag !== 'Current' && (
                <Button variant="soft" className="!px-4 !py-2.5 text-caption" onClick={() => choose(o.id)}>Switch</Button>
              )}
            </div>
          ))}
        </div>
      )}
    </Sheet>
  )
}
