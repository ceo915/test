import { useEffect, useRef, useState } from 'react'
import { noteUnderstanding, sendCopy, sendOptions, understandings } from '../data/mock'
import type { SendOption, Understanding } from '../types'
import { useStore } from '../state/store'
import { Sheet } from './Sheet'
import { Mascot } from './Mascot'
import { ConfirmCard } from './ConfirmCard'
import { IconTile, Button } from './ui'
import { Icon } from './Icon'

type Step =
  | { s: 'choose' }
  | { s: 'link' | 'note' }
  | { s: 'reading'; kind: SendOption['id']; noteText?: string }
  | { s: 'result'; kind: SendOption['id']; u: Understanding }

/** Stand-in for whatever the person shared */
function Preview({ kind, text }: { kind: SendOption['id']; text?: string }) {
  if (kind === 'screenshot') {
    return (
      <div className="mx-auto w-52 rotate-[-2deg] rounded-tile bg-white p-3.5 shadow-lift">
        <p className="text-micro uppercase text-muted">Message · 9:12 AM</p>
        <p className="mt-1.5 text-caption font-semibold">SureCover Insurance</p>
        <p className="mt-1 text-caption text-charcoal-soft">Your car policy renews on 14 Nov. Premium ₹8,400. Pay by 14 Nov to stay covered.</p>
        <div className="mt-2 h-6 w-20 rounded-pill bg-sky" />
      </div>
    )
  }
  if (kind === 'photo') {
    return (
      <div className="mx-auto w-44 rotate-[2deg] rounded-xs bg-white px-4 py-3.5 shadow-lift">
        <p className="text-center text-micro uppercase">Croma · Invoice</p>
        <div className="mt-2 space-y-1.5 border-y border-dashed border-line py-2 text-caption text-charcoal-soft">
          <p className="flex justify-between"><span>Samsung fridge</span><span>₹42,990</span></p>
          <p className="flex justify-between"><span>Warranty</span><span>to 3 Mar 27</span></p>
        </div>
        <p className="mt-2 text-center text-micro text-muted">THANK YOU</p>
      </div>
    )
  }
  if (kind === 'link') {
    return (
      <div className="mx-auto flex w-60 items-center gap-3 rounded-tile bg-white p-3.5 shadow-lift">
        <span className="grid h-10 w-10 place-items-center rounded-tile bg-peach-soft"><Icon name="link" size={20} /></span>
        <p className="min-w-0 truncate text-caption text-muted">{sendCopy.linkDefault.replace('https://', '')}</p>
      </div>
    )
  }
  return (
    <div className="mx-auto w-60 rounded-tile bg-sky p-4 shadow-lift">
      <p className="text-body">{text}</p>
    </div>
  )
}

export function SendSheet() {
  const { sendOpen, setSendOpen, addMemory, addHome, go } = useStore()
  const [step, setStep] = useState<Step>({ s: 'choose' })
  const [instance, setInstance] = useState('')
  const [linkText, setLinkText] = useState(sendCopy.linkDefault)
  const [noteText, setNoteText] = useState('')
  const timer = useRef<number | undefined>(undefined)

  // fresh start every time the sheet opens
  useEffect(() => {
    if (sendOpen) {
      setStep({ s: 'choose' }); setNoteText(''); setLinkText(sendCopy.linkDefault)
      setInstance(`send:${Date.now()}`)
    }
    return () => window.clearTimeout(timer.current)
  }, [sendOpen])

  const close = () => setSendOpen(false)

  const read = (kind: SendOption['id'], text?: string) => {
    setStep({ s: 'reading', kind, noteText: text })
    timer.current = window.setTimeout(() => {
      const u = kind === 'note' ? noteUnderstanding(text ?? '') : understandings[kind]
      setStep({ s: 'result', kind, u })
    }, sendCopy.readingMs)
  }

  const pick = (o: SendOption) => {
    if (o.id === 'link' || o.id === 'note') setStep({ s: o.id })
    else read(o.id)
  }

  return (
    <Sheet open={sendOpen} onClose={close} label="Send to Chimu">
      {step.s === 'choose' && (
        <>
          <h2 className="text-title">{sendCopy.title}</h2>
          <p className="mt-1 text-body text-muted">{sendCopy.subtitle}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {sendOptions.map(o => (
              <button key={o.id} onClick={() => pick(o)}
                className="rounded-card bg-white p-4 text-left shadow-soft transition active:scale-[0.97]">
                <IconTile icon={o.icon} tint={o.id === 'screenshot' ? 'sky' : o.id === 'photo' ? 'peach' : o.id === 'link' ? 'sage' : 'cream'} />
                <p className="mt-3 text-label">{o.label}</p>
                <p className="mt-0.5 text-caption text-muted">{o.hint}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {step.s === 'link' && (
        <>
          <h2 className="text-title">Paste a link</h2>
          <input
            autoFocus value={linkText} onChange={e => setLinkText(e.target.value)} placeholder={sendCopy.linkPlaceholder}
            className="mt-4 w-full rounded-card bg-white px-5 py-4 text-body shadow-soft focus:outline-none focus:ring-2 focus:ring-coral"
          />
          <Button full className="mt-4" disabled={!linkText.trim()} onClick={() => read('link')}>Send to Chimu</Button>
        </>
      )}

      {step.s === 'note' && (
        <>
          <h2 className="text-title">{sendCopy.noteLabel}</h2>
          <textarea
            autoFocus rows={4} value={noteText} onChange={e => setNoteText(e.target.value)} placeholder={sendCopy.notePlaceholder}
            className="mt-4 w-full resize-none rounded-card bg-white px-5 py-4 text-body shadow-soft focus:outline-none focus:ring-2 focus:ring-coral"
          />
          <Button full className="mt-4" disabled={!noteText.trim()} onClick={() => read('note', noteText.trim())}>Send to Chimu</Button>
        </>
      )}

      {step.s === 'reading' && (
        <div className="flex flex-col items-center py-4 text-center">
          <Preview kind={step.kind} text={step.noteText} />
          <Mascot expression="thinking" size={110} className="mt-5" />
          <p className="text-heading">Let me have a look...</p>
        </div>
      )}

      {step.s === 'result' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mascot expression="happy" size={64} />
            <div>
              <p className="font-hand text-script leading-none text-coral">Here's what I understood</p>
              <p className="mt-1 text-heading">{step.u.headline}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {step.u.facts.map(f => (
              <span key={f.label} className="rounded-pill bg-white px-3.5 py-2 text-caption shadow-soft">
                <span className="text-muted">{f.label}: </span><span className="font-semibold">{f.value}</span>
              </span>
            ))}
          </div>
          <ConfirmCard
            instanceId={instance}
            action={step.u.action}
            heading={step.u.question}
            approveLabel={step.u.approveLabel}
            onApprove={() => { addMemory(step.u.memory); addHome(step.u.homeCard) }}
          />
          <SeeItLinks instance={instance} onClose={close} onKnows={() => { close(); go('knows') }} />
        </div>
      )}
    </Sheet>
  )
}

function SeeItLinks({ instance, onClose, onKnows }: { instance: string; onClose: () => void; onKnows: () => void }) {
  const { decisions } = useStore()
  const d = decisions[instance]
  if (!d) return null
  return (
    <div className="flex animate-rise gap-3">
      <Button className="flex-1" onClick={onClose}>Got it</Button>
      {d === 'approved' && <Button variant="ghost" className="flex-1" onClick={onKnows}>See what I know</Button>}
    </div>
  )
}
