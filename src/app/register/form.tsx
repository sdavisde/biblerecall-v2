'use client'

import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@components/ui/button'
import { signUpWithCredentials } from '@lib/firebase'
import { PasswordField, passwordSchema } from '@components/form/PasswordField'
import { EmailField, emailSchema } from '@components/form/EmailField'

// Define Zod schema
type FormData = z.infer<typeof formSchema>
const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export function SignUpForm() {
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

  async function handleCredentialsSignUp({ email, password }: FormData) {
    const user = await signUpWithCredentials(email, password)
    if (!user.hasValue) {
      setError('root', user.error)
      return
    }
    router.push('/home')
  }

  return (
    <form
      onSubmit={handleSubmit(handleCredentialsSignUp)}
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
        />
      </div>
      {errors.root?.message && <p className='text-darkRed text-center'>{errors.root.message}</p>}
      <Button
        type='submit'
        className='w-full'
        loading={isSubmitting}
      >
        Create Account
      </Button>
    </form>
  )
}
