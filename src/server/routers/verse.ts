import { publicProcedure, router } from 'src/server/trpc'
import { z } from 'zod'
import { Verse, verseSchema } from 'src/service/verse/types'
import { Result } from '@util/result'
import { Lodash } from '@util/lodash'
import { missingUser } from 'src/server'
import { createClient } from '@lib/supabase/server'
import { Tables } from 'database.types'
import { Bible } from '@util/verses'

/**
 * Verses API Routes
 *
 * Each query handles input validation and error handling.
 * The implementation is abstracted away in the database and cookies modules.
 */

export const versesRouter = router({
  byId: publicProcedure.input(z.string()).query(async ({ input: verseId, ctx }): Promise<Result<Verse>> => {
    const { user } = ctx

    if (Lodash.isNil(user)) {
      return Result.failure(missingUser)
    }

    const supabase = await createClient()
    const verse = await supabase.from('verses').select().eq('user_id', user.id).eq('id', verseId).single()
    if (verse.error) {
      return Result.failure(verse.error)
    }
    return Result.success(fromMe(verse.data))
  }),
  allByUser: publicProcedure.query(async ({ ctx }) => {
    const { user } = ctx
    if (Lodash.isNil(user)) {
      return Result.failure(missingUser)
    }
    const supabase = await createClient()
    const verses = await supabase.from('verses').select().eq('user_id', user.id)
    console.log(verses)
    if (verses.error) {
      return Result.failure(verses.error)
    }
    console.log(verses.data.map(fromMe))
    return Result.success(verses.data.map(fromMe))
  }),
  add: publicProcedure.input(verseSchema).mutation(async ({ input: verse, ctx }): Promise<Result<Verse>> => {
    const { user } = ctx
    if (Lodash.isNil(user)) {
      return Result.failure(missingUser)
    }
    const supabase = await createClient()
    const newVerse = await supabase.from('verses').insert(toMe(verse, user.id)).select().single()
    if (newVerse.error) {
      return Result.failure(newVerse.error)
    }
    return Result.success(fromMe(newVerse.data))
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input: verseId, ctx }) => {
    const { user } = ctx
    if (Lodash.isNil(user)) {
      return Result.failure(missingUser)
    }
    const supabase = await createClient()
    const result = await supabase.from('verses').delete().eq('id', verseId)
    if (result.error) {
      return Result.failure(result.error)
    }
    return Result.success(null)
  }),
  update: publicProcedure.input(verseSchema).mutation(async ({ input: verse, ctx }) => {
    const { user } = ctx
    if (Lodash.isNil(user)) {
      return Result.failure(missingUser)
    }
    const supabase = await createClient()
    const updatedVerse = await supabase.from('verses').update(toMe(verse, user.id)).eq('id', verse.id).select().single()
    if (updatedVerse.error) {
      return Result.failure(updatedVerse.error)
    }
    return Result.success(fromMe(updatedVerse.data))
  }),
})

function toMe(verse: Verse, userId: string): Tables<'verses'> {
  return {
    id: verse.id,
    book_id: verse.book.id,
    chapter: verse.chapter,
    start_verse: verse.start,
    end_verse: verse.end === verse.start ? null : verse.end,
    text: verse.text,
    version: verse.version,
    favorite: verse.favorite,
    completions: verse.completions,
    created_at: verse.createdDate as unknown as string,
    group_id: null,
    user_id: userId,
  }
}

function fromMe(rawVerse: Tables<'verses'>): Verse {
  return {
    ...rawVerse,
    book: Bible.books.find((it) => it.id === rawVerse.book_id)!,
    start: rawVerse.start_verse,
    end: rawVerse.end_verse ?? rawVerse.start_verse,
    createdDate: new Date(rawVerse.created_at),
  }
}
