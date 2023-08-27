'use client'

import { useState } from 'react'
import Lightbox from '@components/common/Lightbox'
import Darkbox from '@components/common/Darkbox'
import { Verse } from '@app/api/verse/util'
import DeleteIcon from '@components/icons/DeleteIcon'
import PlayIcon from '@components/icons/PlayIcon'
import StarIcon from '@components/icons/StarIcon'
import UpdateVerse from './UpdateVerse'
import { updateVerse } from '@lib/verses'
import { useVerses } from 'hooks/verses'
import OutsideAlerter from 'hooks/click'

type VerseBoxProps = {
  verse: Verse
  className: string
}

const VerseBox = ({ verse, className }: VerseBoxProps) => {
  const [verses, setVerses] = useVerses()
  const [update, setUpdate] = useState(false)

  const onUpdate = async (newVerse: Verse) => {
    setVerses([...verses.filter((v) => v.id !== verse.id), newVerse])
    await updateVerse(verse)
    setTimeout(() => {
      setUpdate(false)
    }, 200)
  }

  return (
    <>
      {update ? (
        <div className='w-full'>
          <OutsideAlerter onOutsideClick={() => setUpdate(false)}>
            <UpdateVerse
              reference={`${verse.book.name} ${verse.chapter}:${verse.start}${
                verse.end ? '-' + verse.end : ''
              }`}
              text={verse.text}
              version={verse.version}
              onSubmit={onUpdate}
            />
          </OutsideAlerter>
        </div>
      ) : (
        <div
          className={className + ' cursor-pointer'}
          onClick={() => setUpdate(true)}
        >
          <Lightbox className='rounded-tl rounded-tr flex justify-between items-center'>
            <div className='w-1/6 pl-3'>
              <DeleteIcon id={verse.id} />
            </div>
            <h4 className='w-4/6 centered'>
              {verse.book.name} {verse.chapter}:{verse.start}
              {verse.end ? `-${verse.end}` : ''}
            </h4>
            <div className='w-1/6 flex justify-end pr-3'>
              <PlayIcon verse={verse} />
              <StarIcon verse={verse} />
            </div>
          </Lightbox>
          <Darkbox className='rounded-bl rounded-br h-fit'>
            <p className='text-sm m-4'>{verse.text}</p>
          </Darkbox>
        </div>
      )}
    </>
  )
}

export default VerseBox
