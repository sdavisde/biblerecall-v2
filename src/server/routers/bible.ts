'use server'

import { ErrorCode } from '@util/error'
import { Lodash } from '@util/lodash'
import { Result } from '@util/result'
import { z } from 'zod'
import { BIBLE_BOOKS_SKELETON } from '@util/bible'
import { verseReferenceSchema } from 'src/service/verse/types'

export type KeplinVerse = {
  id: number
  book: {
    id: number
    name: string
    testament: string
  }
  verseId: number
  verse: string // verse text
}

export type KeplinVersion = {
  id: number
  table: string
  language: string
  abbreviation: string
  version: string
  infoUrl: string
}

const verseRequestSchema = z.object({ reference: verseReferenceSchema.nullable(), version: z.string() })
type VerseRequest = z.infer<typeof verseRequestSchema>

/**
 * Bible-focused actions
 */

export async function getVerse({ reference, version }: VerseRequest) {
  if (Lodash.isNil(reference)) {
    return Result.failure({ code: 'get-verse:reference-missing' })
  }

  // Fetch is cached via the framework so this only refetches when url changes
  const url = `https://bible-go-api.rkeplin.com/v1/books/${reference.book.id}/chapters/${reference.chapter}?translation=${version}`
  const data = await fetch(url, { cache: 'force-cache', next: { revalidate: false } })

  if (Lodash.isNil(data)) {
    return Result.failure({ code: ErrorCode.FAILED_TO_FETCH, message: 'Failed to fetch' })
  }

  const fetchedVerses = (await data.json()) as KeplinVerse[]

  const startIndex = fetchedVerses.findIndex((v) => v.verseId === reference.start)
  const end = fetchedVerses.findIndex((v) => v.verseId === reference.end)

  const endIndex = end >= 0 ? end : startIndex

  const verseText =
    fetchedVerses
      .slice(startIndex, endIndex + 1)
      .map((v) => v.verse)
      .join(' ') ?? 'Verse text not found'

  return Result.success({ verseText, verseReference: reference })
}

export async function getVersions() {
  const data = await fetch('https://bible-go-api.rkeplin.com/v1/translations', {
    cache: 'force-cache',
    next: { revalidate: false },
  })
  const versions = (await data.json()) as KeplinVersion[]

  const preferredSort = ['ESV', 'NIV', 'NLT', 'KJV']
  versions.sort((a, b) => {
    const a_index = preferredSort.indexOf(a.abbreviation)
    const b_index = preferredSort.indexOf(b.abbreviation)

    if (a_index === -1 && b_index >= 0) {
      return 1
    }
    if (a_index >= 0 && b_index === -1) {
      return -1
    }
    if (a_index === -1 && b_index === -1) {
      return 0
    }
    return a_index - b_index
  })

  return Result.success(versions)
}

export async function getSkeleton() {
  return Object.fromEntries(BIBLE_BOOKS_SKELETON.map((book) => [book.name, book]))
}
