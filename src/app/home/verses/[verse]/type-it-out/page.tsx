export const dynamic = 'auto'

import TypeItOut from './(type-it-out)/type-it-out'
import { Brain } from 'lucide-react'
import { getVerseById } from 'src/server/routers/verse'

export default async function GamePage(props: { params: Promise<{ verse: string }> }) {
  const params = await props.params
  const verseResult = await getVerseById(params.verse)

  return (
    <div className='w-full min-h-[94%] flex flex-col items-center'>
      <div className='w-[95%] md:w-[70%] lg:w-[55%] h-full flex flex-col items-center gap-6 my-8'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center'>
            <Brain size={32} />
            <h1 className='ml-4'>Memorization</h1>
          </div>
        </div>
        <hr className='w-full bg-darkGrey h-[2px]' />
        {verseResult.hasValue ? <TypeItOut verse={verseResult.value} /> : <>verse not found</>}
      </div>
    </div>
  )
}
