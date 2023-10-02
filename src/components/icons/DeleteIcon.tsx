'use client'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Delete } from '@mui/icons-material'
import { useVerses } from 'hooks/verses'
import Hovered from '@components/util/Hovered'
import { useState } from 'react'
import LoadingCircle from './LoadingCircle'

type DeleteIconProps = {
  id: string | undefined
}

const DeleteIcon = ({ id }: DeleteIconProps) => {
  const [, dispatchVerses] = useVerses()
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    if (id) {
      setLoading(true)
      await dispatchVerses({ id } as any, 'delete')
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
        DefaultComp={DeleteOutlineIcon}
        HoveredComp={Delete}
        onClick={onDelete}
        onTouchEnd={onDelete}
        type='warning'
      />
      {loading && <LoadingCircle className='w-12 h-7' />}
    </span>
  )
}

export default DeleteIcon
