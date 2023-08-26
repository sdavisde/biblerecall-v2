'use client'

import { useVerses } from 'hooks/verses'
import { useSort } from 'hooks/sort'
import VerseBox from '@components/verse/VerseBox'

const VerseList = () => {
  const [verses] = useVerses()
  const [sortFn] = useSort()

  return (
    <>
      {verses?.sort(sortFn).map((verse, i) => (
        <VerseBox
          verse={verse}
          key={`${verse.book.name}-${verse.chapter}:${verse.start}-${
            verse.end ?? verse.start
          }(${i})`}
          className='w-full'
        />
      ))}
    </>
  )
}

export default VerseList
