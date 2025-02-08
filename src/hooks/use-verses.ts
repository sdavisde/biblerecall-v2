'use client'

import toast from 'react-hot-toast'
import { api } from '@lib/trpc/client'
import { Verse } from 'src/service/verse/types'
import { Verses } from '@util/verses'
import { Result } from '@util/result'

type UseVersesValue = {
  dispatchVerses: (verse: Verse, action: 'add' | 'update' | 'delete') => Promise<Result<Verse | null>>
  isMutating: boolean
}

export const useVerses = (): UseVersesValue => {
  const utils = api.useUtils()

  const invalidateVerses = () => utils.verse.allByUser.invalidate()

  const addMutation = api.verse.add.useMutation()
  const updateMutation = api.verse.update.useMutation()
  const deleteMutation = api.verse.delete.useMutation()
  const isMutating = addMutation.isPending || updateMutation.isPending || deleteMutation.isPending

  const dispatchVerses = async (verse: Verse, action: 'add' | 'update' | 'delete') => {
    switch (action) {
      case 'add':
        const addResult = await addMutation.mutateAsync(verse)
        if (addResult.hasValue) {
          invalidateVerses()
          toast.success(`Added ${Verses.stringifyReference(verse)}`)
        } else {
          toast.error(addResult.error.message)
        }
        return addResult
      case 'update':
        const updateResult = await updateMutation.mutateAsync(verse)
        if (updateResult.hasValue) {
          invalidateVerses()
          toast.success('Updated verse')
        } else {
          toast.error(updateResult.error.message)
        }
        return updateResult
      case 'delete':
        const deleteResult = await deleteMutation.mutateAsync(verse.id)
        if (deleteResult.hasValue) {
          invalidateVerses()
          toast.success(`Removed ${Verses.stringifyReference(verse)}`)
        } else {
          toast.error(deleteResult.error.message)
        }
        return deleteResult
    }
  }

  return {
    dispatchVerses,
    isMutating,
  }
}
