'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { VerseSuggestion as VerseSuggestionType } from '@components/discover/actions'
import { Plus } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Verses } from '@util/verses'
import { api } from '@lib/trpc/client'
import { useRouter } from 'next/navigation'
import { VerseBuilder } from 'service/verse'

export const VerseSuggestion = ({ verse }: { verse: VerseSuggestionType }) => {
  const verseReferenceResult = Verses.parseReference(verse.reference)
  const addVerseMutation = api.verse.add.useMutation()
  const router = useRouter()

  const addVerse = async () => {
    if (!verseReferenceResult.hasValue) {
      return
    }

    const builder = VerseBuilder.init(null)
    builder.book = verseReferenceResult.value.book
    builder.chapter = verseReferenceResult.value.chapter
    builder.start = verseReferenceResult.value.start
    builder.end = verseReferenceResult.value.end
    builder.text = verse.text
    const newVerse = VerseBuilder.toVerse(builder)

    if (!newVerse.hasValue) {
      console.log(newVerse.error)
      return
    }
    try {
      const response = await addVerseMutation.mutateAsync(newVerse.value)
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
