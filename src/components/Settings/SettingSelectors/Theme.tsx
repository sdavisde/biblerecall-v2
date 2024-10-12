'use client'

import { useEffect, useState } from 'react'
import { useSettings } from 'hooks/use-settings'
import { setThemeInDocument } from 'components/Settings/Settings'
import { Theme } from '@configuration/settings'
import { SettingSlot } from '@components/Settings/SettingSlot'
import { Moon } from 'lucide-react'
import { Sun } from 'lucide-react'

export function ThemeSelect() {
  const [settings, setSettings] = useSettings()
  const [colorTheme, setColorTheme] = useState<Theme>(settings?.theme ?? Theme.System)

  // Update user preferences when color theme changes
  useEffect(() => {
    const updateSettings = async () => {
      if (settings && colorTheme !== settings?.theme) {
        await setSettings({ ...settings, theme: colorTheme })
        // Async func used here to keep from changing the UI on the site until the settings are set on the server (db or cookies)
        setThemeInDocument(settings?.theme)
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
