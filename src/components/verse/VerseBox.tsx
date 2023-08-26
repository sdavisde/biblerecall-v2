'use client'

import Lightbox from '@components/common/Lightbox'
import Darkbox from '@components/common/Darkbox'
import { Verse } from '@app/api/verse/util'

type VerseBoxProps = {
  verse: Verse
  className: string
}

const VerseBox = ({ verse, className }: VerseBoxProps) => {
  return (
    <div className={className}>
      <Lightbox className='rounded-tl rounded-tr'>
        <h4>
          {verse.book.name} {verse.chapter}:{verse.start}
          {verse.end ? `-${verse.end}` : ''}
        </h4>
      </Lightbox>
      <Darkbox className='rounded-bl rounded-br'>
        <p className='text-sm m-6'>{verse.text}</p>
      </Darkbox>
    </div>
  )
}

export default VerseBox
