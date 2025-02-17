'use client'

import { useSort } from 'src/hooks/use-sort'
import { VerseBox } from '@components/verse/VerseBox'
import { Verse } from 'src/service/verse/types'

type Props = {
  verses: Array<Verse>
}
const VerseList = ({ verses }: Props) => {
  const [sortFn] = useSort()

  return (
    <div className='h-full w-full overflow-x-hidden centered flex-col gap-4'>
      {verses.sort(sortFn).map((verse) => (
        <VerseBox
          verse={verse}
          key={verse.id}
        />
      ))}
    </div>
  )
}

export default VerseList
