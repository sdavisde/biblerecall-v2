'use client'

import { useContext } from 'react'
import { API_RESPONSE, Verse } from '@lib/util'
import { VersesContext } from '@components/providers/VersesProvider'
import { addVerse, deleteVerse, updateVerse } from '@lib/api'
import useDispatchToast from './use-dispatch-toast'

export const useVerses = () => {
  const { verses, setVerses } = useContext(VersesContext)
  const dispatchToast = useDispatchToast()

  const setNewVerses = async (verse: Verse, action: 'add' | 'update' | 'delete') => {
    let res: API_RESPONSE
    switch (action) {
      case 'add':
        res = await addVerse(verse)
        if (res.SUCCESS) {
          setVerses([verse, ...verses])
        } else {
          dispatchToast(res.RESPONSE)
        }
        break
      case 'update':
        res = await updateVerse(verse)
        if (res.SUCCESS) {
          setVerses([...verses.filter((v) => v.id !== verse.id), verse])
        } else {
          dispatchToast(res.RESPONSE)
        }
        break
      case 'delete':
        res = await deleteVerse(verse.id)
        if (res.SUCCESS) {
          setVerses(verses.filter((v) => v.id !== verse.id))
        } else {
          dispatchToast(res.RESPONSE)
        }
        break
    }
  }

  return [verses, setNewVerses] as const
}
