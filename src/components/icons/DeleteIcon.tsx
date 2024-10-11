'use client'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Delete } from '@mui/icons-material'
import { useVerses } from 'hooks/use-verses'
import Hovered from '@components/util/Hovered'
import { useState } from 'react'
import LoadingCircle from './LoadingCircle'
import { Verse } from 'types/verse'

type DeleteIconProps = {
  verse: Verse
}

const DeleteIcon = ({ verse }: DeleteIconProps) => {
  const [, dispatchVerses] = useVerses()
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    setLoading(true)
    await dispatchVerses(verse, 'delete')
    setLoading(false)
  }

  return (
    <span
      onClick={(e) => e.stopPropagation()}
      className='flex flex-row'
    >
      <Hovered
        className='w-fit'
        DefaultComp={DeleteOutlineIcon}
        HoveredComp={Delete}
        onClick={onDelete}
        onTouchEnd={onDelete}
        type='warning'
      />
      {loading && <LoadingCircle className='w-7 h-7' />}
    </span>
  )
}

export default DeleteIcon
