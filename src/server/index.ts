import { createCallerFactory, router } from './trpc'
import { versesRouter } from './routers/verse'
import { settingsRouter } from './routers/settings'
import { bibleRouter } from './routers/bible'
import { userRouter } from './routers/user'

export const appRouter = router({
  user: userRouter,
  verse: versesRouter,
  settings: settingsRouter,
  bible: bibleRouter,
})

export const createCaller = createCallerFactory(appRouter)

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
