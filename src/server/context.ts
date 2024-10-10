import { auth } from '@lib/firebase'
import { Lodash } from '@util/lodash'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export enum RequestType {
  Cookie = 'cookie',
  Database = 'db',
}

type CookieRequestContext = {
  type: RequestType.Cookie
  userId: null
}

type DBRequestContext = {
  type: RequestType.Database
  userId: string
}

export type ApiContext = DBRequestContext | CookieRequestContext

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opt: { headers: Headers }): Promise<ApiContext> => {
  // console.log('create trpc context', opt)
  const userId = cookies().get('userId')
  // const session = await getServerSession(authOptions)

  if (Lodash.isNil(userId)) {
    return {
      type: RequestType.Cookie,
      userId: null,
    }
  }

  return {
    type: RequestType.Database,
    userId: userId.value,
  }
}
