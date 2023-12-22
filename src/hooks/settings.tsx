'use client'

import { useContext } from 'react'
import { Settings } from '@configuration/settings'
import { setAuthenticatedSettings as updateSettings } from '@lib/api'
import toast from 'react-hot-toast'
import { setSettingsIntoLocalStorage } from '@lib/local-storage'
import { SettingsContext } from '@components/Settings/Provider'

export enum SettingsReponse {
  NotLoggedIn = 'Not Logged In',
}

export const useSettings = () => {
  const { settings, setSettings } = useContext(SettingsContext)

  const setNewSettings = async (newSettings: Settings) => {
    const res = await updateSettings(newSettings)
    console.log(res)

    if (res.SUCCESS) {
      setSettings(res.DATA)
    } else if (res.RESPONSE === SettingsReponse.NotLoggedIn) {
      setSettingsIntoLocalStorage(newSettings)
      setSettings(newSettings)
    } else {
      toast.error(res.RESPONSE)
    }
  }

  return [settings, setNewSettings] as const
}
