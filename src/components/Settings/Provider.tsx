'use client'

import { PropsWithChildren, createContext, useState } from 'react'

export type Settings = {
  theme: 'system' | 'light' | 'dark'
  visibility: 'full' | 'partial' | 'none'
  font: string
  defaultVersion: string
  verseOfTheDayEnabled: boolean
  verseDueDatesEnabled: boolean
}

type SettingsContext = {
  settings: Settings | null
  setSettings: (newSettings: Settings) => void
}

// export const defaultSettings: Settings = {
//   theme: 'system',
//   visibility: 'full',
//   font: 'Urbanist',
//   defaultVersion: 'ESV',
//   verseDueDatesEnabled: false,
//   verseOfTheDayEnabled: false,
// }

export const SettingsContext = createContext<SettingsContext>({
  settings: null,
  setSettings: (newSettings: Settings) => {},
})

export const SettingsProvider = ({ settings, children }: PropsWithChildren<{ settings: Settings }>) => {
  const [settingsState, setSettingsState] = useState<Settings>(settings)

  return (
    <SettingsContext.Provider
      value={{
        settings: settingsState,
        setSettings: setSettingsState,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
