import { z } from 'zod'
import { InputField, InputFieldProps } from './Field'
import Link from 'next/link'

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long') // Minimum length
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // Uppercase letter
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter') // Lowercase letter
  .regex(/\d/, 'Password must contain at least one number') // Number
// .regex(/[\W_]/, 'Password must contain at least one special character'), // Special character

type PasswordFieldProps = Pick<InputFieldProps, 'register' | 'error' | 'SecondaryLabel'> & {
  label?: string
}
export const PasswordField = ({ label = 'Password', ...props }: PasswordFieldProps) => {
  return (
    <InputField
      type='password'
      label={label}
      {...props}
    />
  )
}
