'use client'

import { useSettings } from 'hooks/settings'
import { useEffect, useRef, useState } from 'react'
import { Visibility } from '@configuration/settings'
import { capitalize } from 'util/string'
import { selectorClasses } from '.'

export default function VisibilitySelect() {
  const [settings, setSettings] = useSettings()
  const [visibility, setVisibility] = useState<Visibility>(settings?.visibility ?? Visibility.FULL)
  const ref = useRef<HTMLFormElement>(null)

  // Update settings when visibility changes
  useEffect(() => {
    if (settings && visibility !== settings.visibility) {
      setSettings({ ...settings, visibility })
    }
  }, [visibility])

  return (
    <form
      className={selectorClasses.form}
      ref={ref}
    >
      <label className={selectorClasses.label}>Verse Visibility</label>
      <select
        id='study-mode-select'
        value={visibility}
        className={selectorClasses.select}
        onChange={(e) => setVisibility(e.target.value as Visibility)}
      >
        {(Object.keys(Visibility) as Array<keyof typeof Visibility>).map((key) => (
          <option
            key={key}
            value={Visibility[key]}
          >
            {capitalize(Visibility[key])}
          </option>
        ))}
      </select>
    </form>
  )
}
