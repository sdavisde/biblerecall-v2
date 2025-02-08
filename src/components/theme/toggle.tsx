'use client'

import { Switch } from '@components/ui/switch'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Switch
      checked={resolvedTheme === 'dark'}
      onCheckedChange={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    />
  )
}
