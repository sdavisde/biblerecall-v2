'use server'

import { createClient } from '@lib/supabase/server'
import { LoginFormData } from './form'

export async function signUpNewUser({ email, password }: LoginFormData) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.BASE_URL}/home`,
    },
  })

  if (error) {
    console.error(error.message)
    return
  }

  return data
}
