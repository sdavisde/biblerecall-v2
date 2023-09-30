import { NextRequest, NextResponse } from 'next/server'
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { Verse } from '@lib/util'
import { database } from '@lib/firebase'
import { getUserId, getVerse } from '../..'

/**
 * Endpoint for retrieving a users' saved verse
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const userId = getUserId(request)
  const verseId = params.id

  if (!userId) {
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'User id not provided' },
      { status: 400, statusText: 'User id not provided' }
    )
  }
  if (!verseId) {
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'Verse id not provided' },
      { status: 400, statusText: 'Verse Id not provided' }
    )
  }

  console.log(userId, verseId)

  const verseRef = doc(database, 'Users', userId, 'verses', verseId)

  try {
    const snapshot = await getDoc(verseRef)
    const verse = { ...snapshot.data(), id: snapshot.id } as Verse
    return NextResponse.json(
      { DATA: verse, SUCCESS: true, RESPONSE: 'Retrieved verse successfully' },
      { status: 200, statusText: 'OK' }
    )
  } catch (e) {
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'Something went wrong retrieving verse' },
      { status: 500, statusText: 'Something went wrong while fetching the verse' }
    )
  }
}

/**
 * Endpoint to delete a users' saved verse
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const userId = getUserId(request)
  const verseId = params.id

  if (!userId) {
    return NextResponse.json({ SUCCESS: false, RESPONSE: 'User id not provided' }, { status: 400 })
  }
  if (!verseId) {
    return NextResponse.json({ SUCCESS: false, RESPONSE: 'Verse Id not provided' }, { status: 400 })
  }

  console.log('deleting verse', verseId)

  try {
    const docRef = doc(database, `Users/${userId}/verses/${verseId}`)
    await deleteDoc(docRef)
    return NextResponse.json(
      { SUCCESS: true, RESPONSE: 'Deleted verse successfully' },
      { status: 200, statusText: 'Deleted verse successfully' }
    )
  } catch (e: any) {
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'Something went wrong while deleting a verse' },
      { status: 500, statusText: 'Something went wrong while deleting a verse' }
    )
  }
}

/**
 * Endpoint to update a users' saved verse
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const userId = getUserId(request)
  const verse = await getVerse(request)
  const verseId = params.id

  console.log('updating verse', verse)

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
  if (!verse.id) {
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'Verse id not provided' },
      { status: 400, statusText: 'Verse id not provided' }
    )
  }

  try {
    await updateDoc(doc(database, 'Users', userId, 'verses', verseId), verse)
    return NextResponse.json(
      { DATA: verse, SUCCESS: true, RESPONSE: 'Successfully updated verse' },
      { status: 200, statusText: 'OK' }
    )
  } catch (e) {
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'Something went wrong while updating verse' },
      { status: 200, statusText: 'OK' }
    )
  }
}
