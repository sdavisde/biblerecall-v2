import Link from 'next/link'
import { LucideProps, Play } from 'lucide-react'
import { Hovered } from '@components/util/Hovered'
import { Verse } from 'types/verse'

type PlayIconProps = LucideProps & {
  verse: Verse
}

const PlayIcon = ({ verse, ...props }: PlayIconProps) => {
  return (
    <span onClick={(e) => e.stopPropagation()}>
      <Link href={`/home/${verse.id}`}>
        <Hovered
          DefaultComp={Play}
          hoveredProps={{ ...props, className: 'stroke-[#5d6b5c] fill-green' }}
          defaultProps={props}
        />
      </Link>
    </span>
  )
}

export default PlayIcon
