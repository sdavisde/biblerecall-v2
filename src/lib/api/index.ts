'use server'

import { getServerSession } from 'next-auth'
import { Verse } from '@lib/util'
import { DB_User, authOptions } from '@lib/auth'
import { API_RESPONSE } from '@lib/util'

import * as Cookies from './cookies'
import * as DB from './verses'

export async function getVerse(id: string): Promise<Verse | null> {
  'use server'

  if (!id) {
    return null
  }

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    return DB.getVerse(session.user as DB_User, id)
  } else {
    return Cookies.getVerse(id)
  }
}

export async function fetchVerses(userId: string): Promise<Verse[]> {
  'use server'

  if (userId) {
    return DB.fetchVerses(userId)
  } else {
    return Cookies.fetchVerses()
  }
}

export async function addVerse(verse: Verse): Promise<API_RESPONSE> {
  'use server'

  console.log('adding verse', verse)

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    return DB.addVerse(session.user as DB_User, verse)
  } else {
    return Cookies.addVerse(verse)
  }
}

export async function deleteVerse(id: string | undefined): Promise<API_RESPONSE> {
  'use server'

  console.log('deleting verse', id)

  if (!id) {
    return new API_RESPONSE(false, 'verse id is not defined')
  }

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    return DB.deleteVerse(session.user as DB_User, id)
  } else {
    return Cookies.deleteVerse(id)
  }
}

export async function updateVerse(verse: Verse): Promise<API_RESPONSE> {
  'use server'

  console.log('updating verse', verse)

  if (!verse.id) {
    return new API_RESPONSE(false, 'verse id is not defined')
  }

  const session = await getServerSession(authOptions)

  if (session && session.user && (session.user as DB_User).id) {
    return DB.updateVerse(session.user as DB_User, verse)
  } else {
    return Cookies.updateVerse(verse)
  }
}
