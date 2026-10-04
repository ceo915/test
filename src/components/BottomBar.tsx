import { useState } from 'react'
import { copy } from '../data/mock'
import { Icon } from './Icon'

/** Mic · "Talk to Chimu..." · plus. The plus becomes send once you type. */
export function BottomBar({ onMic, onPlus, onSubmit }: {
  onMic: () => void; onPlus: () => void; onSubmit: (text: string) => void
}) {
  const [text, setText] = useState('')
  const has = text.trim().length > 0
  const submit = () => {
    if (!has) return
    onSubmit(text)
    setText('')
  }
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-cream via-cream/90 to-transparent px-4 pt-8 pb-safe">
      <form
        onSubmit={e => { e.preventDefault(); submit() }}
        className="flex items-center gap-2 rounded-pill bg-white p-2 shadow-lift"
      >
        <button type="button" onClick={onMic} aria-label="Talk to Chimu"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-peach-soft text-charcoal transition active:scale-95">
          <Icon name="mic" size={22} />
        </button>
        <input
          value={text} onChange={e => setText(e.target.value)}
          placeholder={copy.inputPlaceholder} aria-label="Message Chimu"
          className="min-w-0 flex-1 bg-transparent text-body text-charcoal placeholder:text-muted focus:outline-none focus-visible:ring-0"
        />
        {has ? (
          <button type="submit" aria-label="Send" className="grid h-12 w-12 shrink-0 animate-pop place-items-center rounded-full bg-coral text-charcoal transition active:scale-95">
            <Icon name="send" size={22} />
          </button>
        ) : (
          <button type="button" onClick={onPlus} aria-label="Send something to Chimu"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-charcoal text-cream transition active:scale-95">
            <Icon name="plus" size={22} />
          </button>
        )}
      </form>
    </div>
  )
}
