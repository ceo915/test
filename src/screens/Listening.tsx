import { useEffect, useState } from 'react'
import { chat, listening } from '../data/mock'
import { useStore } from '../state/store'
import { Mascot } from '../components/Mascot'
import { Waveform } from '../components/Waveform'
import { Icon } from '../components/Icon'
import { IconButton } from '../components/ui'

export function Listening() {
  const { back, ask, go } = useStore()
  const [words, setWords] = useState(0)
  const all = chat.voiceUtterance.split(' ')

  // Pretend-transcription so testers see Chimu "hearing" them
  useEffect(() => {
    const start = window.setTimeout(() => {
      const t = window.setInterval(() => setWords(w => (w < all.length ? w + 1 : w)), 320)
      cleanup = () => window.clearInterval(t)
    }, listening.captionDelayMs)
    let cleanup = () => {}
    return () => { window.clearTimeout(start); cleanup() }
  }, [all.length])

  const stop = () => { ask(chat.voiceUtterance); go('chat', { replace: true }) }

  return (
    <div className="relative flex h-full flex-col items-center bg-gradient-to-b from-cream via-cream to-peach-soft px-8 pb-12 pt-safe text-center">
      <div className="flex w-full justify-start">
        <IconButton icon="x" label="Cancel" onClick={back} className="bg-white shadow-soft" />
      </div>

      <h1 className="mt-6 text-title">{listening.title}</h1>
      <p className="mt-1 font-hand text-script text-coral">{listening.hint}</p>

      <div className="relative flex flex-1 items-center justify-center">
        <span className="absolute h-56 w-56 animate-pulseRing rounded-full bg-peach/50" aria-hidden />
        <span className="absolute h-56 w-56 animate-pulseRing rounded-full bg-peach/50" style={{ animationDelay: '1.2s' }} aria-hidden />
        <div className="relative grid h-60 w-60 place-items-center rounded-full bg-white/80 shadow-glow">
          <Mascot expression="listening" size={170} />
        </div>
      </div>

      <p className="mb-3 min-h-[3.2rem] max-w-[18rem] text-heading text-charcoal-soft" aria-live="polite">
        {words > 0 && <>“{all.slice(0, words).join(' ')}{words < all.length ? '…' : ''}”</>}
      </p>
      <Waveform />
      <button
        onClick={stop} aria-label="Stop listening"
        className="mt-6 grid h-[72px] w-[72px] place-items-center rounded-full bg-charcoal text-cream shadow-lift transition active:scale-95"
      >
        <Icon name="stop" size={28} strokeWidth={2} />
      </button>
      <p className="mt-3 text-caption text-muted">Tap to stop</p>
    </div>
  )
}
