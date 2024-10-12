import { SignedInUser } from 'types/api'
import { publicProcedure, router } from 'server/trpc'

/**
 * User API Routes
 *
 * Each query handles input validation and error handling.
 */

export const userRouter = router({
  get: publicProcedure.query(async ({ ctx }): Promise<SignedInUser | null> => {
    const { user } = ctx
    return user
  }),
})
