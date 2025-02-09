import { z } from 'zod'
import { createClient } from '@lib/supabase/server'
import { ErrorCode } from '@util/error'
import { Lodash } from '@util/lodash'
import { Result } from '@util/result'
import { Tables } from 'database.types'
import { publicProcedure, router } from 'src/server/trpc'
import { Theme } from '@configuration/settings'

type Color = Tables<'colors'>
type Colors = Array<Color>

const colorSchema = z.object({
  created_at: z.string(),
  hsl: z.string(),
  id: z.number(),
  name: z.string(),
  theme: z.enum(['system', 'dark', 'light']),
})

/**
 * colors API Routes
 *
 * Each query handles input validation and error handling.
 */

export const colorsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }): Promise<Result<Colors>> => {
    const { user } = ctx

    if (Lodash.isNil(user)) {
      return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
    }

    const supabase = await createClient()
    const colors = await supabase.from('colors').select()
    if (colors.error) {
      return Result.failure(colors.error)
    }
    return Result.success(colors.data)
  }),
  set: publicProcedure.input(colorSchema).mutation(async ({ input: color, ctx }) => {
    const { user } = ctx

    if (Lodash.isNil(user)) {
      return Result.failure({ code: ErrorCode.USER_ID_NOT_PROVIDED, message: 'User id not provided' })
    }

    const supabase = await createClient()
    const newColor = await supabase.from('colors').update(color).eq('id', color.id)
    if (newColor.error) {
      return Result.failure(newColor.error)
    }
    return Result.success(color)
  }),
})
