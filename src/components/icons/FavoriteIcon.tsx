'use client'

import StarBorderIcon from '@mui/icons-material/StarBorder'
import MUIStarIcon from '@mui/icons-material/Star'
import Hovered from '@components/util/Hovered'
import { useVerses } from 'hooks/verses'
import LoadingCircle from './LoadingCircle'
import { useState } from 'react'
import { Verse } from 'types/verse'

type FavoriteIconProps = {
  verse: Verse
}

const FavoriteIcon = ({ verse }: FavoriteIconProps) => {
  const [verses, dispatchVerses] = useVerses()
  const [loading, setLoading] = useState(false)

  const toggleFavorite = async () => {
    const newVerse = { ...verse, favorite: !(verse.favorite ?? false) }
    setLoading(true)
    await dispatchVerses(newVerse, 'update')
    setLoading(false)
  }

  return (
    <span
      onClick={(e) => e.stopPropagation()}
      className='flex flex-row'
    >
      {loading && <LoadingCircle className='w-7 h-7' />}
      <Hovered
        className='w-fit'
        DefaultComp={verse.favorite ? MUIStarIcon : StarBorderIcon}
        HoveredComp={verse.favorite ? StarBorderIcon : MUIStarIcon}
        onClick={toggleFavorite}
        onTouchEnd={toggleFavorite}
        override={verse.favorite}
        type='primary'
      />
    </span>
  )
}

export default FavoriteIcon
