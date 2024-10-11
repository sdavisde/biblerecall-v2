'use client'

import { IoIosStar } from 'react-icons/io'
import { IoIosStarOutline } from 'react-icons/io'
import Hovered from '@components/util/Hovered'
import { useVerses } from 'hooks/use-verses'
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
        DefaultComp={verse.favorite ? IoIosStar : IoIosStarOutline}
        HoveredComp={verse.favorite ? IoIosStarOutline : IoIosStar}
        onClick={toggleFavorite}
        onTouchEnd={toggleFavorite}
        override={verse.favorite}
        type='primary'
      />
    </span>
  )
}

export default FavoriteIcon
