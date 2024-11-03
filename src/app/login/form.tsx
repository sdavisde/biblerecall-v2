'use client'

import { z } from 'zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@components/ui/button'
import { GoogleLogin } from '@components/auth/google'
import { Separator } from '@components/ui/separator'
import { signInWithCredentials, signInAsGuest } from '@lib/firebase'
import { PasswordField, passwordSchema } from '@components/form/PasswordField'
import { EmailField, emailSchema } from '@components/form/EmailField'
import Link from 'next/link'

// Define Zod schema
type FormData = z.infer<typeof formSchema>
const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })
  const router = useRouter()

  async function handleCredentialsLogin({ email, password }: FormData) {
    const user = await signInWithCredentials(email, password)
    if (!user.hasValue) {
      setError('root', user.error)
      return
    }
    router.push('/home')
  }
  const handleAnonymousLogin = async () => {
    const user = await signInAsGuest()
    if (!user.hasValue) {
      toast.error('Failed to login as guest. Please reload the page and try again')
      return
    }
    router.push('/home')
  }

  return (
    <form
      onSubmit={handleSubmit(handleCredentialsLogin)}
      className='grid gap-4'
    >
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
      {errors.root?.message && <p className='text-darkRed text-center'>{errors.root.message}</p>}
      <Button
        type='submit'
        className='w-full'
        loading={isSubmitting}
      >
        Login
      </Button>
      <div
        className='flex flex-col gap-4'
        onClick={(e) => e.stopPropagation()}
      >
        <Separator label='or' />
        <GoogleLogin />
        <Button
          type='button'
          variant='outline'
          onClick={handleAnonymousLogin}
        >
          Continue as Guest
        </Button>
      </div>
    </form>
  )
}
