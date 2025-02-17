'use client'

import { Button, ButtonProps } from '@components/ui/button'
import { useFormStatus } from 'react-dom'

export function FormButton(props: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button
      {...props}
      loading={pending}
    />
  )
}
