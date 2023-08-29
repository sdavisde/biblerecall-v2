'use client'

import StarBorderIcon from '@mui/icons-material/StarBorder'
import MUIStarIcon from '@mui/icons-material/Star'
import Hovered from '@components/util/Hovered'
import { Verse } from '@app/api/verse/util'
import { updateVerse } from '@lib/verses'
import { useVerses } from 'hooks/verses'

type FavoriteIconProps = {
  verse: Verse
}

const FavoriteIcon = ({ verse }: FavoriteIconProps) => {
  const [verses, setVerses] = useVerses()

  const toggleFavorite = async () => {
    const newVerse = { ...verse, favorite: !(verse.favorite ?? false) }
    const res = await updateVerse(newVerse)
    if (res?.success) {
      setVerses([...verses.filter((v) => v.id !== verse.id), newVerse])
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
