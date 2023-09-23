'use client'

import { useContext } from 'react'
import { API_RESPONSE, Verse, makeReference } from '@lib/util'
import { VersesContext } from '@components/providers/VersesProvider'
import { addVerse, deleteVerse, updateVerse } from '@lib/api'
import toast from 'react-hot-toast'

export const useVerses = () => {
  const { verses, setVerses } = useContext(VersesContext)

  const setNewVerses = async (verse: Verse, action: 'add' | 'update' | 'delete') => {
    let res: API_RESPONSE
    switch (action) {
      case 'add':
        res = await addVerse(verse)
        if (res.SUCCESS) {
          setVerses([res.DATA, ...verses])
          toast.success(`Added ${makeReference(verse)}`)
        } else {
          toast.error(res.RESPONSE)
        }
        break
      case 'update':
        res = await updateVerse(verse)
        if (res.SUCCESS) {
          setVerses([...verses.filter((v) => v.id !== verse.id), res.DATA])
          toast.success('Updated verse')
        } else {
          toast.error(res.RESPONSE)
        }
        break
      case 'delete':
        res = await deleteVerse(verse.id)
        if (res.SUCCESS) {
          setVerses(verses.filter((v) => v.id !== verse.id))
          toast.success(res.RESPONSE)
        } else {
          toast.error(res.RESPONSE)
        }
        break
    }
  }

  return [verses, setNewVerses] as const
}
