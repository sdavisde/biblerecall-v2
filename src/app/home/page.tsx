export const dynamic = 'auto'

import LottieImage from '@components/Lottie'
import bookAnimation from '@assets/lottie/lordicon_book.json'
import Loginbox from '@components/Loginbox'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@lib/auth'
import AddVerse from '@components/AddVerse'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className='w-full h-[94%] flex flex-col items-center'>
      <div className='w-[95%] h-full flex flex-col items-center gap-6 mt-6'>
        <div className='w-full h-12 flex ml-6'>
          <LottieImage
            data={bookAnimation}
            className='w-10 centered'
          />
          <h4 className='text-base centered ml-4'>My Verses</h4>
        </div>
        <hr className='w-full bg-darkGrey h-[2px]' />
        <Loginbox loggedIn={session !== null} />
        <AddVerse />
      </div>
    </div>
  )
}
