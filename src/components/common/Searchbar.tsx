'use client'

import { Input } from '@components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@components/ui/label'

export function Searchbar() {
  const [query, setQuery] = useState<string>('')
  const router = useRouter()

  return (
    <div className='flex flex-col w-full max-w-md pt-16 pb-8 mx-auto stretch'>
      <form
        className='centered flex-col gap-2'
        onSubmit={(e) => {
          router.push(`/home/discover?query=${query}`)
          e.preventDefault()
        }}
      >
        <div className='flex items-center w-full max-w-sm space-x-2 rounded-lg border border-foreground bg-background px-3.5 py-2'>
          <SearchIcon className='h-4 w-4' />
          <Input
            type='search'
            placeholder='What does the bible say about ...'
            className='w-full border-0 h-8 font-semibold focus-visible:ring-0 border-none'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Label>Search for verses around biblical truths</Label>
      </form>
    </div>
  )
}
