import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'
import { Verse } from 'service/verse/types'
import { randomUUID } from 'crypto'
import { Result } from '@util/result'
import { ErrorCode } from '@util/error'
import { Lodash } from '@util/lodash'

async function getVersesCookie(): Promise<Verse[] | null> {
  const value = (await cookies()).get('verses')?.value

  if (value) {
    return JSON.parse(value)
  } else {
    return null
  }
}

export namespace Cookies {
  export async function getVerse(id: string): Promise<Result<Verse>> {
    'use server'

    if (!id) {
      return Result.failure({ code: ErrorCode.VERSE_ID_NOT_PROVIDED, message: 'Verse id not provided' })
    }

    const verses = await getVersesCookie()
    const verse = verses?.find((v) => v.id === id) ?? null

    if (Lodash.isNil(verse)) {
      return Result.failure({ code: ErrorCode.VERSE_NOT_FOUND, message: 'Verse not found' })
    }

    return Result.success(verse)
  }

  export async function fetchVerses(): Promise<Result<Verse[]>> {
    const verses = await getVersesCookie()

    if (Lodash.isNil(verses)) {
      return Result.failure({ code: ErrorCode.VERSE_NOT_FOUND, message: 'Verses not found' })
    }

    return Result.success(verses)
  }

  export async function addVerse(verse: Verse): Promise<Result<Verse>> {
    'use server'

    try {
      let versesCookie = await getVersesCookie()
      if (!versesCookie) {
        ;(await cookies()).delete('verses')
        versesCookie = []
      }

      const newVerse = { ...verse, id: randomUUID() }
      const verses = [...versesCookie, newVerse]
      ;(await cookies()).set('verses', JSON.stringify(verses))
      return Result.success(newVerse)
    } catch (e: any) {
      return Result.failure({ code: ErrorCode.INTERNAL_SERVER_ERROR, message: e.message })
    }
  }

  export async function deleteVerse(id: string | undefined): Promise<Result<null>> {
    'use server'

    if (!id) {
      return Result.failure({ code: ErrorCode.VERSE_ID_NOT_PROVIDED, message: 'Verse id not provided' })
    }

    if ((await cookies()).has('verses')) {
      try {
        const verses = JSON.parse((await cookies()).get('verses')?.value!) as Verse[]
        const result = verses.filter((v) => v.id !== id)
        ;(await cookies()).set('verses', JSON.stringify(result))
        return Result.success(null)
      } catch (e: any) {
        return Result.failure({ code: ErrorCode.INTERNAL_SERVER_ERROR, message: e.message })
      }
    } else {
      return Result.failure({ code: ErrorCode.VERSE_COOKIE_NOT_FOUND, message: 'Verses cookie not defined' })
    }
  }

  export async function updateVerse(verse: Verse): Promise<Result<Verse>> {
    'use server'

    if (!verse.id) {
      return Result.failure({ code: ErrorCode.VERSE_ID_NOT_PROVIDED, message: 'Verse id not provided' })
    }

    try {
      const versesCookie = (await cookies()).get('verses')?.value ?? '[]'
      const verses = [...JSON.parse(versesCookie).filter((v: Verse) => v.id !== verse.id), verse]
      ;(await cookies()).set('verses', JSON.stringify(verses))
      return Result.success(verse)
    } catch (e: any) {
      return Result.failure({ code: ErrorCode.INTERNAL_SERVER_ERROR, message: e.message })
    }
  }
}
