'use client'

import { useContext } from 'react'
import { API_RESPONSE, Verse } from '@lib/util'
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
          setVerses([verse, ...verses])
          toast.success(res.RESPONSE)
        } else {
          toast.error(res.RESPONSE)
        }
        break
      case 'update':
        res = await updateVerse(verse)
        if (res.SUCCESS) {
          setVerses([...verses.filter((v) => v.id !== verse.id), verse])
        } else {
          toast.error(res.RESPONSE)
        }
        break
      case 'delete':
        console.log('here')
        res = await deleteVerse(verse.id)
        if (res.SUCCESS) {
          setVerses(verses.filter((v) => v.id !== verse.id))
        } else {
          toast.error(res.RESPONSE)
        }
        break
    }
  }

  return [verses, setNewVerses] as const
}
