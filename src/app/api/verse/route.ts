import { NextRequest, NextResponse } from 'next/server'
import { VerseDto, books, createVerse } from './util'

export async function GET(request: NextRequest) {
  const verseReference = request.nextUrl.searchParams.get('reference') ?? ''
  const version = request.nextUrl.searchParams.get('version') ?? 'ESV'

  const verse = createVerse(verseReference, '', version)

  if (!verse) {
    return NextResponse.json({ error: 'Verse was not valid' })
  }

  const bookId = books.find((book) => book.name === verse.book)?.id ?? '1' // using genesis as a null safe default

  // Fetch is cached via the framework so this only refetches when url changes
  const url = `https://bible-go-api.rkeplin.com/v1/books/${bookId}/chapters/${verse.chapter}`
  const data = await fetch(url)

  if (!data) {
    return NextResponse.json({ error: 'Verses not found in chapter' })
  }

  const verses = (await data.json()) as VerseDto[]

  const verseText =
    verses.find((v) => v.verseId.toString() === verse.verse)?.verse ?? 'Verse text not found'

  return NextResponse.json({ verseText })
}
