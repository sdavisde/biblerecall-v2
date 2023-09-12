'use server'

import { getServerSession } from 'next-auth'
import { Verse } from '@lib/util'
import { DB_User, authOptions } from '@lib/auth'
import { API_RESPONSE } from '@lib/util'
import * as Cookies from './cookies'
import { cookies } from 'next/headers'

export async function getVerse(id: string): Promise<Verse | null> {
  'use server'

  if (!id) {
    return null
  }

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    const res = await fetch(`${process.env.BASE_URL}/api/verses/${id}`, {
      method: 'GET',
      headers: {
        userId: (session.user as DB_User).id,
      },
    })
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
    const data = await fetch(`${process.env.BASE_URL}/api/verses`, {
      method: 'GET',
      headers: {
        userId: (session.user as DB_User).id,
      },
    })
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
    const data = await fetch(`${process.env.BASE_URL}/api/verses/${verse.id}`, {
      method: 'POST',
      headers: {
        userId: (session.user as DB_User).id,
      },
      body: JSON.stringify(verse),
    })
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

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    const data = await fetch(`${process.env.BASE_URL}/api/verses/${id}`, {
      method: 'DELETE',
      headers: {
        userId: (session.user as DB_User).id,
      },
    })
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

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    const data = await fetch(`${process.env.BASE_URL}/api/verses/${verse.id}`, {
      method: 'PUT',
      headers: {
        userId: (session.user as DB_User).id,
      },
      body: JSON.stringify(verse),
    })
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
