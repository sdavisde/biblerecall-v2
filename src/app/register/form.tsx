'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordField, passwordSchema } from '@components/form/PasswordField'
import { EmailField, emailSchema } from '@components/form/EmailField'
import { CardDescription } from '@components/ui/card'
import { signUpNewUser } from './actions'
import { FormButton } from '@components/form/form-button'
import { InputField } from '@components/form/Field'

// Define Zod schema
export type SigninFormData = z.infer<typeof formSchema>
const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: emailSchema,
  password: passwordSchema,
})

export function SignupForm() {
  const {
    register,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })

  return (
    <>
      <form
        className='grid gap-4'
        action={signUpNewUser}
      >
        <div className='grid gap-2'>
          <InputField
            placeholder='Enter first name'
            label='First name'
            register={register('firstName')}
          />
        </div>
        <div className='grid gap-2'>
          <InputField
            placeholder='Enter last name'
            label='Last name'
            register={register('lastName')}
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
        {errors.root?.message && <p className='text-destructive text-center'>{errors.root.message}</p>}
        <FormButton className='w-full'>Sign Up</FormButton>
      </form>
    </>
  )
}
