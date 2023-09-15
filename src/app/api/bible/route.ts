import { NextRequest, NextResponse } from 'next/server'
import { Api_Verse, createVerse } from '@lib/util'

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get('reference') ?? ''
  const version = request.nextUrl.searchParams.get('version') ?? 'ESV'

  const { verseText, verseReference } = await fetch(
    `${process.env.API_URL}/bible?reference=${reference}&version=${version}`
  ).then((res) => res.json())

  return NextResponse.json({ verseText, verseReference })
}
