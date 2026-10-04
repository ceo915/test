/**
 * ALL mock content for the Chimu prototype lives here.
 * Change names, dates, prices and copy in this file only.
 */
import type {
  ChimuAction, Destination, HomeCard, MemoryItem, SendOption, ThumbKind, Understanding,
} from '../types'

export const user = { name: 'Ajay' }

export const copy = {
  tagline: 'The AI that gets you.',
  script: 'Remembers. Understands. Looks out. Acts together.',
  greeting: `Good morning, ${user.name}!`,
  greetingSub: "Here's what I've got for you today.",
  inputPlaceholder: 'Talk to Chimu...',
}

/* ───────────────────────── Home ───────────────────────── */

export const homeCards: HomeCard[] = [
  {
    id: 'flight', icon: 'plane', tint: 'sky',
    title: 'Your flight to Goa', subtitle: 'Tomorrow, 6:20 AM',
    onTap: { type: 'plan' },
  },
  {
    id: 'passport', icon: 'passport', tint: 'peach',
    title: 'Passport expires', subtitle: 'in 2 months',
    onTap: { type: 'action', actionId: 'passport-remind' },
  },
  {
    id: 'meeting', icon: 'user', tint: 'sage',
    title: 'Meeting with Pratik', subtitle: 'Today, 4:00 PM',
    onTap: { type: 'action', actionId: 'meeting-prep' },
  },
  {
    id: 'hotel', icon: 'bed', tint: 'cream',
    title: 'Better hotel option found', subtitle: 'Same area, 20% lower price',
    onTap: { type: 'action', actionId: 'hotel-switch' },
  },
]

/* ───────────────────────── Actions Chimu asks before doing ───────────────────────── */

/** "Switch hotel" confirmation for any option in the plan */
export function hotelSwitch(o: { id: string; name: string; price: string; total: string; saving: string }): ChimuAction {
  return {
    id: 'hotel-switch',
    title: 'Switch your Goa hotel?',
    willDo: [
      `Book ${o.name}, 3 nights, 14–17 Nov at ${o.price}`,
      'Cancel your current booking at Palm Grove Inn (free cancellation until tonight)',
      'Email the new confirmation to you',
    ],
    wontDo: `I won't charge anything beyond ${o.total} and I won't touch your flights.`,
    doneMessage: `Done. ${o.name} is booked and Palm Grove Inn is cancelled. You save ${o.saving}.`,
    declinedMessage: "No problem. I haven't changed anything. I'll keep your current booking.",
    remember: { category: 'Places', title: o.name, detail: `Booked · 14–17 Nov · ${o.price}`, source: 'You approved this' },
  }
}

export const actions: Record<string, ChimuAction> = {
  'hotel-switch': hotelSwitch({ id: 'sea-view', name: 'Sea View Resort', price: '₹2,499/night', total: '₹7,497', saving: '₹1,875' }),
  'passport-remind': {
    id: 'passport-remind',
    title: 'Sort out your passport?',
    willDo: [
      'Add a reminder on 15 Oct to start your renewal',
      'Save the Passport Seva link so it opens in one tap',
    ],
    wontDo: "I won't fill any forms or pay any fees for you.",
    doneMessage: "Done. I'll nudge you on 15 Oct. Renewal takes about 3 weeks, so no rush.",
    declinedMessage: "Okay, I won't set anything. I'll mention it again next month.",
  },
  'meeting-prep': {
    id: 'meeting-prep',
    title: 'Get ready for Pratik?',
    willDo: [
      'Set a 3:30 PM reminder to leave for your 4:00 PM meeting',
      'Pull together your last 3 notes about Pratik into one summary',
    ],
    wontDo: "I won't message Pratik or share your notes with anyone.",
    doneMessage: "Done. I'll tap you at 3:30 PM and your notes are ready whenever you want them.",
    declinedMessage: "Got it. Nothing set. I'll stay quiet about it.",
  },
  'calendar-hold': {
    id: 'calendar-hold',
    title: 'Hold the weekend?',
    willDo: [
      'Block 14–16 Nov on your calendar as "Weekend trip"',
      'Keep an eye on hotel prices and tell you if they drop',
    ],
    wontDo: "I won't book anything. That will always be a separate question.",
    doneMessage: 'Done. The weekend is blocked and I\'m watching prices for you.',
    declinedMessage: "No worries. Your calendar is untouched.",
  },
  'remember-note': {
    id: 'remember-note',
    title: 'Remember this?',
    willDo: ['Save it to What Chimu knows so I can use it next time'],
    wontDo: "You can edit or delete it any time.",
    doneMessage: "Saved. You'll find it under What Chimu knows.",
    declinedMessage: "Okay, I won't remember that.",
  },
  'itinerary-share': {
    id: 'itinerary-share',
    title: 'Book Sea View Resort?',
    willDo: [
      'Reserve 3 nights, 14–17 Nov, sea-facing room',
      'Pay ₹7,497 using the card ending 4821',
    ],
    wontDo: "I won't book anything else for the trip.",
    doneMessage: "Done. You're booked at Sea View Resort. Confirmation is in your inbox.",
    remember: { category: 'Places', title: 'Sea View Resort', detail: 'Booked · 14–17 Nov · ₹2,499/night', source: 'You approved this' },
    declinedMessage: "Alright, nothing booked. The plan stays saved for you.",
  },
}

