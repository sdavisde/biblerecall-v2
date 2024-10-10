import 'server-only' // <-- ensure this file cannot be imported from the client

import { headers } from 'next/headers'
import { cache } from 'react'
import { createCaller } from 'server'
import { createTRPCContext } from 'server/context'
import { auth } from '@lib/firebase'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const heads = new Headers(headers())
  heads.set('x-trpc-source', 'rsc')
  // todo: this might not be safe
  console.log('creating context user id ', auth.currentUser?.uid)
  if (auth.currentUser?.uid) {
    heads.set('userId', auth.currentUser!.uid)
  }

  return createTRPCContext({
    headers: heads,
  })
})

export const api = createCaller(createContext)
