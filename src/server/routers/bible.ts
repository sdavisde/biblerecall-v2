import { Verses } from '@util/bible'
import { ErrorCode } from '@util/error'
import { Lodash } from '@util/lodash'
import { Result } from '@util/result'
import { publicProcedure, router } from 'server/trpc'
import { z } from 'zod'

export type Api_Verse = {
  id: number
  book: {
    id: number
    name: string
    testament: string
  }
  verseId: number
  verse: string // verse text
}

export type API_Version = {
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

      const verse = Verses.createVerse(reference, { version })

      if (Lodash.isNil(verse)) {
        return Result.failure({ code: ErrorCode.INVALID_VERSE, message: 'Verse was not valid' })
      }

      // Fetch is cached via the framework so this only refetches when url changes
      const url = `https://bible-go-api.rkeplin.com/v1/books/${verse.book.id}/chapters/${verse.chapter}?translation=${version}`
      const data = await fetch(url)

      if (Lodash.isNil(data)) {
        return Result.failure({ code: ErrorCode.FAILED_TO_FETCH, message: 'Failed to fetch' })
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

      return Result.success({ verseText, verseReference: reference })
    }),
  getVersions: publicProcedure.query(async () => {
    const data = await fetch('https://bible-go-api.rkeplin.com/v1/translations', {})

    const versions = (await data.json()) as API_Version[]

    const sortingArr = ['ESV', 'NIV', 'NLT', 'KJV']

    versions.sort((a, b) => {
      const a_index = sortingArr.indexOf(a.abbreviation)
      const b_index = sortingArr.indexOf(b.abbreviation)

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
})
