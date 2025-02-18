import Form from 'next/form'
import { Input } from '@components/ui/input'
import { SearchIcon } from 'lucide-react'
import { Label } from '@components/ui/label'

export function Searchbar() {
  return (
    <div className='flex flex-col w-full max-w-md pt-16 pb-8 mx-auto stretch'>
      <Form
        action='/x/discover'
        className='centered flex-col gap-2'
      >
        <div className='flex items-center w-full max-w-sm space-x-2 rounded-lg border border-foreground bg-background px-3.5 py-2'>
          <SearchIcon className='h-4 w-4' />
          <Input
            type='search'
            name='query'
            placeholder='What does the bible say about ...'
            className='w-full border-0 h-8 font-semibold focus-visible:ring-0 border-none'
          />
        </div>
        <Label htmlFor='query'>Search for verses around biblical truths</Label>
      </Form>
    </div>
  )
}
