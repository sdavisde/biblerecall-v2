'use client'

import { useVerses } from 'src/hooks/use-verses'
import { Verse } from 'src/service/verse/types'
import { VerseSelector } from './VerseSelector'
import { Button } from '@components/ui/button'

type AddVerseProps = {}
const AddVerse = ({}: AddVerseProps) => {
  const [, dispatchVerses] = useVerses()

  const submitNewVerse = async (verse: Verse) => {
    // non null assertion is okay because validateReference guarantees verse is defined
    return await dispatchVerses(verse, 'add')
  }

  return (
    <VerseSelector submitVerse={submitNewVerse}>
      <Button
        variant='outline'
        className='w-full'
        size='lg'
        asDiv
      >
        + Add Verse
      </Button>
    </VerseSelector>
  )
}

export default AddVerse
