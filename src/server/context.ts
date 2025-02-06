'import server-only'

import { createClient } from '@lib/supabase/server'
import { ApiContext } from 'src/types/api'

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
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return { user: null } as ApiContext
  }

  return data
}
