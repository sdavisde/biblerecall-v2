'use server'

import { createClient } from '@lib/supabase/server'
import { LoginFormData } from './form'
import { redirect } from 'next/navigation'

export async function loginUser(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    throw new Error('missing required fields')
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return
  }

  redirect('/home')
}
