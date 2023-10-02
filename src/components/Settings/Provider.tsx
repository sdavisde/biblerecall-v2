'use client'

import { getSettingsFromLocalStorage, setSettingsIntoLocalStorage } from 'hooks/settings'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { getSettingsScript } from './settings-script'
import { setThemeInDocument } from './Settings'

export type Theme = 'system' | 'light' | 'dark'
export type Visibility = 'full' | 'partial' | 'none'

export type Settings = {
  theme: Theme
  visibility: Visibility
  font: string
  defaultVersion: string
  verseOfTheDayEnabled: boolean
  verseDueDatesEnabled: boolean
}

type SettingsContext = {
  settings: Settings | null
  setSettings: (newSettings: Settings) => void
}

export const SettingsContext = createContext<SettingsContext>({
  settings: null,
  setSettings: (newSettings: Settings) => {},
})

/**
 * Settings are initialized as null. When local storage is read, they are overwritten and saved into state.
 * If the user is logged in, then another update happens to set state and local storage to match user saved settings.
 */
export const SettingsProvider = ({ settings, children }: PropsWithChildren<{ settings: Settings }>) => {
  const [settingsState, setSettingsState] = useState<Settings | null>(null)

  useEffect(() => {
    //get settings from local storage as initial page load default
    const localStorageSettings = getSettingsFromLocalStorage()
    setSettingsState(localStorageSettings)
  }, [])

  // If settings is defined, then switch state and localstorage to match user's saved settings
  useEffect(() => {
    if (settings) {
      console.log(`settings: ${JSON.stringify(settings)}}`)
      setSettingsState(settings)
      setSettingsIntoLocalStorage(settings)
      setThemeInDocument(settings.theme)
    } else {
      const localStorageSettings = getSettingsFromLocalStorage()
      console.log(`no settings found, using localStorageSettings or default: ${JSON.stringify(localStorageSettings)}}`)
      setSettingsIntoLocalStorage(localStorageSettings)
      setThemeInDocument(localStorageSettings.theme)
    }
  }, [settings])

  return (
    <>
      {/* This script is responsible for blocking page load until theme has been set, preventing flickering */}
      <script
        dangerouslySetInnerHTML={{ __html: getSettingsScript() }}
        defer
      ></script>
      <SettingsContext.Provider
        value={{
          settings: settingsState,
          setSettings: setSettingsState,
        }}
      >
        {children}
      </SettingsContext.Provider>
    </>
  )
}
