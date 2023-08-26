'use client'

import { VersesContext } from '@components/VersesProvider'
import { useContext, useEffect, useState } from 'react'

export const useVerses = () => {
  const { verses, setVerses } = useContext(VersesContext)

  return [verses, setVerses] as const
}
