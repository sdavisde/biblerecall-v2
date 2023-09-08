'use client'

import { Verse } from '@lib/util'
import { VersesContext } from '@components/providers/VersesProvider'
import { addVerse, deleteVerse, updateVerse } from '@lib/api'
import { useContext } from 'react'

export const useVerses = () => {
  const { verses, setVerses } = useContext(VersesContext)

  const setNewVerses = async (verse: Verse, action: 'add' | 'update' | 'delete') => {
    let res = null
    switch (action) {
      case 'add':
        res = await addVerse(verse)
        setVerses([verse, ...verses])
        return res
      case 'update':
        res = await updateVerse(verse)
        setVerses([...verses.filter((v) => v.id !== verse.id), verse])
        return res
      case 'delete':
        res = await deleteVerse(verse.id)
        setVerses(verses.filter((v) => v.id !== verse.id))
        return res
    }
  }

  return [verses, setNewVerses] as const
}
