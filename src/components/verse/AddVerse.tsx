'use client'

import { useState } from 'react'
import Lightbox from '@components/common/Lightbox'
import UpdateVerse from '@components/verse/UpdateVerse'
import { Verse } from '@lib/util'
import { useVerses } from 'hooks/verses'
import OutsideAlerter from 'hooks/click'
import useOutsideClick from 'hooks/click'

type AddVerseProps = {}
const AddVerse = ({}: AddVerseProps) => {
  const [, dispatchVerses] = useVerses()
  const [addingVerse, setAddingVerse] = useState(false)
  const { ref } = useOutsideClick(() => setAddingVerse(false))

  const submitNewVerse = async (verse: Verse) => {
    // non null assertion is okay because validateReference guarantees verse is defined
    dispatchVerses(verse, 'add')
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
          <Lightbox className='rounded'>
            <h5 className='centered'>+ Add Verse</h5>
          </Lightbox>
        </div>
      )}
    </>
  )
}

export default AddVerse
