'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { VerseSuggestion as VerseSuggestionType } from '@components/discover/actions'
import { Plus } from 'lucide-react'
import { Button } from '@components/ui/button'
import { api } from '@lib/trpc/client'
import { useRouter } from 'next/navigation'

export const VerseSuggestion = ({ verse }: { verse: VerseSuggestionType }) => {
  const addVerseMutation = api.verseSuggestions.add.useMutation()
  const router = useRouter()

  const addVerse = async () => {
    try {
      const response = await addVerseMutation.mutateAsync(verse)
      if (response.hasValue) {
        router.push('/home/verses')
      } else {
        throw Error(response.error.message)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Alert key={verse.reference}>
      <AlertTitle className='text-base'>{verse.reference}</AlertTitle>
      <AlertDescription className='w-full flex justify-between gap-2'>
        <span className='w-[90%]'>{verse.text}</span>
        <Button
          variant='default'
          size='icon'
          className='w-12 h-12'
          onClick={addVerse}
        >
          <Plus />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
