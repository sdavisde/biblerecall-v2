'use client'

import { useEffect, useRef, useState } from 'react'
import { useSettings } from 'hooks/settings'
import { setThemeInDocument } from './Settings'

type Theme = 'light' | 'dark' | 'system'

export default function Theme() {
  const [settings, setSettings] = useSettings()
  const [colorTheme, setColorTheme] = useState<Theme>(settings?.theme ?? 'system')
  const ref = useRef<HTMLFormElement>(null)

  // Update settings when color theme changes
  useEffect(() => {
    if (settings && colorTheme !== settings?.theme) {
      setSettings({ ...settings, theme: colorTheme })
    }
  }, [colorTheme])

  // Update selected color theme when settings changes
  useEffect(() => {
    setThemeInDocument(settings?.theme)
  }, [settings?.theme])

  return (
    <form
      className='h-10 my-5'
      ref={ref}
    >
      <label className='text-md font-semibold flex flex-col mb-2'>Color Theme</label>
      <select
        value={colorTheme}
        className='w-32 h-8 text-black dark:text-white dark:bg-coal rounded px-2 py-1'
        onChange={(e) => {
          setColorTheme(e.target.value as Theme)
        }}
      >
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
        <option value='system'>System</option>
      </select>
    </form>
  )
}
