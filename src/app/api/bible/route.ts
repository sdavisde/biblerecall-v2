import { NextRequest, NextResponse } from 'next/server'
import { Api_Verse, createVerse } from '@lib/util'

export async function GET(request: NextRequest) {
  const verseReference = request.nextUrl.searchParams.get('reference') ?? ''
  const version = request.nextUrl.searchParams.get('version') ?? 'ESV'

  const verse = createVerse(verseReference, { version })

  if (!verse) {
    return NextResponse.json({ error: 'Verse was not valid' })
  }

  // Fetch is cached via the framework so this only refetches when url changes
  const url = `https://bible-go-api.rkeplin.com/v1/books/${verse.book.id}/chapters/${verse.chapter}?translation=${version}`
  const data = await fetch(url)

  if (!data) {
    return NextResponse.json({ error: 'Verses not found in chapter' })
  }

  const verses = (await data.json()) as Api_Verse[]

  const startIndex = verses.findIndex((v) => v.verseId === verse.start)
  const end = verses.findIndex((v) => v.verseId === verse.end)

  const endIndex = end >= 0 ? end : startIndex

  const verseText =
    verses
      .slice(startIndex, endIndex + 1)
      .map((v) => v.verse)
      .join(' ') ?? 'Verse text not found'

  return NextResponse.json({ verseText })
}
