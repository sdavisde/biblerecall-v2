import { Button } from '@components/ui/button'
import { ArrowRight } from 'lucide-react'
import { RotateCcw } from 'lucide-react'
import { House } from 'lucide-react'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'

type SuccessPageProps = {
  params: Promise<{
    verse: string
  }>
  searchParams: Promise<ParsedUrlQuery>
}

export default async function SuccessPage(props: SuccessPageProps) {
  const searchParams = await props.searchParams
  const params = await props.params
  const verse = params.verse
  const difficulty = searchParams?.diff
  const nextDifficulty = difficulty ? parseInt(difficulty as string) + 1 : 3

  const finishedHardMode = difficulty && parseInt(difficulty as string) <= 2

  return (
    <div className='w-full min-h-full centered flex-col gap-8'>
      <h1 className={`font-base text-lg text-center ${finishedHardMode ? 'text-xl text-darkGreen' : ''}`}>
        Well done completing that verse!
      </h1>
      <div className='flex flex-col gap-4 text-center w-1/2'>
        {nextDifficulty <= 2 && (
          <Link
            href={`/home/verses/${verse}/type-it-out?diff=${nextDifficulty}`}
            className='cursor-pointer mx-2'
          >
            <Button
              size='lg'
              className='text-base gap-2 w-full'
            >
              Continue
              <ArrowRight />
            </Button>
          </Link>
        )}
        <Link
          href={`/home/verses/${verse}/type-it-out?diff=${difficulty}`}
          className='cursor-pointer mx-2'
        >
          <Button
            variant='secondary'
            size='lg'
            className='text-base gap-2 w-full'
          >
            Retry <RotateCcw />
          </Button>
        </Link>
        <Link
          href='/home/verses'
          className='cursor-pointer mx-2'
        >
          <Button
            variant='outline'
            size='lg'
            className='text-base gap-2 w-full'
          >
            Home <House />
          </Button>
        </Link>
      </div>
    </div>
  )
}
