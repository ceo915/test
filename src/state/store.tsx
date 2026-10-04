import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import type { ChimuAction, Destination, HomeCard, MemoryItem, Expression } from '../types'
import { actions, chat as chatCopy, homeCards, memorySeed, noteUnderstanding } from '../data/mock'

export type ScreenId = 'welcome' | 'home' | 'listening' | 'trip' | 'chat' | 'knows'

export type Message =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'chimu'; kind: 'text'; text: string }
  | { id: string; role: 'chimu'; kind: 'destinations' }
  | { id: string; role: 'chimu'; kind: 'confirm'; instanceId: string; action: ChimuAction; onApprove?: () => void }

export interface PendingConfirm { instanceId: string; action: ChimuAction; onApprove?: () => void }
export interface Toast { id: number; text: string; undo?: () => void }
export type Decision = 'approved' | 'declined'

interface Store {
  screen: ScreenId
  dir: 'fwd' | 'back'
  go: (s: ScreenId, opts?: { replace?: boolean }) => void
  back: () => void

  messages: Message[]
  thinking: boolean
  ask: (text: string) => void
  pickDestination: (d: Destination) => void

  confirm: PendingConfirm | null
  openConfirm: (c: PendingConfirm) => void
  closeConfirm: () => void
  decisions: Record<string, Decision>
  resolve: (instanceId: string, action: ChimuAction, d: Decision, onApprove?: () => void) => void

  homeList: HomeCard[]
  addHome: (c: Omit<HomeCard, 'id' | 'isNew'>) => void

  memory: MemoryItem[]
  addMemory: (m: Omit<MemoryItem, 'id'>) => void
  updateMemory: (id: string, patch: Partial<Pick<MemoryItem, 'title' | 'detail'>>) => void
  removeMemory: (id: string) => void

  activity: { id: string; text: string }[]

  sendOpen: boolean
  setSendOpen: (v: boolean) => void
  planSheet: null | 'itinerary' | 'hotels'
  setPlanSheet: (v: null | 'itinerary' | 'hotels') => void

  toast: Toast | null
  showToast: (text: string, undo?: () => void) => void

  mascotMood: Expression
}

const Ctx = createContext<Store | null>(null)
export const useStore = () => {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore outside provider')
  return s
}

let uid = 0
const nid = (p: string) => `${p}${++uid}`

export function StoreProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<ScreenId[]>(['welcome'])
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd')
  const [messages, setMessages] = useState<Message[]>([])
  const [thinking, setThinking] = useState(false)
  const [confirm, setConfirm] = useState<PendingConfirm | null>(null)
  const [decisions, setDecisions] = useState<Record<string, Decision>>({})
  const [extraHome, setExtraHome] = useState<HomeCard[]>([])
  const [memory, setMemory] = useState<MemoryItem[]>(memorySeed)
  const [activity, setActivity] = useState<{ id: string; text: string }[]>([])
  const [sendOpen, setSendOpen] = useState(false)
  const [planSheet, setPlanSheet] = useState<null | 'itinerary' | 'hotels'>(null)
  const [toast, setToast] = useState<Toast | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  const screen = stack[stack.length - 1]

  const go = useCallback((s: ScreenId, opts?: { replace?: boolean }) => {
    setDir('fwd')
    setStack(st => {
      if (opts?.replace) return [...st.slice(0, -1), s]
      // returning to an earlier screen pops back to it instead of growing the stack
      const i = st.lastIndexOf(s)
      return i >= 0 ? st.slice(0, i + 1) : [...st, s]
    })
  }, [])
  const back = useCallback(() => {
    setDir('back')
    setStack(st => (st.length > 1 ? st.slice(0, -1) : st))
  }, [])

  const showToast = useCallback((text: string, undo?: () => void) => {
    window.clearTimeout(toastTimer.current)
    setToast({ id: ++uid, text, undo })
    toastTimer.current = window.setTimeout(() => setToast(null), 4200)
  }, [])

  const addMemory = useCallback((m: Omit<MemoryItem, 'id'>) => setMemory(l => [...l, { ...m, id: nid('mem') }]), [])
  const updateMemory = useCallback((id: string, patch: Partial<Pick<MemoryItem, 'title' | 'detail'>>) =>
    setMemory(l => l.map(m => (m.id === id ? { ...m, ...patch } : m))), [])
  const removeMemory = useCallback((id: string) => {
    const index = memory.findIndex(m => m.id === id)
    const item = memory[index]
    if (!item) return
    setMemory(l => l.filter(m => m.id !== id))
    showToast(`Forgotten: ${item.title}`, () => setMemory(l => [...l.slice(0, index), item, ...l.slice(index)]))
  }, [memory, showToast])

  const addHome = useCallback((c: Omit<HomeCard, 'id' | 'isNew'>) =>
    setExtraHome(l => [{ ...c, id: nid('h'), isNew: true }, ...l]), [])

  const reply = useCallback((build: () => Message[]) => {
    setThinking(true)
    window.setTimeout(() => {
      setThinking(false)
      setMessages(l => [...l, ...build()])
    }, chatCopy.thinkingMs)
  }, [])

  const ask = useCallback((text: string) => {
    const t = text.trim()
    if (!t) return
    setMessages(l => [...l, { id: nid('u'), role: 'user', text: t }])
    if (chatCopy.tripWords.test(t)) {
      reply(() => [
        { id: nid('c'), role: 'chimu', kind: 'text', text: chatCopy.tripReply },
        { id: nid('c'), role: 'chimu', kind: 'destinations' },
      ])
    } else {
      const note = noteUnderstanding(t)
      reply(() => [
        { id: nid('c'), role: 'chimu', kind: 'text', text: chatCopy.fallbackReply },
        {
          id: nid('c'), role: 'chimu', kind: 'confirm', instanceId: nid('i'), action: actions['remember-note'],
          onApprove: () => addMemory(note.memory),
        },
      ])
    }
  }, [reply, addMemory])

  const pickDestination = useCallback((d: Destination) => {
    setMessages(l => [...l, { id: nid('u'), role: 'user', text: `${d.name} sounds good` }])
    reply(() => [
      { id: nid('c'), role: 'chimu', kind: 'text', text: chatCopy.pickReply(d.name) },
      {
        id: nid('c'), role: 'chimu', kind: 'confirm', instanceId: nid('i'), action: actions['calendar-hold'],
        onApprove: () => addMemory({ category: 'Dates', title: `${d.name} weekend`, detail: '14–16 Nov · held on your calendar', source: 'From our chat' }),
      },
    ])
  }, [reply, addMemory])

  const openConfirm = useCallback((c: PendingConfirm) => setConfirm(c), [])
  const closeConfirm = useCallback(() => setConfirm(null), [])

  const resolve = useCallback((instanceId: string, action: ChimuAction, d: Decision, onApprove?: () => void) => {
    setDecisions(m => ({ ...m, [instanceId]: d }))
    if (d === 'approved') {
      onApprove?.()
      if (action.remember) addMemory(action.remember)
      setActivity(a => [{ id: nid('a'), text: action.doneMessage }, ...a])
    }
  }, [addMemory])

  const homeList = useMemo(() => [...extraHome, ...homeCards], [extraHome])

  const mascotMood: Expression = thinking ? 'thinking' : 'default'

  const value: Store = {
    screen, dir, go, back,
    messages, thinking, ask, pickDestination,
    confirm, openConfirm, closeConfirm, decisions, resolve,
    homeList, addHome,
    memory, addMemory, updateMemory, removeMemory,
    activity,
    sendOpen, setSendOpen, planSheet, setPlanSheet,
    toast, showToast,
    mascotMood,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
