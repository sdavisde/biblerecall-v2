'use server'

import { getServerSession } from 'next-auth'
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore'
import { Verse } from '@lib/util'
import { database } from '@lib/firebase'
import { DB_User, authOptions } from '@lib/auth'
import { randomUUID } from 'crypto'
import { API_RESPONSE } from '@lib/util'

export async function getVerse(user: DB_User, id: string): Promise<Verse | null> {
  'use server'

  if (!id) {
    return null
  }

  const verseRef = doc(database, 'Users', user.id, 'verses', id)

  return getDoc(verseRef).then((snapshot) => {
    const verseData = snapshot.data()
    return { ...verseData } as Verse
  })
}

export async function fetchVerses(userId: string): Promise<Verse[]> {
  'use server'

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
}

export async function addVerse(user: DB_User, verse: Verse): Promise<API_RESPONSE> {
  'use server'

  console.log('adding verse', verse)

  const userId = user.id
  const collectionRef = collection(database, `Users/${userId}/verses`)

  return addDoc(collectionRef, { ...verse, id: randomUUID() })
    .then(() => {
      return new API_RESPONSE(true)
    })
    .catch((error) => {
      return new API_RESPONSE(false, error.toString())
    })
}

export async function deleteVerse(user: DB_User, id: string | undefined): Promise<API_RESPONSE> {
  'use server'

  console.log('deleting verse', id)

  if (!id) {
    return new API_RESPONSE(false, 'verse id is not defined')
  }

  try {
    const docRef = doc(database, `Users/${user.id}/verses/${id}`)
    await deleteDoc(docRef)
    return new API_RESPONSE(true)
  } catch (e: any) {
    return new API_RESPONSE(false, e.toString())
  }
}

export async function updateVerse(user: DB_User, verse: Verse): Promise<API_RESPONSE> {
  'use server'

  console.log('updating verse', verse)

  if (!verse.id) {
    return new API_RESPONSE(false, 'verse id is not defined')
  }

  const session = await getServerSession(authOptions)

  const userId = user.id

  return updateDoc(doc(database, 'Users', userId, 'verses', verse.id), verse)
    .then(() => {
      return new API_RESPONSE(true)
    })
    .catch((error) => {
      return new API_RESPONSE(false, error.toString())
    })
}
