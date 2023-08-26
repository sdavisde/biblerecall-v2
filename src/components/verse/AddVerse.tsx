'use client'

import { useState } from 'react'
import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CircularProgress from '@mui/material/CircularProgress'
import Lightbox from '@components/common/Lightbox'
import Darkbox from '@components/common/Darkbox'
import { addVerse } from '@lib/verses'
import { createVerse } from '@app/api/verse/util'
import { useVerses } from 'hooks/verses'

type AddVerseProps = {}
const AddVerse = ({}: AddVerseProps) => {
  const [verses, setVerses] = useVerses()
  const [addingVerse, setAddingVerse] = useState(false)
  const [verseReference, setVerseReference] = useState('')
  const [verseText, setVerseText] = useState('')
  const [version, setVersion] = useState('ESV')
  const [loading, setLoading] = useState(false)

  const submitNewVerse = async () => {
    if (validateReference(verseReference) && !loading && verseText !== '') {
      const newVerse = createVerse(verseReference, verseText, version)
      // non null assertion is okay because validateReference guarantees verse is defined
      setVerses([newVerse!, ...verses])
      await addVerse(verseReference, verseText, version)
    }
  }

  const onVerseUpdate = async (reference: string) => {
    setVerseReference(reference)

    const validated = validateReference(reference)
    if (validated) {
      setLoading(true)
      const { verseText } = await fetch(
        `/api/verse?reference=${reference}&version=${version}`
      ).then((res) => res.json())
      setVerseText(verseText)
      setLoading(false)
    } else {
      setVerseText('')
    }
  }

  const validateReference = (reference: string) => {
    const verse = createVerse(reference)
    return verse && verse.book && verse.chapter && verse.start
  }

  return (
    <>
      {addingVerse ? (
        <div className='w-full'>
          <form action={() => submitNewVerse()}>
            <Lightbox className='text-center'>
              <Input
                autoFocus
                type='text'
                placeholder='Enter Verse Reference'
                value={verseReference}
                onChange={(e) => onVerseUpdate(e.target.value)}
                classes={{
                  input: 'text-center after:border-green',
                }}
              ></Input>
              <button type='submit'>
                <ArrowForwardIcon />
              </button>
            </Lightbox>
            <Darkbox>
              <div className='w-[95%] flex flex-row gap-2 justify-between bg-lightGrey text-darkGrey text-sm'>
                <textarea
                  placeholder='Verse text will display here when you enter a reference'
                  value={verseText}
                  onChange={(e) => setVerseText(e.target.value)}
                  className='bg-inherit w-4/5 resize-none text-black text-sm'
                />
                {loading && <CircularProgress color='primary' />}
                <div className='w-1/5'>
                  <FormControl fullWidth>
                    <InputLabel id='version-label'>Version</InputLabel>
                    <Select
                      labelId='version-label'
                      id='version-select'
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      className='bg-inherit text-black'
                      label='Version'
                    >
                      <MenuItem value='ESV'>ESV</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </Darkbox>
          </form>
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
