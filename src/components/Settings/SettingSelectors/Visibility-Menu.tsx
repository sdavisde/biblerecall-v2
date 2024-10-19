'use client'

import { useSettings } from 'hooks/use-settings'
import { useEffect, useMemo, useState } from 'react'
import { Visibility } from '@configuration/settings'
import { Eye, EyeOff } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu'
import { EyeClosed } from '@components/icons/EyeClosed'

export function VisibilityMenu() {
  const [settings, setSettings] = useSettings()
  const [visibility, setVisibility] = useState<Visibility>(settings?.visibility ?? Visibility.Full)
  const options = useMemo(
    () =>
      Object.entries(Visibility).map(([label, value]) => ({
        label,
        value,
      })),
    []
  )

  // Update settings when visibility changes
  useEffect(() => {
    console.log('visibility change', visibility)
    if (settings && visibility !== settings.visibility) {
      setSettings({ ...settings, visibility })
    }
  }, [visibility])
  console.log(settings)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {visibility === Visibility.Full ? <Eye /> : visibility === Visibility.Partial ? <EyeOff /> : <EyeClosed />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setVisibility(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
