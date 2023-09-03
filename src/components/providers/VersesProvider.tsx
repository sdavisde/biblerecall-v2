'use client'

import { Verse } from '@lib/util'
import { createContext, useState } from 'react'

type verseContext = {
  verses: Verse[]
  setVerses: (newVerses: Verse[]) => void
}
export const VersesContext = createContext<verseContext>({
  verses: [],
  setVerses: (newVerses: Verse[]) => {},
})

export default function VersesProvider({
  children,
  verses,
}: {
  children: React.ReactNode
  verses: Verse[]
}): React.ReactNode {
  const [verseState, setVerseState] = useState<Verse[]>(verses)

  const updateVerseState = (newVerses: Verse[]) => {
    setVerseState(newVerses)
  }

  return (
    <VersesContext.Provider
      value={{
        verses: verseState,
        setVerses: updateVerseState,
      }}
    >
      {children}
    </VersesContext.Provider>
  )
}
