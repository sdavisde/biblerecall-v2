'use client'

import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { DEFAULT_SETTINGS, Settings } from '@configuration/settings'
import { getSettingsFromLocalStorage, setSettingsIntoLocalStorage } from '@lib/local-storage'
import Script from 'next/script'
import { setThemeInDocument } from '@components/Settings'

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
export const SettingsProvider = ({
  authUserSettings,
  children,
}: PropsWithChildren<{ authUserSettings: Settings | null }>) => {
  const [settingsState, setSettingsState] = useState<Settings | null>(null)

  useEffect(() => {
    //get settings from local storage as initial page load default
    const localStorageSettings = getSettingsFromLocalStorage() ?? DEFAULT_SETTINGS
    setSettingsState(localStorageSettings)
  }, [])

  // If auth user settings is defined, then switch state and localstorage to match user's saved settings
  useEffect(() => {
    if (authUserSettings) {
      setSettingsState(authUserSettings)
      setSettingsIntoLocalStorage(authUserSettings)
      setThemeInDocument(authUserSettings.theme)
    } else {
      const localStorageSettings = getSettingsFromLocalStorage() ?? DEFAULT_SETTINGS
      setSettingsIntoLocalStorage(localStorageSettings)
      setThemeInDocument(localStorageSettings.theme)
    }
  }, [authUserSettings])

  return (
    <>
      {/* This script is responsible for blocking page load until theme has been set, preventing flickering */}
      {/* <Script
        id='settings-script'
        defer
        dangerouslySetInnerHTML={{
          __html: `
        const theme = localStorage.theme
        
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          if (!document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark')
          }
        } else {
          document.documentElement.classList.remove('dark')
        }
      `,
        }}
      /> */}
      <SettingsContext.Provider
        value={{
          settings: settingsState,
          setSettings: setSettingsState,
        }}
      >
        {/* This component must be wrapping all of the application except for the HTML tags
            settingsState should always be defined */}
        <body className={`font-${settingsState?.font} bg-lightGrey dark:bg-black text-black dark:text-white`}>
          {children}
        </body>
      </SettingsContext.Provider>
    </>
  )
}
