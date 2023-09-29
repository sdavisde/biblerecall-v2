'use client'

import { useContext } from 'react'
import { Settings, SettingsContext } from '@components/Settings/Provider'
import { setSettings as updateSettings } from '@lib/api'
import toast from 'react-hot-toast'

export const useSettings = () => {
  const { settings, setSettings } = useContext(SettingsContext)

  const setNewSettings = async (newSettings: Settings) => {
    const res = await updateSettings(newSettings)
    if (res.SUCCESS) {
      setSettings(newSettings)
    } else {
      toast.error(res.RESPONSE)
    }
  }

  return [settings, setNewSettings] as const
}
