'use client'

import { VersesContext } from '@components/providers/VersesProvider'
import { useContext } from 'react'

export const useVerses = () => {
  const { verses, setVerses } = useContext(VersesContext)

  return [verses, setVerses] as const
}
