'use client'

import { useSettings } from 'hooks/settings'
import { useEffect, useRef, useState } from 'react'
import { Font } from '@configuration/settings'
import { capitalize } from 'util/string'
import { selectorClasses } from '.'

export default function FontSelect() {
  const [settings, setSettings] = useSettings()
  const [font, setFont] = useState<Font>(settings?.font ?? Font.URBANIST)
  const ref = useRef<HTMLFormElement>(null)

  // Update settings when selected font changes
  useEffect(() => {
    if (settings && font !== settings.font) {
      setSettings({ ...settings, font })
    }
  }, [font])

  return (
    <form
      className={selectorClasses.form}
      ref={ref}
    >
      <label className={selectorClasses.label}>Font</label>
      <select
        id='font-select'
        value={font}
        className={selectorClasses.select}
        onChange={(e) => setFont(e.target.value as Font)}
      >
        {(Object.keys(Font) as Array<keyof typeof Font>).map((key) => (
          <option
            key={key}
            value={Font[key]}
          >
            {capitalize(Font[key])}
          </option>
        ))}
      </select>
    </form>
  )
}
