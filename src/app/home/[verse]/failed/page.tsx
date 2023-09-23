import Button from '@components/common/button'
import ReplayIcon from '@mui/icons-material/Replay'
import HouseIcon from '@mui/icons-material/House'
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

  return (
    <div className='w-full h-full centered flex-col gap-8'>
      <h1 className='text-center text-xl font-light'>
        Oops! <br /> <p className='text-md'>Looks like you just missed the cut. Try again?</p>
      </h1>
      <div className='flex flex-col gap-4 text-center'>
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
