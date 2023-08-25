'use client'

import { FormEventHandler, startTransition, useState } from 'react'
import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Lightbox from '@components/Lightbox'
import Darkbox from '@components/Darkbox'
import { addVerse } from '@app/actions'
import { createVerse } from '@app/api/verse/util'

type AddVerseProps = {}
const AddVerse = ({}: AddVerseProps) => {
  const [addingVerse, setAddingVerse] = useState(false)
  const [verseReference, setVerseReference] = useState('')
  const [verseText, setVerseText] = useState('')
  const [version, setVersion] = useState('esv')

  // const submitNewVerse: FormEventHandler<HTMLFormElement> = (e) => {
  //   console.log(e)
  //   e.preventDefault()
  // }

  const onVerseUpdate = async (reference: string) => {
    setVerseReference(reference)

    const validated = validateReference(reference)
    if (validated) {
      const { verseText } = await (
        await fetch(`/api/verse?reference=${reference}&version=${version}`)
      ).json()
      setVerseText(verseText)
    }
  }

  const validateReference = (reference: string) => {
    const verse = createVerse(reference)
    return verse && verse.book && verse.chapter && verse.verse
  }

  return (
    <>
      {addingVerse ? (
        <div className='w-full'>
          <form action={() => addVerse(verseReference, verseText, version)}>
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
                  className='bg-inherit w-4/5 resize-none text-black'
                />
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
                      <MenuItem value='esv'>ESV</MenuItem>
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
          <Lightbox>
            <h5 className='centered'>+ Add Verse</h5>
          </Lightbox>
        </div>
      )}
    </>
  )
}

export default AddVerse
