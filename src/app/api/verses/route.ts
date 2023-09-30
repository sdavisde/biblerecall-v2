import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { Verse } from '@lib/util'
import { database } from '@lib/firebase'
import { getUserId, getVerse } from '..'

/**
 * Endpoint for retrieving all of a users' saved verses
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const userId = getUserId(request)

  if (!userId) {
    return NextResponse.json(
      { DATA: [], SUCCESS: false, RESPONSE: 'User id not provided' },
      { status: 400, statusText: 'User id not provided' }
    )
  }

  const verses: Verse[] = []
  const versesRef = collection(database, 'Users', userId, 'verses')

  if (!versesRef) {
    return NextResponse.json(
      { DATA: [], SUCCESS: false, RESPONSE: 'Verses are not available on this account' },
      { status: 404, statusText: 'Verses are not available on this account' }
    )
  }

  const snapshot = await getDocs(versesRef)

  snapshot.forEach((doc) => {
    const verseData = doc.data()
    verses.push({ ...(verseData as Verse), id: doc.id })
  })

  return NextResponse.json(
    { DATA: verses, SUCCESS: true, RESPONSE: 'Retrieved verses successfully' },
    { status: 200, statusText: 'OK' }
  )
}

/**
 * Endpoint for adding a new verse
 * The body of the request given should be a Verse object, The id will be overwritten
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log(JSON.stringify(request))
  const userId = getUserId(request)
  const verse = await getVerse(request)

  if (!userId) {
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'User id not provided' },
      { status: 400, statusText: 'User id not provided' }
    )
  }
  if (!verse) {
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'Verse information not provided' },
      { status: 400, statusText: 'Verse information not provided' }
    )
  }

  console.log('adding verse', verse)

  const collectionRef = collection(database, `Users/${userId}/verses`)

  try {
    const docRef = await addDoc(collectionRef, verse)

    return NextResponse.json(
      { DATA: { ...verse, id: docRef.id }, SUCCESS: true, RESPONSE: 'Added verse successfully' },
      { status: 200, statusText: 'OK' }
    )
  } catch (e) {
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'Something went wrong while adding the verse' },
      { status: 500, statusText: 'Something went wrong while adding the verse' }
    )
  }
}
