'use server'

import { createClient } from '@lib/supabase/server'

export async function handleGoogleLogin() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.BASE_URL}/auth/callback`,
      },
    })

    if (error) {
      throw new Error(error.message, error)
    }

    return data.url
  } catch (error) {
    console.error(error)
  }
}
