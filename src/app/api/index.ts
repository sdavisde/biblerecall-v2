import { NextRequest } from 'next/server'

export function getUserId(request: NextRequest) {
  return request.headers?.get('userId')
}

export async function getVerse(request: NextRequest) {
  return await request.json()
}

export async function getSettings(request: NextRequest) {
  return await request.json()
}
