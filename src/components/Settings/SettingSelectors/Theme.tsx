'use client'

import { useEffect, useRef, useState } from 'react'
import { useSettings } from 'hooks/settings'
import { setThemeInDocument } from '../Settings'
import { Theme } from '@configuration/settings'
import { capitalize } from 'util/string'
import { selectorClasses } from '.'

export default function ThemeSelect() {
  const [settings, setSettings] = useSettings()
  const [colorTheme, setColorTheme] = useState<Theme>(settings?.theme ?? Theme.SYSTEM)
  const ref = useRef<HTMLFormElement>(null)

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

  return (
    <form
      className={selectorClasses.form}
      ref={ref}
    >
      <label className={selectorClasses.label}>Color Theme</label>
      <select
        value={colorTheme}
        className={selectorClasses.select}
        onChange={(e) => {
          setColorTheme(e.target.value as Theme)
        }}
      >
        {(Object.keys(Theme) as Array<keyof typeof Theme>).map((key) => (
          <option
            key={key}
            value={Theme[key]}
          >
            {capitalize(Theme[key])}
          </option>
        ))}
      </select>
    </form>
  )
}
