'use client'

import { Trash } from 'lucide-react'
import { Hovered } from '@components/util/Hovered'
import { useState } from 'react'
import LoadingCircle from './LoadingCircle'
import { Verse } from 'src/service/verse/types'
import { deleteVerse } from 'src/server/routers/verse'

type DeleteIconProps = {
  verse: Verse
}

const DeleteIcon = ({ verse }: DeleteIconProps) => {
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    if (!loading) {
      setLoading(true)
      await deleteVerse(verse.id)
      setLoading(false)
    }
  }

  return (
    <span
      onClick={(e) => e.stopPropagation()}
      className='flex flex-row'
    >
      <Hovered
        className='w-fit'
        DefaultComp={Trash}
        HoveredComp={Trash}
        onClick={onDelete}
        onTouchEnd={onDelete}
        hoveredProps={{ color: '#4a4a4ab2', fill: '#4a4a4ab2' }}
      />
      {loading && <LoadingCircle className='w-7 h-7' />}
    </span>
  )
}

export default DeleteIcon
