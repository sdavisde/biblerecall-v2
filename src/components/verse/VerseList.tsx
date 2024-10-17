'use client'

import { useVerses } from 'hooks/use-verses'
import { useSort } from 'hooks/use-sort'
import { VerseBox } from '@components/verse/VerseBox'

const VerseList = () => {
  const [verses] = useVerses()
  const [sortFn] = useSort()

  return (
    <div className='h-full w-full overflow-x-hidden centered flex-col gap-4'>
      {verses?.sort(sortFn).map((verse) => (
        <VerseBox
          verse={verse}
          key={verse.id}
        />
      ))}
    </div>
  )
}

export default VerseList
