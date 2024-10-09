import { Bible } from '@util/bible'
import { z } from 'zod'

export enum Testament {
  OLD = 'old',
  NEW = 'new',
}

/**
 * Full details for a verse in bible recall's system
 */
export type Verse = VerseReference & VerseMetadata

/**
 * Metadata related to a verse, used for display purposes
 */
export type VerseMetadata = {
  id: string
  text: string
  version: string
  favorite: boolean
}

/**
 * Details of a reference for a verse (the location inside the bible this verse resides)
 */
export type VerseReference = {
  book: {
    id: number
    name: string
    testament: Testament
  }
  chapter: number
  start: number
  end: number | null
}

export type BookNames = (typeof Bible.books)[number]['name']
export type VerseReferenceString = `${string} ${number}:${number}` | `${string} ${number}:${number}${string}`

export const verseSchema = z.object({
  id: z.string(),
  book: z.object({
    id: z.number(),
    name: z.string(),
    testament: z.nativeEnum(Testament).nullable(),
  }),
  chapter: z.number(),
  start: z.number(),
  end: z.number().nullable(),
  text: z.string(),
  version: z.string(),
  favorite: z.boolean(),
})
