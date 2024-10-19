export const dynamic = 'auto'

import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import { api } from '@lib/trpc/server'
import { Verses } from '@util/verses'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TapToRead } from './game'

export default async function ReadVersePage({ params }: { params: { verse: string } }) {
  const verseResult = await api.verse.byId(params.verse)

  if (!verseResult.hasValue) {
    return notFound()
  }

  return (
    <div className='w-full min-h-[94%] flex-1 flex flex-col items-center'>
      <div className='w-[95%] md:w-[70%] lg:w-[55%] h-full flex-1 flex flex-col items-center gap-4'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <h1 className=''>{Verses.stringifyReference(verseResult.value)}</h1>
            <Separator className='bg-darkGrey' />
          </div>
        </div>
        {verseResult.hasValue ? <TapToRead verse={verseResult.value} /> : <>Verse Not Found</>}
        <div className='w-full'>
          <Link href={`/home/verses/${verseResult.value.id}`}>
            <Button variant='link'>Go back</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
