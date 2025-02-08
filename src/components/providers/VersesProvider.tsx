'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Verse } from 'src/service/verse/types'

type verseContext = {
  verses: Verse[]
  setVerses: Dispatch<SetStateAction<Verse[]>>
}
export const VersesContext = createContext<verseContext>({
  verses: [],
  setVerses: () => {},
})

export default function VersesProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  const [verseState, setVerseState] = useState<Verse[]>([])

  return (
    <VersesContext.Provider
      value={{
        verses: verseState,
        setVerses: setVerseState,
      }}
    >
      {children}
    </VersesContext.Provider>
  )
}