/* ───────────────────────── Trip plan ───────────────────────── */

export const trip = {
  title: 'Your Goa trip plan is ready!',
  dates: '14 – 17 Nov',
  flight: { title: 'Flight', primary: 'Mumbai → Goa', secondary: 'Tomorrow, 6:20 AM · IndiGo 6E 531', thumb: 'sunset' as ThumbKind },
  hotel: {
    title: 'Hotel',
    name: 'Sea View Resort',
    price: '₹2,499/night',
    badge: '20% lower',
    thumb: 'hotel' as ThumbKind,
  },
  places: {
    title: 'Top places',
    items: [
      { name: 'Baga Beach', thumb: 'beach' as ThumbKind },
      { name: 'Fort Aguada', thumb: 'fort' as ThumbKind },
      { name: 'Chapora Fort', thumb: 'hills' as ThumbKind },
    ],
  },
  note: 'I found better hotel options for your dates. Want to see?',
  hotelOptions: [
    { id: 'sea-view', name: 'Sea View Resort', price: '₹2,499/night', detail: '700 m from Baga · sea-facing', tag: '20% lower', thumb: 'hotel' as ThumbKind },
    { id: 'palm-grove', name: 'Palm Grove Inn', price: '₹3,120/night', detail: 'Your current booking', tag: 'Current', thumb: 'hills' as ThumbKind },
    { id: 'casa-azul', name: 'Casa Azul', price: '₹2,780/night', detail: 'Calangute · pool', tag: '11% lower', thumb: 'coast' as ThumbKind },
  ],
  itinerary: [
    { day: 'Day 1 · Fri 14 Nov', lines: ['6:20 AM flight lands 7:35 AM', 'Check in at Sea View Resort', 'Sunset at Baga Beach'] },
    { day: 'Day 2 · Sat 15 Nov', lines: ['Breakfast near the resort', 'Fort Aguada by late morning', 'Dinner in Panjim'] },
    { day: 'Day 3 · Sun 16 Nov', lines: ['Chapora Fort at sunrise', 'Slow beach afternoon', 'Evening flight home'] },
  ],
}

/* ───────────────────────── Chat ───────────────────────── */

export const chat = {
  defaultUserText: 'Plan a weekend trip for me next month',
  /** Words that trigger the trip reply. Anything else gets the "remember it?" reply. */
  tripWords: /trip|weekend|plan|travel|goa|holiday|getaway|vacation/i,
  tripReply: "Happy to. I know you like the sea and quiet mornings, and you're free 14–16 Nov. Here are three that fit, all within a few hours' drive:",
  fallbackReply: "Got it. I'm still learning that one in this preview, but I can remember it for you if that's useful.",
  pickReply: (name: string) =>
    `${name} is a good pick. It suits the way you travel. Shall I hold the weekend and watch hotel prices?`,
  thinkingMs: 1500,
  voiceUtterance: 'Plan a weekend trip for me next month',
}

