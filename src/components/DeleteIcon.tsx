'use client'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { deleteVerse } from '@lib/verses'
import { useVerses } from 'hooks/verses'

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

  return <DeleteOutlineIcon onClick={onDelete} />
}

export default DeleteIcon
