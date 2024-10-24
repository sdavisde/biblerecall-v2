import { Button } from '@components/ui/button'
import { Progress } from '@components/ui/progress'
import { RotateCcw } from 'lucide-react'
import { House } from 'lucide-react'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'

type FailedPageProps = {
  params: {
    verse: string
  }
  searchParams: ParsedUrlQuery
}

export default function FailedPage({ params, searchParams }: FailedPageProps) {
  const verse = params.verse
  const difficulty = searchParams?.diff
  const percentCorrect = typeof searchParams?.percent === 'string' ? parseFloat(searchParams.percent) : 0

  return (
    <div className='w-full h-full centered flex-col gap-8'>
      <h1 className='text-center text-xl font-light'>
        Oops! <br />
        <p className='text-md'>
          {percentCorrect && <>You got {percentCorrect}% of that verse correct.</>}
          <br /> Achieve 90% accuracy or higher to move onto the next level.
        </p>
      </h1>
      <Progress value={percentCorrect} />
      <div className='flex flex-col gap-4 text-center w-1/2'>
        <Link
          href={`/home/verses/${verse}/type-it-out?diff=${difficulty}`}
          className='cursor-pointer mx-2'
        >
          <Button className='text-base gap-2 w-full'>
            Retry <RotateCcw />
          </Button>
        </Link>
        <Link
          href='/home/verses'
          className='cursor-pointer mx-2'
        >
          <Button
            variant='outline'
            className='text-base gap-2 w-full'
          >
            Home <House />
          </Button>
        </Link>
      </div>
    </div>
  )
}
