import ForwardIcon from '@mui/icons-material/Forward'
import ReplayIcon from '@mui/icons-material/Replay'
import HouseIcon from '@mui/icons-material/House'
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
    <div className='w-full h-full centered flex-col gap-8'>
      <h1 className={`font-base text-lg ${finishedHardMode ? 'text-xl text-darkGreen' : ''}`}>
        Well done completing that verse!
      </h1>
      <div className='flex flex-col gap-4 text-center'>
        {nextDifficulty <= 2 && (
          <Button>
            <Link
              href={`/home/${verse}?diff=${nextDifficulty}`}
              className='w-40 h-12 centered cursor-pointer mx-2'
            >
              <h3 className='w-32 text-center'>Continue</h3> <ForwardIcon className='w-12 scale-150' />
            </Link>
          </Button>
        )}
        <Button>
          <Link
            href={`/home/${verse}?diff=${difficulty}`}
            className='w-40 h-12 centered cursor-pointer mx-2'
          >
            <h3 className='w-32 text-center'>Retry</h3> <ReplayIcon className='w-12 scale-150' />
          </Link>
        </Button>
        <Button>
          <Link
            href={`/home`}
            className='w-40 h-12 centered cursor-pointer mx-2'
          >
            <h3 className='w-32 text-center'>Home</h3> <HouseIcon className='w-12 scale-150' />
          </Link>
        </Button>
      </div>
    </div>
  )
}
