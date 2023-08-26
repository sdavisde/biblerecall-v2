'use client'

import StarBorderIcon from '@mui/icons-material/StarBorder'
import MUIStarIcon from '@mui/icons-material/Star'
import Hovered from '@components/icons/Hovered'
import { Verse } from '@app/api/verse/util'
import { updateVerse } from '@lib/verses'
import { useVerses } from 'hooks/verses'

type StarIconProps = {
  verse: Verse
}

const StarIcon = ({ verse }: StarIconProps) => {
  const [verses, setVerses] = useVerses()
  const HoveredStarIcon = () => {
    return <MUIStarIcon color='primary' />
  }

  const toggleFavorite = async () => {
    setVerses([...verses.filter((v) => v.id !== verse.id), { ...verse, favorite: !verse.favorite }])
    await updateVerse({ ...verse, favorite: !(verse.favorite ?? false) })
  }

  return (
    <form action={toggleFavorite}>
      <button type='submit'>
        <Hovered
          className='w-fit flex'
          default={verse.favorite ? HoveredStarIcon : StarBorderIcon}
          hovered={verse.favorite ? StarBorderIcon : HoveredStarIcon}
        />
      </button>
    </form>
  )
}

export default StarIcon
