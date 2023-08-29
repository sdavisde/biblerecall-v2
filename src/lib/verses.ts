'use server'

import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { Verse } from '@app/api/verse/util'
import { database } from '@lib/firebase'
import { DB_User, authOptions } from '@lib/auth'
import { randomUUID } from 'crypto'

export async function fetchVerses(userId: string): Promise<Verse[]> {
  'use server'

  if (userId) {
    const verses: Verse[] = []
    const versesRef = collection(database, 'Users', userId, 'verses')

    if (!versesRef) {
      return []
    }

    const snapshot = await getDocs(versesRef)

    snapshot.forEach((doc) => {
      const verseData = doc.data()
      verses.push({ ...(verseData as Verse), id: doc.id })
    })

    return verses
  } else {
    const cookieValue = cookies().get('verses')?.value ?? '[]'
    return JSON.parse(cookieValue)
  }
}

export async function addVerse(verse: Verse) {
  'use server'

  const session = await getServerSession(authOptions)

  console.log('adding verse', verse)

  if (session && session.user && (session.user as DB_User).id) {
    const userId = (session.user as DB_User).id
    const collectionRef = collection(database, `Users/${userId}/verses`)

    return addDoc(collectionRef, { ...verse, id: randomUUID() })
      .then(() => {
        return { success: true }
      })
      .catch((error) => {
        return { success: false }
      })
  } else {
    try {
      const versesCookie = cookies().get('verses')?.value ?? '[]'
      const newVerse = { ...verse, id: randomUUID() }
      const verses = [...JSON.parse(versesCookie), newVerse]

      cookies().set('verses', JSON.stringify(verses))
      return { success: true }
    } catch (e) {
      return { success: false }
    }
  }
}

export async function deleteVerse(id: string | undefined) {
  'use server'

  if (!id) {
    return null
  }

  const session = await getServerSession(authOptions)

  console.log('deleting verse', id)

  if (session && session.user && (session.user as DB_User).id) {
    const docRef = doc(database, `Users/${(session.user as DB_User).id}/verses/${id}`)
    deleteDoc(docRef)
  } else {
    if (cookies().has('verses')) {
      try {
        const verses = JSON.parse(cookies().get('verses')?.value!) as Verse[]
        const result = verses.filter((v) => v.id !== id)
        cookies().set('verses', JSON.stringify(result))
        return { success: true }
      } catch (e) {
        return { success: false }
      }
    } else {
      return { success: true, message: 'No verses to delete in cookies' }
    }
  }
  return 'Removed verse Successfully'
}

export async function updateVerse(verse: Verse) {
  'use server'

  console.log('updating verse', verse)

  if (!verse.id) {
    return null
  }

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    const userId = (session.user as DB_User).id

    return updateDoc(doc(database, 'Users', userId, 'verses', verse.id), verse)
      .then(() => {
        return { success: true }
      })
      .catch((error) => {
        return { success: false }
      })
  } else {
    try {
      const versesCookie = cookies().get('verses')?.value ?? '[]'
      const verses = [...JSON.parse(versesCookie).filter((v: Verse) => v.id !== verse.id), verse]

      cookies().set('verses', JSON.stringify(verses))
      return { success: true }
    } catch (e) {
      return { success: false }
    }
  }
}
