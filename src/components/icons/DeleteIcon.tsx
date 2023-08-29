'use client'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Delete } from '@mui/icons-material'
import { deleteVerse } from '@lib/verses'
import { useVerses } from 'hooks/verses'
import Hovered from '@components/util/Hovered'

type DeleteIconProps = {
  id: string | undefined
}

const DeleteIcon = ({ id }: DeleteIconProps) => {
  const [verses, setVerses] = useVerses()

  const onDelete = async () => {
    if (id) {
      setVerses(verses.filter((v) => v.id !== id))
      await deleteVerse(id)
    }
  }

  return (
    <span onClick={(e) => e.stopPropagation()}>
      <Hovered
        className='w-fit'
        DefaultComp={DeleteOutlineIcon}
        HoveredComp={Delete}
        onClick={onDelete}
        type='warning'
      />
    </span>
  )
}

export default DeleteIcon
