'use client'

import { VerseDto } from '@app/api/verse/util'
import { createContext } from 'react'

const emptyVerses: VerseDto[] = []
export const VersesContext = createContext(emptyVerses)

export default function VersesProvider({
  children,
  verses,
}: {
  children: React.ReactNode
  verses: VerseDto[]
}): React.ReactNode {
  return <VersesContext.Provider value={verses}>{children}</VersesContext.Provider>
}
