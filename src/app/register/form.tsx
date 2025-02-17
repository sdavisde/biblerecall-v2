'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordField, passwordSchema } from '@components/form/PasswordField'
import { EmailField, emailSchema } from '@components/form/EmailField'
import { signUpNewUser } from './actions'
import { FormButton } from '@components/form/form-button'
import { InputField } from '@components/form/Field'
import { useActionState } from 'react'
import { FormActionState, RootError } from '@components/form/common'

// Define Zod schema
export type SigninFormData = z.infer<typeof signUpFormSchema>
export const signUpFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string(),
  email: emailSchema,
  password: passwordSchema,
})

export function SignupForm() {
  const [state, action] = useActionState<FormActionState, FormData>(signUpNewUser, null)
  const {
    register,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onChange',
  })

  return (
    <>
      <form
        className='grid gap-4'
        action={action}
      >
        <div className='grid gap-2'>
          <InputField
            placeholder='Enter first name'
            label='First name'
            register={register('firstName')}
            error={errors.firstName}
          />
        </div>
        <div className='grid gap-2'>
          <InputField
            placeholder='Enter last name'
            label='Last name'
            register={register('lastName')}
            error={errors.lastName}
          />
        </div>
        <div className='grid gap-2'>
          <EmailField
            placeholder='m@example.com'
            register={register('email')}
            error={errors.email}
          />
        </div>
        <div className='grid gap-2'>
          <PasswordField
            register={register('password')}
            error={errors.password}
          />
        </div>
        <RootError state={state} />
        <FormButton className='w-full'>Sign Up</FormButton>
      </form>
    </>
  )
}
