import { BackLink } from '@components/common/BackLink'
import { Button } from '@components/ui/button'
import { api } from '@lib/trpc/server'
import { Verses } from '@util/verses'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type VersePageProps = {
  params: {
    verse: string
  }
}

export default async function VersePage({ params: { verse: id } }: VersePageProps) {
  const verse = await api.verse.byId(id)
  const completions = 0 // verse.completions

  if (!verse.hasValue) {
    return notFound()
  }

  return (
    <>
      <h1 className='relative'>
        {Verses.stringifyReference(verse.value)}
        <Link href='/home/verses'>
          <ChevronLeft className='absolute -left-16 top-2' />
        </Link>
      </h1>
      <h3>Practiced {completions} times</h3>
      <div className='centered flex-col w-full gap-2'>
        <Link
          href={`/home/verses/${id}/read`}
          className='w-full'
        >
          <Button
            variant='secondary'
            className='w-full justify-between'
          >
            Read
            <ChevronRight />
          </Button>
        </Link>
        <Button
          variant='secondary'
          className='w-full justify-between'
          disabled
        >
          Puzzle Pieces (coming soon)
        </Button>
        <Link
          href={`/home/verses/${id}/type-it-out`}
          className='w-full'
        >
          <Button
            variant='secondary'
            className='w-full justify-between'
          >
            Type it out
            <ChevronRight />
          </Button>
        </Link>
      </div>
      <div className='centered flex-col w-full gap-2'>
        <Button
          variant='outline'
          className='w-full'
        >
          Delete
        </Button>
      </div>
    </>
  )
}
