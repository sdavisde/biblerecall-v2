'use client'

import { useSettings } from 'hooks/use-settings'
import { useEffect, useState } from 'react'
import { Visibility } from '@configuration/settings'
import { capitalize } from 'util/string'
import { SettingSlot } from '../SettingSlot'

export default function VisibilitySelect() {
  const [settings, setSettings] = useSettings()
  const [visibility, setVisibility] = useState<Visibility>(settings?.visibility ?? Visibility.FULL)

  // Update settings when visibility changes
  useEffect(() => {
    if (settings && visibility !== settings.visibility) {
      setSettings({ ...settings, visibility })
    }
  }, [visibility])

  const updateVisibility = (visibilityValue: string) => {
    setVisibility(visibilityValue as Visibility)
  }

  return (
    <SettingSlot
      label='Visibility'
      options={(Object.keys(Visibility) as Array<keyof typeof Visibility>).map((key) => ({
        label: capitalize(Visibility[key]),
        value: Visibility[key],
      }))}
      selectedValue={visibility}
      setter={updateVisibility}
    />
  )
}
