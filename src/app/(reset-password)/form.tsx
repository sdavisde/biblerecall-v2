'use client'

import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@components/ui/button'
import { EmailField, emailSchema } from '@components/form/EmailField'
import { useState } from 'react'
import { PasswordField, passwordSchema } from '@components/form/PasswordField'
import { createClient } from '@lib/supabase/client'

// Define Zod schema
type FormData = z.infer<typeof formSchema>
const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
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
  const [showPasswordField, setShowPasswordField] = useState(false)

  async function sendPasswordReset({ email, password }: FormData) {
    const supabase = createClient()
    await supabase.auth.updateUser({ email, password })
  }

  return (
    <form
      onSubmit={handleSubmit(sendPasswordReset)}
      className='grid gap-4'
    >
      <div className='grid gap-2'>
        {!showPasswordField ? (
          <EmailField
            placeholder='m@example.com'
            register={register('email')}
            error={errors.email}
          />
        ) : (
          <PasswordField
            register={register('password')}
            error={errors.password}
          />
        )}
      </div>
      {!showPasswordField ? (
        <Button
          variant='outline'
          className='w-full'
          onClick={() => setShowPasswordField(true)}
        >
          Enter New Password
        </Button>
      ) : (
        <Button
          type='submit'
          className='w-full'
          loading={isSubmitting}
        >
          Update Password
        </Button>
      )}
    </form>
  )
}
