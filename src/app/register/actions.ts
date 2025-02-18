'use server'

import { FormActionState } from '@components/form/common'
import { emailSchema } from '@components/form/EmailField'
import { passwordSchema } from '@components/form/PasswordField'
import { createClient } from '@lib/supabase/server'
import { Result } from '@util/result'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signUpFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: emailSchema,
  password: passwordSchema,
})

export async function signUpNewUser(state: FormActionState, formData: FormData): Promise<FormActionState> {
  const result = signUpFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (result.error) {
    return Result.failure({
      code: 'validation:failed',
      message: result.error.message,
    })
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      emailRedirectTo: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/x/home`,
      data: {
        first_name: result.data.firstName,
        last_name: result.data.lastName,
      },
    },
  })

  if (error) {
    return Result.failure({
      code: 'signup:failed',
      message: error.message,
    })
  }

  redirect('/x/home')
}
