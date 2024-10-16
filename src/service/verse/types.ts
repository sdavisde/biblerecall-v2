import { Bible } from '@util/verses'
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
  favorite: boolean
  version: string
  createdDate: Date
}

/**
 * Details of a reference for a verse (the location inside the bible this verse resides)
 */
export type VerseReference = {
  book: Book
  chapter: number
  start: number
  end: number | null
}

export type Book = {
  id: number
  name: string
  testament: Testament
}

export type BookNames = (typeof Bible.books)[number]['name']
export type VerseReferenceString = `${string} ${number}:${number}` | `${string} ${number}:${number}${string}`

export const verseReferenceSchema = z.object({
  book: z.object({
    id: z.number(),
    name: z.string(),
    testament: z.nativeEnum(Testament),
  }),
  chapter: z.number(),
  start: z.number(),
  end: z.number().nullable(),
})

export const verseSchema = z.object({
  ...verseReferenceSchema.shape,
  id: z.string(),
  text: z.string(),
  favorite: z.boolean(),
  version: z.string(),
  createdDate: z.date(),
})
