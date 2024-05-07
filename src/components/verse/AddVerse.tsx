'use client'

import { useState } from 'react'
import Lightbox from '@components/common/Lightbox'
import UpdateVerse from '@components/verse/UpdateVerse'
import { useVerses } from 'hooks/verses'
import useOutsideClick from 'hooks/click'
import { Verse } from 'types/verse'

type AddVerseProps = {}
const AddVerse = ({}: AddVerseProps) => {
  const [, dispatchVerses] = useVerses()
  const [addingVerse, setAddingVerse] = useState(false)
  const { ref } = useOutsideClick(() => setAddingVerse(false))

  const submitNewVerse = async (verse: Verse) => {
    // non null assertion is okay because validateReference guarantees verse is defined
    await dispatchVerses(verse, 'add')
    setAddingVerse(false)
  }

  return (
    <>
      {addingVerse ? (
        <div
          className='w-full'
          ref={ref}
        >
          <UpdateVerse
            id=''
            reference=''
            text=''
            onSubmit={submitNewVerse}
          />
        </div>
      ) : (
        <div
          onClick={() => setAddingVerse(true)}
          className='w-full hover:cursor-pointer'
        >
          <Lightbox className='rounded dark:!bg-charcoal'>
            <h5 className='centered'>+ Add Verse</h5>
          </Lightbox>
        </div>
      )}
    </>
  )
}

export default AddVerse
