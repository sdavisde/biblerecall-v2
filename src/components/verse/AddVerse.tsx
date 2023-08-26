'use client'

import { useState } from 'react'
import Lightbox from '@components/common/Lightbox'
import UpdateVerse from '@components/verse/UpdateVerse'
import { addVerse } from '@lib/verses'
import { Verse } from '@app/api/verse/util'
import { useVerses } from 'hooks/verses'

type AddVerseProps = {}
const AddVerse = ({}: AddVerseProps) => {
  const [verses, setVerses] = useVerses()
  const [addingVerse, setAddingVerse] = useState(false)

  const submitNewVerse = async (verse: Verse) => {
    // non null assertion is okay because validateReference guarantees verse is defined
    setVerses([verse, ...verses])
    await addVerse(verse)
    setTimeout(() => {
      setAddingVerse(false)
    }, 400)
  }

  return (
    <>
      {addingVerse ? (
        <div className='w-full'>
          <UpdateVerse
            reference=''
            text=''
            version='ESV'
            onSubmit={submitNewVerse}
          />
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
