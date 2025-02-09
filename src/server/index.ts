import 'server-only' // <-- ensure this file cannot be imported from the client

import { createCallerFactory, router } from './trpc'
import { versesRouter } from './routers/verse'
import { settingsRouter } from './routers/settings'
import { bibleRouter } from './routers/bible'
import { userRouter } from './routers/user'
import { verseSuggestionsRouter } from './routers/verse-suggestions'
import { headers } from 'next/headers'
import { cache } from 'react'
import { createTRPCContext } from 'src/server/context'
import { colorsRouter } from './routers/colors'

export const appRouter = router({
  user: userRouter,
  verse: versesRouter,
  verseSuggestions: verseSuggestionsRouter,
  settings: settingsRouter,
  bible: bibleRouter,
  colors: colorsRouter,
})

export const createCaller = createCallerFactory(appRouter)

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers())
  heads.set('x-trpc-source', 'rsc')

  return createTRPCContext({
    headers: heads,
  })
})

export const api = createCaller(createContext)

export const missingUser = {
  code: 'user:undefined',
  message: 'User is not defined',
}