export const destinations: Destination[] = [
  { id: 'alibaug', name: 'Alibaug', distance: '2 hrs · beach calm', blurb: 'Ferry ride, quiet shores', thumb: 'beach' },
  { id: 'lonavala', name: 'Lonavala', distance: '3 hrs · monsoon green', blurb: 'Waterfalls and chai', thumb: 'waterfall' },
  { id: 'mahabaleshwar', name: 'Mahabaleshwar', distance: '5 hrs · hill views', blurb: 'Strawberries and valleys', thumb: 'hills' },
]

/* ───────────────────────── Listening ───────────────────────── */

export const listening = {
  title: "I'm listening...",
  hint: 'Take your time.',
  captionDelayMs: 1400,
}

/* ───────────────────────── Send to Chimu ───────────────────────── */

export const sendCopy = {
  title: 'Send to Chimu',
  subtitle: "Show me something and I'll figure out what matters.",
  noteLabel: 'Type or paste a note',
  notePlaceholder: 'e.g. Dad prefers aisle seats',
  linkPlaceholder: 'Paste a link',
  linkDefault: 'https://events.example.in/pune-food-festival',
  readingMs: 1700,
}

export const sendOptions: SendOption[] = [
  { id: 'screenshot', label: 'Screenshot', hint: 'A bill, ticket or message', icon: 'image' },
  { id: 'photo', label: 'Photo', hint: 'Receipt, card or document', icon: 'camera' },
  { id: 'link', label: 'Link', hint: 'An event, booking or page', icon: 'link' },
  { id: 'note', label: 'Note', hint: 'Something to remember', icon: 'note' },
]

export const understandings: Record<'screenshot' | 'photo' | 'link', Understanding> = {
  screenshot: {
    headline: 'Car insurance, renews 14 Nov, ₹8,400.',
    facts: [
      { label: 'What', value: 'Car insurance' },
      { label: 'Renews', value: '14 Nov' },
      { label: 'Amount', value: '₹8,400' },
    ],
    question: 'Want me to remind you a week before?',
    approveLabel: 'Yes, remind me',
    action: {
      id: 'insurance-remind',
      title: 'Set this reminder?',
      willDo: ['Remind you on 7 Nov about the car insurance renewal (₹8,400)', 'Save the policy details to What Chimu knows'],
      wontDo: "I won't pay or renew anything.",
      doneMessage: "Done. I'll remind you on 7 Nov and it's saved under Documents.",
      declinedMessage: "Okay, I haven't saved anything.",
    },
    memory: { category: 'Documents', title: 'Car insurance', detail: 'Renews 14 Nov · ₹8,400', source: 'From your screenshot' },
    homeCard: {
      icon: 'file', tint: 'sky', title: 'Car insurance renews', subtitle: '14 Nov · ₹8,400',
      onTap: { type: 'knows' },
    },
  },
  photo: {
    headline: 'Samsung fridge warranty, ends 3 Mar 2027, ₹42,990.',
    facts: [
      { label: 'What', value: 'Fridge warranty' },
      { label: 'Ends', value: '3 Mar 2027' },
      { label: 'Paid', value: '₹42,990' },
    ],
    question: "Want me to keep this and nudge you a month before it ends?",
    approveLabel: 'Yes, keep it',
    action: {
      id: 'warranty-remind',
      title: 'Keep this receipt?',
      willDo: ['Save the receipt details to What Chimu knows', 'Remind you on 3 Feb 2027 that the warranty is ending'],
      wontDo: "I won't contact the store or the brand.",
      doneMessage: "Done. Saved, and I'll nudge you on 3 Feb 2027.",
      declinedMessage: "Okay, I haven't saved anything.",
    },
    memory: { category: 'Documents', title: 'Fridge warranty', detail: 'Ends 3 Mar 2027 · ₹42,990', source: 'From your photo' },
    homeCard: {
      icon: 'file', tint: 'sage', title: 'Fridge warranty ends', subtitle: '3 Mar 2027',
      onTap: { type: 'knows' },
    },
  },
  link: {
    headline: 'Pune Food Festival, 22–24 Nov, tickets ₹500.',
    facts: [
      { label: 'Event', value: 'Pune Food Festival' },
      { label: 'When', value: '22–24 Nov' },
      { label: 'Tickets', value: '₹500' },
    ],
    question: 'Want me to save the dates and check if you are free?',
    approveLabel: 'Yes, save it',
    action: {
      id: 'festival-save',
      title: 'Save this event?',
      willDo: ['Save the event and dates to What Chimu knows', "Check your calendar and tell you if 22–24 Nov clashes"],
      wontDo: "I won't buy tickets.",
      doneMessage: 'Done. Saved. Your calendar is clear on 22–24 Nov.',
      declinedMessage: "Okay, I haven't saved anything.",
    },
    memory: { category: 'Dates', title: 'Pune Food Festival', detail: '22–24 Nov · tickets ₹500', source: 'From your link' },
    homeCard: {
      icon: 'calendar', tint: 'peach', title: 'Pune Food Festival', subtitle: '22–24 Nov',
      onTap: { type: 'knows' },
    },
  },
}

