'use server'

import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { getDocs, collection, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { Verse } from '@app/api/verse/util'
import { database } from '@lib/firebase'
import { DB_User, authOptions } from '@lib/auth'

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

    addDoc(collectionRef, verse)
      .then(() => {
        return 'Added verse successfully'
      })
      .catch((error) => {
        return error.toString()
      })
  } else {
    const versesCookie = cookies().get('verses')?.value ?? '[]'
    const verses = [...JSON.parse(versesCookie), verse]

    cookies().set('verses', JSON.stringify(verses))
  }
}

export async function deleteVerse(id: string | undefined) {
  'use server'

  if (!id) {
    return 'No verse id provided'
  }

  const session = await getServerSession(authOptions)

  console.log('deleting verse', id)

  if (session && session.user && (session.user as DB_User).id) {
    const docRef = doc(database, `Users/${(session.user as DB_User).id}/verses/${id}`)
    deleteDoc(docRef)
  } else {
    if (cookies().has('verses')) {
      const verses = JSON.parse(cookies().get('verses')?.value!) as Verse[]
      const result = verses.filter((v) => v.id !== id)
      cookies().set('verses', JSON.stringify(result))
    } else {
      return 'No verses in cookies to delete'
    }
  }
  return 'Removed verse Successfully'
}
