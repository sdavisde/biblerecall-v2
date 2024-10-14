'use client'

import { useContext } from 'react'
import { VersesContext } from '@components/providers/VersesProvider'
import toast from 'react-hot-toast'
import { api } from '@lib/trpc/client'
import { Verse } from 'service/verse/types'
import { Verses } from '@util/verses'

export const useVerses = () => {
  const { verses, setVerses } = useContext(VersesContext)
  const addMutation = api.verse.add.useMutation()
  const updateMutation = api.verse.update.useMutation()
  const deleteMutation = api.verse.delete.useMutation()

  const setNewVerses = async (verse: Verse, action: 'add' | 'update' | 'delete') => {
    switch (action) {
      case 'add':
        const addResult = await addMutation.mutateAsync(verse)
        if (addResult.hasValue) {
          setVerses([addResult.value, ...verses])
          toast.success(`Added ${Verses.stringifyReference(verse)}`)
        } else {
          toast.error(addResult.error.message)
        }
        return addResult
      case 'update':
        const updateResult = await updateMutation.mutateAsync(verse)
        if (updateResult.hasValue) {
          setVerses([...verses.filter((v) => v.id !== verse.id), verse])
          toast.success('Updated verse')
        } else {
          toast.error(updateResult.error.message)
        }
        return updateResult
      case 'delete':
        const deleteResult = await deleteMutation.mutateAsync(verse.id)
        if (deleteResult.hasValue) {
          setVerses(verses.filter((v) => v.id !== verse.id))
          toast.success(`Removed ${Verses.stringifyReference(verse)}`)
        } else {
          toast.error(deleteResult.error.message)
        }
        return deleteResult
    }
  }

  return [verses, setNewVerses] as const
}
