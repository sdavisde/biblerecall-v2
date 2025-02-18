'use server'

import { createClient } from '@lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addMeditation(formData: FormData) {
  const meditation = formData.get('meditation')
  if (!meditation) {
    return
  }
  const supabase = await createClient()
  const user = await supabase.auth.getUser()
  if (!user.data.user) {
    return
  }

  const result = await supabase
    .from('user_meditations')
    .insert({ text: meditation.toString(), user_id: user.data.user.id })
  if (!result.error) {
    revalidatePath('/x/home')
  }
}
