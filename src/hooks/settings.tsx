'use client'

import { useContext } from 'react'
import { Settings, SettingsContext, Theme, Visibility } from '@components/Settings/Provider'
import { setSettings as updateSettings } from '@lib/api'
import toast from 'react-hot-toast'

export enum SettingsReponse {
  NotLoggedIn = 'Not Logged In',
}

export const useSettings = () => {
  const { settings, setSettings } = useContext(SettingsContext)

  const setNewSettings = async (newSettings: Settings) => {
    const res = await updateSettings(newSettings)

    if (res.SUCCESS) {
      console.log('success')
      setSettings(newSettings)
    } else if (res.RESPONSE === SettingsReponse.NotLoggedIn) {
      setSettingsIntoLocalStorage(newSettings)
      setSettings(newSettings)
    } else {
      toast.error(res.RESPONSE)
    }
  }

  return [settings, setNewSettings] as const
}

export const getSettingsFromLocalStorage = () => {
  if (localStorage) {
    return {
      theme: (localStorage.getItem('theme') as Theme) ?? defaultSettings.theme,
      visibility: (localStorage.getItem('visibility') as Visibility) ?? defaultSettings.visibility,
      font: localStorage.getItem('font') ?? defaultSettings.font,
      defaultVersion: localStorage.getItem('defaultVersion') ?? defaultSettings.defaultVersion,
      verseDueDatesEnabled:
        localStorage.getItem('verseDueDatesEnabled') === 'true' ?? defaultSettings.verseDueDatesEnabled,
      verseOfTheDayEnabled:
        localStorage.getItem('verseOfTheDayEnabled') === 'true' ?? defaultSettings.verseOfTheDayEnabled,
    }
  } else {
    return defaultSettings
  }
}

export const setSettingsIntoLocalStorage = (settings: Settings) => {
  localStorage.setItem('theme', settings.theme.toString())
  localStorage.setItem('visibility', settings.visibility.toString())
  localStorage.setItem('font', settings.font)
  localStorage.setItem('defaultVersion', settings.defaultVersion)
  localStorage.setItem('verseDueDatesEnabled', settings.verseDueDatesEnabled.toString())
  localStorage.setItem('verseOfTheDayEnabled', settings.verseOfTheDayEnabled.toString())
}

export const defaultSettings: Settings = {
  theme: 'system',
  visibility: 'full',
  font: 'Urbanist',
  defaultVersion: 'ESV',
  verseDueDatesEnabled: false,
  verseOfTheDayEnabled: false,
}
