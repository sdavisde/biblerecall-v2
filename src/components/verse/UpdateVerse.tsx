'use client'

import { useEffect, useRef, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Lightbox from '@components/common/Lightbox'
import Darkbox from '@components/common/Darkbox'
import { Verse, createVerse, isValidReference } from '@lib/util'
import useVersions from 'hooks/use-versions'
import LoadingDots from '@components/loading/LoadingDots'
import toast from 'react-hot-toast'

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

    if (!isValidReference(reference)) {
      toast.error('Invalid reference format, please enter your verse like: John 3:16 or John 3:16-17')
    } else if (!verse) {
      toast.error('Error adding verse, check that the verse is using the correct format')
    } else if (verseText === '') {
      toast.error('Could not find verse, does this verse exist?')
    } else if (!loading) {
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
          className='text-center after:border-green text-base font-base border-b-[1px] dark:bg-transparent focus:outline-none'
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
        <div className='w-[95%] flex flex-row gap-2 justify-between text-sm relative'>
          <textarea
            placeholder='Verse text will display here when you enter a reference'
            value={verseText}
            onChange={(e) => setVerseText(e.target.value)}
            className='bg-inherit w-4/5 resize-none text-black dark:text-white text-sm focus:outline-none'
          />
          {loading && (
            <div className='absolute bottom-9 w-20'>
              <LoadingDots />
            </div>
          )}
          <div className='w-1/5 flex justify-end'>
            <div className='flex flex-col'>
              <label id='version-label'>Version</label>
              <div className='myselect'>
                <select
                  id='version-select'
                  value={version}
                  className='w-fit border-black border-[1px] bg-transparent dark:border-darkGrey rounded p-2 text-black dark:text-white dark:bg-darkerGrey'
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
          </div>
        </div>
      </Darkbox>
    </form>
  )
}

export default UpdateVerse
