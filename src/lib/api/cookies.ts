'use server'

import { cookies } from 'next/headers'
import { Verse, makeReference } from '@lib/util'
import { randomUUID } from 'crypto'
import { API_RESPONSE } from '@lib/util'

function getVersesCookie(): Verse[] | null {
  const value = cookies().get('verses')?.value

  if (value) {
    return JSON.parse(value)
  } else {
    return null
  }
}

export async function getVerse(id: string): Promise<Verse | null> {
  'use server'

  if (!id) {
    return null
  }

  const verses = getVersesCookie()
  return verses?.find((v) => v.id === id) ?? null
}

export async function fetchVerses(): Promise<API_RESPONSE> {
  'use server'

  try {
    const verses = getVersesCookie()
    return { DATA: verses, SUCCESS: true, RESPONSE: 'Retrieved verses from cookie' }
  } catch (e: any) {
    return { SUCCESS: false, RESPONSE: 'Something went wrong while fetching verses in cookie' }
  }
}

export async function addVerse(verse: Verse): Promise<API_RESPONSE> {
  'use server'

  try {
    let versesCookie = getVersesCookie()
    if (!versesCookie) {
      cookies().delete('verses')
      versesCookie = []
    }

    const newVerse = { ...verse, id: randomUUID() }
    const verses = [...versesCookie, newVerse]

    cookies().set('verses', JSON.stringify(verses))
    return { DATA: newVerse, SUCCESS: true, RESPONSE: `Successfully added ${makeReference(verse)} in cookie` }
  } catch (e: any) {
    return { SUCCESS: false, RESPONSE: 'Something went wrong while adding verse in cookie' }
  }
}

export async function deleteVerse(id: string | undefined): Promise<API_RESPONSE> {
  'use server'

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

  if (!verse.id) {
    return { SUCCESS: false, RESPONSE: 'Verse id not provided' }
  }

  try {
    const versesCookie = cookies().get('verses')?.value ?? '[]'
    const verses = [...JSON.parse(versesCookie).filter((v: Verse) => v.id !== verse.id), verse]

    cookies().set('verses', JSON.stringify(verses))
    return { DATA: verse, SUCCESS: true, RESPONSE: 'Updated verse successfully in cookie' }
  } catch (e: any) {
    return { SUCCESS: false, RESPONSE: 'Something went wrong while updating verse in cookie' }
  }
}
