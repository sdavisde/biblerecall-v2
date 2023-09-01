import Link from 'next/link'
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded'
import Hovered from '@components/util/Hovered'
import { Verse } from '@app/api/verse/util'

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
          DefaultComp={PlayArrowIcon}
          HoveredComp={PlayArrowIcon}
        />
      </Link>
    </span>
  )
}

export default PlayIcon
