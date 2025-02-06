'use server'

import { redirect } from 'next/navigation'
import { createClient } from './server'

export async function logout() {
  const supabase = await createClient()
  const response = await supabase.auth.signOut()

  if (!response.error) {
    redirect('/')
  }
}
