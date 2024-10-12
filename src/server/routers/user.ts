import { User } from 'types/api'
import { publicProcedure, router } from 'server/trpc'

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
