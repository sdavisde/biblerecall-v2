import { DecodedIdToken } from 'next-firebase-auth-edge/lib/auth/token-verifier'

export type SignedInUser = DecodedIdToken

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
  user: SignedInUser
}

export type ApiContext = DBRequestContext | CookieRequestContext
