import { Button } from '@components/ui/button'
import { api } from '@lib/trpc/server'
import { Verses } from '@util/verses'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type VersePageProps = {
  params: {
    verse: string
  }
}

export default async function VersePage({ params: { verse: id } }: VersePageProps) {
  const verse = await api.verse.byId(id)

  if (!verse.hasValue) {
    return notFound()
  }

  return (
    <main className=''>
      <h1>{Verses.stringifyReference(verse.value)}</h1>
      <Link href={`/home/verses/${id}/type-it-out`}>
        <Button>Go to game</Button>
      </Link>
    </main>
  )
}
