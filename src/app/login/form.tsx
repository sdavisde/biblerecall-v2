'use client'

import { z } from 'zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@components/ui/button'
import { GoogleLogin } from '@components/auth/google'
import { Separator } from '@components/ui/separator'
import { PasswordField, passwordSchema } from '@components/form/PasswordField'
import { EmailField, emailSchema } from '@components/form/EmailField'
import Link from 'next/link'
import { createClient } from '@lib/supabase/client'
import { signUpNewUser } from './actions'

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
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })
  const router = useRouter()

  async function handleCredentialsLogin(data: LoginFormData) {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      console.log(error)
      setError('root', { message: error.message })
      return
    }
    router.push('/home')
  }

  return (
    <form className='grid gap-4'>
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
          SecondaryLabel={
            <Link
              href='/reset-password'
              className='ml-auto inline-block text-sm underline'
            >
              Forgot your password?
            </Link>
          }
        />
      </div>
      {errors.root?.message && <p className='text-destructive text-center'>{errors.root.message}</p>}
      <Button
        type='button'
        className='w-full'
        loading={isSubmitting}
        onClick={async () => {
          const valid = await trigger()
          if (valid) {
            handleCredentialsLogin(watch())
          }
        }}
      >
        Login
      </Button>
      <Button
        type='button'
        variant='outline'
        className='w-full'
        loading={isSubmitting}
        onClick={async () => {
          const valid = await trigger()
          if (valid) {
            signUpNewUser(watch())
          }
        }}
      >
        Sign Up
      </Button>
      <div
        className='flex flex-col gap-4'
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <Separator label='or' />
        <GoogleLogin />
      </div>
    </form>
  )
}
