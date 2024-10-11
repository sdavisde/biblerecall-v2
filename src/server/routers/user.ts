import { ErrorCode } from '@util/error'
import { Result } from '@util/result'
import { User } from 'server/context'
import { publicProcedure, router } from 'server/trpc'

/**
 * Settings API Routes
 *
 * Each query handles input validation and error handling.
 */

export const userRouter = router({
  get: publicProcedure.query(async ({ ctx }): Promise<Result<User>> => {
    const { user } = ctx

    if (!user) {
      return Result.failure({ code: ErrorCode.NOT_LOGGED_IN, message: 'Not logged in' })
    }

    return Result.success(user)
  }),
})
