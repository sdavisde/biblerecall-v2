'use client'

import { Verse } from '@lib/util'
import { VersesContext } from '@components/providers/VersesProvider'
import { addVerse, deleteVerse, updateVerse } from '@lib/api'
import { useContext } from 'react'

export const useVerses = () => {
  const { verses, setVerses } = useContext(VersesContext)

  const setNewVerses = async (verse: Verse, action: 'add' | 'update' | 'delete') => {
    switch (action) {
      case 'add':
        setVerses([verse, ...verses])
        return await addVerse(verse)
      case 'update':
        setVerses([...verses.filter((v) => v.id !== verse.id), verse])
        return await updateVerse(verse)
      case 'delete':
        setVerses(verses.filter((v) => v.id !== verse.id))
        return await deleteVerse(verse.id)
    }
  }

  return [verses, setNewVerses] as const
}
