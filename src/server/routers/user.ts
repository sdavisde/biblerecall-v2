import { User } from '@supabase/supabase-js'
import { publicProcedure, router } from 'src/server/trpc'

/**
 * User API Routes
 *
 * Each query handles input validation and error handling.
 */

export const userRouter = router({
  get: publicProcedure.query(async ({ ctx }): Promise<User | null> => {
    const { user } = ctx
    return user
  }),
})
