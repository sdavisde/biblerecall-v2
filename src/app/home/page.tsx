export const dynamic = 'auto'

import Loginbox from '@components/Loginbox'
import AddVerse from '@components/verse/AddVerse'
import VerseList from '@components/verse/VerseList'
import BookIcon from '@components/icons/BookIcon'
import { api } from '@lib/trpc/server'

export default async function Home() {
  const user = await api.user.get()

  return (
    <div
      id='panel'
      className='w-full min-h-[92%] flex flex-col items-center'
    >
      <div className='w-[95%] md:w-[70%] lg:w-[55%] flex flex-col items-center gap-6 my-6'>
        {/* <h1 className='flag relative w-[80%] h-12 text-md centered drop-shadow bg-red scale-90 text-center px-4 mb-4'>
          This app is in beta testing, verses and functionality may break until release
        </h1> */}
        <div className='w-full flex items-center ml-6'>
          <BookIcon className='w-10 fill-white' />
          <h1 className='ml-4'>My Verses</h1>
        </div>
        <hr className='w-full bg-darkGrey h-[2px]' />
        {!user && <Loginbox />}
        <AddVerse />
        <VerseList />
      </div>
    </div>
  )
}
