'use client'

import { FormEventHandler, useState } from 'react'
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import Lightbox from '@components/Lightbox'
import Darkbox from '@components/Darkbox'

type AddVerseProps = {}
const AddVerse = ({}: AddVerseProps) => {
  const [addingVerse, setAddingVerse] = useState(false)
  const [verseReference, setVerseReference] = useState('')
  const [version, setVersion] = useState('esv')

  const submitNewVerse: FormEventHandler<HTMLFormElement> = (e) => {
    console.log(e)
    e.preventDefault()
  }

  return (
    <>
      {addingVerse ? (
        <div className='w-full'>
          <form onSubmit={submitNewVerse}>
            <Lightbox className='text-center'>
              <Input
                autoFocus
                placeholder='Enter Verse Reference'
                value={verseReference}
                onChange={(e) => setVerseReference(e.target.value)}
                classes={{
                  input: 'text-center after:border-green',
                }}
              ></Input>
            </Lightbox>
            <Darkbox>
              <div className='w-[95%] flex flex-row justify-between bg-lightGrey text-darkGrey text-sm'>
                <textarea
                  placeholder='Verse text will display here when you enter a reference'
                  className='bg-inherit w-4/5 resize-none'
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
