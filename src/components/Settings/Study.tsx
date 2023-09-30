'use client'

import { useSettings } from 'hooks/settings'
import { useEffect, useRef, useState } from 'react'
import { Visibility } from './Provider'

export default function Study() {
  const [settings, setSettings] = useSettings()
  const [visibility, setVisibility] = useState<Visibility>('full')
  const ref = useRef<HTMLFormElement>(null)

  // Update settings when visibility changes
  useEffect(() => {
    if (settings && visibility !== settings.visibility) {
      setSettings({ ...settings, visibility })
    }
  }, [visibility])

  return (
    <form
      className='h-16 my-5 flex flex-col'
      ref={ref}
    >
      <label className='text-md font-semibold mb-2'>Verse Visibility</label>
      <select
        id='study-mode-select'
        value={visibility}
        className='w-32 h-8 text-black font-medium dark:text-white dark:bg-darkerGrey rounded px-2'
        onChange={(e) => setVisibility(e.target.value as Visibility)}
      >
        <option value={0}>Full</option>
        <option value={1}>Partial</option>
        <option value={2}>None</option>
      </select>
    </form>
  )
}
