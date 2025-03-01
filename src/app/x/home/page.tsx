export const dynamic = 'auto'

import { PageSelector } from '@components/common/PageSelector'
import { Searchbar } from '@components/common/Searchbar'
import { BookOpenCheck, Settings } from 'lucide-react'

export default async function Home() {
  return (
    <div
      id='panel'
      className='w-full p-4 min-h-[92%] flex flex-col items-center gap-4'
    >
      <h1>Bible Recall</h1>
      <Searchbar />
      <PageSelector
        text='Memorize your saved verses'
        href='/x/verses'
        Icon={BookOpenCheck}
      />
      <PageSelector
        text='Settings'
        href='/x/profile'
        Icon={Settings}
        variant='outline'
      />
    </div>
  )
}
