import Link from 'next/link'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Hovered from '@components/icons/Hovered'
import { Verse } from '@app/api/verse/util'

type PlayIconProps = {
  verse: Verse
}

const PlayIcon = ({ verse }: PlayIconProps) => {
  const HoveredPlayIcon = () => {
    return (
      <Link
        href={`/home/${verse.book.name.toLowerCase()}-${verse.chapter}-${verse.start}${
          verse.end ? '-' + verse.end : ''
        }`}
        className='w-fit flex'
      >
        <PlayArrowIcon color='primary' />
      </Link>
    )
  }

  return (
    <Hovered
      className='w-fit flex'
      default={PlayArrowIcon}
      hovered={HoveredPlayIcon}
    />
  )
}

export default PlayIcon
