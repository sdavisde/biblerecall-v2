import Lightbox from '@components/common/Lightbox'
import Darkbox from '@components/common/Darkbox'
import { Verse } from '@app/api/verse/util'
import DeleteIcon from '@components/icons/DeleteIcon'
import PlayIcon from '@components/icons/PlayIcon'
import StarIcon from '@components/icons/StarIcon'

type VerseBoxProps = {
  verse: Verse
  className: string
}

const VerseBox = ({ verse, className }: VerseBoxProps) => {
  return (
    <div className={className}>
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
      <Darkbox className='rounded-bl rounded-br'>
        <p className='text-sm m-6'>{verse.text}</p>
      </Darkbox>
    </div>
  )
}

export default VerseBox
