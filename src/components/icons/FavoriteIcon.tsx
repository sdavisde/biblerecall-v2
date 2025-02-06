'use client'

import { Heart } from 'lucide-react'
import { Hovered } from '@components/util/Hovered'
import { useVerses } from 'src/hooks/use-verses'
import LoadingCircle from './LoadingCircle'
import { useState } from 'react'
import { Verse } from 'src/service/verse/types'

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
        DefaultComp={Heart}
        HoveredComp={Heart}
        onClick={toggleFavorite}
        onTouchEnd={toggleFavorite}
        defaultProps={verse.favorite ? { color: 'red', fill: 'red' } : {}}
        hoveredProps={{ color: '#ff000080', fill: '#ff000080' }}
      />
    </span>
  )
}

export default FavoriteIcon
