'use client'

import { useRef, useState } from 'react'

export default function Study() {
  const [studyMode, setStudyMode] = useState('0')
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      className='h-16 my-5 flex flex-col'
      ref={ref}
    >
      <label className='text-md font-semibold mb-2'>Verse Visibility</label>
      <select
        id='study-mode-select'
        value={studyMode}
        className='w-32 h-8 text-black dark:text-white dark:bg-coal rounded px-2'
        onChange={(e) => setStudyMode(e.target.value)}
      >
        <option value={0}>Full</option>
        <option value={1}>Partial</option>
        <option value={2}>None</option>
      </select>
    </form>
  )
}
