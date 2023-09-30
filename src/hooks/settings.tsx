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
  return {
    theme: (localStorage.getItem('theme') as Theme) ?? 'system',
    visibility: (localStorage.getItem('visibility') as Visibility) ?? 'full',
    font: localStorage.getItem('font') ?? 'Urbanist',
    defaultVersion: localStorage.getItem('defaultVersion') ?? 'ESV',
    verseDueDatesEnabled: localStorage.getItem('verseDueDatesEnabled') === 'true',
    verseOfTheDayEnabled: localStorage.getItem('verseOfTheDayEnabled') === 'true',
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
