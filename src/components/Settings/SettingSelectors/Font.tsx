'use client'

import { useSettings } from 'hooks/use-settings'
import { useEffect, useState } from 'react'
import { Font } from '@configuration/settings'
import { SettingSlot } from '../SettingSlot'
import { ALargeSmall } from 'lucide-react'

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
      title='Font'
      description='Choose the font that works best for you'
      options={Object.entries(Font).map(([label, value]) => ({
        label,
        value,
      }))}
      selectedValue={font}
      setter={setFont}
    >
      <ALargeSmall size={24} />
    </SettingSlot>
  )
}
