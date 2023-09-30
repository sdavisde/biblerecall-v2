'use client'

import { useEffect, useRef, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Lightbox from '@components/common/Lightbox'
import Darkbox from '@components/common/Darkbox'
import { Verse, createVerse, isValidReference } from '@lib/util'
import useVersions from 'hooks/use-versions'
import LoadingDots from '@components/loading/LoadingDots'

type UpdateVerseProps = {
  id: string
  reference: string
  text: string
  version?: string
  onSubmit: (verse: Verse) => Promise<void>
}
const UpdateVerse = (props: UpdateVerseProps) => {
  const [reference, setReference] = useState(props.reference)
  const [verseText, setVerseText] = useState(props.text)
  const [version, setVersion] = useState(props.version ?? 'ESV')
  const [loading, setLoading] = useState(false)
  const versions = useVersions()
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const updateVerseText = async () => {
      if (isValidReference(reference)) {
        setLoading(true)
        const { verseText, verseReference } = await fetch(`/api/bible?reference=${reference}&version=${version}`).then(
          (res) => res.json()
        )
        if (verseReference === input.current?.value) {
          setVerseText(verseText)
        }
        setLoading(false)
      } else {
        setVerseText('')
      }
    }
    updateVerseText()
  }, [reference, version])

  const submitNewVerse = async () => {
    const verse = createVerse(reference, { id: props.id, text: verseText, version })

    if (verse && !loading && verseText !== '' && isValidReference(reference)) {
      props.onSubmit(verse)
    }
  }

  return (
    <form action={() => submitNewVerse()}>
      <Lightbox className='centered font'>
        <div className='w-[10%]' />
        <input
          autoFocus
          type='text'
          placeholder='Enter Verse Reference'
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className='text-center after:border-green text-base font-base'
          ref={input}
        ></input>
        <button
          type='submit'
          className='w-[10%]'
        >
          <ArrowForwardIcon />
        </button>
      </Lightbox>
      <Darkbox>
        <div className='w-[95%] flex flex-row gap-2 justify-between text-sm'>
          <textarea
            placeholder='Verse text will display here when you enter a reference'
            value={verseText}
            onChange={(e) => setVerseText(e.target.value)}
            className='bg-inherit w-4/5 resize-none text-black dark:text-white text-sm'
          />
          {loading && <LoadingDots />}
          <div className='w-1/5 flex flex-col'>
            <label id='version-label'>Version</label>
            <select
              id='version-select'
              value={version}
              className='w-fit border-black border-2 dark:border-darkGrey rounded p-2 text-black dark:text-white dark:bg-darkerGrey'
              onChange={(e) => setVersion(e.target.value)}
            >
              {versions?.map((version) => (
                <option
                  key={version.abbreviation}
                  value={version.abbreviation}
                >
                  {version.abbreviation}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Darkbox>
    </form>
  )
}

export default UpdateVerse
