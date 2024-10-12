import { DecodedIdToken } from 'next-firebase-auth-edge/lib/auth/token-verifier'

export type User = DecodedIdToken

export enum RequestType {
  Cookie = 'cookie',
  Database = 'db',
}

export type CookieRequestContext = {
  type: RequestType.Cookie
  user: null
}

export type DBRequestContext = {
  type: RequestType.Database
  user: User
}

export type ApiContext = DBRequestContext | CookieRequestContext
