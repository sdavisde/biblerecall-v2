import { Verses } from '@util/verses'
import { ErrorCode } from '@util/error'
import { Lodash } from '@util/lodash'
import { Result } from '@util/result'
import { publicProcedure, router } from 'server/trpc'
import { z } from 'zod'
import { BIBLE_BOOKS_SKELETON } from '@util/bible'

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

/**
 * Bible-focused API Routes
 *
 * Each query handles input validation and error handling.
 */

export const bibleRouter = router({
  getVerse: publicProcedure
    .input(z.object({ reference: z.string(), version: z.string() }))
    .query(async ({ ctx, input }) => {
      const { reference, version } = input

      const verseResult = Verses.createVerse(reference)

      if (!verseResult.hasValue) {
        return verseResult
      }

      const verse = verseResult.value
      // Fetch is cached via the framework so this only refetches when url changes
      const url = `https://bible-go-api.rkeplin.com/v1/books/${verse.book.id}/chapters/${verse.chapter}?translation=${version}`
      const data = await fetch(url)

      if (Lodash.isNil(data)) {
        return Result.failure({ code: ErrorCode.FAILED_TO_FETCH, message: 'Failed to fetch' })
      }

      const fetchedVerses = (await data.json()) as KeplinVerse[]

      const startIndex = fetchedVerses.findIndex((v) => v.verseId === verse.start)
      const end = fetchedVerses.findIndex((v) => v.verseId === verse.end)

      const endIndex = end >= 0 ? end : startIndex

      const verseText =
        fetchedVerses
          .slice(startIndex, endIndex + 1)
          .map((v) => v.verse)
          .join(' ') ?? 'Verse text not found'

      return Result.success({ verseText, verseReference: reference })
    }),
  getVersions: publicProcedure.query(async () => {
    const data = await fetch('https://bible-go-api.rkeplin.com/v1/translations', {})

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
  }),
  getSkeleton: publicProcedure.query(async () => {
    return Object.fromEntries(BIBLE_BOOKS_SKELETON.map((book) => [book.name, book]))
  }),
})
