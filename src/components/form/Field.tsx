import { JSX } from 'react'
import { cn } from '@components/lib/utils'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

export type InputFieldProps = {
  label: string
  register: UseFormRegisterReturn
  error?: FieldError
  type?: HTMLInputElement['type']
  placeholder?: string
  className?: string
  SecondaryLabel?: JSX.Element
}
export const InputField: React.FC<InputFieldProps> = ({
  label,
  register,
  error,
  type = 'text',
  placeholder = '',
  className = '',
  SecondaryLabel = <></>,
}) => {
  return (
    <div className={cn(className, 'w-full flex flex-wrap')}>
      <div className='w-full flex items-center justify-between mb-2'>
        <Label className='input-label'>{label}</Label>
        {SecondaryLabel}
      </div>
      <Input
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && <p className='text-destructive text-sm'>{error.message}</p>}
    </div>
  )
}
