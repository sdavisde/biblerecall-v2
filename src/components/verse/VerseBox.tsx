'use client'

import cn from 'clsx'
import { useState } from 'react'
import Lightbox from '@components/common/Lightbox'
import Darkbox from '@components/common/Darkbox'
import { Verse } from '@lib/util'
import DeleteIcon from '@components/icons/DeleteIcon'
import PlayIcon from '@components/icons/PlayIcon'
import FavoriteIcon from '@components/icons/FavoriteIcon'
import UpdateVerse from './UpdateVerse'
import { useVerses } from 'hooks/verses'
import useOutsideClick from 'hooks/click'
import { useSettings } from 'hooks/settings'
import { Visibility } from '@configuration/settings'

type VerseBoxProps = {
  verse: Verse
  className: string
}

const VerseBox = ({ verse, className }: VerseBoxProps) => {
  const [, dispatchVerses] = useVerses()
  const [settings] = useSettings()
  const [update, setUpdate] = useState(false)
  const { ref } = useOutsideClick(() => setUpdate(false))

  const onUpdate = async (newVerse: Verse) => {
    dispatchVerses(newVerse, 'update')
    setUpdate(false)
  }

  return (
    <>
      {update ? (
        <div
          className='w-full'
          ref={ref}
        >
          <UpdateVerse
            reference={`${verse.book.name} ${verse.chapter}:${verse.start}${verse.end ? '-' + verse.end : ''}`}
            id={verse.id}
            text={verse.text}
            version={verse.version}
            onSubmit={onUpdate}
          />
        </div>
      ) : (
        <div
          className={className + ' cursor-pointer'}
          onClick={() => setUpdate(true)}
        >
          <Lightbox
            className={cn('rounded-tr flex justify-between items-center', {
              'rounded-tl': settings?.visibility !== 'none',
              rounded: settings?.visibility === 'none',
            })}
          >
            <div className='w-1/6 pl-3'>
              <DeleteIcon id={verse.id} />
            </div>
            <h4 className='w-4/6 centered'>
              {verse.book.name} {verse.chapter}:{verse.start}
              {verse.end ? `-${verse.end}` : ''}
            </h4>
            <div className='w-1/6 flex justify-end pr-3'>
              {settings?.visibility === 'none' && (
                <div className='scale-[1.5] mr-3'>
                  <PlayIcon verse={verse} />
                </div>
              )}
              <FavoriteIcon verse={verse} />
            </div>
          </Lightbox>
          <Darkbox className='rounded-bl rounded-br h-fit'>
            <VerseText
              text={verse.text}
              visibility={settings?.visibility ?? Visibility.FULL}
            />
            {settings?.visibility !== 'none' && (
              <div className='w-[12%] centered scale-[1.5]'>
                <PlayIcon verse={verse} />
              </div>
            )}
          </Darkbox>
        </div>
      )}
    </>
  )
}

const VerseText = ({ text, visibility }: { text: string; visibility: Visibility }) => {
  if (visibility === 'full') {
    return <p className='text-sm m-4 w-[88%]'>{text}</p>
  } else if (visibility === 'partial') {
    return <p className='text-sm m-4 w-[88%]'>{text.split(' ').slice(0, 5).join(' ')}...</p>
  } else {
    return null
  }
}

export default VerseBox
