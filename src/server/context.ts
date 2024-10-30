'import server-only'

import { clientConfig, serverConfig } from 'firebase-config'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { ApiContext, RequestType } from 'types/api'

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
  const requestCookies = await cookies()
  const tokens = await getTokens(requestCookies, {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  if (tokens) {
    const { decodedToken } = tokens
    return {
      type: RequestType.Database,
      user: decodedToken,
    }
  }

  return {
    type: RequestType.Cookie,
    user: null,
  }
}
