'use client'

import { createContext, useState } from 'react'
import { Verse } from 'types/verse'

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
  verses: Verse[] | null
}): React.ReactNode {
  const [verseState, setVerseState] = useState<Verse[]>(verses ?? [])

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
