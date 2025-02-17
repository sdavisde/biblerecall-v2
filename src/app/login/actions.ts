'use server'

import { createClient } from '@lib/supabase/server'
import { redirect } from 'next/navigation'
import { FormActionState } from '@components/form/common'
import { z } from 'zod'
import { emailSchema } from '@components/form/EmailField'
import { passwordSchema } from '@components/form/PasswordField'
import { Result } from '@util/result'

const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export async function loginUser(state: FormActionState, formData: FormData) {
  const result = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (result.error) {
    return Result.failure({
      code: 'validation:failure',
      message: result.error.message,
    })
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword(result.data)

  if (error) {
    return Result.failure({
      code: 'sign-in:failure',
      message: error.message,
    })
  }

  redirect('/home')
}
