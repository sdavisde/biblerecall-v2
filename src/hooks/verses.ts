'use client'

import { VersesContext } from '@components/VersesProvider'
import { useContext } from 'react'

export const useVerses = () => {
  const verses = useContext(VersesContext)
  return verses
}
