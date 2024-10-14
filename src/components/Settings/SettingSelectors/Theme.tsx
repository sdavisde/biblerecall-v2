'use client'

import { useEffect, useState } from 'react'
import { useSettings } from 'hooks/use-settings'
import { Theme } from '@configuration/settings'
import { SettingSlot } from '@components/Settings/SettingSlot'
import { Moon } from 'lucide-react'
import { Sun } from 'lucide-react'
import { setThemeInDocument } from '@components/Settings'

export function ThemeSelect() {
  const [settings, setSettings] = useSettings()
  const [colorTheme, setColorTheme] = useState<Theme>(settings?.theme ?? Theme.System)

  // Update user preferences when color theme changes
  useEffect(() => {
    const updateSettings = async () => {
      if (settings && colorTheme !== settings?.theme) {
        // Async func used here to keep from changing the UI on the site until the settings are set on the server (db or cookies)
        const newSettings = await setSettings({ ...settings, theme: colorTheme })
        if (newSettings) {
          setThemeInDocument(newSettings?.theme)
        }
      }
    }

    updateSettings()
  }, [colorTheme])

  return (
    <SettingSlot
      options={Object.entries(Theme).map(([label, value]) => ({
        label,
        value,
      }))}
      selectedValue={colorTheme}
      setter={setColorTheme}
    >
      {colorTheme === Theme.System || colorTheme === Theme.Dark ? <Moon size={24} /> : <Sun size={24} />}
    </SettingSlot>
  )
}
