import { Bible } from '@util/verses'
import { z } from 'zod'

export enum Testament {
  OLD = 'old',
  NEW = 'new',
}

/**
 * Full details for a verse in bible recall's system
 */
// export type Verse = VerseReference & VerseMetadata

export type Book = {
  id: number
  name: string
  testament: Testament
}

export type BookNames = (typeof Bible.books)[number]['name']
export type VerseReferenceString = `${string} ${number}:${number}` | `${string} ${number}:${number}${string}`

/**
 * Details of a reference for a verse (the location inside the bible this verse resides)
 */
export type VerseReference = z.infer<typeof verseReferenceSchema>
export const verseReferenceSchema = z.object({
  book: z.object({
    id: z.number(),
    name: z.string(),
    testament: z.nativeEnum(Testament),
  }),
  chapter: z.number(),
  start: z.number(),
  end: z.number(),
})

/**
 * Metadata related to a verse, used for display purposes
 */
export type VerseMetadata = z.infer<typeof verseMetadataSchema>
export const verseMetadataSchema = z.object({
  id: z.string(),
  text: z.string(),
  favorite: z.boolean(),
  version: z.string(),
  createdDate: z.date(),
  completions: z.number().min(0),
  notes: z.string().max(256).nullable(),
})

export type Verse = z.infer<typeof verseSchema>
export const verseSchema = z.object({
  ...verseReferenceSchema.shape,
  ...verseMetadataSchema.shape,
})
