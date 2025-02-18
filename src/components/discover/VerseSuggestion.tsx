'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { VerseSuggestion as VerseSuggestionType } from '@components/discover/actions'
import { Plus } from 'lucide-react'
import { Button } from '@components/ui/button'
import { useRouter } from 'next/navigation'
import { addVerseSuggestion } from 'src/server/routers/verse-suggestions'
import { FormButton } from '@components/form/form-button'

export const VerseSuggestion = ({ verse }: { verse: VerseSuggestionType }) => {
  const router = useRouter()

  const addVerse = async () => {
    try {
      const response = await addVerseSuggestion(verse)
      if (response.hasValue) {
        router.push('/x/verses')
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
        <form action={addVerse}>
          <FormButton
            variant='default'
            size='icon'
            className='w-12 h-12'
          >
            <Plus />
          </FormButton>
        </form>
      </AlertDescription>
    </Alert>
  )
}
