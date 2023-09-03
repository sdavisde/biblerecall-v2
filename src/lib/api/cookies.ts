'use server'

import { cookies } from 'next/headers'
import { Verse } from '@lib/util'
import { randomUUID } from 'crypto'
import { API_RESPONSE } from '@lib/util'

function getVersesCookie(): Verse[] {
  return JSON.parse(cookies().get('verses')?.value ?? '[]')
}

export async function getVerse(id: string): Promise<Verse | null> {
  'use server'

  if (!id) {
    return null
  }

  const verses = getVersesCookie()
  return verses.find((v) => v.id === id) ?? null
}

export async function fetchVerses(): Promise<Verse[]> {
  'use server'

  return getVersesCookie()
}

export async function addVerse(verse: Verse): Promise<API_RESPONSE> {
  'use server'

  console.log('adding verse', verse)

  try {
    const versesCookie = getVersesCookie()
    const newVerse = { ...verse, id: randomUUID() }
    const verses = [...versesCookie, newVerse]

    cookies().set('verses', JSON.stringify(verses))
    return new API_RESPONSE(true)
  } catch (e: any) {
    return new API_RESPONSE(false, e.toString())
  }
}

export async function deleteVerse(id: string | undefined): Promise<API_RESPONSE> {
  'use server'

  console.log('deleting verse', id)

  if (!id) {
    return new API_RESPONSE(false, 'verse id is not defined')
  }

  if (cookies().has('verses')) {
    try {
      const verses = JSON.parse(cookies().get('verses')?.value!) as Verse[]
      const result = verses.filter((v) => v.id !== id)
      cookies().set('verses', JSON.stringify(result))
      return new API_RESPONSE(true)
    } catch (e: any) {
      return new API_RESPONSE(false, e.toString())
    }
  } else {
    return new API_RESPONSE(false, 'No verses to delete in cookies')
  }
}

export async function updateVerse(verse: Verse): Promise<API_RESPONSE> {
  'use server'

  console.log('updating verse', verse)

  if (!verse.id) {
    return new API_RESPONSE(false, 'verse id is not defined')
  }

  try {
    const versesCookie = cookies().get('verses')?.value ?? '[]'
    const verses = [...JSON.parse(versesCookie).filter((v: Verse) => v.id !== verse.id), verse]

    cookies().set('verses', JSON.stringify(verses))
    return new API_RESPONSE(true)
  } catch (e: any) {
    return new API_RESPONSE(false, e.toString())
  }
}
