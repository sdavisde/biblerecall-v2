import { Button } from '@components/ui/button'
import { ConditionalLink } from '@components/ui/conditional-link'
import { api } from '@lib/trpc/server'
import { Verses } from '@util/verses'
import { AudioLines, ChevronLeft, Keyboard, Puzzle } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type VersePageProps = {
  params: Promise<{
    verse: string
  }>
}

export default async function VersePage(props: VersePageProps) {
  const params = await props.params

  const { verse: id } = params

  const verse = await api.verse.byId(id)

  if (!verse.hasValue) {
    return notFound()
  }
  const completions = verse.value.completions

  return (
    <>
      <h1 className='relative'>{Verses.stringifyReference(verse.value)}</h1>
      <h3>Practiced {completions} times</h3>
      <div className='flex flex-col lg:grid lg:grid-cols-3 w-full gap-2'>
        <Link
          href={`/home/verses/${id}/read`}
          className='flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 outline-none'
        >
          <AudioLines className='h-6 w-6' />
          <div className='mb-2 mt-4 text-lg font-medium'>Spoken Word</div>
          <span className='text-sm leading-tight text-muted-foreground'>
            Read portions of this verse bit-by-bit, to increase retention and understanding. Focus on moving slowly, and
            thinking about what this verse tells you about the character of God.
          </span>
        </Link>
        <Link
          href={`/home/verses/${id}/type-it-out`}
          className='flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 outline-none'
        >
          <Keyboard className='h-6 w-6' />
          <div className='mb-2 mt-4 text-lg font-medium'>Type it out</div>
          <span className='text-sm leading-tight text-muted-foreground'>
            Type out the <b>first letter</b> of each word to this verse, as a way to help you fast-track your
            memorization process!
          </span>
          <span className='text-sm leading-tight text-muted-foreground'>
            Must score above a 90%, then the levels get harder.
          </span>
        </Link>
        <ConditionalLink
          href={null}
          className='flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 outline-none opacity-50 pointer-events-none'
        >
          <Puzzle className='h-6 w-6' />
          <div className='mb-2 mt-4 text-lg font-medium'>Puzzle Pieces (coming soon)</div>
          <span className='text-sm leading-tight text-muted-foreground'>
            Can you rearrange the scrambled-up words of this verse back into the correct order?
          </span>
          <span className='text-sm leading-tight text-muted-foreground'>
            Try to say the verse aloud as you drag the pieces into place.
          </span>
        </ConditionalLink>
      </div>
      <div className='centered w-full gap-2 mt-4'>
        <Link
          href='/home/verses'
          className='w-1/2 centered'
        >
          <Button
            variant='ghost'
            className='flex gap-2'
          >
            <ChevronLeft />
            Go back
          </Button>
        </Link>
        {/* <Button
          variant='outline'
          className='w-1/2'
        >
          Delete
        </Button> */}
      </div>
    </>
  )
}
