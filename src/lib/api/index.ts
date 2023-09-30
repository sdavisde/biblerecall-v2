'use server'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { Verse } from '@lib/util'
import { DB_User, authOptions } from '@lib/auth'
import { API_RESPONSE } from '@lib/util'
import * as Cookies from './cookies'
import { GET as getAllVerses, POST as postVerse } from '@app/api/verses/route'
import { GET as getOneVerse, PUT as updateOneVerse, DELETE as deleteOneVerse } from '@app/api/verses/[id]/route'
import { Settings } from '@components/Settings/Provider'

export async function getVerse(id: string): Promise<Verse | null> {
  'use server'

  if (!id) {
    return null
  }

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    const res = await getOneVerse(
      new NextRequest(`${process.env.API_URL}/verses/${id}`, {
        method: 'GET',
        headers: {
          userId: (session.user as DB_User).id,
        },
      }),
      { params: { id } }
    )
      .then(async (data) => (await data.json()) as API_RESPONSE)
      .catch((e) => {
        throw new Error(e)
      })
    return res.DATA
  } else {
    return Cookies.getVerse(id)
  }
}

export async function fetchVerses(): Promise<Verse[]> {
  'use server'

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    const data = await getAllVerses(
      new NextRequest(`${process.env.API_URL}/verses`, {
        method: 'GET',
        headers: {
          userId: (session.user as DB_User).id,
        },
      })
    )
      .then(async (data) => (await data.json()) as API_RESPONSE)
      .catch((e) => {
        throw new Error(e)
      })
    return data.DATA
  } else {
    return (await Cookies.fetchVerses()).DATA ?? []
  }
}

export async function addVerse(verse: Verse): Promise<API_RESPONSE> {
  'use server'

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    const data = await postVerse(
      new NextRequest(`${process.env.API_URL}/verses/${verse.id}`, {
        method: 'POST',
        headers: {
          userId: (session.user as DB_User).id,
        },
        body: JSON.stringify(verse),
      })
    )
      .then(async (data) => (await data.json()) as API_RESPONSE)
      .catch((e) => {
        throw new Error(e)
      })
    return data
  } else {
    return await Cookies.addVerse(verse)
  }
}

export async function deleteVerse(id: string | undefined): Promise<API_RESPONSE> {
  'use server'

  if (!id) {
    return { SUCCESS: false, RESPONSE: 'Verse id not provided' }
  }

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    const data = await deleteOneVerse(
      new NextRequest(`${process.env.API_URL}/verses/${id}`, {
        method: 'DELETE',
        headers: {
          userId: (session.user as DB_User).id,
        },
      }),
      { params: { id } }
    )
      .then(async (data) => (await data.json()) as API_RESPONSE)
      .catch((e) => {
        throw new Error(e)
      })
    return data
  } else {
    return await Cookies.deleteVerse(id)
  }
}

export async function updateVerse(verse: Verse): Promise<API_RESPONSE> {
  'use server'

  if (!verse.id) {
    return { SUCCESS: false, RESPONSE: 'Verse id not provided' }
  }

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    const data = await updateOneVerse(
      new NextRequest(`${process.env.API_URL}/verses/${verse.id}`, {
        method: 'PUT',
        headers: {
          userId: (session.user as DB_User).id,
        },
        body: JSON.stringify(verse),
      }),
      { params: { id: verse.id } }
    )
      .then(async (data) => (await data.json()) as API_RESPONSE)
      .catch((e) => {
        console.error(e)
        throw new Error(e)
      })
    return data
  } else {
    return await Cookies.updateVerse(verse)
  }
}

enum SettingsReponse {
  NotLoggedIn = 'Not Logged In',
}

export async function getSettings(): Promise<API_RESPONSE> {
  'use server'

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    // const data = await getSettings
    //todo get settings from database
    return { SUCCESS: false, RESPONSE: 'Not implemented yet' }
  } else {
    return { DATA: null, SUCCESS: false, RESPONSE: SettingsReponse.NotLoggedIn }
  }
}

export async function setSettings(settings: Settings): Promise<API_RESPONSE> {
  'use server'

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    // const data = await getSettings
    //todo set settings in database
    return { SUCCESS: false, RESPONSE: 'Not implemented yet' }
  } else {
    return { DATA: null, SUCCESS: false, RESPONSE: SettingsReponse.NotLoggedIn }
  }
}
