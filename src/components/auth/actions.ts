'use server'

import { getBaseUrl } from '@components/lib/utils'
import { createClient } from '@lib/supabase/server'
import { Result } from '@util/result'

export async function handleGoogleLogin() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getBaseUrl()}/auth/callback`,
      },
    })

    if (error) {
      return Result.failure({ code: 'google-login:failed', message: error.message })
    }

    return Result.success(data.url)
  } catch (error) {
    console.error(error)
  }
}
