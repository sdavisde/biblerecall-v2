'use client'

import { useSettings } from 'hooks/use-settings'
import { useEffect, useState } from 'react'
import { Visibility } from '@configuration/settings'
import { SettingSlot } from '../SettingSlot'
import { FaEyeLowVision } from 'react-icons/fa6'

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
      options={Object.entries(Visibility).map(([label, value]) => ({
        label,
        value,
      }))}
      selectedValue={visibility}
      setter={setVisibility}
    >
      <FaEyeLowVision />
    </SettingSlot>
  )
}
