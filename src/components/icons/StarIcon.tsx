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
    const newVerse = { ...verse, favorite: !(verse.favorite ?? false) }
    console.log(newVerse)
    const res = await updateVerse(newVerse)
    console.log(verses)
    console.log([newVerse, ...verses.filter((v) => v.id !== verse.id)])
    setVerses([...verses.filter((v) => v.id !== verse.id), newVerse])
  }

  return (
    <span onClick={(e) => e.stopPropagation()}>
      <Hovered
        className='w-fit flex'
        DefaultComp={verse.favorite ? MUIStarIcon : StarBorderIcon}
        HoveredComp={verse.favorite ? StarBorderIcon : MUIStarIcon}
        onClick={() => toggleFavorite()}
        override={verse.favorite}
        type='primary'
      />
    </span>
  )
}

export default StarIcon
