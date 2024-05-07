import { z } from 'zod'

export type Verse = {
  id: string
  book: {
    id: number
    name: string
    testament?: string
  }
  chapter: number
  start: number
  end?: number
  text: string
  version: string
  favorite?: boolean
}
export const verseSchema = z.object({
  id: z.string(),
  book: z.object({
    id: z.number(),
    name: z.string(),
    testament: z.string().optional(),
  }),
  chapter: z.number(),
  start: z.number(),
  end: z.number().optional(),
  text: z.string(),
  version: z.string(),
  favorite: z.boolean().optional(),
})
