import ForwardIcon from '@mui/icons-material/Forward'
import ReplayIcon from '@mui/icons-material/Replay'
import HouseIcon from '@mui/icons-material/House'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'

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

  return (
    <div className='w-full h-full centered flex-col gap-8'>
      <h1 className='font-semibold'>Well done completing that verse!</h1>
      <div className='flex flex-col gap-4 text-center'>
        {nextDifficulty <= 2 && (
          <Link
            href={`/home/${verse}?diff=${nextDifficulty}`}
            className='w-40 centered cursor-pointer'
          >
            <h3 className='w-32 text-center'>Continue</h3> <ForwardIcon className='w-8 scale-150' />
          </Link>
        )}
        <Link
          href={`/home/${verse}`}
          className='w-40 centered cursor-pointer'
        >
          <h3 className='w-32 text-center'>Retry</h3> <ReplayIcon className='w-8 scale-150' />
        </Link>
        <Link
          href={`/home`}
          className='w-40 centered cursor-pointer'
        >
          <h3 className='w-32 text-center'>Home</h3> <HouseIcon className='w-8 scale-150' />
        </Link>
      </div>
    </div>
  )
}
