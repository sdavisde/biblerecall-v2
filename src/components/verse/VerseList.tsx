'use client'

import { useVerses } from 'hooks/verses'
import VerseBox from '@components/verse/VerseBox'

const VerseList = () => {
  const [verses] = useVerses()
  console.log('verse list', verses)

  return (
    <>
      {verses?.map((verse, i) => (
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
