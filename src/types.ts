export type Expression =
  | 'default' | 'happy' | 'excited' | 'listening' | 'thinking'
  | 'curious' | 'caring' | 'celebrating' | 'sleeping'

export type IconName =
  | 'mic' | 'plus' | 'stop' | 'back' | 'heart' | 'plane' | 'bed' | 'pin' | 'calendar'
  | 'passport' | 'user' | 'sparkle' | 'trash' | 'pencil' | 'check' | 'x' | 'image'
  | 'link' | 'note' | 'camera' | 'file' | 'chevron' | 'send' | 'clock' | 'shield' | 'memory'

export type ThumbKind = 'beach' | 'fort' | 'hotel' | 'hills' | 'waterfall' | 'coast' | 'sunset'
export type Tint = 'peach' | 'sky' | 'sage' | 'cream' | 'coral'

export type ActionId = string

export interface ChimuAction {
  id: ActionId
  /** Short headline, e.g. "Switch your hotel" */
  title: string
  /** Exactly what Chimu will do, one line each */
  willDo: string[]
  /** What it explicitly won't do */
  wontDo?: string
  doneMessage: string
  declinedMessage: string
  /** Saved to What Chimu knows when approved */
  remember?: Omit<MemoryItem, 'id'>
}

export interface HomeCard {
  id: string
  icon: IconName
  tint: Tint
  title: string
  subtitle: string
  badge?: string
  /** 'plan' opens the trip plan, otherwise opens the confirm sheet for this action */
  onTap: { type: 'plan' } | { type: 'action'; actionId: ActionId } | { type: 'knows' }
  isNew?: boolean
}

export type MemoryCategory = 'People' | 'Dates' | 'Preferences' | 'Places' | 'Documents'

export interface MemoryItem {
  id: string
  category: MemoryCategory
  title: string
  detail: string
  source: string
}

export interface Destination {
  id: string
  name: string
  distance: string
  blurb: string
  thumb: ThumbKind
}

export interface SendOption {
  id: 'screenshot' | 'photo' | 'link' | 'note'
  label: string
  hint: string
  icon: IconName
}

export interface Understanding {
  /** Chimu's one-line read of what was shared */
  headline: string
  /** Structured facts it pulled out */
  facts: { label: string; value: string }[]
  /** The question it asks, e.g. remind a week before */
  question: string
  approveLabel: string
  action: ChimuAction
  memory: Omit<MemoryItem, 'id'>
  homeCard: Omit<HomeCard, 'id' | 'isNew'>
}
