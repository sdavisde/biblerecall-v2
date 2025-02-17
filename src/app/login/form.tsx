'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogin } from '@components/auth/google'
import { Separator } from '@components/ui/separator'
import { PasswordField, passwordSchema } from '@components/form/PasswordField'
import { EmailField, emailSchema } from '@components/form/EmailField'
import { loginUser } from './actions'
import { CardDescription } from '@components/ui/card'
import { FormButton } from '@components/form/form-button'

// Define Zod schema
export type LoginFormData = z.infer<typeof formSchema>
const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export function LoginForm() {
  const {
    register,
    setError,
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })

  return (
    <>
      <div
        className='flex flex-col gap-4'
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <GoogleLogin />
        <Separator label='or' />
      </div>
      <form
        className='grid gap-4'
        action={loginUser}
      >
        <CardDescription>Enter your email below to login to your account</CardDescription>
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
        <FormButton className='w-full'>Login</FormButton>
      </form>
    </>
  )
}
