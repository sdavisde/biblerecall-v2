'use client'

import { Verse } from '@app/api/verse/util'
import Lightbox from '@components/common/Lightbox'
import Reference from '@components/verse/Reference'
import { CircularProgress } from '@mui/material'
import Helpers from './helpers'

export default function TypeItOut({ verse }: { verse: Verse }) {
  const { displayedText, loading, onKeyDown, onChange, inputRef } = Helpers(verse)

  return (
    <div className='w-full centered gap-4 flex-col'>
      <Lightbox className='rounded'>
        <h3 className='text-base text-center p-4'>
          Type the first letter of each word to memorize this verse!
        </h3>
      </Lightbox>
      <div className='w-full flex flex-row justify-between'>
        <Reference
          verse={verse}
          className='ml-4'
        />
        <p className='text-base mr-4 centered'>Easy</p>
      </div>
      <hr className='w-full bg-darkGrey h-[2px]' />
      <div className='verse_words w-[90%] text-center'>
        <div className='flex flex-wrap flex-1 justify-center text-darkGrey'>
          {displayedText.map((text, index) => (
            <div
              id={'verse_word_' + index}
              key={index}
              className={`verse_word ${index == 0 ? 'target' : ''} pr-[3px]`}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      <div className='relative'>
        {loading && (
          <div className='absolute left-[50px] top-[-25px]'>
            <CircularProgress color='primary' />
          </div>
        )}
        <input
          placeholder='Answer Here!'
          onKeyDown={(e) => onKeyDown(e)}
          onChange={(e) => onChange(e)}
          className='bg-transparent bg-[length:16px_16px] border-b-darkGrey border-b-2 text-center'
          ref={inputRef}
          autoComplete='off'
          autoFocus
        />
      </div>
    </div>
  )
}
