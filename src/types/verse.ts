import { z } from 'zod'

export enum Testament {
  OLD = 'old',
  NEW = 'new',
}

export type Verse = {
  id: string
  book: {
    id: number
    name: string
    testament: Testament | null
  }
  chapter: number
  start: number
  end: number | null
  text: string
  version: string
  favorite: boolean
}
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
