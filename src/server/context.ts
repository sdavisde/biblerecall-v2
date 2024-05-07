import { getServerSession } from 'next-auth'
import Lodash from 'lodash'
import { DB_User, authOptions } from '@lib/auth'

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

export const createContext = async (): Promise<ApiContext> => {
  const session = await getServerSession(authOptions)

  if (Lodash.isNil(session) || Lodash.isNil((session.user as DB_User)?.id)) {
    return {
      type: RequestType.Cookie,
      userId: null,
    }
  }

  return {
    type: RequestType.Database,
    userId: (session.user as DB_User).id,
  }
}
