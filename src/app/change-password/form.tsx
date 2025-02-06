'use client'

import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@components/ui/button'
import { PasswordField, passwordSchema } from '@components/form/PasswordField'

// Define Zod schema
type FormData = z.infer<typeof formSchema>
const formSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters long'), // Ensure it's at least the same length
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // This will highlight the confirmPassword field
  })

export function ChangePasswordForm({ code }: { code: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })
  const router = useRouter()

  const updatePassword = async ({ confirmPassword }: FormData) => {
    // await confirmPasswordReset(code, confirmPassword)
    router.push('/login')
  }

  return (
    <form
      onSubmit={handleSubmit(updatePassword)}
      className='grid gap-4'
    >
      <div className='grid gap-2'>
        <PasswordField
          register={register('password')}
          error={errors.password}
        />
      </div>
      <div className='grid gap-2'>
        <PasswordField
          register={register('confirmPassword')}
          error={errors.confirmPassword}
          label='Confirm Password'
        />
      </div>
      <Button
        type='submit'
        className='w-full'
        loading={isSubmitting}
      >
        Set Password
      </Button>
    </form>
  )
}
