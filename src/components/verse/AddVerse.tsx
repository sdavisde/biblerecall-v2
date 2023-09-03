'use client'

import { useState } from 'react'
import Lightbox from '@components/common/Lightbox'
import UpdateVerse from '@components/verse/UpdateVerse'
import { addVerse } from '@lib/api/verses'
import { Verse } from '@lib/util'
import { useVerses } from 'hooks/verses'
import OutsideAlerter from 'hooks/click'

type AddVerseProps = {}
const AddVerse = ({}: AddVerseProps) => {
  const [verses, dispatchVerses] = useVerses()
  const [addingVerse, setAddingVerse] = useState(false)

  const submitNewVerse = async (verse: Verse) => {
    // non null assertion is okay because validateReference guarantees verse is defined
    dispatchVerses(verse, 'add')
    setAddingVerse(false)
  }

  return (
    <>
      {addingVerse ? (
        <div className='w-full'>
          <OutsideAlerter onOutsideClick={() => setAddingVerse(false)}>
            <UpdateVerse
              id=''
              reference=''
              text=''
              version='ESV'
              onSubmit={submitNewVerse}
            />
          </OutsideAlerter>
        </div>
      ) : (
        <div
          onClick={() => setAddingVerse((prev) => !prev)}
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
