'use client'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Delete } from '@mui/icons-material'
import { deleteVerse } from '@lib/verses'
import { useVerses } from 'hooks/verses'
import Hovered from '@components/icons/Hovered'

type DeleteIconProps = {
  id: string | undefined
}

const HoveredDeleteIcon = () => {
  return <Delete color='warning' />
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
    <Hovered
      className='w-fit'
      default={DeleteOutlineIcon}
      hovered={HoveredDeleteIcon}
      onClick={onDelete}
    />
  )
}

export default DeleteIcon
