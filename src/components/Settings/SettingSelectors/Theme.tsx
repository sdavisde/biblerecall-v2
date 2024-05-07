'use client'

import { useEffect, useState } from 'react'
import { useSettings } from 'hooks/settings'
import { setThemeInDocument } from 'components/Settings/Settings'
import { Theme } from '@configuration/settings'
import { capitalize } from 'util/string'
import { SettingSlot } from '../SettingSlot'

export default function ThemeSelect() {
  const [settings, setSettings] = useSettings()
  const [colorTheme, setColorTheme] = useState<Theme>(settings?.theme ?? Theme.SYSTEM)

  // Update settings when color theme changes
  useEffect(() => {
    if (settings && colorTheme !== settings?.theme) {
      setSettings({ ...settings, theme: colorTheme })
    }
  }, [colorTheme])

  // Separate hook used here to keep from setting theme until the server set is finished
  useEffect(() => {
    setThemeInDocument(settings?.theme)
  }, [settings?.theme])

  const updateColorTheme = (themeValue: string) => {
    setColorTheme(themeValue as Theme)
  }

  return (
    <SettingSlot
      label='Color Theme'
      options={(Object.keys(Theme) as Array<keyof typeof Theme>).map((key) => ({
        label: capitalize(Theme[key]),
        value: Theme[key],
      }))}
      selectedValue={colorTheme}
      setter={updateColorTheme}
    />
  )
}
