'use client'

import { useState } from 'react'
import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CircularProgress from '@mui/material/CircularProgress'
import Lightbox from '@components/common/Lightbox'
import Darkbox from '@components/common/Darkbox'
import { Verse, createVerse } from '@lib/util'

type UpdateVerseProps = {
  id: string
  reference: string
  text: string
  version: string
  onSubmit: (verse: Verse) => Promise<void>
}
const UpdateVerse = (props: UpdateVerseProps) => {
  const [reference, setReference] = useState(props.reference)
  const [verseText, setVerseText] = useState(props.text)
  const [version, setVersion] = useState(props.version)
  const [loading, setLoading] = useState(false)

  const submitNewVerse = async () => {
    const verse = createVerse(reference, props.id, verseText, version)

    if (verse && !loading && verseText !== '' && validateReference(reference)) {
      props.onSubmit(verse)
    }
  }

  const onVerseUpdate = async (reference: string) => {
    setReference(reference)

    const verse = validateReference(reference)
    if (verse) {
      setLoading(true)
      const { verseText } = await fetch(`/api/bible?reference=${reference}&version=${version}`).then((res) =>
        res.json()
      )
      setVerseText(verseText)
      setLoading(false)
    } else {
      setVerseText('')
    }
  }

  const validateReference = (reference: string) => {
    const verse = createVerse(reference, props.id)
    if (verse && verse.book && verse.chapter && verse.start) {
      return verse
    }
    return null
  }

  return (
    <form action={() => submitNewVerse()}>
      <Lightbox className='centered font'>
        <div className='w-[10%]' />
        <Input
          autoFocus
          type='text'
          placeholder='Enter Verse Reference'
          value={reference}
          onChange={(e) => onVerseUpdate(e.target.value)}
          classes={{
            input: 'text-center after:border-green text-base font-base',
          }}
        ></Input>
        <button
          type='submit'
          className='w-[10%]'
        >
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
  )
}

export default UpdateVerse
