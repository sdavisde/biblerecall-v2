export const dynamic = 'auto'

import AddVerse from '@components/verse/AddVerse'
import VerseList from '@components/verse/VerseList'
import BookIcon from '@components/icons/BookIcon'
import VersesProvider from '@components/providers/VersesProvider'
import { api } from '@lib/trpc/server'

export default async function Verses() {
  const versesResult = await api.verse.allByUser()

  return (
    <VersesProvider verses={versesResult.hasValue ? versesResult.value : null}>
      <div className='w-full flex items-center ml-6'>
        <BookIcon className='w-10 fill-white' />
        <h1 className='ml-4'>My Verses</h1>
      </div>
      <hr className='w-full bg-darkGrey h-[2px]' />
      <AddVerse />
      <VerseList />
    </VersesProvider>
  )
}
