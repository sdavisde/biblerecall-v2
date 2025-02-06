'use client'

import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@components/ui/button'
import { EmailField, emailSchema } from '@components/form/EmailField'

// Define Zod schema
type FormData = z.infer<typeof formSchema>
const formSchema = z.object({
  email: emailSchema,
})

export function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })
  const router = useRouter()

  async function sendPasswordReset({ email }: FormData) {
    // await initPasswordResetProcess(email)
  }

  return (
    <form
      onSubmit={handleSubmit(sendPasswordReset)}
      className='grid gap-4'
    >
      <div className='grid gap-2'>
        <EmailField
          placeholder='m@example.com'
          register={register('email')}
          error={errors.email}
        />
      </div>
      <Button
        type='submit'
        className='w-full'
        loading={isSubmitting}
      >
        Send Password Reset Email
      </Button>
    </form>
  )
}
