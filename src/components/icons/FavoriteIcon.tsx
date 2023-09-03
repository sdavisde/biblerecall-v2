'use client'

import StarBorderIcon from '@mui/icons-material/StarBorder'
import MUIStarIcon from '@mui/icons-material/Star'
import Hovered from '@components/util/Hovered'
import { Verse } from '@lib/util'
import { updateVerse } from '@lib/api'
import { useVerses } from 'hooks/verses'

type FavoriteIconProps = {
  verse: Verse
}

const FavoriteIcon = ({ verse }: FavoriteIconProps) => {
  const [verses, dispatchVerses] = useVerses()

  const toggleFavorite = async () => {
    const newVerse = { ...verse, favorite: !(verse.favorite ?? false) }
    const res = await updateVerse(newVerse)
    if (res?.success) {
      dispatchVerses(newVerse, 'update')
    }
  }

  return (
    <span onClick={(e) => e.stopPropagation()}>
      <Hovered
        className='w-fit flex'
        DefaultComp={verse.favorite ? MUIStarIcon : StarBorderIcon}
        HoveredComp={verse.favorite ? StarBorderIcon : MUIStarIcon}
        onClick={() => toggleFavorite()}
        override={verse.favorite}
        type='primary'
      />
    </span>
  )
}

export default FavoriteIcon
