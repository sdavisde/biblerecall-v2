'use client'

import { Trash } from 'lucide-react'
import { useVerses } from 'src/hooks/use-verses'
import { Hovered } from '@components/util/Hovered'
import { useState } from 'react'
import LoadingCircle from './LoadingCircle'
import { Verse } from 'src/service/verse/types'

type DeleteIconProps = {
  verse: Verse
}

const DeleteIcon = ({ verse }: DeleteIconProps) => {
  const [, dispatchVerses] = useVerses()
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    if (!loading) {
      setLoading(true)
      await dispatchVerses(verse, 'delete')
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
