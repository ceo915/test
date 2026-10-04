import type { IconName } from '../types'

/** One icon family: 24px grid, 1.6 stroke, round caps and joins. */
const paths: Record<IconName, React.ReactNode> = {
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  stop: <rect x="7" y="7" width="10" height="10" rx="2.5" />,
  back: <path d="M14.5 5.5 8 12l6.5 6.5" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z" />,
  plane: <path d="M3.5 13.5 20 6.5c.8-.3 1.5.4 1.2 1.2l-6.2 14-2.4-6.4-6.4-2.4 1.1-.4M12.6 15.3l3.6-4.2" />,
  bed: <path d="M3.5 18.5v-11M3.5 14.5h17v4M20.5 14.5v-2.8a2.7 2.7 0 0 0-2.7-2.7H11v5.5M7 12.2a1.6 1.6 0 1 0 0-.01" />,
  pin: <><path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0c0 5.4 6.5 11 6.5 11Z" /><circle cx="12" cy="10" r="2.4" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="3.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  passport: <><rect x="5" y="3.5" width="14" height="17" rx="3" /><circle cx="12" cy="10.5" r="3" /><path d="M9 16.5h6" /></>,
  user: <><circle cx="12" cy="8.5" r="3.6" /><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" /></>,
  sparkle: <path d="M12 4c.6 4.2 2.3 6 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5C9.7 10 11.4 8.2 12 4ZM18.5 16.5v3M17 18h3" />,
  trash: <path d="M4.5 7h15M9.5 7V4.8c0-.4.3-.8.8-.8h3.4c.5 0 .8.4.8.8V7M6.5 7l.8 12c.1.8.7 1.5 1.5 1.5h6.4c.8 0 1.4-.7 1.5-1.5l.8-12M10 11v6M14 11v6" />,
  pencil: <path d="M15.5 5.5 18.5 8.5M4.5 19.5l.8-3.8L16.4 4.6a1.6 1.6 0 0 1 2.2 0l.8.8a1.6 1.6 0 0 1 0 2.2L8.3 18.7l-3.8.8Z" />,
  check: <path d="M5 12.5 10 17.5 19 7" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  image: <><rect x="3.5" y="4.5" width="17" height="15" rx="3.5" /><circle cx="9" cy="10" r="1.6" /><path d="m4 17 5-4.5 4 3.5 3-2.5 4.5 3.5" /></>,
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
  note: <><path d="M6.5 3.5h8.8L19.5 7.7V18a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 18V6A2.5 2.5 0 0 1 7 3.5" /><path d="M8.5 11h7M8.5 15h4.5" /></>,
  camera: <><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H8l1.3-2h5.4L16 6h1.5A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5Z" /><circle cx="12" cy="12.5" r="3.4" /></>,
  file: <><path d="M6.5 3.5h7.8l4.2 4.2V18A2.5 2.5 0 0 1 16 20.5H7.5A2.5 2.5 0 0 1 5 18V6a2.5 2.5 0 0 1 1.5-2.3" /><path d="M14 3.8V8h4.2M8.5 13h7M8.5 16.5h5" /></>,
  chevron: <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  send: <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  shield: <path d="M12 3.5 5 6v5.6c0 4.2 2.8 7.4 7 8.9 4.2-1.5 7-4.7 7-8.9V6l-7-2.5ZM9 12l2.2 2.2L15.5 10" />,
  memory: <><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z" /><path d="M9.5 11.2h5M9.5 14h3" /></>,
}

export function Icon({ name, size = 24, className = '', strokeWidth = 1.6 }: {
  name: IconName; size?: number; className?: string; strokeWidth?: number
}) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
