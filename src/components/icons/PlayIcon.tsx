import Link from 'next/link'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Hovered from '@components/icons/Hovered'
import { Verse } from '@app/api/verse/util'

type PlayIconProps = {
  verse: Verse
}

const PlayIcon = ({ verse }: PlayIconProps) => {
  return (
    <Link
      href={`/home/${verse.book.name.toLowerCase()}-${verse.chapter}-${verse.start}${
        verse.end ? '-' + verse.end : ''
      }`}
      className='w-fit flex'
    >
      <Hovered
        className='w-fit flex'
        DefaultComp={PlayArrowIcon}
        HoveredComp={PlayArrowIcon}
      />
    </Link>
  )
}

export default PlayIcon
