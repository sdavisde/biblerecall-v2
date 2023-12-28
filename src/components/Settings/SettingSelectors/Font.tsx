'use client'

import { useSettings } from 'hooks/settings'
import { useEffect, useRef, useState } from 'react'
import { Font } from '@configuration/settings'
import { capitalize } from 'util/string'
import { SettingSlot } from '../SettingSlot'

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

  const updateFont = (fontValue: string) => {
    setFont(fontValue as Font)
  }

  return (
    <SettingSlot
      label='Font'
      options={(Object.keys(Font) as Array<keyof typeof Font>).map((key) => ({
        label: capitalize(Font[key]),
        value: Font[key],
      }))}
      selectedValue={font}
      setter={updateFont}
    />
  )
}
