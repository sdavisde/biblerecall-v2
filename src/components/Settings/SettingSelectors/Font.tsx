'use client'

import { useSettings } from 'hooks/use-settings'
import { useEffect, useState } from 'react'
import { Font } from '@configuration/settings'
import { SettingSlot } from '../SettingSlot'
import { AiOutlineFontSize } from 'react-icons/ai'

export function FontSelect() {
  const [settings, setSettings] = useSettings()
  const [font, setFont] = useState<Font>(settings?.font ?? Font.Urbanist)

  // Update user preferences when selected font changes
  useEffect(() => {
    if (settings && font !== settings.font) {
      setSettings({ ...settings, font })
    }
  }, [font])

  return (
    <SettingSlot
      options={Object.entries(Font).map(([label, value]) => ({
        label,
        value,
      }))}
      selectedValue={font}
      setter={setFont}
    >
      <AiOutlineFontSize />
    </SettingSlot>
  )
}
