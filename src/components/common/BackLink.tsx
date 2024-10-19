'use client'

import { PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'

export const BackLink = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter()

  return <button onClick={router.back}>{children}</button>
}
