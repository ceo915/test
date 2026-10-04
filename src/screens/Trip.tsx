import { useEffect, useState } from 'react'
import { trip } from '../data/mock'
import { useStore } from '../state/store'
import { Mascot } from '../components/Mascot'
import { Thumb } from '../components/Thumb'
import { Button, Card, IconButton, Pill } from '../components/ui'
import { Icon } from '../components/Icon'

export function Trip() {
  const { back, setPlanSheet } = useStore()
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1300)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto no-scrollbar px-5 pb-36 pt-safe">
        <IconButton icon="back" label="Back" onClick={back} className="bg-white shadow-soft" />

        <div className="mt-2 flex flex-col items-center text-center">
          <Mascot expression={ready ? 'celebrating' : 'thinking'} size={128} />
          <h1 className="mt-2 max-w-[17rem] text-title">{ready ? trip.title : 'Putting your Goa trip together...'}</h1>
          {ready && <p className="mt-1.5 animate-fade text-body text-muted">{trip.dates} · 3 nights</p>}
        </div>

        {!ready ? (
          <div className="mt-8 space-y-3" aria-hidden>
            {[0, 1, 2].map(i => <div key={i} className="h-24 animate-pulse rounded-card bg-white/70" style={{ animationDelay: `${i * 120}ms` }} />)}
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <Card className="flex animate-rise items-center gap-4 p-3">
              <span className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-tile"><Thumb kind={trip.flight.thumb} /></span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-micro uppercase text-muted"><Icon name="plane" size={14} />{trip.flight.title}</p>
                <p className="mt-1 text-label">{trip.flight.primary}</p>
                <p className="text-caption text-muted">{trip.flight.secondary}</p>
              </div>
            </Card>

            <Card className="flex animate-rise items-center gap-4 p-3" >
              <span className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-tile"><Thumb kind={trip.hotel.thumb} /></span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-micro uppercase text-muted"><Icon name="bed" size={14} />{trip.hotel.title}</p>
                <p className="mt-1 text-label">{trip.hotel.name}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-2 text-caption text-muted">
                  {trip.hotel.price}<Pill>{trip.hotel.badge}</Pill>
                </p>
              </div>
            </Card>

            <Card className="animate-rise p-4">
              <p className="flex items-center gap-1.5 text-micro uppercase text-muted"><Icon name="pin" size={14} />{trip.places.title}</p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {trip.places.items.map(p => (
                  <div key={p.name}>
                    <div className="aspect-square overflow-hidden rounded-tile"><Thumb kind={p.thumb} /></div>
                    <p className="mt-1.5 text-caption font-semibold leading-tight">{p.name}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex animate-rise items-center gap-3 rounded-card bg-peach-soft p-4">
              <Mascot expression="caring" size={52} />
              <div className="min-w-0 flex-1">
                <p className="font-hand text-script leading-none text-coral-ink">Chimu's note</p>
                <p className="mt-1 text-body">{trip.note}</p>
                <button onClick={() => setPlanSheet('hotels')} className="mt-2 text-label underline underline-offset-4">Show me</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {ready && (
        <div className="absolute inset-x-0 bottom-0 z-20 animate-rise bg-gradient-to-t from-cream via-cream/90 to-transparent px-5 pb-6 pt-10">
          <Button full onClick={() => setPlanSheet('itinerary')}>View Full Plan</Button>
        </div>
      )}
    </div>
  )
}
