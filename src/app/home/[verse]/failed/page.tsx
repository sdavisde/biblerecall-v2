import Button from '@components/common/button'
import { MdOutlineReplay } from 'react-icons/md'
import { BsFillHouseFill } from 'react-icons/bs'
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
  const percentCorrect = searchParams?.percent

  return (
    <div className='w-full h-full centered flex-col gap-8'>
      <h1 className='text-center text-xl font-light'>
        Oops! <br />{' '}
        <p className='text-md'>
          {percentCorrect && <>You got {percentCorrect}% of that verse correct.</>}
          <br /> Achieve 90% accuracy or higher to move onto the next level.
        </p>
      </h1>
      <div className='flex flex-col gap-4 text-center'>
        <Button>
          <Link
            href={`/home/${verse}?diff=${difficulty}`}
            className='w-40 h-12 centered cursor-pointer mx-2'
          >
            <h3 className='w-32 text-center'>Retry</h3> <MdOutlineReplay className='w-12 scale-150' />
          </Link>
        </Button>
        <Button>
          <Link
            href={`/home`}
            className='w-40 h-12 centered cursor-pointer mx-2'
          >
            <h3 className='w-32 text-center'>Home</h3> <BsFillHouseFill className='w-12 scale-150' />
          </Link>
        </Button>
      </div>
    </div>
  )
}
