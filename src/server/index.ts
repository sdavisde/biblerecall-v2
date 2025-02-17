import 'server-only' // <-- ensure this file cannot be imported from the client

import { User } from '@supabase/supabase-js'
import { createClient } from '@lib/supabase/server'
import { Lodash } from '@util/lodash'
import { Result } from '@util/result'

export const missingUser = {
  code: 'user:undefined',
  message: 'User is not defined',
}

export async function getUser(): Promise<Result<User>> {
  const supabase = await createClient()
  const { user } = (await supabase.auth.getUser()).data
  if (Lodash.isNil(user)) {
    return Result.failure(missingUser)
  }
  return Result.success(user)
}
