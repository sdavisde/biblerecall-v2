export const dynamic = 'auto'

import TypeItOut from './(type-it-out)/type-it-out'
import { getVerse } from '@lib/api'
import HouseIcon from '@mui/icons-material/House'
import BookIcon from '@components/icons/BookIcon'

export default async function GamePage({ params }: { params: { verse: string } }) {
  const verse = await getVerse(params.verse)

  return (
    <div className='w-full min-h-[94%] flex flex-col items-center'>
      <div className='w-[95%] md:w-[70%] lg:w-[55%] h-full flex flex-col items-center gap-6 my-6'>
        <div className='flex justify-between w-full'>
          <div className='h-12 flex ml-6'>
            <BookIcon className='w-10 fill-white' />
            <h4 className='text-base centered ml-4'>Memorization</h4>
          </div>
          <div className='h-12 centered'>
            <HouseIcon className='w-full h-full fill-white' />
          </div>
        </div>
        <hr className='w-full bg-darkGrey h-[2px]' />
        {verse ? <TypeItOut verse={verse} /> : <>verse not found</>}
      </div>
    </div>
  )
}
