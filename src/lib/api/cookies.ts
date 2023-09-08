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
    return { SUCCESS: true, RESPONSE: 'Successfully added verse in cookie' }
  } catch (e: any) {
    return { SUCCESS: false, RESPONSE: 'Something went wrong while adding verse in cookie' }
  }
}

export async function deleteVerse(id: string | undefined): Promise<API_RESPONSE> {
  'use server'

  console.log('deleting verse', id)

  if (!id) {
    return { SUCCESS: false, RESPONSE: 'verse id is not defined' }
  }

  if (cookies().has('verses')) {
    try {
      const verses = JSON.parse(cookies().get('verses')?.value!) as Verse[]
      const result = verses.filter((v) => v.id !== id)
      cookies().set('verses', JSON.stringify(result))
      return { SUCCESS: true, RESPONSE: 'Deleting verse successfully in cookie' }
    } catch (e: any) {
      return { SUCCESS: false, RESPONSE: 'Something went wrong while deleting verse in cookie' }
    }
  } else {
    return { SUCCESS: false, RESPONSE: 'Verses cookie not defined' }
  }
}

export async function updateVerse(verse: Verse): Promise<API_RESPONSE> {
  'use server'

  console.log('updating verse', verse)

  if (!verse.id) {
    return { SUCCESS: false, RESPONSE: 'Verse id not provided' }
  }

  try {
    const versesCookie = cookies().get('verses')?.value ?? '[]'
    const verses = [...JSON.parse(versesCookie).filter((v: Verse) => v.id !== verse.id), verse]

    cookies().set('verses', JSON.stringify(verses))
    return { SUCCESS: true, RESPONSE: 'Updated verse successfully in cookie' }
  } catch (e: any) {
    return { SUCCESS: false, RESPONSE: 'Something went wrong while updating verse in cookie' }
  }
}
