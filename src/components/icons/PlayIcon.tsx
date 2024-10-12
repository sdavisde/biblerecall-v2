import Link from 'next/link'
import { Play } from 'lucide-react'
import { Hovered } from '@components/util/Hovered'
import { Verse } from 'types/verse'

type PlayIconProps = {
  verse: Verse
}

const PlayIcon = ({ verse }: PlayIconProps) => {
  return (
    <span onClick={(e) => e.stopPropagation()}>
      <Link
        href={`/home/${verse.id}`}
        className='w-fit flex'
      >
        <Hovered
          className='w-fit flex'
          DefaultComp={Play}
        />
      </Link>
    </span>
  )
}

export default PlayIcon
