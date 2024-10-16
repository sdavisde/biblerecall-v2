'use client'

import { useVerses } from 'hooks/use-verses'
import { useSort } from 'hooks/use-sort'
import { VerseBox } from '@components/verse/VerseBox'

const VerseList = () => {
  const [verses] = useVerses()
  const [sortFn] = useSort()

  return (
    <>
      {verses?.sort(sortFn).map((verse) => (
        <VerseBox
          verse={verse}
          key={verse.id}
        />
      ))}
    </>
  )
}

export default VerseList
