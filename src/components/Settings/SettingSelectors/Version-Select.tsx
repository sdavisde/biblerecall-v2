'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { Version } from '@configuration/settings'
import { useSettings } from 'src/hooks/use-settings'
import { useEffect, useState } from 'react'

export const VersionSelect = () => {
  const [settings, setSettings] = useSettings()
  const [version, setVersion] = useState<Version>(settings?.defaultVersion ?? Version.ESV)

  // Update user preferences when selected font changes
  useEffect(() => {
    if (settings && version !== settings.defaultVersion) {
      setSettings({ ...settings, defaultVersion: version })
    }
  }, [version])

  return (
    <Select
      value={version}
      onValueChange={(value: Version) => setVersion(value)}
    >
      <SelectTrigger
        className='w-fit !outline-none !border-0 !ring-0 underline'
        showIcon={false}
      >
        <SelectValue placeholder='Version' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Versions</SelectLabel>
          {Object.entries(Version).map(([key, value]) => (
            <SelectItem
              key={value}
              value={value}
            >
              {key}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
