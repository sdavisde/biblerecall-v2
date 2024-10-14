'use client'

import { useEffect } from 'react'
import { useSettings } from 'hooks/use-settings'
import { Theme } from '@configuration/settings'
import { SettingSlot } from '@components/Settings/SettingSlot'
import { Moon } from 'lucide-react'
import { Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeSelect() {
  const [settings, setSettings] = useSettings()
  const { theme, resolvedTheme, setTheme } = useTheme()

  // Update user preferences when color theme changes
  useEffect(() => {
    const updateSettings = async () => {
      if (settings && theme !== settings?.theme) {
        // Async func used here to keep from changing the UI on the site until the settings are set on the server (db or cookies)
        const newSettings = await setSettings({ ...settings, theme: theme as Theme })
        if (newSettings) {
          setTheme(newSettings.theme)
        }
      }
    }

    updateSettings()
  }, [theme])

  return (
    <SettingSlot
      options={Object.entries(Theme).map(([label, value]) => ({
        label,
        value,
      }))}
      selectedValue={theme!}
      setter={setTheme}
    >
      {resolvedTheme === Theme.Dark ? <Moon size={24} /> : <Sun size={24} />}
    </SettingSlot>
  )
}
