'use server'

import { createClient } from '@lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUpNewUser(formData: FormData) {
  const firstName = formData.get('firstName')?.toString()
  const lastName = formData.get('lastName')?.toString()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!firstName || !lastName || !email || !password) {
    throw new Error('Missing required fields')
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/home`,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (error) {
    console.error('SIGNUP ERROR', error.message)
    return
  }

  redirect('/home')
}
