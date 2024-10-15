import { ArrowRight } from 'lucide-react'
import { RotateCcw } from 'lucide-react'
import { House } from 'lucide-react'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import Button from '@components/common/button'

type SuccessPageProps = {
  params: {
    verse: string
  }
  searchParams: ParsedUrlQuery
}

export default function SuccessPage({ params, searchParams }: SuccessPageProps) {
  const verse = params.verse
  const difficulty = searchParams?.diff
  const nextDifficulty = difficulty ? parseInt(difficulty as string) + 1 : 3

  const finishedHardMode = difficulty && parseInt(difficulty as string) <= 2

  return (
    <div className='w-full min-h-full centered flex-col gap-8'>
      <h1 className={`font-base text-lg text-center ${finishedHardMode ? 'text-xl text-darkGreen' : ''}`}>
        Well done completing that verse!
      </h1>
      <div className='flex flex-col gap-4 text-center'>
        {nextDifficulty <= 2 && (
          <Button>
            <Link
              href={`/home/${verse}?diff=${nextDifficulty}`}
              className='w-40 h-12 centered cursor-pointer mx-2'
            >
              <h3 className='w-32 text-center'>Continue</h3> <ArrowRight className='w-12 scale-150' />
            </Link>
          </Button>
        )}
        <Button>
          <Link
            href={`/home/${verse}?diff=${difficulty}`}
            className='w-40 h-12 centered cursor-pointer mx-2'
          >
            <h3 className='w-32 text-center'>Retry</h3> <RotateCcw className='w-12 scale-150' />
          </Link>
        </Button>
        <Button>
          <Link
            href='/home/verses'
            className='w-40 h-12 centered cursor-pointer mx-2'
          >
            <h3 className='w-32 text-center'>Home</h3> <House className='w-12 scale-150' />
          </Link>
        </Button>
      </div>
    </div>
  )
}
