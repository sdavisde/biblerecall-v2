'use server'

import { Verse } from 'src/service/verse/types'
import { Result } from '@util/result'
import { missingUser } from 'src/server'
import { createClient } from '@lib/supabase/server'
import { from_verse, to_verse } from '../adapter'
import { revalidatePath } from 'next/cache'

/**
 * Verses API Routes
 *
 * Each query handles input validation and error handling.
 * The implementation is abstracted away in the database and cookies modules.
 */

export async function getVerseById(id: string): Promise<Result<Verse>> {
  const supabase = await createClient()
  const verse = await supabase.from('verses').select().eq('id', id).single()
  if (verse.error) {
    return Result.failure(verse.error)
  }
  return Result.success(from_verse(verse.data))
}

export async function getAllVerses(): Promise<Array<Verse>> {
  const supabase = await createClient()
  const verses = await supabase.from('verses').select()
  if (verses.error) {
    return []
  }
  return verses.data.map(from_verse)
}

export async function addVerse(verse: Verse): Promise<Result<Verse>> {
  const supabase = await createClient()
  const user = (await supabase.auth.getUser()).data.user
  if (!user) {
    return Result.failure(missingUser)
  }
  const newVerse = await supabase.from('verses').insert(to_verse(verse, user.id)).select().single()
  if (newVerse.error) {
    return Result.failure(newVerse.error)
  }
  revalidatePath('/home/verses')
  return Result.success(from_verse(newVerse.data))
}

export async function deleteVerse(id: string): Promise<Result<null>> {
  const supabase = await createClient()
  const result = await supabase.from('verses').delete().eq('id', id)
  if (result.error) {
    return Result.failure(result.error)
  }
  revalidatePath('/home/verses')
  return Result.success(null)
}

export async function updateVerse(verse: Verse): Promise<Result<Verse>> {
  const supabase = await createClient()
  const user = (await supabase.auth.getUser()).data.user
  if (!user) {
    return Result.failure(missingUser)
  }
  const updatedVerse = await supabase
    .from('verses')
    .update(to_verse(verse, user.id))
    .eq('id', verse.id)
    .select()
    .single()
  if (updatedVerse.error) {
    return Result.failure(updatedVerse.error)
  }
  revalidatePath('/home/verses')
  return Result.success(from_verse(updatedVerse.data))
}
