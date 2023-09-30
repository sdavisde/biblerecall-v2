import { NextRequest, NextResponse } from 'next/server'
import { getSettings, getUserId } from '@app/api'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { database } from '@lib/firebase'
import { Settings } from '@components/Settings/Provider'

/**
 * Endpoint for retrieving all of a users' settings
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const userId = getUserId(request)

  if (!userId) {
    return NextResponse.json(
      { DATA: null, SUCCESS: false, RESPONSE: 'User id not provided' },
      { status: 400, statusText: 'User id not provided' }
    )
  }

  const userDocRef = doc(database, 'Users', userId)

  if (!userDocRef) {
    return NextResponse.json(
      { DATA: null, SUCCESS: false, RESPONSE: 'User is not in the sytstem' },
      { status: 404, statusText: 'User is not in the sytstem' }
    )
  }

  const snapshot = await getDoc(userDocRef)

  const settings = snapshot.data() as Settings

  if (
    !settings.theme ||
    !settings.visibility ||
    !settings.defaultVersion ||
    !settings.font ||
    !settings.verseDueDatesEnabled ||
    !settings.verseOfTheDayEnabled
  ) {
    return NextResponse.json(
      { DATA: null, SUCCESS: false, RESPONSE: 'Malformed settings, returning null' },
      { status: 404, statusText: 'Malformed settings, returning null' }
    )
  }

  console.log(settings)

  return NextResponse.json(
    { DATA: settings, SUCCESS: true, RESPONSE: 'Retrieved settings successfully' },
    { status: 200, statusText: 'OK' }
  )
}

/**
 * Endpoint for adding / updating settings
 * The body of the request given should be a Settings object
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const userId = getUserId(request)
  const settings = await getSettings(request)

  if (!userId) {
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'User id not provided' },
      { status: 400, statusText: 'User id not provided' }
    )
  }

  console.log('setting settings', settings)

  const userDocRef = doc(database, `Users/${userId}`)

  try {
    const docRef = await setDoc(userDocRef, settings)

    return NextResponse.json(
      { DATA: settings, SUCCESS: true, RESPONSE: 'Updated settings successfully' },
      { status: 200, statusText: 'OK' }
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { SUCCESS: false, RESPONSE: 'Something went wrong while setting user settings' },
      { status: 500, statusText: 'Something went wrong while setting user settings' }
    )
  }
}
