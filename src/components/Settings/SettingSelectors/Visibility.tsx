'use client'

import { useSettings } from 'src/hooks/use-settings'
import { useEffect, useState } from 'react'
import { Visibility } from '@configuration/settings'
import { SettingSlot } from '../SettingSlot'
import { EyeOff } from 'lucide-react'

export function VisibilitySelect() {
  const [settings, setSettings] = useSettings()
  const [visibility, setVisibility] = useState<Visibility>(settings?.visibility ?? Visibility.Full)

  // Update settings when visibility changes
  useEffect(() => {
    if (settings && visibility !== settings.visibility) {
      setSettings({ ...settings, visibility })
    }
  }, [visibility])

  return (
    <SettingSlot
      title='Verse Visibility'
      description='The difficulty level when viewing verses on your verse page'
      options={Object.entries(Visibility).map(([label, value]) => ({
        label,
        value,
      }))}
      selectedValue={visibility}
      setter={setVisibility}
    >
      <EyeOff size={24} />
    </SettingSlot>
  )
}
