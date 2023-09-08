'use server'

import { getServerSession } from 'next-auth'
import { Verse } from '@lib/util'
import { DB_User, authOptions } from '@lib/auth'
import { API_RESPONSE } from '@lib/util'
import * as Cookies from './cookies'

export async function getVerse(id: string): Promise<Verse | null> {
  'use server'

  if (!id) {
    return null
  }

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    const data = await fetch(`${process.env.BASE_URL}/api/verses/${id}`, {
      method: 'GET',
      headers: {
        userId: (session.user as DB_User).id,
      },
    })
      .then(async (data) => (await data.json()) as Verse)
      .catch((e) => {
        throw new Error(e)
      })
    return data
  } else {
    return Cookies.getVerse(id)
  }
}

export async function fetchVerses(userId: string): Promise<Verse[]> {
  'use server'

  if (userId) {
    const data = await fetch(`${process.env.BASE_URL}/api/verses`, {
      method: 'GET',
      headers: {
        userId: userId,
      },
    })
      .then(async (data) => (await data.json()) as API_RESPONSE)
      .catch((e) => {
        throw new Error(e)
      })
    return data.DATA
  } else {
    return Cookies.fetchVerses()
  }
}

export async function addVerse(verse: Verse): Promise<boolean> {
  'use server'

  console.log('adding verse', verse)

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
    return data.SUCCESS
  } else {
    return (await Cookies.addVerse(verse)).SUCCESS
  }
}

export async function deleteVerse(id: string | undefined): Promise<boolean> {
  'use server'

  console.log('deleting verse', id)

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
    return data.SUCCESS
  } else {
    return (await Cookies.deleteVerse(id)).SUCCESS
  }
}

export async function updateVerse(verse: Verse): Promise<boolean> {
  'use server'

  console.log('updating verse', verse)

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
        throw new Error(e)
      })
    return data.SUCCESS
  } else {
    return (await Cookies.updateVerse(verse)).SUCCESS
  }
}
