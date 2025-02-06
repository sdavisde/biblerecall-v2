import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from 'src/server'
import { type NextRequest } from 'next/server'
import { createTRPCContext } from 'src/server/context'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext(req),
    // onError:
    //   env.NODE_ENV === 'development'
    //     ? ({ path, error }) => {
    //         console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
    //       }
    //     : undefined,
  })

export { handler as GET, handler as POST }
