export const dynamic = 'auto'

import LottieImage from '@components/icons/Lottie'
import bookAnimation from '@assets/lottie/lordicon_book.json'
import TypeItOut from './(type-it-out)/type-it-out'
import { getVerse } from '@lib/verses'

export default async function GamePage({ params }: { params: { verse: string } }) {
  const verse = await getVerse(params.verse)
  // get search params to view selected difficulty

  return (
    <div className='w-full min-h-[94%] flex flex-col items-center'>
      <div className='w-[95%] md:w-[70%] lg:w-[55%] h-full flex flex-col items-center gap-6 my-6'>
        <div className='w-full h-12 flex ml-6'>
          <LottieImage
            data={bookAnimation}
            className='w-10 centered'
          />
          <h4 className='text-base centered ml-4'>Memorization</h4>
        </div>
        <hr className='w-full bg-darkGrey h-[2px]' />
        {verse ? <TypeItOut verse={verse} /> : <>verse not found</>}
      </div>
    </div>
  )
}
