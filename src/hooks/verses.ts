'use client'

import { useContext } from 'react'
import { VersesContext } from '@components/providers/VersesProvider'
import toast from 'react-hot-toast'
import { apiClient } from '@lib/trpc/client'
import { Verse } from 'types/verse'
import { Verses } from '@util/bible'

export const useVerses = () => {
  const { verses, setVerses } = useContext(VersesContext)
  const addMutation = apiClient.verse.add.useMutation()
  const updateMutation = apiClient.verse.update.useMutation()
  const deleteMutation = apiClient.verse.delete.useMutation()

  const setNewVerses = async (verse: Verse, action: 'add' | 'update' | 'delete') => {
    switch (action) {
      case 'add':
        const addResult = await addMutation.mutateAsync(verse)
        if (addResult.hasValue) {
          setVerses([addResult.value, ...verses])
          toast.success(`Added ${Verses.makeReference(verse)}`)
        } else {
          toast.error(addResult.error.message)
        }
        break
      case 'update':
        const updateResult = await updateMutation.mutateAsync(verse)
        if (updateResult.hasValue) {
          setVerses([...verses.filter((v) => v.id !== verse.id), verse])
          toast.success('Updated verse')
        } else {
          toast.error(updateResult.error.message)
        }
        break
      case 'delete':
        const deleteResult = await deleteMutation.mutateAsync(verse.id)
        if (deleteResult.hasValue) {
          setVerses(verses.filter((v) => v.id !== verse.id))
          toast.success(`Removed ${Verses.makeReference(verse)}`)
        } else {
          toast.error(deleteResult.error.message)
        }
        break
    }
  }

  return [verses, setNewVerses] as const
}
