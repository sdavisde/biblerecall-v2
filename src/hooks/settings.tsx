'use client'

import { useContext } from 'react'
import { Settings } from '@configuration/settings'
import toast from 'react-hot-toast'
import { setSettingsIntoLocalStorage } from '@lib/local-storage'
import { SettingsContext } from '@components/Settings/Provider'
import { apiClient } from '@lib/trpc/client'
import { ErrorCode } from '@util/error'

export const useSettings = () => {
  const { settings, setSettings } = useContext(SettingsContext)
  const settingsMutation = apiClient.settings.set.useMutation()

  const setNewSettings = async (newSettings: Settings) => {
    const res = await settingsMutation.mutateAsync(newSettings)
    if (res.hasValue) {
      setSettings(res.value)
    } else if (res.error.code === ErrorCode.NOT_LOGGED_IN) {
      setSettingsIntoLocalStorage(newSettings)
      setSettings(newSettings)
    } else {
      toast.error('Error saving settings. Please reload the page and try again.')
    }
  }

  return [settings, setNewSettings] as const
}
