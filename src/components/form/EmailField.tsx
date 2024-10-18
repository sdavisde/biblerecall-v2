import { z } from 'zod'
import { InputField, InputFieldProps } from './Field'

export const emailSchema = z.string().min(1, 'Email is required').email('Invalid email format')

type PasswordFieldProps = Pick<InputFieldProps, 'register' | 'placeholder' | 'error'>
export const EmailField = (props: PasswordFieldProps) => {
  return (
    <InputField
      type='email'
      label='Email'
      {...props}
    />
  )
}
