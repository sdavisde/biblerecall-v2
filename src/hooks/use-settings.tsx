'use client'

import { useContext } from 'react'
import { Settings } from '@configuration/settings'
import toast from 'react-hot-toast'
import { setSettingsIntoLocalStorage } from '@lib/local-storage'
import { SettingsContext } from '@components/Settings/Provider'
import { api } from '@lib/trpc/client'
import { ErrorCode } from '@util/error'

export const useSettings = () => {
  const { settings, setSettings } = useContext(SettingsContext)
  const settingsMutation = api.settings.set.useMutation()

  const setNewSettings = async (newSettings: Settings) => {
    const res = await settingsMutation.mutateAsync(newSettings)
    if (res.hasValue) {
      setSettings(res.value)
      return newSettings
    } else if (res.error.code === ErrorCode.NOT_LOGGED_IN) {
      setSettingsIntoLocalStorage(newSettings)
      setSettings(newSettings)
      return newSettings
    } else {
      toast.error('Error saving settings. Please reload the page and try again.')
      return null
    }
  }

  return [settings, setNewSettings] as const
}
