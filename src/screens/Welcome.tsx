import { copy } from '../data/mock'
import { useStore } from '../state/store'
import { Mascot } from '../components/Mascot'
import { Wordmark } from '../components/Wordmark'
import { Button } from '../components/ui'

export function Welcome() {
  const { go } = useStore()
  return (
    <div className="relative flex h-full flex-col items-center px-8 pb-10 pt-safe text-center">
      <div className="mt-14 animate-rise">
        <Wordmark size={64} />
        <p className="mt-3 text-heading text-charcoal-soft">{copy.tagline}</p>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <div className="absolute h-72 w-72 rounded-full bg-peach-soft/70 blur-2xl" aria-hidden />
        <div className="relative animate-pop">
          <Mascot expression="happy" size={220} />
        </div>
      </div>

      <p className="mb-8 max-w-[18rem] animate-rise font-hand text-scriptLg text-coral" style={{ animationDelay: '120ms' }}>
        {copy.script}
      </p>
      <Button full onClick={() => go('home')} className="animate-rise" style={{ animationDelay: '200ms' }}>
        Get Started
      </Button>
    </div>
  )
}
