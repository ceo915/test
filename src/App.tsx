import { StoreProvider, useStore, type ScreenId } from './state/store'
import { PhoneFrame } from './components/PhoneFrame'
import { ConfirmSheet } from './components/ConfirmCard'
import { SendSheet } from './components/SendSheet'
import { PlanSheet } from './components/PlanSheet'
import { Toast } from './components/Toast'
import { Welcome } from './screens/Welcome'
import { Home } from './screens/Home'
import { Listening } from './screens/Listening'
import { Trip } from './screens/Trip'
import { Chat } from './screens/Chat'
import { Knows } from './screens/Knows'

const screens: Record<ScreenId, () => React.ReactElement> = {
  welcome: Welcome, home: Home, listening: Listening, trip: Trip, chat: Chat, knows: Knows,
}

function Host() {
  const { screen, dir } = useStore()
  const Screen = screens[screen]
  return (
    <main key={screen} className={`absolute inset-0 ${dir === 'fwd' ? 'animate-enterFwd' : 'animate-enterBack'}`}>
      <Screen />
    </main>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <PhoneFrame>
        <Host />
        <SendSheet />
        <PlanSheet />
        <ConfirmSheet />
        <Toast />
      </PhoneFrame>
    </StoreProvider>
  )
}