/** Template for the free-text "Note" option */
export const noteUnderstanding = (text: string): Understanding => ({
  headline: `"${text}"`,
  facts: [{ label: 'Type', value: 'A preference' }],
  question: 'Want me to remember this?',
  approveLabel: 'Yes, remember it',
  action: {
    id: 'note-save',
    title: 'Remember this?',
    willDo: [`Save "${text}" to What Chimu knows under Preferences`],
    wontDo: 'You can edit or delete it any time.',
    doneMessage: "Saved. I'll keep it in mind.",
    declinedMessage: "Okay, I haven't saved anything.",
  },
  memory: { category: 'Preferences', title: text, detail: 'Your note', source: 'From your note' },
  homeCard: {
    icon: 'note', tint: 'cream', title: 'New note saved', subtitle: text,
    onTap: { type: 'knows' },
  },
})

/* ───────────────────────── What Chimu knows ───────────────────────── */

export const knowsCopy = {
  title: 'What Chimu knows',
  intro: "Everything I've remembered about you. You're in charge: edit or delete anything.",
  accent: 'Nothing here is a secret from you.',
  categories: ['People', 'Dates', 'Preferences', 'Places', 'Documents'] as const,
  emptyLine: "Nothing here yet.",
  activityTitle: "What I've done for you",
  activityEmpty: 'Nothing yet. I always ask first.',
}

export const memorySeed: MemoryItem[] = [
  { id: 'm1', category: 'People', title: 'Pratik', detail: 'Colleague · meeting today 4:00 PM', source: 'From your calendar' },
  { id: 'm2', category: 'People', title: 'Meera (sister)', detail: 'Birthday 22 Dec', source: 'You told me' },
  { id: 'm3', category: 'Dates', title: 'Goa trip', detail: '14–17 Nov · flight 6:20 AM', source: 'From your email' },
  { id: 'm4', category: 'Dates', title: 'Passport expiry', detail: 'In 2 months', source: 'From a photo you sent' },
  { id: 'm5', category: 'Preferences', title: 'Window seat', detail: 'Always, on flights', source: 'You told me' },
  { id: 'm6', category: 'Preferences', title: 'Quiet mornings', detail: 'No meetings before 10 AM', source: 'Learned from your calendar' },
  { id: 'm7', category: 'Places', title: 'Baga Beach', detail: 'Saved for the Goa trip', source: 'From your plan' },
  { id: 'm8', category: 'Places', title: 'Home', detail: 'Pune', source: 'You told me' },
  { id: 'm9', category: 'Documents', title: 'Passport', detail: 'Expires in 2 months', source: 'From a photo you sent' },
]

export const brand = {
  frameTime: '9:41',
}
