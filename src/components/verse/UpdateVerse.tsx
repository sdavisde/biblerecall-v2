'use client'

import { useRef, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import Lightbox from '@components/common/Lightbox'
import Darkbox from '@components/common/Darkbox'
import LoadingDots from '@components/loading/LoadingDots'
import toast from 'react-hot-toast'
import { Verse } from 'types/verse'
import { Verses } from '@util/bible'
import { api } from '@lib/trpc/client'
import { Lodash } from '@util/lodash'

type UpdateVerseProps = {
  id: string
  reference: string
  text: string
  version?: string
  onSubmit: (verse: Verse) => Promise<void>
}
const UpdateVerse = (props: UpdateVerseProps) => {
  const [reference, setReference] = useState(props.reference)
  const [version, setVersion] = useState(props.version ?? 'ESV')
  const versions = api.bible.getVersions.useQuery()
  const verseText = api.bible.getVerse.useQuery({ reference, version })
  const input = useRef<HTMLInputElement>(null)

  const submitNewVerse = async () => {
    const text = verseText.data?.hasValue ? verseText.data.value.verseText : ''
    const verse = Verses.createVerse(reference, { id: props.id, text: text, version })

    if (!verse.hasValue) {
      console.error(verse.error)
      toast.error('Invalid reference format, please enter your verse like: John 3:16 or John 3:16-17')
    } else if (!verse) {
      toast.error('Error adding verse, check that the verse is using the correct format')
    } else if (Lodash.isEmpty(text)) {
      toast.error('Could not find verse, does this verse exist?')
    } else if (!verseText.isLoading && !verseText.isFetching) {
      await props.onSubmit(verse.value)
    }
  }

  return (
    <form onSubmit={submitNewVerse}>
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
          <IoIosArrowForward />
        </button>
      </Lightbox>
      <Darkbox>
        <div className='w-[95%] flex flex-row gap-2 justify-between text-sm relative'>
          <textarea
            placeholder='Verse text will display here when you enter a reference'
            value={!verseText.isLoading && verseText.data?.hasValue ? verseText.data.value.verseText : props.text}
            onChange={(e) => setReference(e.target.value)}
            className='bg-inherit w-4/5 resize-none text-black dark:text-white text-sm focus:outline-none'
          />
          {verseText.isLoading && (
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
                  {versions.data?.hasValue &&
                    versions.data.value?.map((version) => (
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
